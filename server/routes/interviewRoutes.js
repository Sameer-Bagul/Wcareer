import express from 'express';
import {
    createMockInterview,
    getInterviewDetails,
    getUserInterviews,
    saveUserAnswer,
    getInterviewFeedback,
    getUserAnswers
} from '../controllers/interviewController.js';
// import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create new mock interview
router.post('/create', createMockInterview); // userAuth,

// Get interview details
router.get('/:mockId', getInterviewDetails); // userAuth,

// Get all interviews for a user
router.get('/user/:userEmail', getUserInterviews); // userAuth,

// Save user answer
router.post('/answer', saveUserAnswer); // userAuth,

// Get interview feedback
router.get('/:mockId/feedback', getInterviewFeedback); // userAuth,

// Get user answers for interview
router.get('/:mockId/answers', getUserAnswers); // userAuth,

export default router;
