import React from "react";
import { Link } from "react-router-dom";

function NavDetail(props) {
  return (
    <div>
      <nav>
        <div className="container mx-auto flex justify-between items-center">
          {/* Các liên kết điều hướng */}
          <div className="space-x-20 p-2 px-10 text-sm">
            <Link to="/general" className="">
              General
            </Link>
            <Link to="/people" className="">
              People
            </Link>
            <Link to="/homework" className="">
              Homework
            </Link>
          </div>
        </div>
        <hr />
      </nav>
    </div>
  );
}

export default NavDetail;
