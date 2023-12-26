import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGradeClass, editClassGrade } from "../../services/gradeServices";
import { useClassDetailContext } from "../../context/ClassDetailContext";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/ClassDetailModal";
import Papa from "papaparse";
import { getClassByID } from "../../services/classServices";

const YourComponent = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [grades, setGrades] = useState([]);

  const [allTopics, setAllTopics] = useState([]);
  const [allRatios, setAllRatios] = useState([]);
  // console.log(allTopics);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Export CSV
  const handleExportCSV = () => {
    const csvData = [["Student ID", "Full Name", ...allTopics, "Total"]];
    grades.forEach((student) => {
      const row = [
        student.studentId,
        student.fullName,
        ...allTopics.map((topic) =>
          getScoreByTopic(student.grades, topic).toString()
        ),
        calculateWeightedTotal(student.grades).toString(),
      ];
      csvData.push(row);
    });

    const csv = Papa.unparse(csvData);

    const blob = new Blob([String.fromCharCode(0xfeff), csv], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "grades.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Import CSV
  const handleFileChange = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      if (file.type !== "text/csv") {
        // Display an error toast for unsupported file types
        toast.error("Unsupported file type. Please select a CSV file.");
        resetFileInput(fileInput);
        return;
      }

      Papa.parse(file, {
        complete: (result) => {
          // Assuming your CSV has a specific format
          // Update your state or perform other actions based on the parsed data
          const importedData = result.data;

          if (!isValidCSVStructure(importedData)) {
            // Display an error toast for invalid CSV structure
            toast.error(
              "Invalid CSV file structure. Please check the file format."
            );
          } else {
            // Example: Update state with the imported data
            updateStateWithImportedData(importedData);

            toast.success("CSV file imported successfully");
          }

          resetFileInput(fileInput);
        },
        header: true, // If your CSV has headers
      });
    }
  };

  const resetFileInput = (fileInput) => {
    // Reset the file input to allow selecting the same file again
    fileInput.value = "";
  };

  const isValidCSVStructure = (importedData) => {
    // Customize this function based on the expected structure of your CSV file
    // For example, check if the required columns exist
    // You may need to modify this logic based on your specific use case
    const requiredColumns = ["Student ID", "Full Name", ...allTopics, "Total"];

    return (
      Array.isArray(importedData) &&
      importedData.length > 0 &&
      requiredColumns.every((column) => importedData[0].hasOwnProperty(column))
    );
  };

  const updateStateWithImportedData = (importedData) => {
    // Update your state or perform other actions with the imported data

    // Example: Assuming your CSV data has a structure similar to your existing data
    const updatedGrades = importedData.map((row) => {
      const studentId = row["Student ID"];
      const fullName = row["Full Name"];
      const scores = allTopics.map((topic) => parseFloat(row[topic]) || 0);
      
      return {
        studentId,
        fullName,
        grades: allTopics.map((topic, index) => ({
          topic,
          score: scores[index],
        })),
      };
    });

    

    // Example: Update state with the imported data
    setGrades(updatedGrades);
  };

  // Modal
  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  // API getGrade
  // Assuming you have a state variable to store the list of ratios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllGradeClass(id, token);
        const data = response.data.grades;
        setGrades(data);

        const response1 = await getClassByID(id, token);
        const classInfo = response1.data.classInfo;

        // Check if gradestructs is defined before extracting data
        if (classInfo.gradestructs && classInfo.gradestructs.length > 0) {
          // Lấy danh sách chủ đề từ dữ liệu đầu vào
          const topics = classInfo.gradestructs.map((grade) => grade.topic);

          // Lấy danh sách ratio từ dữ liệu đầu vào
          const ratios = classInfo.gradestructs.map((grade) => grade.ratio);

          setAllTopics(topics);
          setAllRatios(ratios);
        } else {
          console.error("gradestructs is undefined or empty");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]); // Include id and token as dependencies

  // API Edit Grade
  const handleSave = async (inputValues) => {
    try {
      const updatedGrade = {
        studentID: selectedStudent.studentId,
        newScore: allTopics.map((topic) => parseFloat(inputValues[topic])),
      };

      // Call the editClassGrade API
      await editClassGrade(id, token, updatedGrade);

      toast.success("Grade edited successfully:");

      // Update the grades array in state
      setGrades((prevGrades) => {
        const updatedGrades = prevGrades.map((student) => {
          if (student.studentId === selectedStudent.studentId) {
            // Update the grades for the selected student
            const updatedGrades = student.grades.map((grade) => {
              const updatedScore = parseFloat(inputValues[grade.topic]);
              return {
                ...grade,
                score: isNaN(updatedScore) ? 0 : updatedScore,
              };
            });
            return {
              ...student,
              grades: updatedGrades,
            };
          }
          return student;
        });
        return updatedGrades;
      });
      closeModal();
    } catch (error) {
      toast.error("Error editing grade:", error);
      console.error("Error while saving:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleInputChange = (topic, value) => {
    setInputValues({
      ...inputValues,
      [topic]: value,
    });
  };

  // TOTAL
  const calculateWeightedTotal = (grades) => {
    const unroundedTotal = grades.reduce((total, grade) => {
      const ratio = allRatios[allTopics.indexOf(grade.topic)] || 0;
      return total + (grade.score * ratio) / 100;
    }, 0);

    // Sử dụng toFixed(2) để làm tròn đến 2 chữ số thập phân
    const roundedTotal = parseFloat(unroundedTotal.toFixed(2));

    return roundedTotal;
  };

  // SORT
  const sortData = (data, key, direction) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (key === "total") {
        const totalA = calculateWeightedTotal(a.grades);
        const totalB = calculateWeightedTotal(b.grades);

        if (totalA < totalB) {
          return direction === "ascending" ? -1 : 1;
        }
        if (totalA > totalB) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else {
        // For other columns, use the existing logic
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
    });
    return sortedData;
  };

  const handleSort = (key) => {
    if (key === "total") {
      const direction =
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending";

      setSortConfig({ key, direction });
    } else {
      // For other columns, use the existing logic
      const direction =
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending";

      setSortConfig({ key, direction });
    }
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ▲" : " ▼";
    }
    return null;
  };

  return (
    <div className="mt-10">
      <h2 className="mt-10 text-2xl text-[#10375c] font-bold mb-4">
        Grade Board
      </h2>

      {/* SEARCH */}
      <div className="flex justify-start items-center">
        <input
          type="text"
          placeholder="Search by Full Name or Student ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded-md w-1/4 text-sm"
        />
      </div>

      {/* IMPORT / EXPORT */}
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
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 mb-6">
          {/* HEADER */}
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("studentId")}
              >
                Student ID
                {renderSortArrow("studentId")}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("fullName")}
              >
                Full Name
                {renderSortArrow("fullName")}
              </th>
              {allTopics.map((topic, index) => (
                <th key={topic} className="py-2 px-4 border-b cursor-pointer">
                  {`${topic}  ${allRatios[index]}%`}
                </th>
              ))}
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("total")}
              >
                Total
                {renderSortArrow("total")}
              </th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>

          {/* CONTENT */}
          <tbody>
            {sortData(grades, sortConfig.key, sortConfig.direction)
              .filter(
                (student) =>
                  (student.fullName &&
                    student.fullName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())) ||
                  (student.studentId &&
                    student.studentId
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()))
              )
              .map((student) => (
                <tr key={student._id} className="text-center">
                  <td className="py-2 px-4 border-b">{student.studentId}</td>
                  <td className="py-2 px-4 border-b">{student.fullName}</td>
                  {allTopics.map((topic) => (
                    <td key={topic} className="py-2 px-4 border-b">
                      {getScoreByTopic(student.grades, topic)}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b">
                    {calculateWeightedTotal(student.grades)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 font-semibold font-sans rounded "
                      onClick={() => openModal(student)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Submit */}
        <div className="text-center">
          <button
            type="button"
            className="bg-blue-500 text-white mt-3  border-blue-400  hover:bg-blue-400  font-semibold font-sans rounded-full text-sm px-5 py-2.5  mb-2 "
          >
            Submit
          </button>
        </div>

        {/* Modal Edit */}
        <Modal show={isModalOpen} handleClose={closeModal}>
          <h2 className="text-2xl font-semibold mb-4">Grades</h2>
          <form>
            {selectedStudent &&
              allTopics.map((topic) => (
                <div key={topic} className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    {topic}
                  </label>
                  <input
                    id={`current-${topic}`}
                    type="number"
                    value={
                      inputValues[topic] ||
                      getScoreByTopic(selectedStudent.grades, topic)
                    }
                    onChange={(e) => handleInputChange(topic, e.target.value)}
                    min="0"
                    max="10"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              ))}
          </form>

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => handleSave(inputValues)}
            >
              Save
            </button>
            <button
              className="border border-gray-300 px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const getScoreByTopic = (grades, topic) => {
  const grade = grades.find((g) => g.topic === topic);
  return grade ? grade.score : 0;
};

export default YourComponent;
