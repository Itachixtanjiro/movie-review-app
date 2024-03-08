import apiRequest from '.';

export const GetQuickSearchFiltersresults = async(payload)=> {
    return await apiRequest({
        method:"GET",
        endpoint:'/api/filters',
        queryStrings:  payload,
    })
};