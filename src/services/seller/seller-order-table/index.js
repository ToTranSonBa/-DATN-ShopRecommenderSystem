import axios from '../../axios-customize';

const fetchOrder = async (token, PageNumber, PageSize) => {
    try {
        const response = await axios.get(`Accounts/Seller/GetListOrder?PageNumber=${PageNumber}&PageSize=${PageSize}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        console.log('Order data in seller api: ', response);
        return response;
    } catch (error) {
        console.error('Failed to fetch Order by Seller: ', error);
        throw error;
    }
};
export { fetchOrder };
