const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  present: { type: Boolean, required: true },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
