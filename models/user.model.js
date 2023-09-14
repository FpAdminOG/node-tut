const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Email is required I said"],
        unique: true,
    },
    password: {
        type: String,
        validate: {
            validator: (value) => {
                return value.length >= 6;
            },
            message: "Password must be at least 6 characters",
        }
    }
}, {
    timestamps: true
});
const UserModel = model('User', userSchema);
module.exports = UserModel;