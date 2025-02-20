def generate_search_queries(career_name, language):
    from langchain_community.llms import Ollama
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser

    # Define prompt
    system_prompt = (
        "system",
        """<instruction>
        <task_description>
        Generate a series of appropriate search engine queries to break down questions based on user career name.
        </task_description>
        <examples>
    <example>
        <input> Android Developer</input>
        <output> 
            'best Android development courses', 
            'top Android developer certifications', 
            'essential Android development resources', 
            'platforms to test Android development skills', 
            'recommended textbooks for Android programming', 
            'latest articles on Android development', 
            'important research papers on mobile app development', 
            'must-do projects for Android developers', 
            'top 5 Android industry experts to follow', 
            'upcoming Android development workshops and meetups', 
            'offline classes for Android development', 
            'time required to master Android development', 
            'best learning styles for Android development', 
            'prerequisite knowledge for becoming an Android developer', 
            'case studies on successful Android apps', 
            'popular Android development hackathons', 
            'common mistakes beginner Android developers make' 
        </output>
    </example>

    <example>
        <input> Data Scientist </input>
        <output> 
            'best data science courses online', 
            'top data science certifications', 
            'must-have resources for data scientists', 
            'websites to test data science skills', 
            'recommended books for data science', 
            'latest articles on AI and data science', 
            'key research papers in machine learning', 
            'important projects for aspiring data scientists', 
            '5 influential data science experts to follow', 
            'upcoming data science workshops and meetups', 
            'offline training programs for data science', 
            'how long does it take to learn data science', 
            'learning styles suited for data science', 
            'prerequisites for starting data science', 
            'case studies of data science in the industry', 
            'top data science competitions and hackathons', 
            'common pitfalls in learning data science' 
        </output>
    </example>

    <example>
        <input>Cybersecurity Analyst </input>
        <output> 
            'best cybersecurity courses for beginners', 
            'recognized cybersecurity certifications', 
            'essential cybersecurity learning resources', 
            'platforms to test cybersecurity skills', 
            'best books for learning cybersecurity', 
            'latest trends and articles on cybersecurity', 
            'key research papers in cybersecurity', 
            'hands-on projects for cybersecurity beginners', 
            '5 top cybersecurity experts to follow', 
            'upcoming cybersecurity conferences and events', 
            'offline cybersecurity training programs', 
            'duration to become a cybersecurity analyst', 
            'learning strategies for mastering cybersecurity', 
            'fundamentals needed for cybersecurity', 
            'real-world cybersecurity case studies', 
            'top cybersecurity hackathons and CTF challenges', 
            'mistakes beginners make in cybersecurity' 
        </output>
    </example>

    <example>
        <input> Cloud Engineer </input>
        <output> 
            'best cloud computing courses', 
            'cloud certifications like AWS, Azure, GCP', 
            'important cloud computing resources', 
            'platforms to practice cloud computing skills', 
            'recommended books for cloud engineers', 
            'latest blogs and articles on cloud computing', 
            'academic research on cloud computing', 
            'essential cloud computing projects', 
            'top 5 cloud industry leaders to follow', 
            'cloud computing events and webinars', 
            'offline cloud engineering training programs', 
            'how long does it take to become a cloud engineer', 
            'learning methods for cloud computing', 
            'prerequisites for learning cloud computing', 
            'case studies on cloud technology in enterprises', 
            'cloud computing hackathons and competitions', 
            'common mistakes in cloud adoption and learning' 
        </output>
    </example>

    <example>
        <input>Full-Stack Developer</input>
        <output> 
            'best full-stack development courses', 
            'full-stack development certifications', 
            'essential resources for full-stack developers', 
            'websites to test full-stack skills', 
            'recommended textbooks for web development', 
            'latest articles on full-stack development', 
            'important research papers in web development', 
            'must-do projects for full-stack developers', 
            'top full-stack industry experts to follow', 
            'upcoming meetups for web developers', 
            'offline web development bootcamps', 
            'time required to become a full-stack developer', 
            'best learning styles for mastering full-stack development', 
            'prerequisites for learning full-stack development', 
            'industry case studies on successful full-stack projects', 
            'full-stack coding competitions and hackathons', 
            'common mistakes full-stack developers make' 
        </output>
    </example>

    <example>
        <input> AI/ML Engineer </input>
        <output> 
            'best AI/ML courses', 
            'AI/ML certifications to boost your career', 
            'must-have AI/ML learning resources', 
            'platforms to test AI/ML models and skills', 
            'top books on artificial intelligence and machine learning', 
            'latest AI/ML articles and blogs', 
            'important academic research papers in AI', 
            'key AI/ML projects to build for practical learning', 
            'top AI/ML experts and researchers to follow', 
            'upcoming AI conferences and workshops', 
            'offline training programs for AI/ML', 
            'how long does it take to become an AI engineer', 
            'learning styles for mastering AI/ML', 
            'prerequisites for AI/ML learning', 
            'real-world case studies of AI applications', 
            'AI/ML hackathons and coding competitions', 
            'common mistakes AI beginners make' 
        </output>
    </example>

    <example>
        <input>Blockchain Developer </input>
        <output> 
            'best blockchain development courses', 
            'blockchain certifications to validate skills', 
            'essential blockchain learning resources', 
            'platforms to practice blockchain coding', 
            'recommended books on blockchain technology', 
            'latest blockchain articles and industry trends', 
            'key research papers on blockchain', 
            'hands-on projects for blockchain development', 
            'top blockchain experts to follow', 
            'upcoming blockchain summits and meetups', 
            'offline blockchain development training programs', 
            'time required to master blockchain development', 
            'best ways to learn blockchain technology', 
            'prerequisites for getting started with blockchain', 
            'industry case studies on blockchain adoption', 
            'blockchain hackathons and developer challenges', 
            'common mistakes in blockchain development' 
        </output>
    </example>
</examples>

        <instructions>
        1. Take user's career name as input.
        2. Generate 16-17 relevant search queries.
        3. Output must be pure (comma-separated).
        </instructions>"""
    )

    user_prompt = (
        "user",
        "career_name: {career_name}\nlanguage: {language}\nOutput is separated only by commas.\nBreak down into at least 16-17 subproblems."
    )

    # Create LangChain pipeline
    prompt = ChatPromptTemplate.from_messages([system_prompt, user_prompt])
    llm = Ollama(model="llama3")
    output_parser = StrOutputParser()
    chain = prompt | llm | output_parser

    # Generate queries
    response = chain.invoke({"career_name": career_name, "language": language})
    queries = [query.strip() for query in response.split(",")]
    return queries

if __name__ == "__main__":
    # Test case
    queries = generate_search_queries("Blockchain Developer", "English")
    print(queries)  # This will print the generated queries
