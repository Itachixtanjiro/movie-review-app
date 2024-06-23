import { Modal,Rate, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadSlice";
import { useEffect } from "react";
import { AddReview, UpdateReview } from "../../apis/reviews";

export const ReviewForm = function ReviewForm(
  movie,
  reloadData,
  showreviewForm,
  setShowReviewForm,
  selectedReviews
) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const addReview = async () => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (selectedReviews) {
        response =await UpdateReview({
          _id: selectedReviews._id,
          movie: movie._id,
          rating,
          comment,
        });
      } else {
        response= await AddReview({
          movie: movie._id,
          rating,
          comment,
        });
      }
      message.success(response.message);
      reloadData();
      setShowReviewForm(false);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (selectedReviews) {
      setRating(selectedReviews.rating);
      setComment(selectedReviews.comment);
    }
  }, [selectedReviews]);
  return (
    <Modal
      open={showreviewForm}
      onCancel={() => setShowReviewForm(false)}
      centered
      title={selectedReviews ? "Update Reviews" : "Add Reviews"}
      onOk={addReview}
    >
      <div className="flex flex-col gap-2">
        <div className="flex w-full">
          <span className="font-semibold">Movie :</span>
          <span className="ml-2 font-semibold">{movie?.name}</span>
        </div>
        <Rate
          value={rating}
          onChange={(value) => setRating(value)}
          allowHalf
          style={{ color: "orange" }}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter Your Comment Here"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </Modal>
  );
}

export default ReviewForm;

