import axios from '../axios-customize';

export const detailProductAPI = async (id) => {
    return axios.get('/Products/', {id});
};