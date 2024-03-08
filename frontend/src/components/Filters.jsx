import { Input, message } from "antd";
import React from "react";
import { useState } from "react";
import { GetQuickSearchFiltersresults } from "../apis/filters";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Filters({ filters, setFilters }) {
  const [hideResults, setHideResults] = useState(false);
  const [results, setresults] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await GetQuickSearchFiltersresults(filters);
      setresults(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (filters.search) {
      const deBounce = setTimeout(() => {
        getData();
      }, 500);
      return () => clearTimeout(deBounce);
    }
  }, [filters.search]);
  return (
    <div className="mb-5 flex gap-5 items-end lg:flex-row flex-col">
      <div className="w-1/2 relative">
      <Input
        type="text"
        placeholder="Serach Movies / Artists"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        onBlur={() => {
            setTimeout(()=>{
                setHideResults(true);
            }, 200);
        }}
        onFocus={() => setHideResults(false)}
      />
      {filters.search &&
        !hideResults &&
        (results?.movies?.length || results?.artists?.length) && (
          <div className="quick-search-results text-grey-600">
            {results?.movies?.length > 0 &&
              results?.movies?.map((movie) => {
                return (
                 <>
                  <div
                    key={movie?._id}
                    className="flex gap-10 items-center border p-2 cursor-pointer mt-2"
                    onClick={()=> navigate('/movie/${movie?._id}')}
                  >
                    <img
                      src={movie?.posters[0]}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col" >
                        <span className="font-semibold text-grey-600 text-md" >{movie?.name}</span>
                    <span className="text-grey-500 text-sm">Movie</span>
                    </div>
                  </div>
                  
                  </>
                );
            })}     
            {results?.artists?.length > 0 &&
              results?.artists?.map((artist) => {
                return (
                  <div
                    key={artist?._id}
                    className="flex gap-10  items-center border p-2 cursor-pointer mt-2 "
                    onClick={()=> navigate('/artist/${artist?._id}')}
                  >
                    <img
                      src={artist?.images[0]}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col ">
                        <span className="font-semibold text-grey-600 text-md">{artist?.name}</span>
                    <span className="text-grey-500 text-sm">Artist</span>
                    </div>
                  </div>
                );
              })}  
          </div>
        )}
      </div>
      <div>
        <span className="text-sm text-grey-500">
            Select Language
        </span>
        <select>
            <option value="">All</option>
            <option value="hindi">Hindi</option>
            <option value="Englisg">Engilsh</option>
            <option value="kannada">Kannada</option>
            <option value="tamil">Tamil</option>
        </select>
      </div>
      <div>
        <span className="text-sm text-grey-500">Select Genre</span>
        <select name="genre" value={filters.genre} onChange={(e)=> setFilters({...filters,genre: e.target,value})}>
        <option value="">All</option>
            <option value="romance">Romance</option>
            <option value="Thril">Thrill</option>
            <option value="sad">Sad</option>
            <option value="horror">Horror</option>
        </select>
        </div>
    </div>
  );
}

export default Filters;
