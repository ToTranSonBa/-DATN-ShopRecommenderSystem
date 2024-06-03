import axios from '../axios-customize';

const getSellerbyID = async (idSeller) => {
    try {
        const response = await axios.get(`/Sellers?id=${idSeller}`);
        return response;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};
export { getSellerbyID };
