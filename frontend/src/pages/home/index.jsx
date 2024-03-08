import {useDispatch, useSelector} from "react-redux";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Rate, message } from "antd";
import {SetLoading} from "../../redux/loadSlice";
import { useNavigate } from "react-router-dom";
import {GetAllMovies} from '../../apis/movies';
import Filters from "../../components/Filters";
function Home() {
  const [filters, setFilters] = useState({
    search : "",
    genre:"",
    language:"",
  });
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const {user} = useSelector((state)=>state.users);
  const dispatch = useDispatch();
  const getData = async() =>{
    try {
      dispatch(SetLoading(true));
      const response = await GetAllMovies(filters);
      setMovies(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(()=>{
    getData();
  },[filters.genre, filters.language]);
    return(
        <div>
          <Filters
          filters = {filters}
          setFilters= {setFilters}/>
          <div className="grid grid-cols-1 sm-grid-cols-2 lg:grid-cols-4 gap-10 text-grey-600">
            {movies.map((movie) =>{
              return (<div key={movie?._id} className="cursor-pointer " onClick={()=>{navigate('/movie/${movie._id}')}}>
                <img src= {movie?.posters[0] || ""} alt=""  className="h-44 w-full rounded"/>
               
                <h1 className="text-xl font-semibold text-grey-600">
                  {movie?.name}
                </h1>
                <hr/>
                <div className="flex justify-between text-sm">
                  <span>
                    Language
                  </span>
                  <span className="capitalise">
                    {movie?.language}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>
                    Rating
                  </span>
                  <Rate disabled defaultValue={movie?.rating || 0} allowHalf style={{color: "orange"}}/>
                </div>
              </div>
              );
              })}
          </div>
        </div>

    );
}
export default Home;