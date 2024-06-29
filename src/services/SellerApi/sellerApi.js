import axios from '../axios-customize';

const getSellerApi = async (token) => {
    try {
        return axios.get('/Accounts/GetUserSeller', {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to fetch GetUserSeller:', error);
        throw error;
    }
};

const getCategoriesApi = async () => {
    try {
        return axios.get(`/Categories?level=${0}`);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

const getBrandsApi = async () => {
    try {
        return axios.get(`/Brands`);
    } catch (error) {
        console.error('Failed to fetch getBrandsApi:', error);
        throw error;
    }
};

const updateSellerApi = async (name, imageUrl, address, phone, token) => {
    try {
        return axios.put('/Accounts/UpdateUserSeller', {
            name: name,
            imageUrl: imageUrl,
            address: address,
            phone: phone
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to updateSellerApi:', error);
        throw error;
    }
};
export { getSellerApi, updateSellerApi, getCategoriesApi, getBrandsApi };
