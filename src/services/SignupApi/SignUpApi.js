import axios from '../axios-customize';


export const SignupApi = async (
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber
) => {
    return axios.post('/Accounts/SignUp', {
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber
    });
};
