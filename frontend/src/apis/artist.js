import apiRequest from ".";
 export const AddArtist = async(payload) =>{
    return await apiRequest ({
        method: "POST",
        endpoint: "/api/artists",
        payload,
    });
 };

export const GetAllArtist = async () => {
    return await apiRequest({
        method: "GET",
        endpoint: "/api/artists",
    });
};
 
export const GetArtistById = async(id)=> {
    return await apiRequest({
        method: "GET",
        endpoint: '/api/artists/${id}',
    });
};

export const UpdateArtist = async(id, payload)=> {
    return await apiRequest({
        method: "PUT",
        endpoint:"/api/artists/${id}",
        payload,
    });
};

export const DeleteArtist = async(id) =>{
    return await apiRequest({
        method:"DELETE",
        endpoint: "/api/artists/${id}",
    });
};