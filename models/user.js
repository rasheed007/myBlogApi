const { Schema, model } = require("mongoose");
 
const UserSchema = new Schema (
    {
        first_name: {
            type: String,
            required: true,
        },
        Last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
 
module.exports = model("User", UserSchema);