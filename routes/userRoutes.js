const express = require('express');
const { registerUser, logInUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

//Route handlers & Controllers
router.post('/register', registerUser);

router.post('/login', logInUser);

router.get('/current', validateToken, currentUser);  //accessToken is generated here to authorize access of User Info

module.exports = router;