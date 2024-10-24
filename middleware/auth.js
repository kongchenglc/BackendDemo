import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const jwtAuth = async (ctx, next) => {
  const token = ctx.headers['authorization']?.split(' ')[1]; // 获取 Bearer token

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Authorization token is missing' };
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 403;
    ctx.body = { error: 'Invalid or expired token' };
  }
};
