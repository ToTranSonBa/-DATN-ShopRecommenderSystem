import axios from '../axios-customize';

export const ProductsAPI = async (
    ProductName,
    MinPrice,
    MaxPrice,
    MinReviewRating,
    PageNumber,
    PageSize
) => {
    return axios.post('/Products/', {
        ProductName,
        MinPrice,
        MaxPrice,
        MinReviewRating,
        PageNumber,
        PageSize
    });
};