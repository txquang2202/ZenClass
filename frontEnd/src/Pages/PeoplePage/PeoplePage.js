import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useParams, useNavigate } from "react-router-dom";
import { getClassMembers } from "../../services/classServices";

function PeoplePage() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const Navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getClassMembers(id, token);

        const teacherData = response.data.teachers.map((teacher) => ({
          avatarSrc: "/assets/imgs/" + teacher.img,
          name: teacher.fullname,
        }));
        setTeachers(teacherData);

        const studentData = response.data.students.map((student) => ({
          avatarSrc: "/assets/imgs/" + student.img,
          name: student.fullname,
        }));
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Navigate("/500");
      }
    };

    fetchStudentData();
  }, [id, token, Navigate]);

  return (
    <section className="container w-full lg:max-w-[calc(100%-20rem)] mx-auto mt-6">
      {/* TEACHER */}
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl text-[#10375c]">Teacher</h2>
          <span className="">
            <PersonAddAltIcon className="cursor-pointer hover:text-blue-400" />
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
            <PersonAddAltIcon className="cursor-pointer hover:text-blue-400" />
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
                <RemoveCircleOutlineIcon className="text-gray-300 cursor-pointer hover:text-blue-400" />
              </span>
            </section>
          ))}
        </>
      </section>
    </section>
  );
}

export default PeoplePage;
