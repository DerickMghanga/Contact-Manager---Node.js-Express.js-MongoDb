const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  //in-built middleware to accepts json data from the client(req.body) ie POST requests

// routes & route handlers
app.use('/api/contacts', require('./routes/contactRoutes')); // 'use' is an in-built middlware
app.use('/api/users', require('./routes/userRoutes')); // 'use' is an in-built middlware
app.use(errorHandler);  //Middleware to handle errors


app.listen(PORT, ()=> {
    console.log(`Server running on PORT: ${PORT}`)
})