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
   
    """You are an AI-powered information retrieval assistant. Your primary task is to fetch and provide answers exclusively based on real-time online information. Follow these instructions strictly:

    1. **Use External Sources Only**: Always utilize the Tavily search API to gather relevant and up-to-date information. Do not rely on any internal knowledge.
    
    2. **Provide Concise & Accurate Answers**: Summarize the key findings clearly and concisely while maintaining factual accuracy.
    
    3. **Source Attribution**: Always include relevant URLs at the end of your response to ensure transparency and credibility.

    4. **Format Your Response Professionally**: Organize your output logically and ensure readability for the user.
    
    Your role is to act solely as an information retriever, ensuring every response is backed by reliable sources."""



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
        
        return "\n".join([f"[{item.get('career_name', 'N/A')}]({item.get('url', 'N/A')})" for item in search_results])  # Format URLs
    except Exception as e:
        return f"An error occurred during Tavily search: {str(e)}"

def process_search_queries(career_name, language):
    """Generate AI-powered answers with source URLs."""
    queries = generate_search_queries(career_name, language)
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
    """According{{code/result#}},{{#start/career_name#}} Generate 3 to 5 sub-titles.
    <instructions>
    - Carefully read the provided main career_name and related content.
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
    Generate a series of appropriate sub-titles to help break down {career_name}."""
)

llm3_prompt = ChatPromptTemplate.from_messages([llm3_system_prompt, llm3_user_prompt])

def generate_subheadings(career_name, language):
    """Generates structured subheadings using LLM3."""
    response = llm3_prompt | llm
    subheadings = response.invoke({"language": language, "career_name": career_name})

    # Post-processing: Ensuring only subheadings are returned
    subheadings = subheadings.strip().split("\n")
    clean_subheadings = [s.strip() for s in subheadings if s.strip()]
    
    return "\n".join(clean_subheadings)

# 📌 STREAMLIT UI
st.title("🔍 AI-Powered Learning Pathway and Guide")
st.write("Enter a career option and language to get AI-powered research insights.")

# User Inputs
career_name = st.text_input(" Enter the career path you're seeking guidance on and unlock tailored pathways:", placeholder="e.g., BLOCKCHAIN DEVELOPER")
language = st.selectbox("Select Language:", ["English", "Hindi", "Marathi", "German", "Spanish", "Mandarin","French", "Russian","Bengali", "Kannada"], index=0)

# Submit Button
if st.button("🚀 Generate Results"):
    if career_name:
        with st.spinner("Fetching results... Please wait."):

            # Parallel Execution of Interaction & Parallel Blocks
            with concurrent.futures.ThreadPoolExecutor() as executor:
                future_responses = executor.submit(process_search_queries, career_name, language)
                future_subheadings = executor.submit(generate_subheadings, career_name, language)

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
        st.error("Please enter a career name before generating results!")