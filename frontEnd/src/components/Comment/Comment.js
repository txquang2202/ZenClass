import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { jwtDecode } from "jwt-decode";
import { getComments, postComment } from "../../services/userServices";

function Comment({ avatarSrc, username, content, date }) {
  return (
    <div className="flex mt-6">
      <Avatar alt={username} src={avatarSrc} />
      <div className="ml-3">
        <span className="font-semibold">{username}</span>
        <span className="text-gray-500 text-xs ml-2">{date}</span>
        <p className="text-base">{content}</p>
      </div>
    </div>
  );
}

const ListComment = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const data = localStorage.getItem("token");
  const decoded = jwtDecode(data);
  const username = decoded.username;
  // Get API comment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getComments();
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        username: username,
        content: newComment,
        avt: "/static/images/avatar/2.jpg",
        date: new Date().toISOString(),
      };
      try {
        const response = await postComment(newCommentObj);

        setComments((prevComments) => [...prevComments, response.data.comment]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <>
      <section className="">
        <hr className="mb-3 mt-3 border-indigo-100 border-b-[#10375c]" />
        <h2 className="text-base text-[#10375c]">Comments</h2>

        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}

        {/* Add a form for adding new comments */}
        <form onSubmit={handleCommentSubmit} className="mt-6 flex">
          <Avatar
            alt={"Default User"}
            src={"/path/to/default/avatar.jpg"}
            className="mr-3"
          />
          <textarea
            rows="1"
            className="flex-1 p-2 border border-gray-300 rounded-full mr-1 focus:outline-none focus:border-gray-500"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
            style={{ textIndent: "10px" }}
          />
          <button
            type="submit"
            className=" text-[#2E80CE] px-2 py-1 rounded hover:bg-gray-100"
          >
            <SendIcon />
          </button>
        </form>
      </section>
    </>
  );
};

export default ListComment;
