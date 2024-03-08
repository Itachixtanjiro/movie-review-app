import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Rate, message } from "antd";
import { SetLoading } from "../../redux/loadSlice";
import { useNavigate, useParams } from "react-router-dom";
import { GetArtistById } from "../../apis/artist";
import { GetMovieByArtistId } from "../../apis/movies";
import { getDateFormat, getDateTimeFormat } from "../../helpers";
function ArtistInfo() {
  const [artist, setArtist] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const artResponse = await GetArtistById(id);
      setArtist(artResponse.data);
      const moviesResponse = await GetMovieByArtistId(id);
      setMovies(moviesResponse.data);
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
    <div>
      <div className="flex flex-col lg:flex-row gap-10 mb-5">
        <img
          src={artist?.posters[0] || ""}
          alt=""
          className="h-72 w-106 lg:h-[350px] lg:w-[600px] rounded"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-grey-600 mb-2">
            {artist?.name}
          </h1>
          <hr />
          <div className="flex flex-col gap-1 font-semibold text-grey-600 w-96 text-sm mt-5">
            <div className="flex justify-between">
              <span>Profession</span>
              <span className="capitalise">{artist?.profession}</span>
            </div>
            <div className="flex justify-between">
              <span>DOB</span>
              <span className="capitalise">{getDateFormat(artist?.dob)}</span>
            </div>
            <div className="flex justify-between">
              <span>Debut Year</span>
              <span className="capitalise">{artist?.debutYear}</span>
            </div>
            <div className="flex justify-between">
              <span>Debut Movie</span>
              <span className="capitalise">{artist?.debutMovie}</span>
            </div>
            <div className="flex justify-between">
              <span>Bio</span>
              <span className="capitalise">{artist?.bio}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <span className="text-grey-600 font-semibold text-xl">Cast & Crew</span>

        <div className="mt-2 flex gap-5">
          {movies.map((movie) => {
            return (
              <div
                key={artist?._id}
                className="cursor-pointer flex flex-col"
                onClick={() => navigate("/movie/${movie?._id}")}
              >
                <img
                  src={movies?.posters[0] || ""}
                  alt=""
                  className="w-24 h-20 rounded"
                />
                <span className="text-sm text-grey-600">{movie?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ArtistInfo;
