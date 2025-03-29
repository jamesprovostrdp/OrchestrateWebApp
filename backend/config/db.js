const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/OrchestrateWebAppDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB(OrchestrateWebAppDB) connected successfully!");
    } catch (err) {
        console.error("Database connection failed: ", err);
        process.exit(1);
    }
};

module.exports = connectDB;