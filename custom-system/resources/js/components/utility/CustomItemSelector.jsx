import React from "react";
import Select from "react-select";

const CustomItemSelectEditor = ({ value, onChange, options }) => {
  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : "";

  return (
    <Select
      value={{ value, label: displayValue }}
      onChange={handleChange}
      options={options}
    />
  );
};

export default CustomItemSelectEditor;
