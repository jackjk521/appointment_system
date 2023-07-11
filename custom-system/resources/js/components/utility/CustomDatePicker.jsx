import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
    return (
      <div className="custom-header">
        <button className="prev-button" onClick={decreaseMonth}>
          Prev
        </button>
        <span className="header-text">{date.toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
        <button className="next-button" onClick={increaseMonth}>
          Next
        </button>
      </div>
    );
  };

  const CustomInput = ({ value, onClick }) => (
    <button className="custom-input" onClick={onClick}>
      {value || "Select Date"}
    </button>
  );

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      customInput={<CustomInput />}
      renderCustomHeader={renderCustomHeader}
      popperPlacement="top-end"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "10px, 10px", // adjust the offset as per your requirement
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: "viewport",
        },
      }}
    />
  );
};

export default CustomDatePicker;
