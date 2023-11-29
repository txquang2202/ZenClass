import React from "react";
import { Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useClassContext } from "../../context/ClassContext"; // Import ClassContext

const ClassPage = () => {
  const { id } = useParams();
  const { classes } = useClassContext(); // Sử dụng trạng thái từ ClassContext

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold mb-4 text-[#10375c] ">
          My Classes
        </h1>
        {classes.length === 0 ? ( // Thay đổi từ myClasses sang classes
          <p className="text-gray-400 mb-10">No course available</p>
        ) : (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {classes.map(
              (
                myClass,
                index // Thay đổi từ myClasses sang classes
              ) => (
                <Grid item xs={3} key={index}>
                  <section className="work-item bg-white border-[10px] border-[#EAF6FF] rounded-md  hover:translate-y-[-10px] hover:border-blue-300 cursor-pointer shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] ">
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
              )
            )}
          </Grid>
        )}
      </div>
    </>
  );
};

export default ClassPage;
