const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');

const registerUser = async (req, res) => {
    const { email, password, username } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists." });

    const user = await User.create(
        { 
            email: email, 
            password: password,
            username: username
        });
    res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '1h' });
    res.status(200).json({ token, userID: user.id.toString() });
};

const getUserInfo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: "Unknown User" });
    }

    res.status(200).json({
        email: user.email,
        username: user.username
    });
}

module.exports = { registerUser, loginUser, getUserInfo };