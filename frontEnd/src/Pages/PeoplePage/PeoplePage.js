import React from "react";
import Avatar from "@mui/material/Avatar";

function PeoplePage(props) {
  return (
    <>
      <section className="container w-full lg:max-w-[calc(100%-20rem)] mx-auto mt-6">
        {/* TEACHER */}
        <section>
          <h2 className="text-4xl text-[#10375c]">Teacher</h2>
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
          <h2 className="text-4xl text-[#10375c]">Students</h2>
          <hr className="mb-3 mt-3 border-indigo-200 border-b-[#10375c]" />
          <>
            {students.map((item, index) => (
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
      </section>
    </>
  );
}

const teachers = [
  {
    avatarSrc: "./assets/imgs/duy.png",
    name: "Hồ Quốc Duy",
  },
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
    name: "Lê Ngọc Như Ý",
  },
  {
    avatarSrc: "/static/images/avatar/2.jpg",
    name: "Lê Ngọc Như Ý",
  },
];

export default PeoplePage;
