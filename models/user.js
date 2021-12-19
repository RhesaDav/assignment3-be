const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    nama: {type: String,min: 2, required: true},
    email: {type: String, required: true},
    password: {type: String, min: 5, required: true},
}, {timestamp: true})

const User = mongoose.model('User', userSchema)

module.exports = User