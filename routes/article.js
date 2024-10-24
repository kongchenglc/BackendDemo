import Router from 'koa-router';
import { createArticle, getArticles, getArticle, updateArticle, deleteArticle } from '../controllers/article.js';
import { jwtAuth } from '../middleware/auth.js';


const router = new Router({
  prefix: '/article'
});

router.post('/', createArticle);
router.get('/', getArticles);
router.get('/:id', getArticle);
router.put('/:id', jwtAuth, updateArticle);
router.delete('/:id', jwtAuth, deleteArticle);

export default router;
