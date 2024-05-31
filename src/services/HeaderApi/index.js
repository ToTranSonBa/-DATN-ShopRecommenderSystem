import axios from '../axios-customize';
const fetchCategories = async () => {
    try {
        const response = await axios.get('https://localhost:7016/api/Categories?level=0');
        return response;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
};

export { fetchCategories };
