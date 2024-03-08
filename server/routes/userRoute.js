const User = require('../models/userModel');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middleware/authMiddleware");

// register
router.post('/register', async (req, res) => {
    try {
        // check if user already exists
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) throw new Error("User with this email already exists");

        // Hash password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Create new User
        await User.create(req.body);

        res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("User with this email does not exist");
        // check igf user is active
        if(!user.isActive) throw new Error("User is not active");
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) throw new Error("Invalid password");

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({
            message: "User login successful",
            success: true,
            data: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
// Get User (protected)
router.get('/get-current-user',authMiddleware, async(req,res)=>{
try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({
        message:"User fetched successfully", 
        success: true, 
        data:user,
    });
} catch (error) {
    res.status(500).json({message:error, success:false});
}
});

// update user
router.post('/update-user', authMiddleware,async(res,req)=>{
    try {
        if(req.body.newPassword && req.body.oldPassword)
        {
            const oldPassword = req.body.oldPassword;
        const user = await User.findById(req.body._id);
        const isPasswordCorrect = await bcrypt.compare(
            oldPassword,
            user.password,
        );
        if (!isPasswordCorrect) throw new Error('Invalid Password');
        const newPassword = await bcrypt.hash(req.body.newPassword, 10);
        req.body.password = newPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(req.bofy._id,req.body, {new:true}).select("-password"); 
        res.status(200).json({
            message: 'User updated successfully',
            success:true,
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false,
        });
    }   
});

// get all users
router.get('/get-all-users', async(req,res)=>{
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            message:"User fetched successfully", 
            success: true, 
            data:users,
        });
    } catch (error) {
        res.status(500).json({message:error, success:false});
    }
    });
module.exports = router;