const mongoose = require('mongoose')

const SoleSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Sole', SoleSchema)