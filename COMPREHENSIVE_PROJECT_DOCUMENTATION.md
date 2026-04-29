# WCareers.ai - Comprehensive Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Features](#core-features)
6. [Backend Implementation](#backend-implementation)
7. [Frontend Implementation](#frontend-implementation)
8. [AI/ML Models](#aiml-models)
9. [Database Schema](#database-schema)
10. [API Endpoints](#api-endpoints)
11. [User Flow](#user-flow)
12. [Setup and Installation](#setup-and-installation)
13. [Development Guidelines](#development-guidelines)
14. [Future Enhancements](#future-enhancements)

---

## Project Overview

**WCareers.ai** is an AI-powered career guidance platform designed to help students and professionals with job recommendations, skill development, interview preparation, and personalized career roadmaps. The platform leverages **Generative AI** and **Machine Learning** to analyze users' skills, interests, and industry trends to create tailored career success pathways.

### Mission
To provide comprehensive, personalized career guidance that helps users develop the right skills and find the best job opportunities through AI-driven insights and assessments.

### Key Value Propositions
- **Personalized Career Paths**: AI-generated roadmaps based on individual skills and goals
- **Comprehensive Assessment**: Technical, cognitive, and personality evaluations
- **Real-time Market Insights**: Industry trend analysis and skill demand forecasting
- **Interview Preparation**: AI-powered mock interviews with detailed feedback
- **Community Learning**: Peer-to-peer knowledge sharing and mentorship

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Main Client  │  │ Mock         │  │ Old HireMe Frontend  │  │
│  │ (React+Vite) │  │ Interview    │  │ (Archive)            │  │
│  │              │  │ (Next.js)    │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER                          │
│                     (Express.js Backend)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Auth Routes  │  │ Assessment   │  │ Interview Routes     │  │
│  │              │  │ Routes       │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Career       │  │ Job & Resume │  │ Community Routes     │  │
│  │ Roadmap      │  │ Routes       │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Skill        │  │ Resume       │  │ Job Matching         │  │
│  │ Analysis     │  │ Analysis     │  │ Service              │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │ Interview    │  │ Community    │                            │
│  │ Feedback     │  │ Service      │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      AI/ML LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Python AI Models                             │  │
│  │  • Career Roadmap Generator                               │  │
│  │  • Skill Assessment Engine                                │  │
│  │  • Job Recommendation System                              │  │
│  │  • Resume Enhancement Engine                              │  │
│  │  • Interview Feedback Analyzer                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         LLM Integration (Google Gemini/OpenAI)            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   MongoDB    │  │   Neo4j      │  │   External APIs      │  │
│  │   (Primary)  │  │   (Skills    │  │   (Job Listings)     │  │
│  │              │  │   Graph)     │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Architecture Patterns
- **Microservices-oriented**: Separation of concerns across different services
- **RESTful API Design**: Stateless communication between client and server
- **Event-driven**: Real-time updates for community features and notifications
- **AI-as-a-Service**: Python AI models exposed through API endpoints

---

## Technology Stack

### Frontend Technologies

#### Main Client Application
- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.1.0
- **Routing**: React Router DOM 7.1.5
- **UI Components**: 
  - Radix UI (Accessible component primitives)
  - Lucide React (Icons)
  - Framer Motion (Animations)
- **Styling**: Tailwind CSS 4.0.6
- **Charts**: Chart.js 4.4.8, Recharts 2.15.1
- **State Management**: React Context API
- **HTTP Client**: Axios 1.7.9
- **AI Integration**: Google Generative AI 0.22.0
- **PDF Generation**: jsPDF 3.0.0
- **Video Recording**: React Webcam 7.2.0
- **Notifications**: React Toastify 11.0.3

#### Mock Interview Application (Next.js)
- **Framework**: Next.js 14.2.4
- **Authentication**: Clerk 5.2.2
- **Database ORM**: Drizzle ORM 0.31.4
- **Database**: Neon (PostgreSQL)
- **UI**: Radix UI Components
- **Styling**: Tailwind CSS
- **AI**: Google Generative AI 0.14.1
- **Speech-to-Text**: React Hook Speech to Text

### Backend Technologies

#### Node.js Server
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.21.2
- **Database**: MongoDB (Mongoose 8.9.6)
- **Authentication**: 
  - JWT (jsonwebtoken 9.0.2)
  - bcrypt.js 2.4.3
- **Email Service**: Nodemailer 6.10.0
- **AI Integration**: Google Generative AI 0.24.1
- **Middleware**:
  - CORS 2.8.5
  - Cookie Parser 1.4.7
  - dotenv 16.4.7

### AI/ML Stack

#### Python AI Models
- **Framework**: Streamlit
- **LLM Integration**:
  - LangChain Community
  - LangChain OpenAI
  - LangChain Groq
  - LangChain Hugging Face
- **Document Processing**:
  - PyPDF (PDF parsing)
  - BeautifulSoup4 (Web scraping)
  - PyMuPDF (PDF manipulation)
- **Embeddings & Vector Store**:
  - Sentence Transformers
  - FAISS (Vector similarity search)
- **Data Processing**:
  - Pandas
  - DuckDB
- **APIs**: OpenAI, Groq

### Database Technologies
- **Primary Database**: MongoDB (Document Store)
- **Graph Database**: Neo4j (Skill relationships)
- **Vector Database**: FAISS (Semantic search)

### Development Tools
- **Version Control**: Git
- **Package Managers**: npm, pip
- **Code Quality**: ESLint
- **Environment Management**: dotenv

---

## Project Structure

### Root Directory Layout

```
Wcareer/
├── client/                    # Main React frontend application
├── mockInterview/            # Next.js mock interview module
├── server/                   # Express.js backend API
├── WCareers/                 # Python AI/ML models
├── old-HireMe-frontend/      # Archive of previous version
├── Backend.md                # Backend documentation
├── Features.md               # Feature specifications
├── ExtraFeatures.md          # Additional features list
├── FinalProductFolderStructure.md
├── frontend-overview.md      # Frontend architecture docs
├── flow.md                   # User flow documentation
└── readme.md                 # Main project README
```

### Client Directory Structure

```
client/
├── public/                   # Static assets
├── src/
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles
│   ├── app/                 # App configuration
│   ├── assets/              # Static assets (images, icons)
│   ├── components/          # React components
│   │   ├── dashbord/       # Dashboard components
│   │   │   ├── dash-common/     # Shared dashboard UI
│   │   │   ├── dash-home/       # Dashboard home
│   │   │   ├── dash-interview/  # Interview components
│   │   │   ├── dash-marketplace/# Job marketplace
│   │   │   └── dash-roadmap/    # Career roadmap UI
│   │   ├── community/       # Community features
│   │   ├── home-common/     # Landing page components
│   │   ├── interview/       # Interview module
│   │   ├── market-insights/ # Market analysis UI
│   │   ├── settings/        # User settings
│   │   ├── ui/             # Reusable UI components
│   │   └── CertificateGenerator.jsx
│   ├── context/            # React Context providers
│   │   ├── JobContext.jsx
│   │   ├── NotificationContext.jsx
│   │   ├── RoadmapContext.jsx
│   │   ├── SkillContext.jsx
│   │   ├── TestContext.jsx
│   │   └── UserContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCommunity.js
│   │   ├── useJobs.js
│   │   ├── useSkills.js
│   │   └── useTests.js
│   ├── images/             # Image assets
│   ├── pages/              # Page components
│   │   ├── dashboard/      # Dashboard pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── ResumeAnalyzer.jsx
│   │   │   ├── Consultant.jsx
│   │   │   ├── CareerPathway.jsx
│   │   │   ├── CommunityPage.jsx
│   │   │   ├── MarketInsights.jsx
│   │   │   └── settings.jsx
│   │   ├── CognitiveGames/     # Gamified assessments
│   │   │   ├── SpotOn.jsx
│   │   │   └── BrainSwitch.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── EmailVerify.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── InterviewSetup.jsx
│   │   ├── InterviewStart.jsx
│   │   ├── InterviewFeedback.jsx
│   │   ├── PersonalizedRoadmap.jsx
│   │   ├── TechnicalTestPage.jsx
│   │   ├── AdaptiveTechnicalTest.jsx
│   │   ├── TechnicalTestResultPage.jsx
│   │   ├── CognitiveTest.jsx
│   │   ├── PersonalityAssessmentPage.jsx
│   │   ├── MentorMania.jsx
│   │   ├── BecomeMentor.jsx
│   │   └── Leaderboard.jsx
│   └── services/           # API service layer
├── components.json         # Shadcn UI configuration
├── eslint.config.js       # ESLint configuration
├── jsconfig.json          # JavaScript configuration
├── package.json           # Dependencies
└── vite.config.js         # Vite build configuration
```

### Server Directory Structure

```
server/
├── ai_models/             # Python AI model integrations
│   ├── careerRoadmapModel.py
│   ├── interviewFeedbackModel.py
│   ├── jobRecommendationModel.py
│   ├── resumeEnhancerModel.py
│   └── skillAssessmentModel.py
├── config/                # Configuration files
│   ├── emailTemplates.js  # Email templates for notifications
│   ├── mongodb.js         # MongoDB connection setup
│   └── nodemailer.js      # Email service configuration
├── controllers/           # Request handlers
│   ├── assessmentController.js
│   ├── authController.js
│   ├── careerRoadmapController.js
│   ├── communityController.js
│   ├── interviewController.js
│   ├── jobRecommendationController.js
│   ├── resumeController.js
│   ├── skillEnhancementController.js
│   └── userController.js
├── data/                  # Static data files
│   ├── industryTrends.json
│   └── skillGraphData.json
├── middleware/            # Express middleware
│   ├── errorHandler.js    # Error handling middleware
│   └── userAuth.js        # Authentication middleware
├── models/                # Database models (Mongoose schemas)
│   ├── assessmentModel.js
│   ├── careerRoadmapModel.js
│   ├── discussionModel.js
│   ├── interviewModel.js
│   ├── jobModel.js
│   ├── mockInterviewModel.js
│   ├── QuestionBank.js
│   ├── resumeModel.js
│   ├── skillModel.js
│   ├── userAnswerModel.js
│   └── userModel.js
├── routes/                # API route definitions
│   ├── assessmentRoutes.js
│   ├── authRoutes.js
│   ├── careerRoadmapRoutes.js
│   ├── communityRoutes.js
│   ├── interviewRoutes.js
│   ├── jobRecommendationRoutes.js
│   ├── resumeRoutes.js
│   ├── skillEnhancementRoutes.js
│   └── userRoutes.js
├── services/              # Business logic layer
│   ├── communityService.js
│   ├── interviewFeedbackService.js
│   ├── jobMatchingService.js
│   ├── resumeAnalysisService.js
│   └── skillAnalysisService.js
├── utils/                 # Utility functions
│   └── ollamaClient.js    # LLM integration utilities
├── package.json           # Backend dependencies
└── server.js              # Application entry point
```

### WCareers (Python AI) Directory

```
WCareers/
├── 2_learning_pathway/    # Learning path generation
├── 4_job_search/          # Job search and matching
├── ai_wcareer.py          # Main AI orchestration
└── requirements.txt       # Python dependencies
```

---

## Core Features

### 1. Personalized Cognitive, Technical & Personality Assessments

#### 1.1 Adaptive Technical Skill Tests
- **Description**: Algorithm dynamically adjusts difficulty based on user performance
- **Technology**: Python, TensorFlow, Keras, Scikit-learn
- **Implementation**: 
  - Question bank with difficulty ratings
  - Adaptive algorithm selects next question based on previous answers
  - Real-time performance tracking
- **Components**:
  - `TechnicalTestPage.jsx` - Test selection and info
  - `AdaptiveTechnicalTest.jsx` - Test interface
  - `TechnicalTestResultPage.jsx` - Results display
  - `assessmentController.js` - Backend logic

#### 1.2 Cognitive Tests
- **Description**: Gamified assessments for problem-solving, logical reasoning, critical thinking
- **Components**:
  - `CognitiveTest.jsx` - Main cognitive test interface
  - `SpotOn.jsx` - Pattern recognition game
  - `BrainSwitch.jsx` - Task-switching assessment
- **Metrics Measured**:
  - Response time
  - Accuracy
  - Pattern recognition
  - Mental flexibility

#### 1.3 Personality Assessment
- **Description**: AI-driven personality analysis for career path recommendations
- **Component**: `PersonalityAssessmentPage.jsx`
- **Assessment Dimensions**:
  - Work style preferences
  - Communication style
  - Learning preferences
  - Leadership qualities
  - Team collaboration

### 2. AI-Powered Career Roadmaps

#### 2.1 ML-Based Skill Assessment
- **Input Sources**:
  - Resume analysis
  - Test performance
  - Work experience
  - Educational background
- **Processing**: Python ML models analyze and extract skills
- **Model**: `careerRoadmapModel.py`

#### 2.2 Dynamic Roadmap Generation
- **Features**:
  - Step-by-step learning path
  - Resource recommendations (courses, certifications)
  - Timeline estimation
  - Skill dependencies visualization
- **Components**:
  - `PersonalizedRoadmap.jsx` - Roadmap display
  - `CareerPathway.jsx` - Career path selection
  - `RoadmapContext.jsx` - State management
- **Backend**: `careerRoadmapController.js`

### 3. Skill Enhancements with Gen AI

#### 3.1 Market Trend Analysis
- **Data Sources**:
  - Industry reports
  - Job posting analysis
  - Skill demand forecasting
- **Component**: `MarketInsights.jsx`
- **Data Store**: `industryTrends.json`

#### 3.2 AI Learning Assistant
- **Features**:
  - PDF summarization
  - Video content summarization
  - Article summarization
- **Technology**: 
  - LangChain for document processing
  - OpenAI/Groq for summarization
  - FAISS for semantic search
- **Component**: `Consultant.jsx` (AI chat assistant)

### 4. Smart Resume Builder & Enhancer

#### 4.1 Resume Analysis
- **Features**:
  - ATS optimization
  - Keyword suggestions
  - Industry-specific recommendations
  - Format optimization
- **Component**: `ResumeAnalyzer.jsx`
- **Service**: `resumeAnalysisService.js`
- **AI Model**: `resumeEnhancerModel.py`

#### 4.2 Resume Generation
- **Features**:
  - PDF generation with jsPDF
  - Multiple templates
  - Real-time preview
  - Download functionality

### 5. Mock Interviews & AI Feedback

#### 5.1 Interview Bot
- **Separate Next.js Application**: `mockInterview/`
- **Features**:
  - AI-generated interview questions
  - Speech-to-text for answers
  - Video recording capability
  - Real-time feedback
- **Technology**:
  - Google Gemini for question generation
  - React Webcam for video recording
  - Speech-to-text for answer transcription
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Authentication**: Clerk

#### 5.2 Interview Feedback System
- **Analysis Dimensions**:
  - Answer quality
  - Communication clarity
  - Confidence level
  - Technical accuracy
  - Areas for improvement
- **Components**:
  - `InterviewSetup.jsx` - Configure interview
  - `InterviewStart.jsx` - Conduct interview
  - `InterviewFeedback.jsx` - View results
- **Backend**: `interviewController.js`
- **Service**: `interviewFeedbackService.js`
- **AI Model**: `interviewFeedbackModel.py`

### 6. Personalized Job & Internship Recommendations

#### 6.1 Job Matching Algorithm
- **Matching Criteria**:
  - Skills match
  - Experience level
  - Location preferences
  - Salary expectations
  - Career goals
- **Technology**: ML-based similarity scoring
- **Service**: `jobMatchingService.js`
- **AI Model**: `jobRecommendationModel.py`

#### 6.2 Job Portal
- **Features**:
  - Job listings
  - Application tracking
  - Saved jobs
  - Job recommendations
- **Context**: `JobContext.jsx`
- **Backend**: `jobRecommendationController.js`

### 7. Community & Peer Learning

#### 7.1 Discussion Forums
- **Features**:
  - Topic-based discussions
  - AI-powered content moderation
  - Discussion summarization
  - Upvoting/downvoting
- **Component**: `CommunityPage.jsx`
- **Backend**: `communityController.js`
- **Service**: `communityService.js`
- **Model**: `discussionModel.js`

#### 7.2 Leaderboard & Gamification
- **Features**:
  - User rankings
  - Achievement badges
  - Points system
  - Challenges and contests
- **Component**: `Leaderboard.jsx`

#### 7.3 Mentorship Platform
- **Features**:
  - Find mentors
  - Mentor profiles
  - Mentorship requests
  - Session scheduling
- **Components**:
  - `MentorMania.jsx` - Find mentors
  - `BecomeMentor.jsx` - Register as mentor

### 8. Additional Features

#### 8.1 Certificate Generation
- **Component**: `CertificateGenerator.jsx`
- **Technology**: Canvas API for certificate design
- **Trigger**: Course/assessment completion

#### 8.2 User Dashboard
- **Component**: `Dashboard.jsx`
- **Features**:
  - Progress overview
  - Recent activities
  - Upcoming tasks
  - Statistics and charts

#### 8.3 Settings & Profile
- **Component**: `settings.jsx`
- **Features**:
  - Profile management
  - Preferences
  - Privacy settings
  - Notification settings

---

## Backend Implementation

### Server Architecture

#### Entry Point: server.js
```javascript
// Key components:
- Express application setup
- MongoDB connection
- CORS configuration for http://localhost:5173
- Cookie parser middleware
- Routes registration:
  * /api/auth - Authentication
  * /api/user - User management
  * /api/interview - Interview operations
```

### Authentication System

#### Registration Flow
1. User submits name, email, password
2. Password hashed with bcrypt (12 salt rounds)
3. User record created in MongoDB
4. JWT token generated (7-day expiry)
5. Token stored in HTTP-only cookie
6. 6-digit OTP generated for email verification
7. Verification email sent via Nodemailer

#### Login Flow
1. Email and password validation
2. Password verification with bcrypt
3. JWT token generation
4. Cookie-based session management

#### Email Verification
- OTP-based verification
- 24-hour expiry window
- Template-based emails (EMAIL_VERIFY_TEMPLATE)

#### Password Reset
- OTP-based reset flow
- Secure token generation
- Template-based reset emails (PASSWORD_RESET_TEMPLATE)

### Controllers

#### authController.js
- `register()` - User registration
- `login()` - User authentication
- `logout()` - Session termination
- `sendVerifyOtp()` - Email verification OTP
- `verifyEmail()` - Email verification confirmation
- `isAuthenticated()` - Auth status check
- `sendResetOtp()` - Password reset OTP
- `resetPassword()` - Password update

#### interviewController.js
- `createMockInterview()` - Generate interview questions
- `getMockInterviewQuestion()` - Retrieve questions
- `addUserAnswer()` - Save user responses
- `getFeedback()` - AI-generated feedback
- Uses Google Gemini or Ollama for question generation
- JSON parsing with error handling

#### Other Controllers
- **assessmentController.js**: Test management
- **careerRoadmapController.js**: Roadmap generation
- **communityController.js**: Forum operations
- **jobRecommendationController.js**: Job matching
- **resumeController.js**: Resume operations
- **skillEnhancementController.js**: Skill tracking
- **userController.js**: User profile management

### Services Layer

#### skillAnalysisService.js
- Skill extraction from resumes
- Skill gap analysis
- Skill trend analysis

#### resumeAnalysisService.js
- ATS compatibility check
- Keyword optimization
- Format recommendations

#### jobMatchingService.js
- Candidate-job similarity scoring
- Recommendation algorithm
- Filtering and ranking

#### interviewFeedbackService.js
- Answer quality assessment
- Communication analysis
- Improvement suggestions

#### communityService.js
- Content moderation
- Discussion summarization
- Trending topics identification

### Database Models (MongoDB)

#### userModel.js
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  verifyOtp: String,
  verifyOtpExpireAt: Number,
  isAccountVerified: Boolean,
  resetOtp: String,
  resetOtpExpireAt: Number
}
```

#### Other Models
- **assessmentModel.js**: Test records and scores
- **careerRoadmapModel.js**: Generated roadmaps
- **discussionModel.js**: Forum posts and replies
- **interviewModel.js**: Interview sessions
- **jobModel.js**: Job listings
- **mockInterviewModel.js**: Mock interview data
- **QuestionBank.js**: Assessment questions
- **resumeModel.js**: Resume data and analysis
- **skillModel.js**: Skill definitions and metadata
- **userAnswerModel.js**: User test responses

### Middleware

#### userAuth.js
- JWT token validation
- User authentication verification
- Request authorization

#### errorHandler.js
- Centralized error handling
- Error logging
- User-friendly error messages

### Configuration

#### mongodb.js
- MongoDB connection setup
- Connection pooling
- Error handling

#### nodemailer.js
- SMTP configuration
- Email service setup
- Transport configuration

#### emailTemplates.js
- EMAIL_VERIFY_TEMPLATE: Email verification HTML
- PASSWORD_RESET_TEMPLATE: Password reset HTML

---

## Frontend Implementation

### Application Structure

#### Main Application (App.jsx)
- React Router setup
- Conditional Sidebar rendering
- Toast notifications
- Route definitions for:
  - Public pages (Home, Login, Email Verification)
  - Dashboard pages
  - Interview pages
  - Assessment pages
  - Cognitive games

### State Management

#### Context Providers

**UserContext.jsx**
- User authentication state
- User profile data
- Login/logout operations

**JobContext.jsx**
- Job listings
- Saved jobs
- Application status

**RoadmapContext.jsx**
- Current roadmap
- Progress tracking
- Milestone completion

**SkillContext.jsx**
- User skills
- Skill levels
- Learning progress

**TestContext.jsx**
- Test results
- Test history
- Performance analytics

**NotificationContext.jsx**
- Notification list
- Read/unread status
- Notification actions

### Custom Hooks

#### useAuth.js
- Authentication state management
- Login/logout functions
- Token refresh logic

#### useJobs.js
- Job fetching
- Job filtering
- Application management

#### useSkills.js
- Skill CRUD operations
- Skill progress tracking

#### useTests.js
- Test management
- Result retrieval

#### useCommunity.js
- Forum operations
- Post creation
- Comment management

### Page Components

#### Dashboard Pages

**Dashboard.jsx** - Overview
- Statistics cards
- Recent activities
- Quick actions
- Progress charts

**Interview.jsx** - Interview hub
- Mock interview list
- Create new interview
- Past interviews

**ResumeAnalyzer.jsx** - Resume tool
- Upload resume
- AI analysis
- Improvement suggestions

**Consultant.jsx** - AI assistant
- Chat interface
- Context-aware responses
- Document Q&A

**CareerPathway.jsx** - Career exploration
- Career options
- Path comparison
- Requirements display

**CommunityPage.jsx** - Forum
- Discussion threads
- Post creation
- Community interaction

**MarketInsights.jsx** - Industry trends
- Skill demand graphs
- Salary trends
- Job market analysis

**settings.jsx** - User settings
- Profile editing
- Preferences
- Privacy controls

#### Assessment Pages

**TechnicalTestPage.jsx**
- Test selection
- Test instructions
- Start test

**AdaptiveTechnicalTest.jsx**
- Question display
- Answer submission
- Progress tracking
- Timer

**TechnicalTestResultPage.jsx**
- Score display
- Answer review
- Performance analysis

**CognitiveTest.jsx**
- Cognitive game selection
- Instructions
- Game launcher

**PersonalityAssessmentPage.jsx**
- Personality questions
- Progress indicator
- Submit assessment

#### Cognitive Games

**SpotOn.jsx**
- Pattern recognition game
- Timed challenges
- Score tracking

**BrainSwitch.jsx**
- Task-switching game
- Multi-level difficulty
- Performance metrics

#### Interview Pages

**InterviewSetup.jsx**
- Job details input
- Interview configuration
- Question preview

**InterviewStart.jsx**
- Video recording
- Question display
- Answer recording
- Timer

**InterviewFeedback.jsx**
- Overall score
- Question-wise feedback
- Improvement tips
- Performance graphs

#### Other Pages

**PersonalizedRoadmap.jsx**
- Visual roadmap
- Milestone tracking
- Resource links
- Progress updates

**MentorMania.jsx**
- Mentor directory
- Filter mentors
- Request mentorship

**BecomeMentor.jsx**
- Mentor registration
- Profile creation
- Availability setting

**Leaderboard.jsx**
- User rankings
- Filter options
- Achievement display

### Component Architecture

#### Dashboard Components

**Sidebar** (`dash-common/Sidebar.jsx`)
- Navigation menu
- User profile preview
- Active route highlighting
- Responsive design

**Dashboard Cards**
- Statistics display
- Quick metrics
- Visual indicators

**Charts**
- Chart.js integration
- Performance graphs
- Trend visualization

#### UI Components

Located in `components/ui/`:
- Reusable Radix UI primitives
- Shadcn UI components
- Buttons, cards, dialogs
- Form elements

### Styling System

#### Tailwind CSS Configuration
- Custom color palette
- Responsive breakpoints
- Custom animations
- Dark mode support (if implemented)

#### CSS Structure
- `index.css` - Global styles
- Component-specific styles
- Tailwind utilities
- Custom CSS variables

---

## AI/ML Models

### Python AI Models (WCareers/)

#### Directory Structure
```
WCareers/
├── 2_learning_pathway/    # Learning path generation algorithms
├── 4_job_search/          # Job matching and recommendation
├── ai_wcareer.py          # Main orchestration script
└── requirements.txt       # Python dependencies
```

#### Technology Stack
- **Streamlit**: Web interface for AI models
- **LangChain**: LLM orchestration framework
- **OpenAI/Groq**: Language model APIs
- **Sentence Transformers**: Text embeddings
- **FAISS**: Vector similarity search
- **Pandas**: Data manipulation
- **PyPDF/BeautifulSoup**: Document processing

### AI Model Functions

#### 1. Career Roadmap Generation
**File**: `ai_models/careerRoadmapModel.py`

**Purpose**: Generate personalized career learning paths

**Inputs**:
- Current skills
- Target role
- Experience level
- Time commitment

**Process**:
1. Skill gap analysis
2. Resource discovery
3. Path optimization
4. Timeline estimation

**Output**: Structured roadmap with milestones

#### 2. Skill Assessment
**File**: `ai_models/skillAssessmentModel.py`

**Purpose**: Evaluate user skills from various inputs

**Inputs**:
- Resume text
- Test results
- Project portfolio

**Process**:
1. NLP-based skill extraction
2. Proficiency level estimation
3. Skill categorization
4. Market relevance scoring

**Output**: Skill inventory with proficiency levels

#### 3. Job Recommendation
**File**: `ai_models/jobRecommendationModel.py`

**Purpose**: Match users with relevant job opportunities

**Inputs**:
- User profile
- Skill set
- Preferences
- Job database

**Process**:
1. Feature engineering
2. Similarity calculation
3. Ranking algorithm
4. Filtering logic

**Output**: Ranked job recommendations

#### 4. Resume Enhancement
**File**: `ai_models/resumeEnhancerModel.py`

**Purpose**: Optimize resumes for ATS and recruiters

**Inputs**:
- Resume document
- Target job description

**Process**:
1. Keyword extraction
2. Format analysis
3. Content optimization
4. ATS compatibility check

**Output**: Enhancement suggestions and rewritten content

#### 5. Interview Feedback
**File**: `ai_models/interviewFeedbackModel.py`

**Purpose**: Analyze interview performance

**Inputs**:
- Interview transcript
- Questions asked
- Expected answers

**Process**:
1. Answer quality assessment
2. Completeness check
3. Technical accuracy verification
4. Communication style analysis

**Output**: Detailed feedback with scores

### LLM Integration

#### Google Gemini AI
**Usage**:
- Interview question generation
- Content summarization
- Conversational AI assistant
- Resume analysis

**Configuration**:
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(API_KEY);
```

#### LangChain Framework
**Usage**:
- Document Q&A
- RAG (Retrieval Augmented Generation)
- Multi-step reasoning
- Content processing pipeline

**Components**:
- **Text Splitters**: Document chunking
- **Embeddings**: Semantic search (Hugging Face)
- **Vector Stores**: FAISS for fast retrieval
- **Chains**: Sequential processing

### Vector Database (FAISS)

**Purpose**: Fast similarity search for:
- Document retrieval
- Skill matching
- Job recommendations

**Implementation**:
```python
from langchain_huggingface import HuggingFaceEmbeddings
from faiss import FAISS

embeddings = HuggingFaceEmbeddings()
vector_store = FAISS.from_documents(docs, embeddings)
```

---

## Database Schema

### MongoDB Collections

#### users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  verifyOtp: String,
  verifyOtpExpireAt: Number,
  isAccountVerified: Boolean,
  resetOtp: String,
  resetOtpExpireAt: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### mockInterviews Collection
```javascript
{
  _id: ObjectId,
  mockId: String (UUID),
  userEmail: String,
  jobPosition: String,
  jobDesc: String,
  jobExperience: Number,
  questions: [{
    question: String,
    answer: String
  }],
  createdAt: Date
}
```

#### userAnswers Collection
```javascript
{
  _id: ObjectId,
  mockId: String,
  questionIndex: Number,
  question: String,
  userAnswer: String,
  feedback: String,
  rating: Number,
  createdAt: Date
}
```

#### assessments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  assessmentType: String (technical/cognitive/personality),
  questions: Array,
  answers: Array,
  score: Number,
  timeTaken: Number,
  completedAt: Date
}
```

#### careerRoadmaps Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  targetRole: String,
  currentSkills: Array,
  requiredSkills: Array,
  milestones: [{
    title: String,
    description: String,
    resources: Array,
    duration: String,
    completed: Boolean
  }],
  progress: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  description: String,
  requirements: Array,
  location: String,
  salary: Object,
  type: String (fulltime/parttime/internship),
  postedDate: Date,
  expiryDate: Date
}
```

#### resumes Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  content: Object,
  analysis: {
    atsScore: Number,
    keywords: Array,
    suggestions: Array
  },
  version: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### discussions Collection
```javascript
{
  _id: ObjectId,
  authorId: ObjectId (ref: users),
  title: String,
  content: String,
  category: String,
  tags: Array,
  upvotes: Number,
  replies: [{
    authorId: ObjectId,
    content: String,
    upvotes: Number,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### skills Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  relatedSkills: Array,
  demandTrend: Number,
  averageSalary: Number,
  resources: Array
}
```

### Neo4j Graph Database (Planned)

#### Skill Graph
```cypher
// Nodes
(Skill {name, category, difficulty, demand})
(Job {title, industry})
(Certification {name, provider, duration})
(Course {title, platform, duration})

// Relationships
(Skill)-[:REQUIRES]->(Skill)
(Skill)-[:LEADS_TO]->(Job)
(Skill)-[:CERTIFIED_BY]->(Certification)
(Skill)-[:LEARNED_FROM]->(Course)
(Job)-[:REQUIRES]->(Skill)
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/logout` | User logout | Yes |
| POST | `/send-verify-otp` | Send verification OTP | Yes |
| POST | `/verify-email` | Verify email with OTP | Yes |
| GET | `/is-auth` | Check auth status | Yes |
| POST | `/send-reset-otp` | Send password reset OTP | No |
| POST | `/reset-password` | Reset password | No |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update profile | Yes |
| GET | `/dashboard` | Get dashboard data | Yes |

### Interview Routes (`/api/interview`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Create mock interview | Yes |
| GET | `/:mockId` | Get interview questions | Yes |
| POST | `/answer` | Submit answer | Yes |
| GET | `/:mockId/feedback` | Get feedback | Yes |
| GET | `/user-interviews` | List user interviews | Yes |

### Assessment Routes (`/api/assessment`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/start` | Start assessment | Yes |
| POST | `/submit` | Submit assessment | Yes |
| GET | `/results/:id` | Get results | Yes |
| GET | `/history` | Get test history | Yes |

### Career Roadmap Routes (`/api/career-roadmap`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/generate` | Generate roadmap | Yes |
| GET | `/:id` | Get roadmap | Yes |
| PUT | `/:id/milestone` | Update milestone | Yes |
| GET | `/user-roadmaps` | List user roadmaps | Yes |

### Job Recommendation Routes (`/api/job`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/recommendations` | Get job recommendations | Yes |
| GET | `/search` | Search jobs | No |
| POST | `/save` | Save job | Yes |
| GET | `/saved` | Get saved jobs | Yes |
| POST | `/apply` | Apply to job | Yes |

### Resume Routes (`/api/resume`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload` | Upload resume | Yes |
| POST | `/analyze` | Analyze resume | Yes |
| GET | `/:id` | Get resume | Yes |
| PUT | `/:id` | Update resume | Yes |
| POST | `/enhance` | Get enhancement suggestions | Yes |

### Skill Enhancement Routes (`/api/skill`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/trending` | Get trending skills | No |
| GET | `/recommendations` | Get skill recommendations | Yes |
| POST | `/track` | Track skill progress | Yes |
| GET | `/graph` | Get skill graph | Yes |

### Community Routes (`/api/community`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/discussions` | List discussions | No |
| POST | `/discussions` | Create discussion | Yes |
| GET | `/discussions/:id` | Get discussion | No |
| POST | `/discussions/:id/reply` | Reply to discussion | Yes |
| POST | `/discussions/:id/upvote` | Upvote discussion | Yes |
| GET | `/leaderboard` | Get leaderboard | No |

---

## User Flow

### New User Journey

```
1. Landing Page (Home.jsx)
   ↓
2. Sign Up (Login.jsx - Register)
   ↓
3. Email Verification (EmailVerify.jsx)
   ↓
4. Dashboard (Dashboard.jsx)
   ↓
5. Profile Setup / Initial Assessment
   ↓
6. Take Assessments:
   - Technical Test
   - Cognitive Test
   - Personality Assessment
   ↓
7. AI Generates Personalized Roadmap
   ↓
8. User Explores Features:
   - View Roadmap
   - Browse Jobs
   - Practice Interviews
   - Enhance Resume
   - Join Community
```

### Assessment Flow

```
User selects assessment type
   ↓
TechnicalTestPage.jsx (Instructions)
   ↓
AdaptiveTechnicalTest.jsx (Take Test)
   - Questions adapt based on performance
   - Timer tracks duration
   - Answers saved in real-time
   ↓
Submit Assessment
   ↓
TechnicalTestResultPage.jsx (Results)
   - Score display
   - Performance analysis
   - Skill breakdown
   - Recommendations
   ↓
Results saved to database
   ↓
Dashboard updated with new data
```

### Interview Preparation Flow

```
Dashboard → Interview Section
   ↓
Interview.jsx (Mock Interview List)
   ↓
Create New Interview
   ↓
InterviewSetup.jsx
   - Enter job details
   - Job position
   - Job description
   - Experience level
   ↓
AI Generates Questions (Backend)
   - Google Gemini/Ollama
   - 5-10 tailored questions
   ↓
InterviewStart.jsx
   - Camera/Mic setup
   - Question display
   - Answer recording (text/video)
   - Timer
   ↓
Submit All Answers
   ↓
AI Analyzes Responses
   - Quality assessment
   - Technical accuracy
   - Communication evaluation
   ↓
InterviewFeedback.jsx
   - Overall score
   - Question-wise feedback
   - Strengths & weaknesses
   - Improvement tips
```

### Career Roadmap Flow

```
Complete Assessments
   ↓
Dashboard → Career Pathway
   ↓
CareerPathway.jsx
   - Select target role
   - View role requirements
   - See similar paths
   ↓
Generate Roadmap (AI Backend)
   - Skill gap analysis
   - Resource compilation
   - Milestone creation
   - Timeline estimation
   ↓
PersonalizedRoadmap.jsx
   - Visual roadmap display
   - Milestone list
   - Progress tracking
   - Resource links
   ↓
User Follows Roadmap
   - Complete milestones
   - Track progress
   - Update skills
   ↓
Dashboard Reflects Progress
```

### Job Search Flow

```
Dashboard → Job Recommendations
   ↓
AI Analyzes User Profile
   - Skills
   - Experience
   - Preferences
   - Test scores
   ↓
Job Matching Algorithm
   - Similarity scoring
   - Ranking
   - Filtering
   ↓
Display Recommended Jobs
   - Job cards
   - Match percentage
   - Quick apply
   ↓
User Actions:
   - View details
   - Save job
   - Apply
   - Share
   ↓
Track Application Status
```

---

## Setup and Installation

### Prerequisites

- **Node.js**: v18+ 
- **npm**: v9+
- **MongoDB**: v6+
- **Python**: v3.9+
- **Git**: Latest version

### Environment Variables

#### Backend (.env in /server)
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/wcareer
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/wcareer

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# AI API Keys
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
OLLAMA_URL=http://localhost:11434 (if using Ollama)

# Server
PORT=3000
NODE_ENV=development
```

#### Frontend (.env in /client)
```env
VITE_API_URL=http://localhost:3000/api
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### Mock Interview (.env in /mockInterview)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

NEXT_PUBLIC_DRIZZLE_DATABASE_URL=your_neon_db_url

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

#### Python AI (.env in /WCareers)
```env
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
```

### Installation Steps

#### 1. Clone Repository
```bash
git clone https://github.com/Sameer-Bagul/Wcareer.git
cd Wcareer
```

#### 2. Backend Setup
```bash
cd server
npm install
# Create .env file with required variables
npm run dev
# Server runs on http://localhost:3000
```

#### 3. Frontend Setup
```bash
cd ../client
npm install
# Create .env file
npm run dev
# Frontend runs on http://localhost:5173
```

#### 4. Mock Interview Setup (Optional)
```bash
cd ../mockInterview
npm install
# Create .env file
# Setup Drizzle ORM:
npm run db:push
# Run development server:
npm run dev
# Runs on http://localhost:3001 (or next available port)
```

#### 5. Python AI Setup
```bash
cd ../WCareers
pip install -r requirements.txt
# Create .env file
# Run Streamlit app:
streamlit run ai_wcareer.py
```

### Database Setup

#### MongoDB
```bash
# Local MongoDB
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env accordingly
```

#### Drizzle (for Mock Interview)
```bash
cd mockInterview
npm run db:push  # Push schema to Neon database
npm run db:studio  # Open Drizzle Studio (database GUI)
```

### Running the Full Stack

#### Terminal 1: Backend
```bash
cd server
npm run dev
```

#### Terminal 2: Frontend
```bash
cd client
npm run dev
```

#### Terminal 3: Python AI (Optional)
```bash
cd WCareers
streamlit run ai_wcareer.py
```

#### Terminal 4: Mock Interview (Optional)
```bash
cd mockInterview
npm run dev
```

### Access Points
- **Main App**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Mock Interview**: http://localhost:3001
- **Python AI**: http://localhost:8501

---

## Development Guidelines

### Code Style

#### JavaScript/React
- Use ES6+ syntax
- Functional components with hooks
- Destructuring for props
- Meaningful variable names
- Comments for complex logic

#### Python
- PEP 8 style guide
- Type hints where applicable
- Docstrings for functions
- Modular code structure

### Git Workflow

#### Branch Naming
```
feature/feature-name
bugfix/bug-description
hotfix/critical-fix
refactor/component-name
```

#### Commit Messages
```
feat: Add user authentication
fix: Resolve interview feedback bug
docs: Update API documentation
refactor: Optimize roadmap generation
style: Format code with prettier
test: Add unit tests for controllers
```

### Component Structure

#### React Components
```jsx
// Imports
import React, { useState, useEffect } from 'react';

// Component
const ComponentName = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Handlers
  const handleAction = () => {
    // Logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### API Development

#### Controller Pattern
```javascript
export const controllerFunction = async (req, res) => {
  try {
    // Extract data
    const { param } = req.body;
    
    // Validate
    if (!param) {
      return res.json({ 
        success: false, 
        message: "Validation error" 
      });
    }
    
    // Business logic
    const result = await service.doSomething(param);
    
    // Response
    return res.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error(error);
    return res.json({ 
      success: false, 
      message: error.message 
    });
  }
};
```

### Testing

#### Frontend Testing
```bash
# Add testing libraries
npm install --save-dev @testing-library/react vitest
```

#### Backend Testing
```bash
# Add testing libraries
npm install --save-dev jest supertest
```

### Security Best Practices

1. **Authentication**: JWT with HTTP-only cookies
2. **Password Storage**: bcrypt with salt rounds
3. **Input Validation**: Validate all user inputs
4. **CORS**: Restrict to specific origins
5. **Environment Variables**: Never commit .env files
6. **SQL Injection**: Use parameterized queries
7. **XSS Protection**: Sanitize user content
8. **Rate Limiting**: Implement for API endpoints

---

## Future Enhancements

### Planned Features

#### 1. Advanced AI Features
- **Voice Analysis**: Real-time speech analysis during mock interviews
- **Emotion Detection**: Facial expression analysis for confidence assessment
- **Code Review AI**: Automated code quality assessment
- **Writing Assistant**: AI-powered cover letter and email generator

#### 2. Learning Features
- **Live Webinars**: Integration with video conferencing
- **Interactive Coding**: In-browser code editor with AI hints
- **Quiz Competitions**: Multiplayer competitive assessments
- **Virtual Labs**: Hands-on practice environments

#### 3. Social Features
- **Study Groups**: Create and join learning groups
- **Pair Programming**: Collaborative coding sessions
- **Mentor Matching**: AI-based mentor-mentee pairing
- **Success Stories**: User testimonials and case studies

#### 4. Career Features
- **Salary Negotiation Coach**: AI-powered negotiation guidance
- **Company Culture Match**: Match personality with company culture
- **Career Simulator**: Predict career trajectory
- **Portfolio Builder**: Visual portfolio creation tool

#### 5. Gamification
- **Achievement Badges**: Unlock badges for milestones
- **Skill Trees**: Visual skill progression system
- **Daily Challenges**: Streak-based learning challenges
- **Competitions**: Regular hackathons and contests

#### 6. Mobile Application
- **React Native App**: iOS and Android mobile apps
- **Progressive Web App**: Offline-capable web app
- **Push Notifications**: Mobile alerts for opportunities

#### 7. Enterprise Features
- **University Partnerships**: Institutional licenses
- **Recruiter Dashboard**: Direct hiring platform
- **Analytics Dashboard**: Institution-wide analytics
- **White Label Solution**: Customizable branding

### Technical Improvements

#### 1. Performance Optimization
- **Code Splitting**: Lazy loading for routes
- **Image Optimization**: WebP format, lazy loading
- **Caching Strategy**: Redis for API responses
- **CDN Integration**: Static asset delivery

#### 2. Scalability
- **Microservices**: Break monolith into services
- **Load Balancing**: Distribute traffic across servers
- **Database Sharding**: Horizontal scaling
- **Message Queue**: RabbitMQ/Redis for async tasks

#### 3. DevOps
- **CI/CD Pipeline**: Automated testing and deployment
- **Docker Containers**: Containerized deployment
- **Kubernetes**: Orchestration for scaling
- **Monitoring**: Logging and error tracking (Sentry, LogRocket)

#### 4. Testing
- **Unit Tests**: Comprehensive test coverage
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User flow automation
- **Load Testing**: Performance benchmarking

### Timeline

#### Phase 1 (Q1 2024) - Core Stabilization
- Bug fixes and performance optimization
- Complete all existing features
- Mobile responsiveness
- Basic analytics

#### Phase 2 (Q2 2024) - AI Enhancement
- Advanced interview feedback
- Voice and emotion analysis
- Improved roadmap generation
- Better job matching

#### Phase 3 (Q3 2024) - Social Features
- Community enhancements
- Mentorship platform
- Study groups
- Live events

#### Phase 4 (Q4 2024) - Enterprise & Mobile
- Mobile apps
- Enterprise dashboard
- University partnerships
- Recruiter platform

---

## Contributing

### How to Contribute

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Setup for Contributors

1. Follow installation steps above
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit PR with description

### Code Review Process

1. PR submitted
2. Automated tests run
3. Code review by maintainers
4. Feedback and revisions
5. Approval and merge

---

## Support and Contact

### Documentation
- **GitHub**: https://github.com/Sameer-Bagul/Wcareer
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: GitHub Discussions for questions

### Team
- **Project Lead**: Sameer Bagul
- **GitHub**: @Sameer-Bagul

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- **Google Gemini AI**: For providing generative AI capabilities
- **OpenAI**: For advanced language models
- **MongoDB**: For database solutions
- **React Team**: For the amazing frontend framework
- **Next.js Team**: For the hybrid React framework
- **LangChain**: For LLM orchestration tools
- **Open Source Community**: For various libraries and tools

---

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Core authentication system
- Assessment modules (Technical, Cognitive, Personality)
- Mock interview with AI feedback
- Career roadmap generation
- Job recommendations
- Resume analyzer
- Community forums
- Leaderboard and gamification
- Market insights dashboard

---

## FAQ

**Q: What technologies does WCareers use?**
A: React (Vite) for frontend, Node.js (Express) for backend, MongoDB for database, Python for AI models, and Google Gemini for generative AI.

**Q: Is the platform free to use?**
A: Currently, the platform is in development. Pricing will be announced upon release.

**Q: How accurate are the AI assessments?**
A: The AI models are trained on extensive datasets and continuously improved based on user feedback. However, they should be used as guidance alongside human judgment.

**Q: Can I contribute to the project?**
A: Yes! Check the Contributing section for guidelines.

**Q: What's the difference between the main client and mock interview apps?**
A: The main client is the comprehensive platform, while the mock interview app is a specialized Next.js application with advanced features like Clerk authentication and PostgreSQL for interview-specific functionality.

**Q: How is user data protected?**
A: We use industry-standard security practices including password hashing, JWT authentication, HTTP-only cookies, and secure data transmission.

---

## Appendix

### Glossary

- **ATS**: Applicant Tracking System
- **LLM**: Large Language Model
- **NLP**: Natural Language Processing
- **ORM**: Object-Relational Mapping
- **JWT**: JSON Web Token
- **RAG**: Retrieval Augmented Generation
- **API**: Application Programming Interface
- **CORS**: Cross-Origin Resource Sharing
- **OTP**: One-Time Password

### Resources

#### Learning Resources
- React Documentation: https://react.dev
- Node.js Guides: https://nodejs.org/docs
- MongoDB Manual: https://docs.mongodb.com
- LangChain Docs: https://docs.langchain.com

#### Tools
- VS Code: Code editor
- Postman: API testing
- MongoDB Compass: Database GUI
- Mongoose: MongoDB Atlas ORM
---

**Document Version**: 1.0  
**Last Updated**: November 27, 2025  
**Maintained By**: WCareers Development Team
