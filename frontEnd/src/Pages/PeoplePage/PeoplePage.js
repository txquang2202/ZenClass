import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Modal from "../../components/Modal/ClassDetailModal";

function PeoplePage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [invTeacher, setInvTeacher] = useState([
    {
      avatarSrc: "/static/images/avatar/2.jpg",
      name: "Lê Ngọc Như Ý",
      mail: "thuynguyen@gmail.com",
    },
    {
      avatarSrc: "/static/images/avatar/2.jpg",
      name: "Hồ Quốc Duy",
      mail: "thuynguyen@gmail.com",
    },
    {
      avatarSrc: "/static/images/avatar/2.jpg",
      name: "Trần Xuân Quang",
      mail: "thuynguyen@gmail.com",
    },
  ]);
  const [filteredTeachers, setFilteredTeachers] = useState(invTeacher);

  // Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // SEARCH
  useEffect(() => {
    // Step 2: Update the board based on the search text
    const filteredTeachers = invTeacher.filter((teacher) => {
      const searchString = searchText.toLowerCase();
      return (
        teacher.name.toLowerCase().includes(searchString) ||
        teacher.mail.toLowerCase().includes(searchString)
      );
    });
    setFilteredTeachers(filteredTeachers);
  }, [invTeacher, searchText]);

  return (
    <>
      <section className="container w-full lg:max-w-[calc(100%-20rem)] mx-auto mt-6">
        {/* TEACHER */}
        <section>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-[#10375c]">Teacher</h2>
            <span className="">
              <PersonAddAltIcon
                className=" cursor-pointer hover:text-blue-400"
                onClick={openModal}
              />
            </span>
          </div>
          <hr className="mb-3 mt-3 border-indigo-200 border-b-[#10375c]" />
          <>
            {teachers.map((item, index) => (
              <section
                key={index}
                className="p-3 flex items-center gap-4 hover:bg-gray-100 transition-all duration-300 cursor-pointer border-b"
              >
                <div>
                  <Avatar alt={item.name} src={item.avatarSrc} />
                </div>
                <div>
                  <span className="text-sm">{item.name}</span>
                </div>
              </section>
            ))}
          </>
        </section>

        {/* STUDENT */}
        <section className="mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-[#10375c]">Students</h2>
            <span className="">
              <PersonAddAltIcon
                className=" cursor-pointer hover:text-blue-400"
                // onClick={openModal}
              />
            </span>
          </div>
          <hr className="mb-3 mt-3 border-indigo-200 border-b-[#10375c]" />
          <>
            {students.map((item, index) => (
              <section
                key={index}
                className="p-3 flex justify-between items-center gap-4 hover:bg-gray-100 transition-all duration-300 cursor-pointer border-b"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <Avatar alt={item.name} src={item.avatarSrc} />
                  </div>
                  <div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                </div>
                <span className="">
                  <RemoveCircleOutlineIcon
                    className="text-gray-300 cursor-pointer hover:text-blue-400"
                    // onClick={openModal}
                  />
                </span>
              </section>
            ))}
          </>
        </section>
      </section>

      {/* Modal */}
      <Modal show={isModalOpen} handleClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4 text-[#10375c]">
          Invite teacher
        </h2>
        <div className="">
          <input
            type="text"
            id="search"
            placeholder="Enter name or email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mt-1 p-2 border-none border-gray-300 rounded-md w-full focus:outline-none"
          />
        </div>
        <div className="mb-4 border-y-2  border-gray-200 max-h-60 overflow-y-auto scroll-smooth h-48">
          <ul className="p-2">
            {filteredTeachers.map((item) => (
              <li className="py-2 hover:bg-gray-50" key={item.name}>
                <div className="flex ">
                  <Avatar alt={item.name} src={item.avatarSrc} />
                  <div className="ml-3">
                    <span className="font-semibold text-base">{item.name}</span>
                    <p className="text-sm text-gray-500">{item.mail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            // onClick={handleEditClass}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Invite
          </button>
          <button
            // onClick={closeModal}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

const teachers = [
  {
    avatarSrc: "./assets/imgs/duy.png",
    name: "Hồ Quốc Duy",
  },
];

const students = [
  {
    avatarSrc: "/static/images/avatar/2.jpg",
    name: "Lê Ngọc Như Ý",
  },
  {
    avatarSrc: "/static/images/avatar/2.jpg",
    name: "Hoàng Ngọc Ánh",
  },
  {
    avatarSrc: "/static/images/avatar/2.jpg",
    name: "Nguyễn Thanh Nhàn",
  },
];

export default PeoplePage;
