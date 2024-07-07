import axios from '../axios-customize';

const getSellerApi = async (token) => {
    try {
        return axios.get('/Accounts/GetUserSeller', {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to fetch GetUserSeller:', error);
        throw error;
    }
};

const getCategoriesApi = async () => {
    try {
        return axios.get(`/Categories?level=${0}`);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

const getBrandsApi = async () => {
    try {
        return axios.get(`/Brands`);
    } catch (error) {
        console.error('Failed to fetch getBrandsApi:', error);
        throw error;
    }
};

const updateSellerApi = async (name, imageUrl, address, phone, token) => {
    try {
        return axios.put('/Accounts/UpdateUserSeller', {
            name: name,
            imageUrl: imageUrl,
            address: address,
            phone: phone
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to updateSellerApi:', error);
        throw error;
    }
};

const addProductApi = async (productData, token) => {
    console.log('productDataAPI: ', productData);
    try {
        return axios.post('/Products/AddProduct', {
            productName: productData.productName,
            productDescription: productData.description,
            price: productData.productPrice,
            shortDescription: productData.shortDescription,
            categories: productData.category,
            brandID: productData.brand,
            quantity: productData.productQuantitySold,
            images: productData.images

        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to addProductApi:', error);
        throw error;
    }
};

const addProductOptionsApi = async (productOptionsData) => {
    console.log('productOptionsDataAPI: ', productOptionsData);

    try {
        return axios.post('/ProductOptions/OptionOfProduct', {
            idProduct: productOptionsData.idProduct,
            name: productOptionsData.name,
            optionNumber: productOptionsData.optionNumber,
            values: productOptionsData.values,


        }
        );
    } catch (error) {
        console.error('Failed to addProductOptionsApi:', error);
        throw error;
    }
};

const addProductOptionChildrenApi = async (productOptionChildrenData, token) => {
    console.log('productOptionsDataAPI: ', productOptionChildrenData);

    try {
        return axios.post('/Products/AddProductChild', {
            idProduct: productOptionChildrenData.idProduct,
            thumbnail_url: productOptionChildrenData.thumbnail_url,
            price: productOptionChildrenData.price,
            optionValuesID1: productOptionChildrenData.optionValuesID1,
            optionValuesID2: productOptionChildrenData.optionValuesID2,

        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        );
    } catch (error) {
        console.error('Failed to addProductOptionsApi:', error);
        throw error;
    }
};



const deleteProductApi = async (productId, token) => {
    try {
        return axios.delete(`/Products/${productId}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
    } catch (error) {
        console.error('Failed to deleteProductApi:', error);
        throw error;
    }
};

const getProductsBySellerApi = async (pageNumber, PageSize, idSeller) => {
    console.log('pageNumber: ', pageNumber);
    console.log('PageSize: ', PageSize);
    console.log('idSeller: ', idSeller);

    try {
        return axios.get(`/Sellers/Products/${idSeller}?PageNumber=${pageNumber}&PageSize=${PageSize}`
        );
    } catch (error) {
        console.error('Failed to addProductsBySellerApi:', error);
        throw error;
    }
};

const getOptionApi = async (productId) => {
    try {
        return axios.get(`/Products/Option/${productId}`);
    } catch (error) {
        console.error('Failed to fetch getBrandsApi:', error);
        throw error;
    }
};



export {
    getSellerApi, updateSellerApi, getCategoriesApi, getBrandsApi,
    addProductApi, addProductOptionsApi, getProductsBySellerApi, deleteProductApi,
    getOptionApi, addProductOptionChildrenApi
};
