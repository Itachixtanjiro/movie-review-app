import apiRequest from ".";
export const RegisterUser= async(payload)=>{
    try {
        const response = await apiRequest({
            method: "POST",
            endpoint:'http://localhost:5000/api/users/register',
            payload,
        });
        return response;
    } catch (error) {
        console.error("Error in RegisterUser: ", error);
        throw error;
    }
};
export const LoginUser= async(payload)=>{
    try {
        const response = await apiRequest({
            method: "POST",
            endpoint:'http://localhost:5000/api/users/login',
            payload,
        });
        return response;
    } catch (error) {
        console.error("Error in LoginUser: ", error);
        throw error;
    }
};
export const GetCurrentUser = async()=>{
    try {
        const response = await apiRequest({
            method:"GET",
            endpoint:'http://localhost:5000/api/users/get-current-user',
        });
        return response;
    } catch (error) {
        console.error("Error in GetCurrentUser: ", error);
        throw error;
    }
};
export const UpdateUser = async(payload)=>{
    return await apiRequest({
        method:'PUT',
        endpoint:'/api/users/update-user',
        payload,
    });
};
export const GetAllUsers = async()=>{
    return await apiRequest({
        method:'GET',
        endpoint: '/api/users/get-all-users',
    });
};