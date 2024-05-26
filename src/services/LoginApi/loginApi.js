import axios from '../axios-customize';

export const loginApi = async (email, password) => {
    return axios.post('/Accounts/SignIn', { email, password });
};
