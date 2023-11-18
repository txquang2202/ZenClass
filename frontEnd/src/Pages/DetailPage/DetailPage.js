import React from "react";
import { Link } from "react-router-dom";

function DetailPage(props) {
  return (
    <>
      {/* NAVIATION */}
      <nav className="">
        <div className="container mx-auto flex justify-between items-center">
          {/* Các liên kết điều hướng */}
          <div className="space-x-20 p-2 px-10">
            <Link to="" className="">
              General
            </Link>
            <Link to="" className="">
              People
            </Link>
            <Link to="" className="">
              Contact
            </Link>
          </div>
        </div>
        <hr className="" />
      </nav>

      {/* MAIN CONTENT */}
      <div className="container w-full lg:max-w-[calc(100%-10rem)] mx-auto mt-6">
        {/* Hero media */}
        <div className="relative">
          <div
            className="h-60 w-full rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          ></div>
          <div className="absolute top-[120px] left-10">
            <h1 className="text-6xl text-white mb-2">ReactJS</h1>
            <span className="text-2xl text-white">2310-CLC-AWP-20KTPM2</span>
          </div>
        </div>

        {/* Content */}
      </div>
    </>
  );
}

export default DetailPage;
