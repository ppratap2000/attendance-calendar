import React from "react";

const DateCell = ({ date, attendance, onClick }) => {
  const formatDate = (date) => {
    const options = { day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      className={`date-cell ${
        attendance ? "attendance-present" : "attendance-absent"
      }`}
      onClick={onClick}
    >
      <span className="date">{formatDate(date)}</span>
      {attendance && <span className="attendance">{attendance.status}</span>}
    </div>
  );
};

export default DateCell;
