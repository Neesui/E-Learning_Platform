import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/AdminModel.js';

// Function to add an admin
export const addAdmin = async (req, res) => {
  try {
    // Check if an admin with the provided email already exists
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving the admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new admin
    const admin = new Admin({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      role: 'admin', // Default role for a new admin
      status: 'active', // Default status for a new admin
    });

    // Save the admin to the database
    await admin.save();

    // Respond with success
    return res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    console.error("Error adding admin:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login function for admin
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Check if entered password matches the stored hash using the matchPassword method defined in the model
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with a 1-hour expiration
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Update last login date
    admin.lastLogin = Date.now();
    await admin.save();

    // Set the JWT token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure cookie for HTTP only
      secure: process.env.NODE_ENV === "production", // Use secure cookie in production
      maxAge: 3600000, // 1 hour in milliseconds
    });

    return res.status(200).json({
      message: "Login successful",
      token: token, // Send token in response for front-end use
      admin: {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName,
      }
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Logout function for admin
export const logout = async (req, res) => {
    try {
      // Clear the authentication token from the cookies
      res.clearCookie("token", {
        httpOnly: true, // Ensures cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === "production", // Ensures secure cookie in production
        sameSite: "strict", // Prevents CSRF attacks
      });
  
      // Respond with success
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Error during logout:", error.message);
      res.status(500).json({ message: "Logout failed" });
    }
  };
  
