const asyncHandler = require('express-async-handler');  //Midddleware to handle async processes
// When an exception ocuurs asyncHandler will pass it the 'errorHandler.js'
//No need for 'try{} catch{err}'

const Contact = require('../models/contactModel');  //MongoDb contactSchema

//@description >>> Get all Contacts 
//@route GET /api/contacts
//@access = private
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });   //gets all contacts created by the user logged in

    res.status(200).json(contacts);
});

//@description >>> Create New Contact
//@route POST /api/contacts
//@access = private
const createContact = asyncHandler(async(req, res) => {
    console.log('The request body is', req.body)
    const { name, email, phone } = req.body;  //destructure
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,   //In ES6, if 'key' name and 'value' name are same, we just use the 'key'
        email,
        phone,
        user_id: req.user.id   // id of the user creating the Contact
    });

    res.status(201).json(contact);
});

//@description >>> Get individual Contact
//@route GET /api/contacts/:id
//@access = private
const getContact = asyncHandler(async(req, res) => {
    const contact =  await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//@description >>> Update individual Contact
//@route PUT /api/contacts/:id
//@access = private
const updateContact = asyncHandler(async(req, res) => {
    const contact =  await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    //validate if the user can update the contact by the user_id saved in the contact info
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other User's contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

//@description >>> Delete Contact
//@route DELETE /api/contacts/:id
//@access = private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    //validate if the user can delete the contact by the user_id saved in the contact info
    if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to delete other User's contacts");
    }

    await Contact.findByIdAndDelete(req.params.id); 
    res.status(200).json(contact);
});

module.exports = { 
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};