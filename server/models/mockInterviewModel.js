import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    keywords: [{
        type: String
    }]
});

const mockInterviewSchema = new mongoose.Schema({
    mockId: {
        type: String,
        required: true,
        unique: true
    },
    jsonMockResp: [questionSchema], // Now an array of question objects with keywords
    jobPosition: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
        required: true
    },
    jobExperience: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: () => new Date().toISOString().split('T')[0].split('-').reverse().join('-')
    }
});

const MockInterview = mongoose.model('MockInterview', mockInterviewSchema);

export default MockInterview;