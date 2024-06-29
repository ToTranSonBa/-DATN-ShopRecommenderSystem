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

const UpdateStatusOrder = async (token, id, status) => {
    try {
        const response = await axios.put(`/Orders/UpdateStatusOrder${id}?status=${status}`, null, {
            headers: {
                Authorization: `Bearer ${token}`, // Đảm bảo định dạng token đúng
            },
        });
        return response;
    } catch (error) {
        console.error('Failed to update order status: ', error);
        throw error;
    }
};

export { fetchOrder, UpdateStatusOrder };
