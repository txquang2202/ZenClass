import React from "react";
import Avatar from "@mui/material/Avatar";

function Comment({ avatarSrc, name, content, date }) {
  return (
    <div className="flex mt-6">
      <Avatar alt={name} src={avatarSrc} />
      <div className="ml-3">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-500 text-xs ml-2">{date}</span>
        <p className="text-base">{content}</p>
      </div>
    </div>
  );
}

export default Comment;
