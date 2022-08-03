const mongoose = require('mongoose')

const AOPSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    filesData: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('AOP', AOPSchema)