import axios from '../axios-customize';


const AddressesApi = async (token) => {
    return axios.get(`/ShippingAddress/GetListAdress`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

const updateAddressDefaultApi = async (id, token) => {
    return axios.put(`/ShippingAddress/ChangeDefaulAddress?id=${id}`, {}, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

const addNewAddressesApi = async (fullName, phoneNumber, address, type, email, token) => {
    return axios.post(`/ShippingAddress/AddNewAddress`,
        {
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            type: type,
            email: email
        },
        {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
};

const updateAddressApi = async (addressId, fullName, phoneNumber, address, type, email, isDefault, token) => {
    return axios.put(`/ShippingAddress/UpdateAdress/${addressId}`,
        {
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            type: type,
            email: email,
            isDefault: isDefault
        },
        {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
};


const addressDefaultApi = async (token) => {
    return axios.get(`/ShippingAddress/GetDefault`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

export {
    AddressesApi, addressDefaultApi, addNewAddressesApi, updateAddressDefaultApi, updateAddressApi
};