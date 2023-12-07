import React from "react";
import Avatar from "@mui/material/Avatar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function PeoplePage(props) {
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
                // onClick={openModal}
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
