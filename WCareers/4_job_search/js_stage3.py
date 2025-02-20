import streamlit as st
from stage1 import generate_search_queries  # Fetch search queries from Stage 1
from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate
from tavily import TavilyClient, MissingAPIKeyError, InvalidAPIKeyError, UsageLimitExceededError
import os
import concurrent.futures  # For parallel execution

# Initialize Tavily Client
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
if not TAVILY_API_KEY:
    st.error("TAVILY_API_KEY environment variable is not set.")
    st.stop()

try:
    tavily_client = TavilyClient(api_key=TAVILY_API_KEY)
except MissingAPIKeyError:
    st.error("API key is missing. Please provide a valid API key.")
    st.stop()
except (InvalidAPIKeyError, UsageLimitExceededError) as e:
    st.error(f"Tavily API Error: {e}")
    st.stop()

# Initialize LLM
llm = Ollama(model="llama3")  # Adjust model if needed

# 📌 INTERACTION BLOCK (Search-Based Answers)
interaction_system_prompt = (
    "system",
    """Your goal is to provide answers based on information from the internet.
    Use the Tavily search API function to find relevant online information.
    Never use your own knowledge to answer questions.
    Always include relevant URL sources at the end of your answers."""
)

interaction_user_prompt = (
    "user",
    """language: {language}
    "{search_results}"
    Using the above information, answer the following question or topic: "{query}" """
)

interaction_prompt = ChatPromptTemplate.from_messages([interaction_system_prompt, interaction_user_prompt])

def tavily_search(query):
    """Fetch search results using Tavily API."""
    try:
        response = tavily_client.search(query)
        search_results = response.get('results', [])  # Handle missing 'results'
        if not search_results:
            return "No results found."
        
        return "\n".join([f"[{item.get('title', 'N/A')}]({item.get('url', 'N/A')})" for item in search_results])  # Format URLs
    except Exception as e:
        return f"An error occurred during Tavily search: {str(e)}"

def process_search_queries(title, language):
    """Generate AI-powered answers with source URLs."""
    queries = generate_search_queries(title, language)
    responses = []

    for query in queries:
        search_results = tavily_search(query)  # Fetch search results

        response = interaction_prompt | llm  # LLM Processing
        ai_response = response.invoke({"language": language, "search_results": search_results, "query": query})
        
        responses.append(f"### {query}\n{ai_response}\n*Sources:*\n{search_results}")

    return responses

# 📌 PARALLEL BLOCK (LLM3 Processing - Subheading Generation)
llm3_system_prompt = (
    "system",
    """According{{code/result#}},{{#start/title#}} Generate 3 to 5 sub-titles.
    <instructions>
    - Carefully read the provided main title and related content.
    - Analyze the core theme and key information points.
    - Ensure subheadings maintain consistency and relevance.
    - Each subheading should be:
      - Concise
      - Unique
      - Engaging
    - Logical order should be maintained.
    *Output Format:*
    - Each subheading on a separate line.
    - No XML tags included.
    - Output subheadings content only.
    </instructions>
    """
)

llm3_user_prompt = (
    "user",
    """Language: {language}
    Generate a series of appropriate sub-titles to help break down {title}."""
)

llm3_prompt = ChatPromptTemplate.from_messages([llm3_system_prompt, llm3_user_prompt])

def generate_subheadings(title, language):
    """Generates structured subheadings using LLM3."""
    response = llm3_prompt | llm
    subheadings = response.invoke({"language": language, "title": title})

    # Post-processing: Ensuring only subheadings are returned
    subheadings = subheadings.strip().split("\n")
    clean_subheadings = [s.strip() for s in subheadings if s.strip()]
    
    return "\n".join(clean_subheadings)

# 📌 STREAMLIT UI
st.title("🔍 AI-Powered Research & Subheading Generator")
st.write("Enter a topic and language to get AI-powered research insights and structured subheadings.")

# User Inputs
title = st.text_input("Enter Main Topic:", placeholder="e.g., How to learn AI?")
language = st.selectbox("Select Language:", ["English", "Hindi", "Marathi", "German"], index=0)

# Submit Button
if st.button("🚀 Generate Results"):
    if title:
        with st.spinner("Fetching results... Please wait."):

            # Parallel Execution of Interaction & Parallel Blocks
            with concurrent.futures.ThreadPoolExecutor() as executor:
                future_responses = executor.submit(process_search_queries, title, language)
                future_subheadings = executor.submit(generate_subheadings, title, language)

                responses = future_responses.result()
                subheadings = future_subheadings.result()

            # Display AI-generated Search-Based Answers (Interaction Block)
            st.header("🔹 Research Insights & Sources")
            for response in responses:
                st.markdown(response, unsafe_allow_html=True)

            # Display AI-generated Subheadings (Parallel Block)
            st.header("📌 Structured Subheadings")
            st.text(subheadings)

    else:
        st.error("Please enter a topic before generating results!")