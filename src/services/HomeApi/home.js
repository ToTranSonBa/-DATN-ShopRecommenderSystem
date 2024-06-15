import axios from '../axios-customize';

const ProductsApi = async () => {
    return axios.get(`/Products/asfasdf`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    });
};
const fetchCategories = async () => {
    try {
        const response = await axios.get('https://localhost:7016/api/Categories?level=0');
        return response;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};

const fetchTop10Seller = async () => {
    try {
        const response = await axios.get('https://localhost:7016/api/Sellers/Top10Seller');
        return response;
    } catch (error) {
        console.log('Failed to fetch top 10 seller: ', error);
        throw error;
    }
};
export { ProductsApi, fetchCategories, fetchTop10Seller };
