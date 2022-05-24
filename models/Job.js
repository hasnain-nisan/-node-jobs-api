const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide a position']
    },
    status: {
        type: String,
        enum: ['interview', 'decline', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Job', jobSchema)