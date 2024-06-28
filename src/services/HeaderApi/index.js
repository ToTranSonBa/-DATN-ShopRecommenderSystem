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
export { fetchCategories, fetchCartUser, fetchUserInformation, fetchProduct };
