import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  getAllGradeReviews,
  deleteReviewByID,
} from "../../services/gradeReviewServices";
import {
  getAllUsersReplies,
  addReply,
  deleteReplyByID,
} from "../../services/replyReviewServices";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useClassDetailContext } from "../../context/ClassDetailContext";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function GradeReviewPage(props) {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  let data;
  if (token) data = jwtDecode(token);

  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState({}); // Use an object instead of an array

  const [newComment, setNewComment] = useState({
    content: "",
    avt: "/path/to/default/avatar.jpg", // replace with actual default avatar path
  });

  console.log("comments");
  console.log(comments);

  console.log("newComment");
  console.log(newComment);

  const { isClassOwner } = useClassDetailContext();

  const dataUser = localStorage.getItem("user");
  const user = JSON.parse(dataUser);
  const avtPath = `${user.img}`;
  const myAvtPath = `/assets/imgs/${user.img}`;

  console.log(avtPath);

  // API get Review
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllGradeReviews(id, token);
        const ReviewData = response.data.gradereviews;
        if (ReviewData) {
          const mappedReview = ReviewData.map((data) => ({
            id: data._id || "",
            // avt: data.avt || "",
            avt: "/assets/imgs/" + data.avt,
            fullname: data.fullname || "",
            userID: data.userID || "",
            date: format(new Date(data.date), "dd MMMM yyyy") || "",
            typeGrade: data.typeGrade || "",
            currentGrade: data.currentGrade || "",
            expectationGrade: data.expectationGrade || "",
            explaination: data.explaination || "",
          }));
          setReviews(mappedReview);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
        toast.error(error.response.message.data);
      }
    };
    fetchUserData();
  }, [navigate, token, id]);

  // delete review
  const handleDeleteReview = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to complete this review?"
    );
    if (isConfirmed) {
      try {
        await deleteReviewByID(id, token);
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== id)
        );
        toast.success("Complete this review successfully");
      } catch (error) {
        console.error("Error complete review:", error);
        toast.error("Error complete review");
      }
    }
  };

  // get comment
  useEffect(() => {
    const fetchCommentsForReview = async (reviewId) => {
      try {
        const response = await getAllUsersReplies(reviewId, token);
        const commentData = response.data.comments;
        if (commentData) {
          const mappedComment = commentData.map((data) => ({
            id: data._id || "",
            username: data.username || "",
            content: data.content || "",
            avt: "/assets/imgs/" + data.avt,
            date: format(new Date(data.date), "dd MMMM yyyy") || "",
          }));
          setComments((prevComments) => ({
            ...prevComments,
            [reviewId]: mappedComment,
          }));

          // Initialize comment input state for the review
          setNewComment((prevNewComment) => ({
            ...prevNewComment,
            [reviewId]: {
              content: "",
              avt: avtPath,
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error(error.response.message.data);
      }
    };

    // Fetch comments for each review
    reviews.map((review) => fetchCommentsForReview(review.id));
  }, [navigate, token, id, reviews, user.img]);

  // add comment
  const handleCreateComment = async (e, reviewId) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "dd MMMM yyyy");

      const response = await addReply(
        reviewId,
        token,
        data.fullname,
        newComment[reviewId]?.content,
        avtPath,
        currentDate
      );

      const createdComment = {
        id: response.data.comment._id || "",
        username: data.fullname || "",
        content: response.data.comment.content || "",
        date: formattedDate || "",
        avt: myAvtPath || "",
      };

      setComments((prevComments) => ({
        ...prevComments,
        [reviewId]: [...(prevComments[reviewId] || []), createdComment],
      }));

      setNewComment((prevNewComment) => ({
        ...prevNewComment,
        [reviewId]: {
          content: "",
          avt: myAvtPath,
        },
      }));
      toast.success("Comment created successfully");
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error(error.response.message.data);
    }
  };

  const handleNewCommentChange = (e, reviewId) => {
    const { value } = e.target;
    console.log(`Review ID: ${reviewId}, Content: ${value}`);

    setNewComment((prevNewComment) => ({
      ...prevNewComment,
      [reviewId]: {
        ...prevNewComment[reviewId],
        content: value,
      },
    }));
  };

  // API delete comment
  const handleDeleteComment = async (reviewId, commentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (isConfirmed) {
      try {
        await deleteReplyByID(commentId, token);
        setComments((prevComments) => {
          const updatedComments = { ...prevComments };
          updatedComments[reviewId] = updatedComments[reviewId].filter(
            (comment) => comment.id !== commentId
          );
          return updatedComments;
        });
        toast.success("Comment deleted successfully");
      } catch (error) {
        console.error("Error deleting comment:", error);
        toast.error("Error deleting comment");
      }
    }
  };

  return (
    <div>
      <h2 className="mt-10 text-2xl text-[#10375c] font-bold mb-4">
        Grade Review
      </h2>
      {/* SEARCH BAR */}
      <div className="flex justify-center mb-5">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-1 px-3 py-3 ps-10 text-sm border-b-[1px] border-gray-200 focus:outline-none shadow-md"
            placeholder="Search..."
            required
          />
        </div>
      </div>

      <section className="feature pt-[34px] pb-[16px] ">
        {reviews.map(
          (item, index) =>
            (isClassOwner || data.userID === item.userID) && (
              <div
                key={index}
                className="container w-[700px] mx-auto rounded-lg shadow-[0_4px_9px_-4px_#3b71ca] mb-10"
              >
                {/* Review */}
                <div className="flex flex-col justify-start rounded-lg p-6">
                  <div className="flex justify-between">
                    <div className="flex">
                      <Avatar
                        alt={item.fullname}
                        src={item.avt}
                        className="mt-1 h-10 w-10"
                      />
                      <div className="ml-3">
                        <span className="font-semibold">
                          {item.fullname} - {item.userID}
                        </span>
                        <span className="text-[#10375c] font-bold text-sm block">
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <CheckCircleOutlineIcon
                      onClick={() => handleDeleteReview(item.id)}
                      className="text-blue-300 cursor-pointer hover:text-blue-500"
                    />
                  </div>
                  <div className="mt-3">
                    <table className="min-w-full bg-white border border-gray-300">
                      {/* HEADER */}
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b">Type grade</th>
                          <th className="py-2 px-4 border-b">Current grade</th>
                          <th className="py-2 px-4 border-b">
                            Expectation grade
                          </th>
                        </tr>
                      </thead>
                      {/* CONTENT */}
                      <tbody>
                        <tr className="text-center">
                          <td className="py-2 px-4 border-b">
                            {item.typeGrade}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.currentGrade}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.expectationGrade}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-2">
                      <span>Explanation:</span>
                      <p className="whitespace-pre-wrap break-words overflow-wrap-break-word text-base font-normal">
                        {item.explaination}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="text-gray-200 h-1" />

                {/* Comment */}
                <div className="flex flex-col space-y-1 pb-5 pl-2 pr-2">
                  <div className="flex rounded-lg p-4">
                    <section className="w-full">
                      <h2 className="text-base text-[#10375c]">Comments</h2>
                      {comments[item.id] &&
                        comments[item.id].map((comment, index) => (
                          <div
                            key={index}
                            className="flex mt-6 justify-between items-center"
                          >
                            <div className="flex">
                              {/* Console log for debugging */}

                              <Avatar
                                alt={comment.username}
                                src={comment.avt}
                              />
                              <div className="ml-3">
                                <span className="font-semibold">
                                  {comment.username}
                                </span>
                                <span className="text-gray-500 text-xs ml-2">
                                  {comment.date}
                                </span>
                                <p className="text-base">{comment.content}</p>
                              </div>
                            </div>
                            <span className="">
                              <RemoveCircleOutlineIcon
                                onClick={() =>
                                  handleDeleteComment(item.id, comment.id)
                                }
                                className="text-gray-300 cursor-pointer hover:text-blue-400"
                              />
                            </span>
                          </div>
                        ))}

                      <form
                        onSubmit={(e) => handleCreateComment(e, item.id)}
                        className="mt-6 flex justify-between"
                      >
                        <Avatar
                          alt={data.fullname}
                          src={myAvtPath}
                          className="mr-3"
                        />
                        <textarea
                          rows="1"
                          name="content" // Set the name to "content" only
                          value={newComment[item.id]?.content || ""}
                          onChange={(e) => handleNewCommentChange(e, item.id)}
                          className="flex-1 p-2 border border-gray-300 rounded-full mr-1 focus:outline-none focus:border-gray-500"
                          placeholder="Add a comment..."
                          style={{ textIndent: "10px" }}
                        />
                        <button
                          type="submit"
                          className="text-[#2E80CE] px-2 py-1 rounded hover:bg-gray-100"
                        >
                          <SendIcon />
                        </button>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            )
        )}
      </section>
    </div>
  );
}

export default GradeReviewPage;
