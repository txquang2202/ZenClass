import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GradeContext } from "../../context/GradeContext";

const ItemType = "TABLE_ROW";

const DraggableRow = ({
  index,
  data,
  moveRow,
  handleEdit,
  handleDelete,
  handleSave,
  handleCancel,
  handleTextFieldChange,
  tempRatio,
  tempTopic,
  edit,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const renderCell = (field) => {
    if (field === "topic") {
      return (
        <>
          {edit === data.id ? (
            <TextField
              id="outlined-text"
              type="text"
              value={tempTopic}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              className="w-32"
              onChange={(e) => handleTextFieldChange(e, "topic")}
            />
          ) : (
            data.topic
          )}
        </>
      );
    } else if (field === "ratio") {
      return (
        <>
          {edit === data.id ? (
            <TextField
              id="outlined-number"
              type="number"
              value={tempRatio}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              className="w-20"
              onChange={(e) => handleTextFieldChange(e, "ratio")}
            />
          ) : (
            `${data.ratio}%`
          )}
        </>
      );
    }
    return null;
  };

  const renderEditButtons = () => (
    <>
      <button
        className="bg-blue-500 text-white py-1 px-2 mr-2"
        onClick={() => handleSave(data.id)}
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
  );

  const renderDefaultButtons = (id) => (
    <>
      <button
        className="bg-blue-500 text-white py-1 px-2 mr-2"
        onClick={() => handleEdit(id)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white py-1 px-2"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </>
  );

  return (
    <tr
      ref={(node) => ref(drop(node))}
      className="hover:bg-gray-50 cursor-pointer"
    >
      <td className="py-2 px-4 border-b ">{data.gradeCode}</td>
      <td className="py-2 px-4 border-b">{renderCell("topic")}</td>
      <td className="py-2 px-4 border-b">{renderCell("ratio")}</td>
      <td className="py-2 px-4 border-b">
        {edit === data.id ? renderEditButtons() : renderDefaultButtons(data.id)}
      </td>
    </tr>
  );
};

const GradeStructure = () => {
  const { grades, setGrades } = useContext(GradeContext);
  const [edit, setEdit] = useState(null);
  const [tempRatio, setTempRatio] = useState(0);
  const [tempTopic, setTempTopic] = useState("New Grade");
  const [sortOrder, setSortOrder] = useState("");

  const moveRow = (fromIndex, toIndex) => {
    const updatedGrades = [...grades];
    const [movedRow] = updatedGrades.splice(fromIndex, 1);
    updatedGrades.splice(toIndex, 0, movedRow);
    setGrades(updatedGrades);
  };

  const handleEdit = (id) => {
    setEdit(id);
    setTempRatio(grades.find((grade) => grade.id === id).ratio);
    setTempTopic(grades.find((grade) => grade.id === id).topic);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this grade?"
    );
    if (isConfirmed) {
      const updatedGrades = grades.filter((grade) => grade.id !== id);
      setGrades(updatedGrades);
    }
  };

  const handleSave = (id) => {
    const updatedGrades = grades.map((grade) =>
      grade.id === id ? { ...grade, ratio: tempRatio, topic: tempTopic } : grade
    );
    setGrades(updatedGrades);
    setEdit(null);
  };

  const handleCancel = () => {
    setEdit(null);
  };

  const handleTextFieldChange = (e, field) => {
    if (field === "ratio") {
      setTempRatio(parseInt(e.target.value, 10));
    } else if (field === "topic") {
      setTempTopic(e.target.value);
    }
  };

  const handleSortByRatio = () => {
    const sortedGrades = [...grades].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.ratio - b.ratio;
      } else {
        return b.ratio - a.ratio;
      }
    });

    setGrades(sortedGrades);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const calculateTotal = () => {
    const total = grades.reduce((acc, grade) => acc + grade.ratio, 0);
    return total;
  };

  const isTotalValid = calculateTotal() === 100;

  const handleAddGrade = () => {
    const newId = Math.max(...grades.map((grade) => grade.id), 0) + 1;
    const newGrade = {
      id: newId,
      gradeCode: `GR00${newId}`,
      topic: "New Grade",
      ratio: 0,
    };
    setGrades([...grades, newGrade]);
    setEdit(newId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-[#10375c] font-bold mb-4">
        Grade structure
      </h1>
      <DndProvider backend={HTML5Backend}>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Topic</th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={handleSortByRatio}
              >
                Ratio
                {sortOrder === "asc" ? " ▲" : " ▼"}
              </th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {grades.map((grade, index) => (
              <DraggableRow
                key={index}
                index={index}
                data={grade}
                moveRow={moveRow}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleTextFieldChange={handleTextFieldChange}
                tempRatio={tempRatio}
                tempTopic={tempTopic}
                edit={edit}
              />
            ))}
          </tbody>
        </table>
      </DndProvider>
      <div className="text-center">
        <button
          type="button"
          onClick={handleAddGrade}
          className="text-blue-400 mt-3 bg-white border border-blue-400 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add Grade
        </button>
      </div>
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
