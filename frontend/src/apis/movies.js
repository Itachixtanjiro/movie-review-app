import apiRequest from ".";

export const AddMovies = async(payload) =>{
    return await apiRequest ({
        method: "POST",
        endpoint: "/api/movies",
        payload,
    });
 };

 export const GetAllMovies = async () => {
    return await apiRequest({
        method: "GET",
        endpoint: "/api/movies",
    });
};
 
export const GetMovieById = async(id)=> {
    return await apiRequest({
        method: "GET",
        endpoint: '/api/movies/${id}',
    });
};

export const UpdateMovie = async(id, payload)=> {
    return await apiRequest({
        method: "PUT",
        endpoint:"/api/movies/${id}",
        payload,
    });
};

export const DeleteMovie = async(id) =>{
    return await apiRequest({
        method:"DELETE",
        endpoint: "/api/movies/${id}",
    });
}; 

export const GetMovieByArtistId = async(id) => {
    return await apiRequest({
        method:'GET',
        endpoint:'/api/movies/get-movies-by-artist/${id}',
    })
};