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
        console.error('Failed to fetch categories:', error);
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
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};
export { getSellerApi, updateSellerApi };
