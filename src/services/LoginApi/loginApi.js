import axios from '../axios-customize';

export const loginApi = async (email, password) => {
    return axios.post('/Accounts/Login', { email, password });
};
