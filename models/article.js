import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  imageLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
