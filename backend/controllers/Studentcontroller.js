import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Student from "../models/StudentModel.js";
import Course from "../models/CoursesModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Signup function
export const signup = async (req, res) => {
  try {
    const { name, email, password, address, phoneNumber } = req.body;
    console.log("Signup Request Data:", req.body);

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      console.log("Student already exists with this email:", email);
      return res.status(400).json({ message: "Student already exists with this email.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed Password:", hashedPassword);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      profileImage: "default-image.jpg",
      isVerified: false,
    });
    await student.save();

    console.log("Account created successfully:", student);
    return res.status(201).json({ message: "Account created successfully.", success: true });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Login function with cookie storage
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update isVerified to true when the student logs in
    student.isVerified = true;
    await student.save();

    // Create a token and set it as a cookie
    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      message: "Login successful",
      token: token,
      Student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        isVerified: student.isVerified,
        address: student.address,
        phoneNumber: student.phoneNumber,
        profilePicture: student.profilePicture,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Middleware to verify token from cookies
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.Student = await Student.findById(verified.id);
    if (!req.Student) return res.status(401).json({ message: "Unauthorized access" });
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};



// Logout function
export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Clear the token from the cookie and reset isVerified on logout
    res.clearCookie("token");

    // Find student based on the token or other logic
    const studentId = jwt.verify(token, JWT_SECRET).id;
    const student = await Student.findById(studentId);
    
    if (student) {
      student.isVerified = false;
      await student.save();
      return res.status(200).json({ message: "Logged out successfully" });
    }

    res.status(400).json({ message: "Student not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const studentList = async (req, res) => {
  try {
      const students = await Student.find().select("-password");
      
      if (!students.length) {
          return res.status(404).json({ error: 'No students found' });
      }
      
      res.status(200).json(students);
  } catch (error) {
      console.error('Error while retrieving students:', error);
      res.status(500).json({ error: 'Server Error' });
  }
};

export const studentDetails = async (req, res) => {
  try {
      const student = await Student.findById(req.params.id); // Assuming Student is the model name
      if (!student) {
          return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json(student);
  } catch (error) {
      console.error('Error while retrieving student details:', error);
      res.status(500).json({ error: 'Server Error' });
  }
};

// Update student details (only name, email, address, phoneNumber)
export const updateStudentDetails = async (req, res) => {
  try {
    const { name, email, address, phoneNumber } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !address || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Update the student details
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,  // Use req.params.id to capture the student ID from the URL
      { name, email, address, phoneNumber },
      { new: true }
    ).select("-password");  // Exclude the password field from the response

    // If the student is not found, return an error
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the updated student details
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProgress = async (req, res) => {
  const { studentId, courseId, videoId, watchedSeconds, isCompleted } = req.body;

  try {
    // Validate inputs
    if (!studentId || !courseId || !videoId || watchedSeconds == null || isCompleted == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Find the course within the student's courses list
    let course = student.courses.find((c) => c.courseId.toString() === courseId);
    if (!course) {
      // If course is not found, initialize it
      course = { courseId, progress: [] };
      student.courses.push(course);
    }

    // Find the progress for the video
    const videoProgress = course.progress.find((v) => v.videoId.toString() === videoId);
    if (videoProgress) {
      // If progress exists, update it
      videoProgress.watchedSeconds = watchedSeconds;
      videoProgress.isCompleted = isCompleted; // Update completion status
    } else {
      // If no progress exists, create a new progress entry
      course.progress.push({ videoId, watchedSeconds, isCompleted });
    }

    // Save the updated student document
    await student.save();
    res.status(200).json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
};
