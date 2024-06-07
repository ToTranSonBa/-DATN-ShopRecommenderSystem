import axios from '../axios-customize';

const getSellerbyID = async (idSeller) => {
    try {
        const response = await axios.get(`/Sellers/${idSeller}`);
        console.log('Full response: ', response); // Thêm dòng này để kiểm tra toàn bộ response
        return response;
    } catch (error) {
        console.error('Failed to fetch seller:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};

export { getSellerbyID };
