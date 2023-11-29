import React, { useContext, useState, useEffect } from "react";
import { GradeContext } from "../../context/GradeContext"; // Import the GradeContext
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast, ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";

const GradeBoard = () => {
  const {
    board: initialBoard,
    grades,
    tempValues,
    updateTempValues,
    setTempValues,
  } = useContext(GradeContext);
  const [board, setBoard] = useState(initialBoard);
  const [edit, setEdit] = useState(null);

  // ... (rest of the code remains unchanged)
  const handleExportCSV = () => {
    // Define the CSV data
    const csvData = [
      [
        "ID",
        "Name",
        ...grades.map((item) => `${item.topic} ${item.ratio}%`),
        "Total",
      ],
      ...board.map((student) => [
        student.id,
        student.name,
        ...grades.map((item) => student[item.topic]),
        calculateTotal(student.id), // Include the total value here
      ]),
    ];

    // Create a CSV file
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "grades.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept CSV files");
        return;
      }
      // Parse local CSV file
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true, // Skip empty lines in the CSV file
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            let importedData = rawCSV.map((item) => {
              return {
                id: item.ID,
                name: item.Name,
                ...grades.reduce((acc, grade) => {
                  acc[grade.topic] =
                    item[`${grade.topic} ${grade.ratio}%`] || 0;
                  return acc;
                }, {}),
                total: item.Total || 0,
              };
            });

            // Update the board state with the imported data
            setBoard(importedData);

            // Update the tempValues state based on the new board data
            let updatedTempValues = {};
            importedData.forEach((student) => {
              updatedTempValues[student.id] = { ...student };
            });
            setTempValues(updatedTempValues);

            toast.success("Import successful!");
          } else {
            toast.error("No data found in CSV file!");
          }
        },
      });
    }
  };

  const handleCancel = () => {
    setEdit(null);
  };

  const handleDelete = (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this grade?"
    );

    // If the user confirms, proceed with deletion
    if (isConfirmed) {
      const updatedBoard = board.filter((student) => student.id !== id);
      setBoard(updatedBoard);
    }
  };

  const handleEdit = (id) => {
    setEdit(id);
  };

  const handleTextFieldChange = (e, studentId, topic) => {
    const { value } = e.target;

    // Update the tempValues state with the new value for the specified student and topic
    // setTempValues((prevTempValues) => ({
    //   ...prevTempValues,
    //   [studentId]: {
    //     ...prevTempValues[studentId],
    //     [topic]: value,
    //   },
    // }));
    updateTempValues(studentId, topic, value);
  };

  const handleSave = (id) => {
    // Find the student in the board state
    const studentToUpdate = board.find((student) => student.id === id);

    // Update the grades for the edited student
    const updatedGrades = grades.map((item) => ({
      ...item,
      [studentToUpdate.topic]: tempValues[id][item.topic] || 0,
    }));

    // Update the student in the board state
    const updatedBoard = board.map((student) =>
      student.id === id ? { ...student, ...tempValues[id] } : student
    );

    // Update the board state
    setBoard(updatedBoard);

    // Reset the edit state
    setEdit(null);
  };

  const calculateTotal = (studentId) => {
    const student = tempValues[studentId];
    if (!student) return 0;

    // Tính tổng giá trị nhân với ratio/100 cho từng môn học
    const total = grades.reduce((acc, item) => {
      const value = student[item.topic] || 0;
      const weightedValue = (value * item.ratio) / 100;
      return acc + weightedValue;
    }, 0);

    return parseFloat(total.toFixed(2));
  };

  return (
    <div>
      <h2 className="mt-10 text-2xl text-[#10375c] font-bold mb-4">
        Grade Board
      </h2>

      <div className="flex justify-end">
        <label
          htmlFor="test"
          className="flex justify-end text-[#2E80CE] text-xs bg-white border border-[#2E80CE] focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full  px-3 py-1.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
        >
          <svg
            class="w-3 h-3 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
            />
          </svg>
          Import
        </label>
        <input
          id="test"
          type="file"
          hidden
          onChange={(event) => handleImportCSV(event)}
        />

        <button
          type="button"
          onClick={handleExportCSV}
          className=" ml-1 flex justify-end text-[#2E80CE] text-xs bg-white border border-[#2E80CE] focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full  px-3 py-1.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <svg
            class="w-3 h-3 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
          Export
        </button>
      </div>
      <div className="table-container overflow-x-auto max-w-full">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              {grades.map((item) => (
                <th key={item.topic} className="py-2 px-4 border-b">
                  {item.topic} {item.ratio}%
                </th>
              ))}
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {board.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                {grades.map((item) => (
                  <td key={item.topic} className="py-2 px-4 border-b">
                    {edit === student.id ? (
                      <TextField
                        id={`outlined-number-${item.topic}`}
                        type="number"
                        value={
                          tempValues[student.id] &&
                          tempValues[student.id][item.topic]
                        }
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="w-20"
                        onChange={(e) =>
                          handleTextFieldChange(e, student.id, item.topic)
                        }
                      />
                    ) : (
                      // Display the updated value after saving
                      tempValues[student.id] &&
                      tempValues[student.id][item.topic]
                    )}
                  </td>
                ))}
                <td className="py-2 px-4 border-b">
                  {calculateTotal(student.id)}
                </td>
                <td className="py-2 px-4 border-b">
                  {edit === student.id ? (
                    <>
                      <button
                        className="bg-blue-500 text-white py-1 px-2 mr-2"
                        onClick={() => handleSave(student.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white py-1 px-2 mr-2"
                        onClick={() => handleEdit(student.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default GradeBoard;
