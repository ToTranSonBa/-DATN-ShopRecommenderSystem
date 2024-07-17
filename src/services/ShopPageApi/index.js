import { useCallback } from 'react';
import axios from '../axios-customize';

const getSellerbyID = async (idSeller, token) => {
    try {
        let response;
        if (token) {
            response = await axios.get(
                `/Sellers/${idSeller}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
        } else {
            response = await axios.get(`/Sellers/${idSeller}`);
        }
        return response;
    } catch (error) {
        console.error('Failed to fetch seller:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};

const getProductsQuantitySoldMax = async (pageNumber, pageSize, idSeller) => {
    try {
        const response = await axios.get(
            `/Sellers/QuantitySoldProducts/${idSeller}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        );
        console.log('Full response getProductsQuantitySoldMax: ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to fetch products best quantity: ', error);
        throw error;
    }
};

const getProductsLastest = async (pageNumber, pageSize, idSeller) => {
    try {
        const response = await axios.get(
            `/Sellers/LastestProducts/${idSeller}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        );
        console.log('Full response getProducts Lastest: ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to fetch products best quantity: ', error);
        throw error;
    }
};

const getAllProducts = async (pageNumber, pageSize, idSeller) => {
    try {
        const response = await axios.get(
            `/Sellers/LastestProducts/${idSeller}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        );
        console.log('Full response get All Products : ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to fetch products best quantity: ', error);
        throw error;
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get('/Categories?level=0');
        console.log('Full response get All Categories lv 0 : ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to fetch products best quantity: ', error);
        throw error;
    }
};

const fetchBrands = async () => {
    try {
        const response = await axios.get('/Brands');
        console.log('Full response get All Brands : ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to fetch products best quantity: ', error);
        throw error;
    }
};

const followApi = async (shopId, token) => {
    try {
        const response = await axios.post(`/Accounts/Customer/Shop/Follow?shopid=${shopId}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        console.log('Full response getFollowApi : ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to follow: ', error);
        throw error;
    }
};

const unFollowApi = async (shopId, token) => {
    try {
        const response = await axios.delete(`/Accounts/Customer/Shop/Unfollow?shopid=${shopId}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        console.log('Full response get unFollowApi: ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to unFollow: ', error);
        throw error;
    }
};

export { getSellerbyID, getProductsQuantitySoldMax, getProductsLastest, getAllProducts, fetchCategories, fetchBrands, followApi, unFollowApi };
