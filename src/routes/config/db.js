 
 const mongoose = require("mongoose");

const connectDB = async () => {
    try {

       const conn = await mongoose.connect(process.env.DB_URL); 
        console.log(`database connected successfully: ${conn.connection.host}`);
    } catch (err) {
        console.error("database connection failed", err);
        process.exit(1);
    }
};

module.exports = connectDB;