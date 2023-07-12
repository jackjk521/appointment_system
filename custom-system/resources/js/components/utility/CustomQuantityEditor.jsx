import React, { useState, useEffect, useRef } from "react";

const CustomQuantityEditor = ({ value, onValueChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    onValueChange(inputValue);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      onValueChange(inputValue);
      inputRef.current.blur();
    }
  };

  const handleDocumentClick = (e) => {
    const isClickedOutsideEditor = !inputRef.current.contains(e.target);
    if (isClickedOutsideEditor) {
      onValueChange(inputValue);
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="number"
      value={inputValue}
      className="form-control"
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onKeyDown={handleInputKeyDown}
    />
  );
};

export default CustomQuantityEditor;
