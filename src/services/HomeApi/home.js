import axios from '../axios-customize';

const ProductsApi = async () => {
    return axios.get(`/Products/asfasdf`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
};

export {
    ProductsApi
};
