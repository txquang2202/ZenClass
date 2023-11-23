// ClassPage.js
import React from "react";
import { Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";

function ClassPage({}) {
  const { id } = useParams();
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mb-4 text-[#10375c]">
          My Classes
        </h1>
        {myClasses.length === 0 ? (
          <p className="text-gray-400 mb-10">No course available</p>
        ) : (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {myClasses.map((myClass, index) => (
              <Grid item xs={3} key={index}>
                <section className="work-item bg-white border-[10px] border-[#EAF6FF] rounded-md transition-transform hover:translate-y-[-10px] hover:border-blue-400 cursor-pointer">
                  <div className="p-5">
                    <Link to={`/home/classes/detail/${id}`}>
                      <h2 className="font-semibold text-2xl leading-[1.38] text-[#10375c]  mb-3">
                        {myClass.title}
                      </h2>
                      <hr className="border-t border-gray-200 dark:border-[#575F66] mb-3" />
                      <p className=" text-[#575F66] font-sora text-base font-light leading-[28px]">
                        Teacher:
                        <span className=" text-[#2E80CE]">
                          {" "}
                          {myClass.author}
                        </span>
                      </p>
                      <p className="  text-[#575F66] font-sora text-base font-light leading-[28px]">
                        Class:
                        <span className=" text-[#2E80CE]">
                          {" "}
                          {myClass.class}
                        </span>
                      </p>
                    </Link>
                  </div>
                </section>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

const myClasses = [
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
  {
    title: "ReactJS",
    author: "Minh Hieu",
    class: "KTPM 1",
  },
];

export default ClassPage;
