const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        user_id: {          //user id of the User creating the contact
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"         //reference
        },

        name: {
            type: String,
            required: [true, "Please add the Contact Name"]
        },

        email: {
            type: String,
            required: [true, "Please add the Contact Email Address"] 
        },
        
        phone: {
            type: String,
            required: [true, "Please add the Contact Phone Number"] 
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);