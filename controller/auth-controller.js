const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");
const { welcomeSender, forgotPasswordSender } = require("../mailers/senders");
 
const register = async (data, res) => {
    try {        
        const userTaken = await validateEmail(data.email);
        if(userTaken) {
            return res.status(400).json({
                email: "Email is already taken",
                message: "Registration failure",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(data.password, 16);
        const code = crypto.randomInt(100000, 1000000);
        const newUser = new User({
            ...data,
            password: hashedPassword,
        });
 
        await newUser.save();
        welcomeSender(newUser.email, newUser.name, newUser.verificationCode);
        return res.status(201).json({
            message: "Account successfully created",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
};
 
const login = async (data, res) => {
    try {
        let { email, password } = data;
        const user = await User.findOne({ email });
        if(!user) {
            res.status(404).json({
                message: "Failed login attempt",
                email: "Incorrect email",
                success: false,
            })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            let token = jwt.sign({
                user_id: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
            }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: "1 hour",
            });
            let profile = {
                email: user.email,
                name: user.name,
            };
            let result = {
                user: profile,
                token: token,
                expiresIn: 168,
            };
            return res.status(200).json({
                ...result,
                message: "Login success",
                success: true
            });
        } else {
            return res.status(403).json({
                message: "Failed login attempt",
                email: "Incorrect password",
                success: false
            })
        }
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
     
};
 
const forgotPassword = async (data, res) => {
    try { 
        let { email } = data;
        const user = await User.findOne( { email: email });
        if(!user) {
            return res.status(404).json({
                message: "Invalid email",
                success: false
            }); 
        }
 
        const code = crypto.randomInt(100000, 1000000);
        const passwordResetCode = await bcrypt.hash(code.toString(), 16);
        await user.update({passwordResetCode : passwordResetCode});
        forgotPasswordSender(user.email, user.name, code);
        return res.status(404).json({
            message: "Verication code sent to your email",
            success: true,
        }); 
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
};
 
const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    if(user) {
        return true;
    } else {
        return false;
    }
};
 
module.exports = {
    login,
    register,
    forgotPassword,
};