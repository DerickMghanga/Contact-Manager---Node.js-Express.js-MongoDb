const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the User Name"]
    },
    email: {
        type: String,
        required: [true, "Please add the User email"],
        unique: [true, "Email Address already registered"] //No duplicate email address when registering
    },
    password: {
        type: String,
        required: [true, "Please add the User Passsword"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);