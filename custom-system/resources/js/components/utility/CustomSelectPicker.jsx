import Select from "react-select";
const CustomSelectEditor = ({ value, onChange, options }) => {
    const handleChange = (selectedOption) => {
        onChange(selectedOption.value);
    };

    const selectedOption = options.find((option) => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : "";

    return (
        <Select
            // value={{ value, label: displayValue }}
            value={{ value, label: displayValue }}
            onChange={handleChange}
            options={options}
        />
    );
};

export default CustomSelectEditor