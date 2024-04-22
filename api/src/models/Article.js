import mongoose from 'mongoose';

const { model } = mongoose;

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [String], // Array of image URLs
    category: { type: String, required: true },
    location: { type: String, required: true },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Article = model('Article', ArticleSchema);

export default Article;
