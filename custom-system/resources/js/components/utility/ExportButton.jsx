import React from "react";
import { saveAs } from "file-saver";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import * as XLSX from "xlsx";

// Export data to PDF
const exportToPDF = (data) => {
    // Create a new PDF document
    const MyDocument = (
        <Document>
            <Page>
                <View style={styles.container}>
                    {/* Customize the layout and styling */}
                    <Text style={styles.title}>Data Export</Text>
                    {data.map((row, index) => (
                        <View key={index} style={styles.rowContainer}>
                            <Text style={styles.rowText}>
                                Name: {row.firstName} {row.lastName}
                            </Text>
                            <Text style={styles.rowText}>Age: {row.age}</Text>
                            <Text style={styles.rowText}>
                                Email: {row.email}
                            </Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    // Wrap MyDocument with PDFDownloadLink to generate the PDF download link
    const pdfLink = (
        <PDFDownloadLink document={MyDocument} fileName="data_export.pdf">
            Export to PDF
        </PDFDownloadLink>
    );

    // Render the PDFDownloadLink component directly in the browser
    // This will initiate the download when the link is clicked
    return pdfLink;
};

// Export data to Excel
const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Customize the cell formatting and styles
    worksheet["A1"].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "FF0000FF" } }, // Background color
    };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Convert the workbook to binary and save as Excel file
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelFile]), "data_export.xlsx");
};

// Example usage
const ExportButton = ({ data }) => {
    const handleExportPDF = () => {
        exportToPDF(data);
    };

    const handleExportExcel = () => {
        exportToExcel(data);
    };

    // Create a new PDF document
    const MyDocument = (
        <Document>
            <Page>
                <View style={styles.container}>
                    {/* Customize the layout and styling */}
                    <Text style={styles.title}>Data Export</Text>
                    {data.map((row, index) => (
                        <View key={index} style={styles.rowContainer}>
                            <Text style={styles.rowText}>
                                Name: {row.firstName} {row.lastName}
                            </Text>
                            <Text style={styles.rowText}>Age: {row.age}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            {/* <button className="btn btn-secondary mx-2" onClick={handleExportPDF}>Export to PDF</button> */}
            {/* <button onClick={handleExportPDF()}></button>  */}
            <PDFDownloadLink className="btn btn-success" document={MyDocument} fileName="data_export.pdf">
                Export to PDF
            </PDFDownloadLink>

            <button
                className="btn btn-success mx-2"
                onClick={handleExportExcel}
            >
                Export to Excel
            </button>
        </div>
    );
};

// Styles for PDF
const styles = StyleSheet.create({
    container: {
        padding: "20px",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    row: {
        fontSize: "12px",
        marginBottom: "5px",
    },
});

export default ExportButton;
