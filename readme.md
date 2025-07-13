# **(WCareers.ai)**

**WCareers** is an AI-powered career guidance platform designed to help users with **job recommendations**, **skill development**, **interview preparation**, and **personalized career roadmaps**.

## **Features:**
- **Resume Wizard**: AI-powered resume enhancements with smart suggestions.
- **Mock Interviews**: AI-driven mock interviews with feedback on tone and confidence.
- **Technical & Personality Assessments**: Adaptive tests for technical skills and personality insights.
- **AI-Powered Career Roadmaps**: Personalized step-by-step guides for career progression.
- **Job & Internship Recommendations**: Machine learning-based matching for personalized opportunities.
- **Skill Enhancements**: AI suggestions for skill improvement based on industry trends.
- **Community & Peer Learning**: AI-powered discussion forums with knowledge-sharing tools.

---

## **Folder Structure**

The project is organized into **three main parts**: **Backend (Node.js)**, **Frontend (React)**, and the **LLM Server (Python)**.

### **Root Folder:**
```
📦 roadmap-gen-mern
 ┣ 📂 backend          # Backend logic using Node.js & Express
 ┣ 📂 frontend         # Frontend UI using React (Vite)
 ┣ 📂 llm-server       # Python-based server for AI model processing
 ┣ 📂 deployment       # Deployment scripts (Docker, CI/CD, PM2)
 ┣ 📜 README.md        # Project documentation
 ┣ 📜 .gitignore       # Git ignore file
 ┣ 📜 package.json     # Main package.json
```

---

### **Backend Folder:**
```
📂 backend
 ┣ 📂 src
 ┃ ┣ 📂 config          # Configurations for the backend
 ┃ ┣ 📂 controllers     # API request handlers
 ┃ ┣ 📂 models          # Database models
 ┃ ┣ 📂 routes          # API routes
 ┃ ┣ 📂 middleware      # Express middlewares
 ┃ ┣ 📂 utils           # Helper functions
 ┃ ┣ 📜 app.js          # Main server file
 ┃ ┣ 📜 server.js       # Server entry point
 ┣ 📜 .env              # Environment variables
 ┣ 📜 package.json      # Backend dependencies
```

### **Frontend Folder:**
```
📂 frontend
 ┣ 📂 src
 ┃ ┣ 📂 components      # React components
 ┃ ┣ 📂 pages           # Pages for different routes
 ┃ ┣ 📂 context         # React context for global state
 ┃ ┣ 📂 hooks           # Custom hooks
 ┃ ┣ 📂 utils           # Utility functions
 ┃ ┣ 📂 assets          # Images and static files
 ┃ ┣ 📂 styles          # CSS/SCSS files for styling
 ┃ ┣ 📜 App.tsx         # Main React component
 ┃ ┣ 📜 main.tsx        # Entry point for the frontend
 ┣ 📜 .env              # Environment variables
 ┣ 📜 vite.config.ts    # Vite configuration
 ┣ 📜 package.json      # Frontend dependencies
```

### **LLM Server Folder:**
```
📂 llm-server
 ┣ 📂 models            # Machine learning model files (e.g., fine-tuned LLM)
 ┣ 📂 scripts           # Scripts for data processing and training
 ┣ 📂 utils             # Helper functions for model interaction
 ┣ 📜 server.py         # Python server to serve LLM API
 ┣ 📜 requirements.txt  # Python dependencies
 ┣ 📜 Dockerfile        # Dockerfile for containerizing the LLM server
 ┣ 📜 README.md         # Documentation for LLM server
```

---

## **Getting Started**

### **1. Clone the Repo**
Clone the repository to your local machine:

```bash
https://github.com/Sameer-Bagul/skillify.git
```

### **2. Install Dependencies**
Navigate to each folder (backend, frontend, and llm-server) and install the dependencies.

#### **Backend**:
```bash
cd backend
npm install
```

#### **Frontend**:
```bash
cd frontend
npm install
```

#### **LLM Server**:
```bash
cd llm-server
pip install -r requirements.txt
```

### **3. Running the Application**

#### **Backend**:
```bash
cd backend
npm start
```

#### **Frontend**:
```bash
cd frontend
npm run dev
```

#### **LLM Server**:
```bash
cd llm-server
python server.py
```

---

## **Contributing**

Feel free to contribute to **Skillify**! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make changes and submit a pull request.

---

## **License**
This project is licensed under the MIT License.

