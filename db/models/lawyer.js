const mongoose = require('mongoose')

const LawyerSchema = new mongoose.Schema({
    name: {
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
    password: {
        type: String,
        required: true
    },
    assign: {
        type: [String]
    }
})


module.exports = mongoose.model('Lawyer', LawyerSchema)