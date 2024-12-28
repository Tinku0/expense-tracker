const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
require('dotenv').config();
// Register a new user
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword, // Save hashed password
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'Registration successful', user: savedUser });
    } catch (error) {
        next(error);
    }
};

// Login a user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Use a strong secret stored in .env
            { expiresIn: '1h' } // Token expiration time
        );
        const safeUser = user.toObject();
        delete safeUser.password;
        res.status(200).json({ message: 'Login successful', token, user:safeUser });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser };