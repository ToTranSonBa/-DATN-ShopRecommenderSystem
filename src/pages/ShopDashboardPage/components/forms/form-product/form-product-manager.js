import React, { useState, useEffect } from 'react';

const FormProductManager = () => {
    const [userOption, setUserOption] = useState('view');
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formValues, setFormValues] = useState({
        id: '',
        productName: '',
        productPrice: '',
        shortDescription: '',
        description: '',
        category: '',
        productQuantitySold: '',
        color: '',
        size: '',
    });

    useEffect(() => {
        // Giả lập tải dữ liệu sản phẩm
        const fetchData = async () => {
            const productData = [
                // Dữ liệu mẫu
                {
                    id: 1,
                    productName: 'Sản phẩm A',
                    productPrice: '100000',
                    shortDescription: 'Mô tả ngắn A',
                    description: 'Mô tả chi tiết A',
                    category: 'Danh mục A',
                    productQuantitySold: '10',
                    color: 'Đỏ',
                    size: 'L',
                },
                {
                    id: 2,
                    productName: 'Sản phẩm B',
                    productPrice: '200000',
                    shortDescription: 'Mô tả ngắn B',
                    description: 'Mô tả chi tiết B',
                    category: 'Danh mục B',
                    productQuantitySold: '20',
                    color: 'Xanh',
                    size: 'M',
                },
            ];
            setProducts(productData);
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleOptionClick = (option, product = null) => {
        setUserOption(option);
        if (product) {
            setCurrentProduct(product);
            setFormValues(product);
        } else {
            setCurrentProduct(null);
            setFormValues({
                id: '',
                productName: '',
                productPrice: '',
                shortDescription: '',
                description: '',
                category: '',
                productQuantitySold: '',
                color: '',
                size: '',
            });
        }
    };

    const handleSubmit = () => {
        if (userOption === 'add') {
            setProducts([...products, { ...formValues, id: products.length + 1 }]);
        } else if (userOption === 'edit') {
            setProducts(products.map((product) => (product.id === formValues.id ? formValues : product)));
        }
        setUserOption('view');
    };

    return (
        <div className="mx-auto max-w-screen-2xl">
            {userOption === 'view' && (
                <div>
                    <button
                        className="px-4 py-2 mt-4 mb-4 text-white bg-blue-500 rounded-md"
                        onClick={() => handleOptionClick('add')}
                    >
                        Thêm sản phẩm mới
                    </button>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div key={product.id} className="p-4 border rounded shadow">
                                <h2 className="text-xl font-bold">{product.productName}</h2>
                                <p>Giá: {product.productPrice}</p>
                                <p>Mô tả: {product.shortDescription}</p>
                                <p>Danh mục: {product.category}</p>
                                <p>Số lượng đã bán: {product.productQuantitySold}</p>
                                <p>Màu sắc: {product.color}</p>
                                <p>Kích cỡ: {product.size}</p>
                                <button
                                    className="px-4 py-2 mt-2 text-white bg-green-500 rounded-md"
                                    onClick={() => handleOptionClick('edit', product)}
                                >
                                    Sửa
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {(userOption === 'add' || userOption === 'edit') && (
                <div className="w-full max-w-screen-lg p-5 mx-auto mt-10 border rounded shadow">
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            Tên sản phẩm
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formValues.productName}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                            Giá sản phẩm
                        </label>
                        <input
                            type="text"
                            id="productPrice"
                            name="productPrice"
                            value={formValues.productPrice}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                            Mô tả ngắn
                        </label>
                        <textarea
                            id="shortDescription"
                            name="shortDescription"
                            value={formValues.shortDescription}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Mô tả
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Danh mục
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formValues.category}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productQuantitySold" className="block text-sm font-medium text-gray-700">
                            Số lượng đã bán
                        </label>
                        <input
                            type="text"
                            id="productQuantitySold"
                            name="productQuantitySold"
                            value={formValues.productQuantitySold}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                            Màu sắc
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={formValues.color}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                            Kích cỡ
                        </label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={formValues.size}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 mt-4 text-white bg-blue-500 border border-transparent rounded-md shadow-sm text-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleSubmit}
                    >
                        {userOption === 'add' ? 'Thêm' : 'Sửa'} sản phẩm
                    </button>
                    <button
                        className="inline-flex items-center px-4 py-2 mt-4 ml-4 text-white bg-gray-500 border border-transparent rounded-md shadow-sm text-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={() => handleOptionClick('view')}
                    >
                        Hủy
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormProductManager;
