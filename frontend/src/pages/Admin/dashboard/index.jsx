

import React, { useEffect, useState } from "react";
import "./dashboard.css"
import * as XLSX from "xlsx";
import { Base_URL } from "../../../Services/helper";




const Adashboard = () => {
    const [respectedStudents,setRespectedStudent]=useState([])
    const [files, setFiles] = useState({
        computer: null,
        civil: null,
        mechanical: null,
        electronics: null,
    });

    const handleFileChange = (event, branch) => {
        const file = event.target.files[0];
        setFiles((prevFiles) => ({
            ...prevFiles,
            [branch]: file,
        }));
    };

    const mergeExcelFiles = async () => {
        const selectedFiles = Object.values(files).filter((file) => file !== null);

        if (selectedFiles.length === 0) {
            alert("Please select at least one Excel file.");
            return;
        }

        let mergedData = [];
        let uniqueId = 1; // Counter for unique ID

        // Loop through each selected file
        for (const file of selectedFiles) {
            const data = await readExcelFile(file);
            if (data.length > 0) {
                mergedData = mergedData.concat(data);
            }
        }

        if (mergedData.length === 0) {
            alert("No valid data found in the files.");
            return;
        }

        // Add unique-id column
        const finalData = mergedData.map((row) => ({
            "Unique ID": uniqueId++,
            ID: row.ID,
            Title: row.Title,
            Abstract: row.Abstract,
            Tag: row.Tag,
        }));



        // Sending final data to the backend:::------------------------------------
        const response = await fetch(`${Base_URL}/upload-data`, {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ data: finalData }),
        });


        if (response.ok) {
            alert("Data successfully uploaded to the database.");
        } else {
            alert("Failed to upload data.");
        }



        // Convert data to worksheet
        const ws = XLSX.utils.json_to_sheet(finalData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Merged Data");

        // Download merged file
        XLSX.writeFile(wb, "merged_with_unique_id.xlsx");
    };

    const readExcelFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                resolve(jsonData);
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const show_respected_student = async () => {
        try {
          let students = await fetch(`${Base_URL}/get-student-select`, {
            method: "GET",
           });
          if (students.ok) {
            const result = await students.json();
            setRespectedStudent(result);  // Update the state with the fetched data
            // console.log(respectedStudents)
          } else {
            console.error("Failed to fetch students:", students.statusText);
          }
        } catch (error) {
          // Handle any errors (network issues, etc.)
          console.error("Error fetching students:", error);
        }
      };
      useEffect(() => {
        // Call the function inside useEffect when the component mounts
        show_respected_student();
      }, []);  // Empty dependency array ensures it's called once on mount
    
      useEffect(() => {
        if (respectedStudents.length > 0) {
          console.log("Updated students:", respectedStudents); // Log after state update
        }
      }, [respectedStudents]);  

    return (
        <>
            <h1>Admin Dashboard</h1>
            <div className="box">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Branch</th>
                            <th>Students</th>
                            <th>Choose File</th>
                            <th>Upload</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["computer", "civil", "mechanical", "electronics"].map((branch) => {
                             const filteredBranch = branch === "computer" ? "P" : branch;
                             return(
                            <tr key={branch}>
                                <th>{branch.charAt(0).toUpperCase() + branch.slice(1)}</th>




                     <td class="student-display">
                        {
                            

                            // Filter and map over the students
                            respectedStudents.filter(stu => stu.uin.includes(filteredBranch.charAt(0).toUpperCase())).map((stu, index) => (
                            <tr key={index}>
                                <td>{stu.name}</td>
                                <td>{stu.uin}</td>
                            </tr>
                            ))
                        }
                    </td>


                                <td>
                                    <input
                                        accept=".xlsx,.xls"
                                        type="file"
                                        onChange={(e) => handleFileChange(e, branch)}
                                    />
                                </td>
                                <td>
                                    <button className="button">Upload</button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
                <div className="adash-submit">
                    <button className="button" onClick={mergeExcelFiles}>
                        Publish
                    </button>
                </div>
            </div >
        </>
    );
};

export default Adashboard;
