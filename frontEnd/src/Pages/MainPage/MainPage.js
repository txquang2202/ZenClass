import React, { useState } from "react";
import ClassPage from "../ClassPage/ClassPage";
import CoursePage from "../CoursePage/CoursePage";

function MainPage({ courses, myClasses }) {
  const maxVisibleItems = 8;
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const visibleClasses = showAllClasses
    ? myClasses
    : myClasses.slice(0, maxVisibleItems);

  const visibleCourses = showAllCourses
    ? courses
    : courses.slice(0, maxVisibleItems);

  return (
    <>
      <div className="relative">
        <ClassPage myClasses={visibleClasses} />
        {myClasses.length > maxVisibleItems && (
          <p
            className="text-[#2E80CE] cursor-pointer absolute right-2 top-2"
            onClick={() => setShowAllClasses(!showAllClasses)}
          >
            {showAllClasses ? "See less" : "See more"}
          </p>
        )}
      </div>
      <div className="mt-7 relative">
        <CoursePage courses={visibleCourses} />
        {courses.length > maxVisibleItems && (
          <p
            className="text-[#2E80CE] cursor-pointer absolute right-2 top-2"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "See less" : "See more"}
          </p>
        )}
      </div>
    </>
  );
}

export default MainPage;
