import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getClassByID,
  deleteClassbyID,
  editClass,
} from "../../services/classServices";
import { jwtDecode } from "jwt-decode";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Modal from "../../components/Modal/ClassDetailModal";
import { toast } from "react-toastify";
import { format } from "date-fns";

function DetailPage(props) {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [detailClass, setDetailClass] = useState({});
  const textRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    teacher: "",
    className: "",
  });

  let dataUser;
  if (token) dataUser = jwtDecode(token);
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

  // Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  // APIgetClass
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getClassByID(id, token);
        const data = response.data.classInfo;

        setDetailClass({
          id: data._id || "",
          title: data.title || "",
          teacher: data.teachers[0] || "",
          className: data.className || "",
        });

        setFormData({
          title: data.title || "",
          teacher: dataUser.username,
          className: data.className || "",
        });
      } catch (error) {
        console.error("Error fetching classes:", error);
        navigate("/500");
      }
    };

    fetchUserData();
  }, [navigate, token, id]);

  // API deleteClass
  const handleDeleteClass = async (classId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this calss?"
    );
    if (isConfirmed) {
      try {
        await deleteClassbyID(classId, token);

        closeModal();
        toast.success("Class deleted successfully!");
        navigate("/home");
      } catch (error) {
        toast.error("Error deleting class:", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // API editClass
  const handleEditClass = async () => {
    try {
      const formSub = {
        title: formData.title,
        className: formData.className,
      };
      await editClass(detailClass.id, formSub, token);
      // Handle success, e.g., show a success message
      toast.success("Class edited successfully:");

      setDetailClass((prevDetailClass) => ({
        ...prevDetailClass,
        title: formData.title,
        className: formData.className,
      }));

      closeModal(); // Close the modal after editing
    } catch (error) {
      toast.error("Error editing class:", error);
    }
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
    <>
      {/* MAIN CONTENT */}
      <section className="container w-full lg:max-w-[calc(100%-10rem)] mx-auto mt-6">
        {/* Hero media */}
        <section className="">
          <div
            className="h-60 w-full rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          >
            <div className="flex flex-col p-4">
              <span className="text-end mb-20 ">
                <DriveFileRenameOutlineIcon
                  className="text-white cursor-pointer hover:text-blue-400"
                  onClick={openModal}
                />
              </span>
              <h1 className="text-6xl text-white mb-2">{detailClass.title}</h1>
              <div className="flex justify-between">
                <span className="text-2xl text-white">
                  {detailClass.className}
                </span>
                <span className="text-2xl text-white">
                  {detailClass.teacher}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mt-4 grid grid-cols-4 gap-4">
          {/* LEFT */}
          <article>
            <section className="border p-4 rounded-lg flex flex-col mt-1">
              <h2 className="font-semibold">Upcoming events</h2>
              <p className="mt-3 mb-3 text-gray-400">
                There are no upcoming events
              </p>
              <a href="#!" className="ml-auto text-blue-400">
                See all
              </a>
            </section>
          </article>
          {/* RIGHT */}
          <article className="col-span-3 grid grid-flow-row auto-rows-max gap-4">
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
                    <ClassOutlinedIcon
                      style={{ color: "white" }}
                      fontSize="medium"
                    />
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
          </article>
        </section>
      </section>

      {/* Modal Edit */}
      <Modal show={isModalOpen} handleClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4">Edit Class</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">
              Class Name:
            </label>
            <input
              type="text"
              id="className"
              value={formData.className}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </form>

        <button
          onClick={() => handleDeleteClass(detailClass.id)}
          className="text-red-400"
        >
          Delete class
        </button>

        <div className="flex justify-end">
          <button
            onClick={handleEditClass}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
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
    </>
  );
}

export default DetailPage;
