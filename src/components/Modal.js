import React, { useState } from "react";

const Modal = ({ date, attendance, onClose, onUpdate }) => {
  const [present, setPresent] = useState(attendance === "present");
  const [absent, setAbsent] = useState(attendance === "absent");

  const handlePresentChange = () => {
    setPresent(true);
    setAbsent(false);
  };

  const handleAbsentChange = () => {
    setPresent(false);
    setAbsent(true);
  };

  const handleUpdate = () => {
    const newAttendance = present ? "present" : "absent";
    onUpdate({ date, attendance: newAttendance });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Attendance for {date.toDateString()}</h3>
        </div>
        <div className="modal-body">
          <div className="attendance-options">
            <label>
              <input
                type="radio"
                name="attendance"
                checked={present}
                onChange={handlePresentChange}
              />
              Present
            </label>
            <label>
              <input
                type="radio"
                name="attendance"
                checked={absent}
                onChange={handleAbsentChange}
              />
              Absent
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
