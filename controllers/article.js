import Article from '../models/article.js';

export const createArticle = async (ctx) => {
  try {
    const newArticle = new Article(ctx.request.body);
    const savedArticle = await newArticle.save();
    ctx.body = savedArticle;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to create article' };
  }
};

export const getArticles = async (ctx) => {
  try {
    const articles = await Article.find();
    ctx.body = articles;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to retrieve articles' };
  }
};

export const getArticle = async (ctx) => {
  try {
    const article = await Article.findById(ctx.params.id);
    if (!article) {
      ctx.status = 404;
      ctx.body = { error: 'Article not found' };
    } else {
      ctx.body = article;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to retrieve article' };
  }
};

export const updateArticle = async (ctx) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
    if (!updatedArticle) {
      ctx.status = 404;
      ctx.body = { error: 'Article not found' };
    } else {
      ctx.body = updatedArticle;
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to update article' };
  }
};

export const deleteArticle = async (ctx) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(ctx.params.id);
    if (!deletedArticle) {
      ctx.status = 404;
      ctx.body = { error: 'Article not found' };
    } else {
      ctx.body = { message: 'Article deleted successfully' };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to delete article' };
  }
};
