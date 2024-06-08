import axios from '../axios-customize';



const createOrderApi = async (addressId, token) => {
    try {
        return axios.post(`/Orders/CreatOrderForUser?idShippingAddress=${addressId}`, {}, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
    } catch (error) {
        console.error('Lỗi khi gọi createOrderApi:', error);
        throw error;
    }
};

const addOrderItemsApi = async (idOrder, idProduct, idOptionValues, Quantity, token) => {
    return axios.post(`/OrderItems/AddOrderItemsForUser?idOrder=${idOrder}&idProduct=${idProduct}&idOptionValues=${idOptionValues}&Quantity=4${Quantity}`, {}, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

export {
    createOrderApi, addOrderItemsApi
};