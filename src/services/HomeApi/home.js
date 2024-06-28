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
        const response = await axios.get('/Categories?level=0');
        return response;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};

const fetchTop10Seller = async () => {
    try {
        const response = await axios.get('/Sellers/Top10Seller');
        return response;
    } catch (error) {
        console.log('Failed to fetch top 10 seller: ', error);
        throw error;
    }
};

const fetchTopPopProducts = async () => {
    try {
        const response = await axios.get('/Products/GetTopPop');
        return response;
    } catch (error) {
        console.log('Failed to fetch Top product in home page: ', error);
        throw error;
    }
};
const fetchProduct = async ({ searchKey }) => {
    try {
        const response = await axios.get(
            `/Products/GetProductsByTrainning?ProductName=${searchKey}&PageNumber=0&PageSize=10`,
        );
        return response.product; // Assuming response.data contains the array of products
    } catch (error) {
        console.log('Failed to fetch product in home page:', error);
        throw error;
    }
};

export { ProductsApi, fetchCategories, fetchTop10Seller, fetchTopPopProducts, fetchProduct };
