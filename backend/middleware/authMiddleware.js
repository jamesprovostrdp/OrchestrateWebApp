const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized access - You need to sign in." });

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invaild token" });
    }
};

module.exports = protect;