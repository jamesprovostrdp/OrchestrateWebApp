const express = require('express');
const { registerUser, loginUser, getUserInfo } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const userRouter = express.Router();

// POST: registers/adds a user to the database
userRouter.post('/register', registerUser);

// POST: verifies user to the database and returns a token
userRouter.post('/login', loginUser);

// GET: (protected) a protected route that requires authorization for testing
userRouter.get('/protected', protect, (req, res) => res.send("Welcome to the protected route"));

// POST: Get user information id from email
userRouter.post('/info', getUserInfo);

module.exports = userRouter;