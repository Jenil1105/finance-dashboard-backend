const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },

    category: {
        type: String,
        default: 'Other'
    },

    date: {
        type: Date,
        default: Date.now
    },

    note: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Record', recordSchema);