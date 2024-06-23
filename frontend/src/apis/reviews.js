import apiRequest from ".";

export const AddReview = async(payload) => {
    return await apiRequest({
        method: 'POST',
        endpoint:"/api/reviews",
        payload,
    });
};

export const GetAllReviews = async(payload) => {
    return await apiRequest({
        method: 'GET',
        endpoint:"/api/reviews",
       queryStrings: payload,
    });
};
export const UpdateReview = async(payload) => {
    return await apiRequest({
        method: 'PUT',
        endpoint:"/api/reviews/${payload._id}",
        payload,
    });
};
export const DeleteReview = async(payload) => {
    return await apiRequest({
        method: 'DELETE',
        endpoint:"/api/reviews/${payload._id}",
        payload,
    });
};

