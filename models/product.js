const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    nama: {type: String, required: true},
    desc: {type: String, required: true},
    gambar: {type: String, required: true},
    rating: {type: String, required: true},
    stock: {type: String, required: true},
    category: { type: String, required: true},
    harga: {type: String, required: true}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product