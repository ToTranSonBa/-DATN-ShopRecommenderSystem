import axios from '../axios-customize';

const userApi = async (token) => {
    try {
        return axios.get('/Accounts/UserInformation', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

const updateUserApi = async (firstName, lastName, email, phoneNumber, address, avatar, token) => {
    try {
        return axios.put(
            `/Accounts/UpdateInformation?FirstName=${firstName}&LastName=${lastName}&Email=${email}&PhoneNumber=${phoneNumber}&Address=${address}&Avatar=${avatar}`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

const getOrdersOfUserApi = async (token) => {
    return axios.get(`/Orders/UserOrders2`, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
};

const getSellerByIdApi = async (ID) => {
    return axios.get(`/Sellers/${ID}`);
};

const changePasswordUserApi = async (oldPassword, newPassword, confirmPassword, token) => {
    try {
        let url = `/Accounts/UpdatePassword?PasswordOld=${encodeURIComponent(
            oldPassword,
        )}&PasswordNew=${encodeURIComponent(newPassword)}&PasswordNewConfirm=${encodeURIComponent(confirmPassword)}`;
        console.log('url', url);
        return axios.put(
            url,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

const addReviewApi = async (review, token) => {
    // Hợp nhất các trường vào contentReview
    const content1 = review.content ? `<p>Đúng mô tả: ${review.content}</p>` : '';
    const quality = review.quality ? `<p>Chất lượng sản phẩm: ${review.quality}</p>` : '';
    const comment = review.comment ? `<p>Cảm nhận về sản phẩm: ${review.comment}</p>` : '';

    const contentReview = `${content1}${quality}${comment}`;
    console.log('review: ', review);

    console.log('contentReview: ', contentReview);
    return axios.post(
        `/DetailComments`,
        {
            orderId: review.orderId,
            productId: review.productId,
            sellerId: review.sellerId,
            images: review.images,
            content: contentReview,
            rating: review.rating,
        },
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    );
};

export { userApi, updateUserApi, getOrdersOfUserApi, changePasswordUserApi, getSellerByIdApi, addReviewApi };
