# this is the Expected Folder Structure of the Final Project

``` 

skillify/
│   .gitignore
│   README.md
│   Features.md
│   flow.md
│
├───client (Frontend)
│   │   .env
│   │   .gitignore
│   │   package.json
│   │   vite.config.js
│   │   index.html
│   │   main.jsx
│   │   App.jsx
│   │   index.css
│   │
│   ├───public
│   │   │   logo.svg
│   │   │   favicon.ico
│   │   │   vite.svg
│   │   
│   ├───src
│   │   │   assets.js
│   │
│   │   ├───assets (Images, Icons)
│   │   │   ├───icons
│   │   │   ├───illustrations
│   │   │   ├───logos
│   │   │   ├───profile_pictures
│   │   │
│   │   ├───components (Reusable UI Components)
│   │   │   ├───Common
│   │   │   │       Button.jsx
│   │   │   │       Card.jsx
│   │   │   │       Modal.jsx
│   │   │   │       Spinner.jsx
│   │   │   │
│   │   │   ├───Navbar
│   │   │   │       Navbar.jsx
│   │   │   │
│   │   │   ├───Sidebar
│   │   │   │       Sidebar.jsx
│   │   │   │
│   │   │   ├───Dashboard
│   │   │   │       DashboardHome.jsx
│   │   │   │       Profile.jsx
│   │   │   │
│   │   │   ├───Assessments
│   │   │   │       CognitiveTest.jsx
│   │   │   │       TechnicalTest.jsx
│   │   │   │       PersonalityTest.jsx
│   │   │   │
│   │   │   ├───CareerRoadmap
│   │   │   │       CareerPath.jsx
│   │   │   │       SkillGraph.jsx
│   │   │   │
│   │   │   ├───MockInterview
│   │   │   │       InterviewBot.jsx
│   │   │   │       InterviewFeedback.jsx
│   │   │   │
│   │   │   ├───ResumeBuilder
│   │   │   │       ResumeUpload.jsx
│   │   │   │       ResumeEnhancer.jsx
│   │   │   │
│   │   │   ├───JobRecommendations
│   │   │   │       JobList.jsx
│   │   │   │       InternshipFinder.jsx
│   │   │   │
│   │   │   ├───Community
│   │   │   │       DiscussionForums.jsx
│   │   │   │       PeerMentorship.jsx
│   │   │   │
│   │   │   ├───Coaching
│   │   │   │       CareerCoaching.jsx
│   │   │   │       SoftSkillTrainer.jsx
│   │   │   │
│   │   │   ├───Auth (Authentication)
│   │   │   │       Login.jsx
│   │   │   │       Register.jsx
│   │   │   │       EmailVerify.jsx
│   │   │   │       ResetPassword.jsx
│   │   │
│   │   ├───pages (Main Application Pages)
│   │   │       Home.jsx
│   │   │       Dashboard.jsx
│   │   │       Profile.jsx
│   │   │       RoadmapMaker.jsx
│   │   │       MockInterview.jsx
│   │   │       MyCertificates.jsx
│   │   │       ResumeBuilder.jsx
│   │   │       JobRecommendations.jsx
│   │   │       Community.jsx
│   │   │       Coaching.jsx
│   │
│   │   ├───context
│   │   │       AppContext.jsx
│   │   │       AuthContext.jsx
│   │
│   │   ├───hooks
│   │   │       useAuth.js
│   │   │       useFetch.js
│   │   │       useInterviewBot.js
│   │
│   │   ├───utils
│   │   │       api.js
│   │   │       helpers.js
│   │
│   │   ├───services (API Calls)
│   │   │       authService.js
│   │   │       roadmapService.js
│   │   │       interviewService.js
│   │   │
│   │   ├───styles
│   │   │       theme.css
│   │
│   ├───llm-server (AI Model Server)
│   │   │   Dockerfile
│   │   │   model.py
│   │   │   requirements.txt
│   │   │   server.py
│   │   │
│   │   ├───models
│   │   │       cognitive_test_model.py
│   │   │       personality_analysis.py
│   │   │       resume_analysis.py
│   │   │       skill_gap_analysis.py
│   │   │
│   │   ├───services
│   │   │       llm_service.py
│   │   │       voice_analysis.py
│   │   │
│   │   ├───utils
│   │   │       preprocess.py
│   │   │       config.py
│
├───server (Backend)
│   │   .env
│   │   package.json
│   │   server.js
│   │
│   ├───config
│   │       db.js
│   │       nodemailer.js
│   │
│   ├───controllers
│   │       authController.js
│   │       userController.js
│   │       roadmapController.js
│   │       jobController.js
│   │       interviewController.js
│   │
│   ├───middleware
│   │       authMiddleware.js
│   │
│   ├───models
│   │       User.js
│   │       Roadmap.js
│   │       Resume.js
│   │       Interview.js
│   │       Job.js
│   │
│   ├───routes
│   │       authRoutes.js
│   │       userRoutes.js
│   │       roadmapRoutes.js
│   │       jobRoutes.js
│   │       interviewRoutes.js
│   │
│   ├───services
│   │       aiService.js
│   │       jobScraper.js
│   │       interviewAI.js
│   │
│   ├───utils
│   │       helpers.js
│
│
└───tests
        api.test.js
        ui.test.js

```