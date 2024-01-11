import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        
        min: 3,
        required: true,
    },
    description: {
        type: String,
        min: 3,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        lowercase: true,
        required: true,
    },
    subcategory: {
        type: String,
        lowercase: true,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

},{
    
    timestamps:true
})


const Product = mongoose.model("Product", productSchema);
export default Product;
