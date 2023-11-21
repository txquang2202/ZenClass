import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Comment from "../../components/Comment/Comment";
import SendIcon from "@mui/icons-material/Send";

function HomeWorkPage(props) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      avatarSrc: "/static/images/avatar/2.jpg",
      name: "Lê Ngọc Như Ý",
      content: "Great post! Thanks for sharing.",
      date: "11/21/2023",
    },
  ]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        avatarSrc: "/static/images/avatar/2.jpg",
        name: "New Commenter",
        content: newComment,
        date: new Date().toLocaleDateString(),
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
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
              //   alt={username || "Default User"}
              //   src={userAvatarSrc || "/path/to/default/avatar.jpg"}
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
