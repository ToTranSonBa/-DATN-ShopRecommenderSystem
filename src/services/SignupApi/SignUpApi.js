import axios from '../axios-customize';


const SignupApi = async (
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
    roles
) => {
    return axios.post('/Accounts/Register/Customer', {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        roles: roles,
        phoneNumber: phoneNumber,
        address: address,
    });
};

const signupSellerApi = async (shopName, shopPhoneNumber, shopAddress, token) => {

    console.log('token: ', token)
    return axios.post(`/Accounts/RegisterSeller`, {
        storeName: shopName,
        phone: shopPhoneNumber,
        address: shopAddress,
        imageUrl: 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
    }, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

export { SignupApi, signupSellerApi }
