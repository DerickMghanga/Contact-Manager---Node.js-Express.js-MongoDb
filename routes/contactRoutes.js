const express = require('express');
const router = express.Router();

const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

//route handlers & their controllers

// Get All Contacts or Create a New Contact
router.route('/').get(getContacts).post(createContact); 

// Get, Update or Delete individual Contact  (simplified)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;