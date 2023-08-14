const asyncHandler = require('express-async-handler');  //Midddleware to handle async processes
// When an exception ocuurs asyncHandler will pass it the 'errorHandler.js'
//No need for 'try{} catch{err}'

//@description >>> Get all Contacts 
//@route GET /api/contacts
//@access = public
const getContacts = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get all Contacts' });
});

//@description >>> Create New Contact
//@route POST /api/contacts
//@access = public
const createContact = asyncHandler(async(req, res) => {
    console.log('The request body is', req.body)
    const { name, body, phone } = req.body;

    if (!name || !body || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    res.status(201).json({ message: 'Create Contact' });
});

//@description >>> Get individual Contact
//@route GET /api/contacts/:id
//@access = public
const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Get Contact for ${req.params.id}` });
});

//@description >>> Update individual Contact
//@route PUT /api/contacts/:id
//@access = public
const updateContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update Contact for ${req.params.id}` });
});

//@description >>> Delete Contact
//@route DELETE /api/contacts/:id
//@access = public
const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delete Contact for ${req.params.id}`});
});

module.exports = { 
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};