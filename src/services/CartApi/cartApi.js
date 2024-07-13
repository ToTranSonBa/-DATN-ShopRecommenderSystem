import axios from '../axios-customize';

const cartsApi = async (token) => {
    return axios.get(`/CartItems/UserCartItems`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

const addCartApi = async (idProduct, idProductOptionValue1, idProductOptionValue2, ProductOptionImage, quantity, token) => {
    let url = `/CartItems/AddToCart2?idProduct=${idProduct}&ProductOptionImage=${ProductOptionImage}&Quantity=${quantity}`;
    if (idProductOptionValue1 !== null && idProductOptionValue1 !== undefined) {
        url += `&idProductOptionValue1=${idProductOptionValue1}`;
    }

    if (idProductOptionValue2 !== null && idProductOptionValue2 !== undefined) {
        url += `&idProductOptionValue2=${idProductOptionValue2}`;
    }
    return axios.post(url, {}, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
}

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

const updateProduct = async (idProduct, quantity, token) => {
    return axios.put(`/CartItems/UpdateQuantity?idProduct=${idProduct}&Quantity=${quantity}`, {}, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

const fetchPriceByChild = async (productId, idOptionValue1, idOptionValue2) => {
    try {
        let url = `/Products/GetPriceAndImageProductChild${productId}`;
        if (idOptionValue1 !== null && idOptionValue1 !== undefined) {
            url += `?idOptionValue1=${idOptionValue1}`;

        }
        if (idOptionValue2 !== 'null' && idOptionValue2 !== null && idOptionValue2 !== undefined) {
            url += `&idOptionValue2=${idOptionValue2}`;
        }


        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error('Failed to fetch fetchPriceByChild :  ', error);
        throw error;
    }
};
export {
    cartsApi, deleteCartItem, increaseProduct, decreaseProduct, updateProduct, addCartApi, fetchPriceByChild
};
