const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");

// Create attendance
router.post("/", async (req, res) => {
  try {
    const { date, status } = req.body;
    const attendance = new Attendance({ date, status });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all attendance
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update attendance
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
