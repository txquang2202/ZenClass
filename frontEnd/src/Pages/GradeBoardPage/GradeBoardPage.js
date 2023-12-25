import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GradeContext } from "../../context/GradeContext";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import { useClassDetailContext } from "../../context/ClassDetailContext";
import Modal from "../../components/Modal/ClassDetailModal";
import { addGradeReviewByID } from "../../services/gradeReviewServices";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const GradeBoard = () => {
  const {
    board: initialBoard,
    grades,
    tempValues,
    updateTempValues,
    setTempValues,
    handleImportCSV,
  } = useContext(GradeContext);
  const [board, setBoard] = useState(initialBoard);
  const [edit, setEdit] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const studentsPerPage = 8;
  const indexOfLastStudent = (pageNumber + 1) * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = board.slice(indexOfFirstStudent, indexOfLastStudent);
  const shouldDisplayPagination = board.length > 8;

  const { isClassOwner } = useClassDetailContext();

  const { id } = useParams();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  let data;
  if (token) data = jwtDecode(token);

  const dataUser = localStorage.getItem("user");
  const user = JSON.parse(dataUser);
  const avtPath = `/assets/imgs/${user.img}`;

  const [reviewData, setReviewData] = useState({
    avt: "",
    fullname: "",
    userID: "",
    date: "",
    typeGrade: "",
    currentGrade: "",
    expectationGrade: "",
    explaination: "",
  });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "dd MMMM yyyy");
      // Gọi hàm API
      const response = await addGradeReviewByID(
        id,
        token,
        reviewData.avt,
        data.fullname,
        data.userID,
        currentDate,
        reviewData.typeGrade,
        reviewData.currentGrade,
        reviewData.expectationGrade,
        reviewData.explaination
      );
      closeModal();
      toast.success("Review added successfully!");
      console.log(response.data); // In ra kết quả từ server
    } catch (error) {
      console.error("Error adding grade review:", error);
    }
  };

  // Updated handleReviewDataChange function
  const handleReviewDataChange = (e, field) => {
    const { value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // FILE
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
        ...grades.map((item) => getCellValue(student, item.topic)),
        calculateTotalForExport(student), // Include the total value here
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

  const handleFileChange = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      handleImportCSV(file); // Call the handleImportCSV function from the context
    }
  };
  // Helper function to get cell value or default to 0
  const getCellValue = (student, topic) => {
    return (tempValues[student.id] && tempValues[student.id][topic]) !==
      undefined
      ? tempValues[student.id][topic]
      : 0;
  };

  // const handleImportCSV = (event) => {
  //   if (event.target && event.target.files && event.target.files[0]) {
  //     let file = event.target.files[0];
  //     if (file.type !== "text/csv") {
  //       toast.error("Only accept CSV files");
  //       return;
  //     }
  //     // Parse local CSV file
  //     Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true, // Skip empty lines in the CSV file
  //       complete: function (results) {
  //         let rawCSV = results.data;
  //         if (rawCSV.length > 0) {
  //           let importedData = rawCSV.map((item) => {
  //             return {
  //               id: item.ID,
  //               name: item.Name,
  //               ...grades.reduce((acc, grade) => {
  //                 acc[grade.topic] =
  //                   item[`${grade.topic} ${grade.ratio}%`] || 0;
  //                 return acc;
  //               }, {}),
  //               total: item.Total || 0,
  //             };
  //           });

  //           // Update the board state with the imported data
  //           setBoard(importedData);

  //           // Update the tempValues state based on the new board data
  //           let updatedTempValues = {};
  //           importedData.forEach((student) => {
  //             updatedTempValues[student.id] = { ...student };
  //           });
  //           setTempValues(updatedTempValues);

  //           toast.success("Import successful!");
  //         } else {
  //           toast.error("No data found in CSV file!");
  //         }
  //       },
  //     });
  //   }
  // };

  // CRUD
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

  // SUM
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

  const calculateTotalForExport = (student) => {
    const total = grades.reduce((acc, item) => {
      const value = student[item.topic] !== undefined ? student[item.topic] : 0;
      const weightedValue = (value * item.ratio) / 100;
      return acc + weightedValue;
    }, 0);

    return parseFloat(total.toFixed(2));
  };

  // SORT
  const sortColumn = (column, getValue) => {
    const sortedBoard = [...board].sort((a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    setBoard(sortedBoard);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortID = () => {
    sortColumn("ID", (student) => student.id);
  };

  const handleSortName = (sortBy) => {
    const sortedBoard = [...board].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy].localeCompare(b[sortBy]);
      } else {
        return b[sortBy].localeCompare(a[sortBy]);
      }
    });

    setBoard(sortedBoard);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortTotal = () => {
    sortColumn("Total", (student) => calculateTotal(student.id));
  };

  // SEARCH
  useEffect(() => {
    // Step 2: Update the board based on the search text
    const filteredBoard = initialBoard.filter((student) => {
      const searchString = searchText.toLowerCase();
      return (
        String(student.id).toLowerCase().includes(searchString) ||
        student.name.toLowerCase().includes(searchString)
      );
    });
    setBoard(filteredBoard);
  }, [initialBoard, searchText]);

  // PAGINATION
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handleNextPage = () => {
    if (pageNumber < Math.ceil(board.length / studentsPerPage) - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  // Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="mt-10 text-2xl text-[#10375c] font-bold mb-4">
        Grade Board
      </h2>

      {/* SEARCH BAR */}
      <div className="flex justify-center mb-5">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-1 px-3 py-3 ps-10 text-sm border-b-[1px] border-gray-200 focus:outline-none shadow-md"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            required
          />
        </div>
      </div>

      {/* IMPORT / EXPORT */}
      <div className="flex justify-end">
        {isClassOwner && (
          <>
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
              onChange={(event) => handleFileChange(event)}
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
          </>
        )}
      </div>

      {/* TABLE */}
      <div className="table-container overflow-x-auto max-w-full min-h-[440px]">
        <table className="min-w-full bg-white border border-gray-300">
          {/* HEADER */}
          <thead>
            <tr>
              <th className="py-2 px-4 border-b" onClick={() => handleSortID()}>
                ID
                {sortOrder === "asc" ? " ▲" : " ▼"}
              </th>
              <th
                className="py-2 px-4 border-b"
                onClick={() => handleSortName("name")}
              >
                Name {sortOrder === "asc" ? " ▲" : " ▼"}
              </th>
              {grades.map((item) => (
                <th key={item.topic} className="py-2 px-4 border-b">
                  {item.topic} {item.ratio}%
                </th>
              ))}
              <th
                className="py-2 px-4 border-b"
                onClick={() => handleSortTotal()}
              >
                Total {sortOrder === "asc" ? " ▲" : " ▼"}
              </th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>

          {/* CONTENT */}
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>

                {/* GRADE */}
                {grades.map((item) => (
                  <td key={item.topic} className="py-2 px-4 border-b">
                    {edit === student.id ? (
                      <TextField
                        id={`outlined-number-${item.topic}`}
                        type="number"
                        value={
                          (tempValues[student.id] &&
                            tempValues[student.id][item.topic]) !== undefined
                            ? tempValues[student.id][item.topic]
                            : 0
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
                      (tempValues[student.id] &&
                        tempValues[student.id][item.topic]) ||
                      0
                    )}
                  </td>
                ))}

                {/* TOTAL */}
                <td className="py-2 px-4 border-b">
                  {calculateTotal(student.id)}
                </td>

                {/* ACTION BUTTON */}
                {isClassOwner ? (
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
                ) : (
                  <td className="py-2 px-4 border-b">
                    {edit === student.id ? (
                      <></>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 text-white py-1 px-2 mr-2"
                          onClick={openModal}
                        >
                          Feed Back
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGITNATION */}
      {shouldDisplayPagination && (
        <div className="flex justify-center mt-4 sticky top-[100vh]">
          <button
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            onClick={handlePreviousPage}
            disabled={pageNumber === 0}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
          {Array.from(
            { length: Math.ceil(board.length / studentsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${
                  pageNumber === index ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            onClick={handleNextPage}
            disabled={
              pageNumber === Math.ceil(board.length / studentsPerPage) - 1
            }
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </div>
      )}

      {/* Modal Edit */}
      <Modal show={isModalOpen} handleClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4">Feed Back</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Type grade:
            </label>
            <input type="hidden" name="hidden" />

            <select
              name="typeGrade"
              id="grade"
              value={reviewData.typeGrade}
              onChange={(e) => handleReviewDataChange(e, "typeGrade")}
              className="mt-1 p-3 border border-gray-300 rounded-md w-full"
            >
              {grades.map((item, index) => (
                <option key={index}>{item.topic}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Current grade:
            </label>
            <input
              id="current-currentGrade"
              type="number"
              value={reviewData.currentGrade}
              onChange={(e) => handleReviewDataChange(e, "currentGrade")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Expectation grade:
            </label>
            <input
              id="expectationGrade"
              type="number"
              value={reviewData.expectationGrade}
              onChange={(e) => handleReviewDataChange(e, "expectationGrade")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">
              Explanation:
            </label>
            <textarea
              id="explaination" // Thay đổi id thành "description"
              type="text"
              placeholder="Write your explanation here..."
              value={reviewData.explaination}
              onChange={(e) => handleReviewDataChange(e, "explaination")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
            />
          </div>
        </form>

        <div className="flex justify-end">
          <button
            onClick={handleReviewSubmit}
            // onClick={handleEditClass}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Send
          </button>
          <button
            onClick={closeModal}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* TOAST */}
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
