import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

RecipeSchema.methods.setImgUrl = function setImgUrl(filename) {
    this.image = `http://localhost:3000/public/${filename}`;
}

export default mongoose.model('Recipe', RecipeSchema);
