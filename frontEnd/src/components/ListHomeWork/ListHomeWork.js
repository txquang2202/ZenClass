import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/ClassDetailModal";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import {
  getAllHomework,
  createHomeworkByID,
} from "../../services/homeworkServices";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useClassDetailContext } from "../../context/ClassDetailContext";

function ListHomeWork(props) {
  const [homeworks, setHomeWorks] = useState([]);
  const [newHomework, setNewHomework] = useState({
    title: "",
    description: "",
    date: format(new Date(), "dd MMMM"),
  });
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let data;
  if (token) data = jwtDecode(token);
  const [loading, setLoading] = useState(true);

  // API create homeworks
  const handleCreateHomework = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "dd MMMM yyyy");
      const response = await createHomeworkByID(
        id,
        token,
        newHomework.title,
        data.fullname,
        newHomework.description,
        currentDate
      );
      setHomeWorks((prevHomeworks) => [...prevHomeworks, response.data.class]);
      setNewHomework({
        title: "",
        description: "",
        date: formattedDate,
      });
      closeModal1();
      toast.success("Homework added successfully!");
    } catch (error) {
      console.error("Error fetching classes:", error);
      navigate("/500");
    }
  };

  // API get homeworks
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllHomework(id, token);
        const homeworkData = response.data.homeworks;
        if (homeworkData) {
          const mappedhomework = homeworkData.map((data) => ({
            id: data._id || "",
            title: data.title || "",
            date: format(new Date(data.date), "dd MMMM yyyy") || "",
          }));
          setHomeWorks(mappedhomework);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        navigate("/500");
      }
    };
    fetchUserData();
  }, [navigate, token, id]);

  // Add homework
  const handleNewHomeworkChange = (e) => {
    setNewHomework({
      ...newHomework,
      [e.target.id]: e.target.value,
    });
  };

  // Modal
  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  // const handleAddHomework = () => {
  //   if (
  //     newHomework.title.trim() !== "" &&
  //     newHomework.description.trim() !== ""
  //   ) {
  //     // Thêm bài tập mới vào danh sách
  //     setHomeWorks((prevHomeworks) => [
  //       ...prevHomeworks,
  //       {
  //         title: newHomework.title,
  //         description: newHomework.description,
  //         date: newHomework.date,
  //       },
  //     ]);
  //     setNewHomework({
  //       title: "",
  //       description: "",
  //       date: format(new Date(), "dd MMMM"),
  //     });
  //     closeModal1();
  //     toast.success("Homework added successfully!");
  //   } else {
  //     toast.error("Please enter the title for the homework");
  //   }
  // };
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {homeworks.length > 0 ? (
            homeworks.map((item, index) => (
              <div key={index}>
                <Link to={`/home/classes/detail/${id}/homework/${item.id}`}>
                  <section className="border p-4 rounded-lg flex items-center gap-4 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                    <div className="rounded-full p-2 bg-blue-400">
                      <ClassOutlinedIcon
                        style={{ color: "white" }}
                        fontSize="medium"
                      />
                    </div>
                    <div>
                      <div>
                        <h2>{item.title}</h2>
                        <span className="text-gray-400 text-sm">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </section>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-400 mb-10">No homework available...</p>
          )}
        </>
      )}

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
            onClick={handleCreateHomework}
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
