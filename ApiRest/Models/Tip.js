import mongoose from 'mongoose';

const TipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Tip', TipSchema);
