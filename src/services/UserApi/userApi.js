import axios from '../axios-customize'

const userApi = async (token) => {
    try {
        return axios.get('/Accounts/UserInformation', {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

const updateUserApi = async (firstName, lastName, email, phoneNumber, address, avatar, token) => {
    try {
        return axios.put(`/Accounts/UpdateInformation?FirstName=${firstName}&LastName=${lastName}&Email=${email}&PhoneNumber=${phoneNumber}&Address=${address}&Avatar=${avatar}`, {}, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

export { userApi, updateUserApi };