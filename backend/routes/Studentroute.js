import express from "express";
import { 
  signup, 
  login, 
  logout, 
  studentList, 
  updateStudentDetails, 
  verifyToken, 
  updateProgress, 
  studentDetails
} from "../controllers/Studentcontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/studentlist", studentList);
router.get("/studentDetails/:id",studentDetails)
router.put("/update/:id", updateStudentDetails);
router.post("/update-progress" ,updateProgress);

export default router;
