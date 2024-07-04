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

const addOrderItemsApi = async (idOrder, idProduct, image, idOptionValues1, idOptionValues2, Quantity, token) => {
    // Construct the URL with conditionally added idOptionValues
    let url = `/OrderItems/AddOrderItemsForUser2?idOrder=${idOrder}&idProduct=${idProduct}&Image=${image}&Quantity=${Quantity}`;
    if (idOptionValues1 !== null && idOptionValues1 !== undefined) {
        url += `&idOptionValues=${idOptionValues1}`;
    }
    if (idOptionValues2 !== null && idOptionValues2 !== undefined) {
        url += `&idOptionValues2=${idOptionValues2}`;
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