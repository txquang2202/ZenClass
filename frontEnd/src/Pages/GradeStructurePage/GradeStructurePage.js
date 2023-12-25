import React, { useContext, useState } from "react";
import { GradeContext } from "../../context/GradeContext";
import { useClassDetailContext } from "../../context/ClassDetailContext";
import {
  addGradeStruct,
  editGradeStruct,
  deleteGradeStruct,
} from "../../services/gradeStructureServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

const GradeStructure = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const { grades, setGrades } = useContext(GradeContext);
  const { isClassOwner } = useClassDetailContext();
  const [newGrades, setNewGrades] = useState({
    topic: "",
    ratio: 0,
  });
  const [edit, setEdit] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  // API delete grade
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this grade?"
    );
    if (isConfirmed) {
      try {
        await deleteGradeStruct(id, token);
        setGrades((prevGrades) =>
          prevGrades.filter((grade) => grade.id !== id)
        );
        toast.success("Grade deleted successfully");
      } catch (error) {
        console.error("Error deleting grade:", error);
        toast.error("Error deleting grade");
      }
    }
  };

  // API edit grade
  const handleSave = async (id) => {
    try {
      const formSub = {
        topic: newGrades.topic,
        ratio: newGrades.ratio,
      };

      await editGradeStruct(id, token, formSub);

      toast.success("Grade edited successfully");
      setEdit(null);

      setGrades((prevGrades) =>
        prevGrades.map((grade) =>
          grade.id === id ? { ...grade, ...formSub } : grade
        )
      );
      // Đặt lại state newGrades sau khi lưu thành công
      setNewGrades({
        topic: "",
        ratio: 0,
      });
    } catch (error) {
      console.error("Error editing grade:", error);
      toast.error("Error editing grade");
    }
  };

  const handleTextFieldChange = (e, field) => {
    setNewGrades((prevGrades) => ({
      ...prevGrades,
      [field]:
        field === "ratio" ? parseInt(e.target.value, 10) : e.target.value,
    }));
  };

  const handleEdit = (id) => {
    setEdit(id);
    const editingGrade = grades.find((grade) => grade.id === id);
    setNewGrades({
      topic: editingGrade.topic,
      ratio: editingGrade.ratio,
    });
  };

  // API add grade
  const handleAddGrade = async (e) => {
    e.preventDefault();

    try {
      const response = await addGradeStruct(
        id,
        token,
        newGrades.topic,
        newGrades.ratio
      );
      const newGrade = {
        id: response.data.gradeStruct._id || "",
        topic: response.data.gradeStruct.topic || "",
        ratio: response.data.gradeStruct.ratio || 0,
      };

      setGrades((prevGrades) => [
        ...prevGrades,
        {
          id: response.data.gradeStruct._id || "",
          topic: response.data.gradeStruct.topic || "",
          ratio: response.data.gradeStruct.ratio || 0,
        },
      ]);
      setEdit(newGrade.id);
      setNewGrades({
        topic: "",
        ratio: 0,
      });

      toast.success("Grade added successfully");
    } catch (error) {
      console.error("Error creating grade:", error);
      toast.error("Error adding grade");
      // navigate("/500");
    }
  };

  const handleCancel = () => {
    setEdit(null);
  };

  // TOTAL
  const calculateTotal = () => {
    return grades.reduce((acc, grade) => acc + grade.ratio, 0);
  };

  const isTotalValid = calculateTotal() === 100;

  // SORT
  const handleSortByRatio = () => {
    const sortedGrades = [...grades].sort((a, b) => {
      return sortOrder === "asc" ? a.ratio - b.ratio : b.ratio - a.ratio;
    });

    setGrades(sortedGrades);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-[#10375c] font-bold mb-4">
        Grade structure
      </h1>
      {/* ... (rest of the code remains unchanged) */}
      <table className="w-full border-collapse border border-gray-300 mb-3">
        {/* HEADER  */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Topic</th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={handleSortByRatio}
            >
              Ratio
              {sortOrder === "asc" ? " ▲" : " ▼"}
            </th>
            {isClassOwner && <th className="py-2 px-4 border-b">Action</th>}
          </tr>
        </thead>

        {/* CONTENT */}
        <tbody className="text-center">
          {/* GRADES */}
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td className="py-2 px-4 border-b">
                {edit === grade.id ? (
                  <TextField
                    id="outlined-text"
                    type="text"
                    value={newGrades.topic}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="w-32"
                    onChange={(e) => handleTextFieldChange(e, "topic")}
                  />
                ) : (
                  grade.topic
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {edit === grade.id ? (
                  <TextField
                    id="outlined-number"
                    type="number"
                    value={newGrades.ratio}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="w-20"
                    onChange={(e) => handleTextFieldChange(e, "ratio")}
                  />
                ) : (
                  `${grade.ratio}%`
                )}
              </td>
              {isClassOwner && (
                <td className="py-2 px-4 border-b">
                  {edit === grade.id ? (
                    <>
                      <button
                        className="bg-blue-500 text-white py-1 px-2 mr-2"
                        onClick={() => handleSave(grade.id)}
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
                        onClick={() => handleEdit(grade.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2"
                        onClick={() => handleDelete(grade.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD GRADE */}
      {isClassOwner && (
        <div className="text-center">
          <button
            type="button"
            onClick={handleAddGrade}
            class="text-blue-400 mt-3 bg-white border border-blue-400 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add Grade
          </button>
        </div>
      )}

      {/* TOTAL */}
      {isTotalValid ? (
        <h2 className="text-xl font-semibold text-[#10375c]">
          Total: {calculateTotal() + "%"}
        </h2>
      ) : (
        <>
          <h2 className="inline text-xl font-semibold mr-3 text-[#10375c]">
            Total: {calculateTotal() + "%"}
          </h2>
          <span className="text-red-500">
            Error: Total must be equal to 100%.
          </span>
        </>
      )}
    </div>
  );
};

export default GradeStructure;
