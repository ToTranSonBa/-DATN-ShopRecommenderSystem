import axios from '../axios-customize';
const fetchCategories = async () => {
    try {
        const response = await axios.get('/Categories?level=0');
        return response;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};

const fetchCartUser = async (token) => {
    try {
        const response = await axios.get('/CartItems/UserCartItems', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        console.log('response cart user api: ', response);

        return response;
    } catch (error) {
        console.error('Failed to fetch CartUser: ', error);
        throw error;
    }
};

const fetchUserInformation = async (token) => {
    try {
        const response = await axios.get('/Accounts/UserInformation', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        return response;
        console.log('response user information api: ', response);
    } catch (error) {
        console.error('Failed to fetch User infomaton: ', error);
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

const fetchTopNewProducts = async () => {
    try {
        const response = await axios.get('Products/GetTopNew');
        return response;
    } catch (error) {
        console.error('Failed to fetch top new products:  ', error);
        throw error;
    }
};
const fetchTopViewProducts = async () => {
    try {
        const response = await axios.get('Products/GetTopView');
        return response;
    } catch (error) {
        console.error('Failed to fetch top view products:  ', error);
        throw error;
    }
};
const fetchRecommendSeller = async () => {
    try {
        const response = await axios.post('/Sellers/foruser/recommend/sellers');
        return response;
    } catch (error) {
        console.error('Failed to fetch recomended sellers:  ', error);
        throw error;
    }
};

export {
    fetchCategories,
    fetchCartUser,
    fetchUserInformation,
    fetchProduct,
    fetchTopPopProducts,
    fetchTopNewProducts,
    fetchTopViewProducts,
    fetchTop10Seller,
    fetchRecommendSeller,
};
