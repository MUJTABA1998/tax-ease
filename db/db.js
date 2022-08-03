const mongoose = require('mongoose')

const MONGO_URI = 'mongodb+srv://gmgoc:1998@cluster0.lyzyl.mongodb.net/TAX-EASE-DB?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology:true
        })

        console.log(`DB Connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error --> ${error} `)
    }
}


module.exports = connectDB;