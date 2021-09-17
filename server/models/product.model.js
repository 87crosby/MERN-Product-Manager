const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Name is required!"],
        minlength: [2, "Product name must be at least 2 characters long"]
    },
    price:{
        type: Number,
        required:[true, "Price is requried"]
    },
    description:{
        type: String,
        required:[true, "Description is required!"],
        minlength: [5, "Product description must be at least 5 characters long"]
    }

})

//register the above code at a table in mongodb
const Product = mongoose.model("Product", ProductSchema )

module.exports = Product;