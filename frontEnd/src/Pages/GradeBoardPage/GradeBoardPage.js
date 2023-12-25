import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGradeClass } from "../../services/gradeServices";
import Modal from "../../components/Modal/ClassDetailModal";

const YourComponent = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [grades, setGrades] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inputValues, setInputValues] = useState({});

  // Modal
  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllGradeClass(id, token);
        const data = response.data.grades;
        setGrades(data);

        // Lấy danh sách chủ đề từ dữ liệu đầu vào
        const topics = data.reduce((accumulator, student) => {
          student.grades.forEach((grade) => {
            if (!accumulator.includes(grade.topic)) {
              accumulator.push(grade.topic);
            }
          });
          return accumulator;
        }, []);

        setAllTopics(topics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // useEffect sẽ chỉ chạy một lần khi component được mount

  const handleSave = (inputValues) => {
    // Do something with inputValues
    console.log("Input values:", inputValues);
    // Close the modal
    closeModal();
  };

  const handleInputChange = (topic, value) => {
    setInputValues({
      ...inputValues,
      [topic]: value,
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">All Grades</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Student ID</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              {allTopics.map((topic) => (
                <th key={topic} className="py-2 px-4 border-b">
                  {topic}
                </th>
              ))}
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((student) => (
              <tr key={student._id} className="text-center">
                <td className="py-2 px-4 border-b">{student.studentId}</td>
                <td className="py-2 px-4 border-b">{student.fullName}</td>
                {allTopics.map((topic) => (
                  <td key={topic} className="py-2 px-4 border-b">
                    {getScoreByTopic(student.grades, topic)}
                  </td>
                ))}
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 mr-2"
                    onClick={() => openModal(student)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
