const mongoose = require('mongoose');

const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connection is successful with ${connection.host}`);
};

module.exports = connectDB;

