import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Comment from "../../components/Comment/Comment";
import SendIcon from "@mui/icons-material/Send";
import { getComments, postComment } from "../../services/userServices";
import { jwtDecode } from "jwt-decode";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Modal from "../../components/Modal/ClassDetailModal";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function HomeWorkPage(props) {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const data = localStorage.getItem("token");
  const decoded = jwtDecode(data);
  const username = decoded.username;
  const [post, setPost] = useState([
    {
      title: "Poll for Upcoming Topics",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, minus amet? Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!",
    },
  ]);
  const [newPost, setNewPost] = useState({
    title: "Poll for Upcoming Topics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, minus amet? Repellat consequatur quis, deserunt asperiores possimus distinctio quam aut odio atque perferendis inventore dolor ex id omnis sunt debitis!",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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

  // Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    closeModal();
    toast.success("Homework edited successfully:");
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this calss?"
    );
    if (isConfirmed) {
      closeModal();
      toast.success("Class deleted successfully!");
      navigate(`/home/classes/detail/${id}`);
    }
  };

  return (
    <>
      <section className="container w-full lg:max-w-[calc(100%-20rem)] mx-auto mt-10">
        {/* POST */}
        {post.map((item, index) => (
          <div key={index}>
            <section className="flex flex-col">
              <div className="flex justify-between">
                <h2 className="text-4xl text-[#10375c]">{item.title}</h2>
                <span className="text-end">
                  <DriveFileRenameOutlineIcon
                    className="text-[#10375c] cursor-pointer hover:text-blue-400"
                    onClick={openModal}
                  />
                </span>
              </div>
              <div className="mt-1 mb-2">
                <span className="text-gray-500">Hồ Quốc Duy</span>
                <span className="text-gray-400 text-sm"> - 16 thg 11</span>
              </div>
            </section>
            <hr className="mb-3 mt-3 border-indigo-300 border-b-[#10375c]" />
            <div>
              <p>{item.description}</p>
            </div>
          </div>
        ))}

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

      {/* Modal edit*/}
      <Modal show={isModalOpen} handleClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4 text-[#10375c]">
          Edit Homework
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={newPost.title}
            onChange={handleNewPostChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <textarea
            id="description" // Thay đổi id thành "description"
            placeholder="Write your post here..."
            type="text"
            value={newPost.description}
            onChange={handleNewPostChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
          />
        </div>
        <button onClick={() => handleDelete()} className="text-red-400">
          Delete homework
        </button>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default HomeWorkPage;
