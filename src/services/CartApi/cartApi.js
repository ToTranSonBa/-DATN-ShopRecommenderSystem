import axios from '../axios-customize';

const cartsApi = async (token) => {
    return axios.get(`/CartItems/UserCartItems`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

const deleteCartItem = async (idCartItem, token) => {
    return axios.delete(`/CartItems/DeleteCartItems?idCartItem=${idCartItem}`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    })
};

const increaseProduct = async (idProduct, token) => {
    return axios.post(`/CartItems/IncreaseProduct?idProduct=${idProduct}`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    })
};
const decreaseProduct = async (idProduct, token) => {
    return axios.post(`/CartItems/DecreaseProduct?idProduct=${idProduct}`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    })
};

export {
    cartsApi, deleteCartItem, increaseProduct, decreaseProduct
};
