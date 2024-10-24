import Router from 'koa-router';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Import user model

const router = new Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.prefix('/auth')

// Register endpoint
router.post('/register', async (ctx) => {
    const { username, password } = ctx.request.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        ctx.body = { message: 'User registered successfully' };
    } catch (err) {
        ctx.status = 400;
        ctx.body = { message: 'Registration failed', error: err.message };
    }
});

// Login endpoint
router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body;

    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            // Create JWT token
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
            ctx.body = { message: 'Login successful', token };
        } else {
            ctx.status = 401;
            ctx.body = { message: 'Invalid credentials' };
        }
    } catch (err) {
        ctx.status = 500;
        ctx.body = { message: 'Internal server error', error: err.message };
    }
});

// Export router
export default router;
