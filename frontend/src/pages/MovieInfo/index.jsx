import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Rate, message } from "antd";
import { SetLoading } from "../../redux/loadSlice";
import { useNavigate, useParams } from "react-router-dom";
import { GetMovieById } from "../../apis/movies";
import { getDateFormat,getDateTimeFormat } from "../../helpers";
import ReviewForm from "./ReviewForm";
import { GetAllReviews } from "../../apis/reviews";
function MovieInfo() {
  const [reviews, setReviews] = useState();
  const [showreviewForm, setShowReviewForm] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetMovieById(id);
      const reviewsRes = await GetAllReviews({movie: id});
      setMovie(response.data);
      setReviews(reviewsRes.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    movie && (
      <div>
        <div className="flex flex-col lg:flex-row gap-10 mb-5">
          <img
            src={movie?.posters[0] || ""}
            alt=""
            className="h-72 w-106 lg:h-[350px] lg:w-[600px] rounded"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-grey-600 mb-2">
              {movie?.name}
            </h1>
            <hr />
            <div className="flex flex-col gap-1 font-semibold text-grey-600 w-96 text-sm mt-5">
              <div className="flex justify-between">
                <span>Language</span>
                <span className="capitalise">{movie?.language}</span>
              </div>
              <div className="flex justify-between">
                <span>Release Date</span>
                <span className="capitalise">
                  {getDateFormat(movie?.releaseDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Genre</span>
                <span className="capitalise">{movie?.genre}</span>
              </div>
              <div className="flex justify-between">
                <span>Director</span>
                <span className="capitalise">{movie?.director?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Hero</span>
                <span className="capitalise">{movie?.hero?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Heroine</span>
                <span className="capitalise">{movie?.heroine?.name}</span>
              </div>
            </div>
          </div>
        </div>
        <span className="py-5 text-grey-600 text-sm">{movie?.plot}</span>
        <div className="mt-5">
          <span className="text-grey-600 font-semibold text-xl">
            Cast & Crew
          </span>
        
        <div className="mt-2 flex gap-5">
          {movie?.cast.map((artist) => {
            return (
              <div
                key={artist?._id}
                className="cursor-pointer flex flex-col"
                onClick={() => navigate("/artist/${artist?._id}")}
              >
                <img
                  src={artist?.images[0] || ""}
                  alt=""
                  className="w-24 h-20 rounded"
                />
                <span className="text-sm text-grey-600">{artist?.name}</span>
              </div>
            );
          })}
        </div>
        </div>  
        <hr />
        <div className="flex justify-between mt-5">
          <span className="text-xl font-semibold">Reviews</span>
          <Button type="default" onClick={() => setShowReviewForm(true)}>
            Add Reviews
          </Button>
          <div className="flex flex-col gap-2 mt-5">
            {reviews.map((reviews) => {
              return (
                <div
                  key={reviews?.id}
                  className="flex justify-between border-solid border p-2 rounded-sm border-grey-100"
                >
                  <div className="flex flex-col">
                    <span className="text-grey-600 text-md font-semibold">
                      {reviews?.user?.name}
                    </span>
                    <Rate
                      disabled
                      defaultValue={reviews?.rating || 0}
                      allowHalf
                      style={{ color: "orange" }}
                      className="mt-2"
                    />
                    <span className="text-grey-600 text-sm">
                      {reviews?.comment}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-grey-600 text-sm">
                      {getDateTimeFormat(reviews?.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {showreviewForm && (
          <ReviewForm
            movie={movie}
            reloadData={getData}
            showreviewForm={showreviewForm}
            setShowReviewForm={setShowReviewForm}
          />
        )}
      </div>
    )
  );
}

export default MovieInfo;
