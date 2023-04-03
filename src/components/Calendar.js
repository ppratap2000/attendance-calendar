import React, { useState, useEffect } from "react";
import DateCell from "./DateCell";
import Modal from "./Modal";

const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance data from API and update state
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch("/api/attendance");
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    // Generate calendar dates for current month and update state
    const generateCalendarDates = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const dates = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const attendance = attendanceData.find(
          (attendance) =>
            new Date(attendance.date).toDateString() === date.toDateString()
        );
        dates.push({ date, attendance });
      }
      for (let i = 0; i < firstDayOfMonth; i++) {
        dates.unshift(null);
      }
      setDates(dates);
    };
    generateCalendarDates();
  }, [attendanceData]);

  const handleDateCellClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedDate(null);
    setModalOpen(false);
  };

  const handleAttendanceUpdate = async (attendance) => {
    try {
      const response = await fetch(`/api/attendance/${attendance._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
      });
      const updatedAttendance = await response.json();
      const updatedAttendanceData = attendanceData.map((attendance) =>
        attendance._id === updatedAttendance._id
          ? updatedAttendance
          : attendance
      );
      setAttendanceData(updatedAttendanceData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="calendar">
      {dates.map((date, index) =>
        date ? (
          <DateCell
            key={date.date.toISOString()}
            date={date.date}
            attendance={date.attendance}
            onClick={() => handleDateCellClick(date.date)}
          />
        ) : (
          <div key={`blank-${index}`} className="date-cell blank"></div>
        )
      )}
      {modalOpen && selectedDate && (
        <Modal
          date={selectedDate}
          attendance={selectedDate.attendance}
          onClose={handleModalClose}
          onUpdate={handleAttendanceUpdate}
        />
      )}
    </div>
  );
};
export default Calendar;
