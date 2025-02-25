import mongoose from 'mongoose';

// import cors from "../Config/cors.js";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
        default: true,
    },
});

ProductSchema.methods.setImgUrl = function setImgUrl(filename) {
    this.image = `http://localhost:3000/public/${filename}`;
}

export default mongoose.model('Product', ProductSchema);
