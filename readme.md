# **Skillify (WCareers.ai)**

Skillify is an **AI-powered career guidance platform** designed to help individuals navigate their career journeys by offering personalized **job recommendations**, **skill development** tools, **interview preparation**, and **roadmap generation** for various fields. The platform leverages **Generative AI** and **Machine Learning** to provide a seamless learning and career development experience.

## **Features**

### **Core Features:**
1. **Resume Wizard**
   - **AI Resume Enhancer:** Improves resumes using NLP techniques and industry-specific keywords.
   - **Smart Resume Maker:** Provides real-time suggestions for creating effective resumes.
   - **Tech Stack:** Python (NLTK, SpaCy), OpenAI GPT

2. **Mock Interviews & AI Feedback**
   - **AI Interview Bot:** Simulates mock interviews using fine-tuned LLM models.
   - **Voice & Sentiment Analysis:** Evaluates tone and confidence using speech recognition.
   - **Tech Stack:** Python, Hugging Face Transformers, OpenAI GPT, SpeechRecognition

3. **Cognitive, Technical & Personality Assessments**
   - Adaptive technical skill tests and gamified cognitive tests.
   - AI-based personality assessments to provide tailored career recommendations.
   - **Tech Stack:** Python, TensorFlow, Scikit-learn

4. **AI-Powered Career Roadmaps**
   - **Roadmap Generation:** AI-powered step-by-step career progression guides.
   - Personalized learning paths based on individual assessments and market trends.
   - **Tech Stack:** Python, OpenAI GPT, Pandas, Scikit-learn

5. **Personalized Job & Internship Recommendations**
   - Machine learning algorithms for job matching and internship suggestions.
   - **Tech Stack:** Python, Scikit-learn, Pandas, Numpy

6. **Skill Enhancements using AI/ML**
   - Industry trends analysis for skill development.
   - AI summarization of content for quick learning.
   - **Tech Stack:** OpenAI GPT, LangChain, Hugging Face Transformers

7. **Community & Peer Learning**
   - AI-powered discussion forums with automatic summarization and misinformation detection.
   - Collaboration tools for knowledge-sharing and networking.
   - **Tech Stack:** MERN (MongoDB, Express.js, React, Node.js), OpenAI GPT

8. **Skill Graph Representation**
   - Visual representation of skills as nodes in a Graph Database.
   - Helps users visualize the interconnection of various technical, soft, and domain-specific skills.
   - **Tech Stack:** Neo4j, Python, NetworkX

## **LLM-Based Roadmap Generation**
One of the core features of **Skillify** is the **Roadmap Generation** powered by **LLM models** (Large Language Models). This application helps users generate personalized career roadmaps based on a variety of input topics such as **programming languages**, **soft skills**, **industry roles**, and more.

### **Main Components:**
1. **Frontend (React + Vite)**
   - A user-friendly interface for inputting topics and receiving personalized roadmaps.
   - Visualizing generated roadmaps with easy-to-read steps and milestones.
   - Connecting to the **backend API** for seamless roadmap generation.

2. **Backend (Node.js & Express)**
   - Handles requests from the frontend.
   - Manages user sessions, preferences, and stores the generated roadmaps in the database.
   - Integrates with the **LLM server** to process and generate roadmaps based on input topics.

3. **LLM Server (Python-based)**
   - Hosts a **Large Language Model** (e.g., GPT-4, LLaMA) for generating structured, personalized roadmaps.
   - This server processes the input data and returns AI-generated step-by-step roadmaps in JSON format.

---

## **Project Setup**

### **1. Prerequisites**
- **Node.js** (Backend and Frontend)
- **Python** (LLM Server)
- **MongoDB** (Database)

### **2. Folder Structure**
The project is divided into **three main parts**:  
1. **Backend** - Node.js & Express server  
2. **Frontend** - React (Vite)  
3. **LLM Server** - Python-based LLM processing  

The folder structure for the project is as follows:

```
📦 roadmap-gen-mern
 ┣ 📂 backend          # Node.js & Express server
 ┣ 📂 frontend         # React (Vite) frontend
 ┣ 📂 llm-server       # LLM model server (Python-based or Node.js)
 ┣ 📂 deployment       # Scripts for Docker, PM2, and CI/CD (optional)
 ┣ 📜 README.md        # Project documentation
 ┣ 📜 .gitignore       # Git ignore file
 ┣ 📜 package.json     # Main package.json (if using workspaces)
```

### **3. Installation Steps**

#### **Backend Setup:**
1. Navigate to the **backend** directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

#### **Frontend Setup:**
1. Navigate to the **frontend** directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

#### **LLM Server Setup:**
1. Navigate to the **llm-server** directory:
   ```bash
   cd llm-server
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### **4. Running the Application**

#### **Backend**  
To start the backend server:
```bash
cd backend
npm start
```

#### **Frontend**  
To start the frontend development server:
```bash
cd frontend
npm run dev
```

#### **LLM Server**  
To run the LLM server:
```bash
cd llm-server
python server.py
```

---

## **Contributing**
We welcome contributions to **Skillify**! Feel free to fork the repo and submit pull requests.  

### **Steps to Contribute:**
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Submit a pull request.

---

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

