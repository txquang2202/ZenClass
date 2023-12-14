import React from "react";

function Event(props) {
  return (
    <section className="border p-4 rounded-lg flex flex-col mt-3">
      <h2 className="font-semibold">Upcoming events</h2>
      <p className="mt-3 mb-3 text-gray-400">There are no upcoming events</p>
      <a href="#!" className="ml-auto text-blue-400">
        See all
      </a>
    </section>
  );
}

export default Event;
