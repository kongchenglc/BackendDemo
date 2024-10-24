import Router from 'koa-router';
import User from '../models/user.js';

const router = new Router();

router.prefix('/users')
// RESTful API

// get all
router.get('/', async (ctx) => {
  try {
    const users = await User.find({});
    ctx.body = users;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Failed to fetch users', error: err.message };
  }
});

router.get('/:username', async (ctx) => {
  const { username } = ctx.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }
    ctx.body = user;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
});

// update
router.put('/:username', async (ctx) => {
  const { username } = ctx.params;
  try {
    const user = await User.findOneAndUpdate({ username }, ctx.request.body, { new: true, runValidators: true });
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }
    ctx.body = user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

router.delete('/:username', async (ctx) => {
  const { username } = ctx.params;
  try {
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }
    ctx.status = 204; // No Content
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
});

export default router
