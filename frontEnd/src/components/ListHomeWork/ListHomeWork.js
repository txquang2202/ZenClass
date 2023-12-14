import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/ClassDetailModal";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

function ListHomeWork(props) {
  const [homeworks, setHomeWorks] = useState([
    {
      title: "Syllabus - CSC13114 Advanced Web Application",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, minus amet? Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!",
      date: "16 thg 11",
    },
    {
      title: "L01 - Course IntroductionFile",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, minus amet? Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!",
      date: "12 thg 10",
    },
    {
      title: "Assignment Class Diagram",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, minus amet? Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!",
      date: "20 thg 9",
    },
  ]);
  const [newHomework, setNewHomework] = useState({
    title: "",
    description: "",
    date: format(new Date(), "dd MMMM"),
  });
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const { id } = useParams();

  // Modal
  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  // Add homework
  const handleNewHomeworkChange = (e) => {
    setNewHomework({
      ...newHomework,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddHomework = () => {
    if (
      newHomework.title.trim() !== "" &&
      newHomework.description.trim() !== ""
    ) {
      // Thêm bài tập mới vào danh sách
      setHomeWorks((prevHomeworks) => [
        ...prevHomeworks,
        {
          title: newHomework.title,
          description: newHomework.description,
          date: newHomework.date,
        },
      ]);
      setNewHomework({
        title: "",
        description: "",
        date: format(new Date(), "dd MMMM"),
      });
      closeModal1();
      toast.success("Homework added successfully!");
    } else {
      toast.error("Please enter the title for the homework");
    }
  };

  return (
    <div className="col-span-3 grid grid-flow-row auto-rows-max gap-4">
      <div className="text-center">
        <button
          onClick={openModal1}
          className="btn border-2 border-gray-300 bg-white text-gray-400 px-3 py-1 lg:px-4 lg:py-1 rounded-full text-2xl cursor-pointer hover:bg-gray-100 drop-shadow-md "
        >
          +
        </button>
      </div>

      {homeworks.map((item, index) => (
        <Link to={`/home/classes/detail/homework/${id}`}>
          <section
            key={index}
            className="border p-4 rounded-lg flex items-center gap-4 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
          >
            <div className="rounded-full p-2 bg-blue-400">
              <ClassOutlinedIcon style={{ color: "white" }} fontSize="medium" />
            </div>
            <div>
              <div>
                <h2>{item.title}</h2>
                <span className="text-gray-400 text-sm">{item.date}</span>
              </div>
            </div>
          </section>
        </Link>
      ))}

      {/* Modal Post */}
      <Modal show={isModalOpen1} handleClose={closeModal1}>
        <h2 className="text-2xl font-semibold mb-4 text-[#10375c]">
          Add Homework
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={newHomework.title}
            onChange={handleNewHomeworkChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <textarea
            id="description" // Thay đổi id thành "description"
            placeholder="Write your post here..."
            type="text"
            value={newHomework.description}
            onChange={handleNewHomeworkChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddHomework}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Add Homework
          </button>
          <button
            onClick={closeModal1}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ListHomeWork;
