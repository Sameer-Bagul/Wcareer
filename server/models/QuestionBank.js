const mongoose = require('mongoose');

const QuestionBankSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  
  answer: {
    type: String,
    required: [true, 'Answer text is required'],
    trim: true
  },

  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },

  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true
  },

  subtopic: {
    type: String,
    trim: true
  },

  labels: [{
    type: String,
    trim: true
  }],

  type: {
    type: String,
    enum: ['multiple-choice', 'coding', 'theoretical', 'behavioral'],
    required: [true, 'Question type is required']
  },

  options: [{
    text: String,
    isCorrect: Boolean
  }],

  codeSnippet: {
    language: String,
    code: String
  },

  hints: [{
    type: String,
    trim: true
  }],

  explanation: {
    type: String,
    trim: true
  },

  metadata: {
    timeEstimate: Number, // in minutes
    points: {
      type: Number,
      default: 1
    },
    successRate: {
      type: Number,
      default: 0
    },
    timesAsked: {
      type: Number,
      default: 0
    }
  },

  relatedResources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['article', 'video', 'documentation', 'other']
    }
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for improved search performance
QuestionBankSchema.index({ topic: 1, difficulty: 1, type: 1 });
QuestionBankSchema.index({ labels: 1 });

// Method to increment times asked and update success rate
QuestionBankSchema.methods.updateStats = function(wasCorrect) {
  this.metadata.timesAsked += 1;
  if (this.metadata.timesAsked === 1) {
    this.metadata.successRate = wasCorrect ? 100 : 0;
  } else {
    this.metadata.successRate = (
      (this.metadata.successRate * (this.metadata.timesAsked - 1) + (wasCorrect ? 100 : 0)) / 
      this.metadata.timesAsked
    );
  }
  return this.save();
};

const QuestionBank = mongoose.model('QuestionBank', QuestionBankSchema);

module.exports = QuestionBank;
