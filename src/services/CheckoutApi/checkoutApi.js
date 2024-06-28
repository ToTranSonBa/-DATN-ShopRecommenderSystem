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

const addOrderItemsApi = async (idOrder, idProduct, image, idOptionValues, Quantity, token) => {
    // Construct the URL with conditionally added idOptionValues
    let url = `/OrderItems/AddOrderItemsForUser?idOrder=${idOrder}&idProduct=${idProduct}&Image=${image}&Quantity=${Quantity}`;
    if (idOptionValues !== null && idOptionValues !== undefined) {
        url += `&idOptionValues=${idOptionValues}`;
    }

    // Make the API request
    return axios.post(url, {}, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

export {
    createOrderApi, addOrderItemsApi
};