import React from "react";
import { Avatar } from "@material-ui/core";

function GradeReviewPage(props) {
  return (
    <div>
      <h2 className="mt-10 text-2xl text-[#10375c] font-bold mb-4">
        Grade Review
      </h2>
      {/* SEARCH BAR */}
      <div className="flex justify-center mb-5">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-1 px-3 py-3 ps-10 text-sm border-b-[1px] border-gray-200 focus:outline-none shadow-md"
            placeholder="Search..."
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
            required
          />
        </div>
      </div>
      <section className="feature pt-[34px] pb-[170px]">
        <div className="container w-[700px]  mx-auto rounded-lg  shadow-[0_4px_9px_-4px_#3b71ca]  ">
          <div className="flex flex-col justify-start rounded-lg p-6">
            <div className="flex">
              <Avatar className=" mt-1 h-10 w-10" />
              <div className="ml-3">
                <span className="font-semibold">Hồ Quốc Duy </span>
                <span className="text-[#10375c] font-bold text-sm block">
                  16 thg 2
                </span>
              </div>
            </div>
            <div className="mt-3">
              <table className="min-w-full bg-white border border-gray-300">
                {/* HEADER */}
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Type grade</th>
                    <th className="py-2 px-4 border-b">Current grade</th>
                    <th className="py-2 px-4 border-b">Expectation grade</th>
                  </tr>
                </thead>
                {/* CONTENT */}
                <tbody>
                  <tr className="text-center">
                    <td className="py-2 px-4 border-b">Projects</td>
                    <td className="py-2 px-4 border-b">5</td>
                    <td className="py-2 px-4 border-b">9</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2">
                <span>Explanation:</span>
                <p className="whitespace-pre-wrap break-words overflow-wrap-break-word text-base font-normal">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </div>
          <hr className="text-gray-200 h-1" />
          <div className="flex flex-col mt-[20px] space-y-1">
            <div className="flex rounded-lg  p-4 "></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GradeReviewPage;
