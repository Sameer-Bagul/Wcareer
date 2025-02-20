def generate_search_queries(title, language):
    from langchain_community.llms import Ollama
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser

    # Define prompt
    system_prompt = (
        "system",
        """<instruction>
        <task_description>
        Generate a series of appropriate search engine queries to break down questions based on user inquiries.
        </task_description>
        <examples>
        <example>
        Input: User asks how to learn programming
        Output: 'programming learning methods', 'programming tutorials for beginners'
        </example>
        <example>
        Input: User wants to understand latest technology trends
        Output: 'tech trends 2021', 'latest technology news'
        </example>
        </examples>
        <instructions>
        1. Take user's question as input.
        2. Generate 4-6 relevant search queries.
        3. Output must be pure (comma-separated).
        </instructions>"""
    )

    user_prompt = (
        "user",
        "title: {title}\nlanguage: {language}\nOutput is separated only by commas.\nBreak down into at least 4-6 subproblems."
    )

    # Create LangChain pipeline
    prompt = ChatPromptTemplate.from_messages([system_prompt, user_prompt])
    llm = Ollama(model="llama3")
    output_parser = StrOutputParser()
    chain = prompt | llm | output_parser

    # Generate queries
    response = chain.invoke({"title": title, "language": language})
    queries = [query.strip() for query in response.split(",")]
    return queries

if __name__ == "__main__":
    # Test case
    queries = generate_search_queries("How to learn AI?", "English")
    print(queries)  # This will print the generated queries
