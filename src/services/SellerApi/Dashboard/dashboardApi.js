import axios from '../../axios-customize';

const getSellerInforForDashboard = async (token) => {
    try {
        return axios.get('/Accounts/Seller/InfoStatus', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Failed to fetch getSellerInforForDashboard:', error);
        throw error;
    }
};

const getOrdersAndFollowsForDashboard = async (token) => {
    try {
        return axios.get('/Accounts/Seller/OrderDashboard', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Failed to fetch getSellerInforForDashboard:', error);
        throw error;
    }
};


const getOrderColumnGraphForDashboard = async (token) => {
    try {
        return axios.get('/Accounts/Seller/OrderColumnGraph', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Failed to fetch getOrderColumnGraphForDashboard:', error);
        throw error;
    }
};


const getRevenueDataForDashboard = async (token) => {
    try {
        return axios.get('/Accounts/Seller/IncomeDashboard', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Failed to fetch getOrderColumnGraphForDashboard:', error);
        throw error;
    }
};
export { getSellerInforForDashboard, getOrdersAndFollowsForDashboard, getOrderColumnGraphForDashboard, getRevenueDataForDashboard };
