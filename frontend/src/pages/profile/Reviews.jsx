import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Rate, Table, message } from "antd";
import { SetLoading } from "../../redux/loadSlice";
import { getDateTimeFormat } from "../../helpers";
import { DeleteReview, GetAllReviews } from "../../apis/reviews";
import { ReviewForm } from "../MovieInfo/ReviewForm";

function Reviews() {
  const [selectedReviews, setSelectedReviews] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { user } = useSelector((state) => state.users);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const reviewsRes = await GetAllReviews({ user: user._id });
      setReviews(reviewsRes.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const deteteReview = async(review)=> {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteReview({
        _id: review._id,
        movie: review.movie._id,
      });
      message.success(response.message);
      getData();
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
useEffect(() => {
  getData();
}, []);

  const columns = [
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, record) => record.movie.name,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (text, record) => <Rate disabled value={record.rating} allowHalf />,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => getDateTimeFormat(record.createdAt),
    },
    {
      title: "Review",
      dataIndex: "comment",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <i
              className="ri-edit-2-fill"
              onClick={() => {
                setSelectedReviews(record);
                setShowReviewForm(true);
              }}
            ></i>
            <i className="ri-delete-bin-6-line" onClick={() => {
              deteteReview(record);
            }}></i>
          </div>
        );
      },
    },
  ];
  
  return (
    <div>
      <Table dataSource={reviews} columns={columns} />
      {showReviewForm && (
        <ReviewForm
          showReviewForm={showReviewForm}
          setShowReviewForm={setShowReviewForm}
          selectedReviews={selectedReviews}
          reloadData={getData}
          movie={selectedReviews.movie}
        />
      )}
    </div>
  );
}

export default Reviews;
