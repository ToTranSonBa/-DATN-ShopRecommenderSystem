import { useCallback } from 'react';
import axios from '../axios-customize';

const getSellerbyID = async (idSeller) => {
    try {
        const response = await axios.get(`/Sellers/${idSeller}`);
        // console.log('Full response getSellerbyID: ', response); // Thêm dòng này để kiểm tra toàn bộ response
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

export { getSellerbyID, getProductsQuantitySoldMax, getProductsLastest, getAllProducts };
