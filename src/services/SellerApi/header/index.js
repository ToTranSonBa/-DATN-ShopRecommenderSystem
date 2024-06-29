import axios from '../../axios-customize';

const getSellerApi = async (token) => {
    try {
        return axios.get('/Accounts/GetUserSeller', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Failed to fetch getSellerApi:', error);
        throw error;
    }
};
export { getSellerApi };
