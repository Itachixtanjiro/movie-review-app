import apiRequest from ".";

export const Uploadimage = async(payload)=>{
    return await apiRequest({
        method: "POST",
        endpoint: "/api/images/upload-image",
        payload,
    });
};