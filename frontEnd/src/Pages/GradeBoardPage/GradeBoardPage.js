import React, { useContext } from "react";
import { GradeContext } from "../../context/GradeContext"; // Import the GradeContext

const GradeBoard = () => {
  const { board, grades } = useContext(GradeContext); // Use the shared state from GradeContext

  // ... (rest of the code remains unchanged)

  return (
    <div>
      <h2 className="mt-10 text-2xl text-[#10375c] font-bold mb-4">
        Grade Board
      </h2>

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
          </tr>
        </thead>
        <tbody>
          {board.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="py-2 px-4 border-b">{student.id}</td>
              <td className="py-2 px-4 border-b">{student.name}</td>
              {grades.map((item) => (
                <td key={item.topic} className="py-2 px-4 border-b">
                  {student[item.topic]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeBoard;
