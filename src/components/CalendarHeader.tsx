import React from "react";

export default function CalendarHeader() {
  return (
    <div className="header">
      <button className="btn">Today</button>
      <div>
        <button className="month-change-btn">&lt;</button>
        <button className="month-change-btn">&gt;</button>
      </div>
      <span className="month-title">June 2023</span>
    </div>
  );
}
