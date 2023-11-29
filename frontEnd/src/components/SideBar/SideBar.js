import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Modal from "react-modal";
import { useClassContext } from "../../context/ClassContext";

function SideBar() {
  const { id } = useParams();
  const [activeLink, setActiveLink] = useState("main");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newClassInfo, setNewClassInfo] = useState({
    title: "",
    className: "",
  });

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const { createClass } = useClassContext();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateClass = () => {
    createClass(newClassInfo);
    setModalIsOpen(false);
    setNewClassInfo({ title: "", className: "" });
  };

  return (
    <div className="w-1/5 md:w-1/6 lg:w-1/12 p-4 rounded-lg border border-solid border-gray-200 pb-96 ">
      <ul className="space-y-8 text-center">
        <li className="">
          <button
            onClick={openModal}
            className="btn bg-[#2E80CE] text-white px-3 py-1 lg:px-4 lg:py-1 rounded-full text-2xl cursor-pointer hover:bg-blue-400 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            +
          </button>

          {/* Modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Class Modal"
            // className="h-36 w-[400px] hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0  "
            className="h-36 w-[400px] absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            // overlayClassName="overlay"
          >
            <div className="bg-white p-8 rounded-md border-solid border-2 border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Create New Class</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Title:
                </label>
                <input
                  type="text"
                  value={newClassInfo.title}
                  onChange={(e) =>
                    setNewClassInfo({ ...newClassInfo, title: e.target.value })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">
                  Class Name:
                </label>
                <input
                  type="text"
                  value={newClassInfo.className}
                  onChange={(e) =>
                    setNewClassInfo({
                      ...newClassInfo,
                      className: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCreateClass}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Create Class
                </button>
                <button
                  onClick={closeModal}
                  className="border border-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
          {/* End Modal */}
        </li>
        <li>
          <Link
            to={`/home/${id}`}
            className={`flex flex-col items-center text-gray-700  text-xs  ${
              activeLink === "main" ? "text-blue-300" : ""
            }`}
            onClick={() => handleLinkClick("main")}
          >
            <span className="w-8 h-8 ">
              <HomeIcon className="w-full h-full " />
            </span>
            <span className="mt-1">Main Page</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/home/classes/${id}`}
            className={`flex flex-col items-center text-gray-700  text-xs ${
              activeLink === "classes" ? "text-blue-300" : ""
            }`}
            onClick={() => handleLinkClick("classes")}
          >
            <span className="w-8 h-8">
              <SchoolIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Classes</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/home/courses/${id}`}
            className={`flex flex-col items-center text-gray-700  text-xs ${
              activeLink === "courses" ? "text-blue-300" : ""
            }`}
            onClick={() => handleLinkClick("courses")}
          >
            <span className="w-8 h-8">
              <AutoStoriesIcon className="w-full h-full" />
            </span>
            <span className="mt-1">Courses</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
