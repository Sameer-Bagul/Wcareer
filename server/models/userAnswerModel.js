import mongoose from 'mongoose';

const userAnswerSchema = new mongoose.Schema({
    mockIdRef: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correctAns: {
        type: String
    },
    userAns: {
        type: String
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    keywords: [{
        type: String
    }],
    matchedKeywords: [{
        type: String
    }],
    keywordScore: {
        type: Number,
        default: 0
    },
    scoreBreakdown: {
        keywordMatch: { type: Number, default: 0 },
        answerLength: { type: Number, default: 0 },
        structure: { type: Number, default: 0 },
        technicalTerms: { type: Number, default: 0 },
        completeness: { type: Number, default: 0 }
    },
    userEmail: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: () => new Date().toISOString().split('T')[0].split('-').reverse().join('-')
    }
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

export default UserAnswer;