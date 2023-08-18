const mongoose = require('mongoose');

//Connect to MongoDB
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database connected: ",
            connect.connection.host, // logs Host name to the console
            connect.connection.name  // logs DB name to the console
        );
    } catch (err) {
        console.log(err);
        process.exit(1);  //If error occurs Exit
    }
};

module.exports = connectDB;