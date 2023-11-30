import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Comment from "../../components/Comment/Comment";
import SendIcon from "@mui/icons-material/Send";
import { getComments, postComment } from "../../services/userServices";
import { jwtDecode } from "jwt-decode";

function HomeWorkPage(props) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const data = localStorage.getItem("token");
  const decoded = jwtDecode(data);
  const username = decoded.username;
  /////////////////////////////////////////////////////////////////////////
  /////////////////            CHUA FIX COMMENT   ???????       //////////////////
  /////////////////////////////////////////////////////////////////////////
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
        avatarSrc: "/static/images/avatar/2.jpg",
        date: new Date(),
      };
      try {
        const response = await postComment(newCommentObj);

        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };
  return (
    <>
      <section className="container w-full lg:max-w-[calc(100%-20rem)] mx-auto mt-6">
        {/* POST */}
        <section>
          <h2 className="text-4xl text-[#10375c]">Poll for Upcoming Topics</h2>
          <div className="mt-1 mb-2">
            <span className="text-gray-500">Hồ Quốc Duy</span>
            <span className="text-gray-400 text-sm"> - 16 thg 11</span>
          </div>
        </section>
        <hr className="mb-3 mt-3 border-indigo-300 border-b-[#10375c]" />

        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            minus amet? Repellat consequatur quis, deserunt asperiores possimus
            distinctio quam aut odio atque perferendis inventore dolor ex id
            omnis sunt debitis!
          </p>
        </div>

        {/* COMMENTS*/}
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
      </section>
    </>
  );
}

export default HomeWorkPage;
