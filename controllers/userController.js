const asyncHandler =  require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  //MongoDb userSchema

//@description >>> Register the user
//@route POST /api/users/register
//@access = public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;   //destructure
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email }) //Check if the email exists or already registered
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`);

    if(user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is NOT Valid");
    }
    res.json({ message: 'Register the User' });
});

//@description >>> Login user
//@route POST /api/users/login
//@access = public
const logInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });  // retrieve the user using the email provided by the user(req.body)
    //compare password with hashed Password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({      //generate an accessToken for the user
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken });

    } else {
        res.status(401);
        throw new Error("Email or Password is Not Valid!");
    }
});

//@description >>> Current user info
//@route GET /api/users/current
//@access = private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current User Information'});
});

module.exports = { registerUser , logInUser, currentUser };