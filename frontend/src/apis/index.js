import axios from "axios";

const apiRequest = async({
    method,endpoint,payload,queryStrings
})=>{
    try {
        const response = await axios({
            method,
            url:endpoint,
            data: payload,
            params : queryStrings,
            headers:{
                Authorization: 'Bearer '+ localStorage.getItem("token"),
            },
        },
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message|| error.message||"something went wrong");
    }
};
export default apiRequest;