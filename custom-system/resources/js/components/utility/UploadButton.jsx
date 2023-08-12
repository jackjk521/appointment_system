import React, { useState } from "react";
import axios from "axios";

const ExcelUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send file to backend for processing
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Upload Excel File</h3>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} accept=".xlsx,.xls" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ExcelUpload;
