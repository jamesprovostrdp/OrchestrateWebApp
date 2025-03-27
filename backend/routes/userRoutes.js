const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/protected', protect, (req, res) => res.send("Welcome to the protected route"));

module.exports = userRouter;