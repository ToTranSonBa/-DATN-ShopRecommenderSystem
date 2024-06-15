/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import '../../index.css';
import '../../styles/reset.css';
import axios from 'axios';
import ProductCard from '../../components/card/ProductCard';
import ProductRating from '../../components/card/ProductRating';
import { Pagination as PaginationAntd } from 'antd';
import { SearchContext } from '../../components/searchContext';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const { searchQuery, setSearchQuery } = useContext(SearchContext);

    const [productsPerPage, setProductsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);
    const [minReview, setMinReview] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7016/api/Categories?level=0');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    }, []);

    const fetchBrands = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7016/api/Brands');
            setBrands(response.data);
        } catch (error) {
            console.error('Failed to fetch brands:', error);
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const categoriesParam = new URLSearchParams();
            selectedCategories.forEach((element) => {
                categoriesParam.append('CategoryIds', element);
            });

            const brandsParam = new URLSearchParams();
            selectedBrands.forEach((element) => {
                brandsParam.append('BrandIds', element);
            });

            const response = await axios.get(
                `https://localhost:7016/api/Products/GetProductsByTrainning?${categoriesParam}${brandsParam}`,
                {
                    params: {
                        ProductName: localStorage.getItem('searchQuery'),
                        MinPrice: minPrice,
                        MaxPrice: maxPrice,
                        MinReviewRating: minReview,
                        // PageNumber: currentPage,
                        // PageSize: productsPerPage,
                    },
                },
            );

            console.log(response.data.product);

            response.data.product.forEach((element) => {
                const temp = element.product.image;
                element.product.image = temp.substring(15, temp.indexOf("'", 15));
            });

            setTotalProducts(response.data.totalCount);
            setProducts(response.data.product);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }, []);

    const fetchData = useCallback(async () => {
        await fetchProducts();
        await fetchCategories();
        await fetchBrands();
    }, []);

    useEffect(() => {
        const storedSearchQuery = localStorage.getItem('searchQuery');
        if (storedSearchQuery) setSearchQuery(storedSearchQuery);

        fetchData();
    }, []);

    async function handlePagination(value) {
        try {
            setCurrentPage(value - 1);
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSizePagination(current, pageSize) {
        try {
            setProductsPerPage(pageSize);
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCategory = (category) => {
        const index = selectedCategories.indexOf(category.iD_NK);

        if (index !== -1) {
            selectedCategories.splice(index, 1);
        } else {
            const updateCaregories = selectedCategories;
            updateCaregories.push(category.iD_NK);
            setSelectedCategories(updateCaregories);
        }

        setCurrentPage(1);
        fetchProducts();
    };

    const handleBrand = (brand) => {
        const index = selectedBrands.indexOf(brand.iD_NK);

        if (index !== -1) {
            selectedBrands.splice(index, 1);
        } else {
            const updateBrands = selectedBrands;
            updateBrands.push(brand.iD_NK);
            setSelectedBrands(updateBrands);
        }

        setCurrentPage(1);
        fetchProducts();
    };

    return (
        <div className="pt-40 shop-page bg-background">
            {/* layout 2 cột */}
            <div className="flex w-11/12 m-auto md:flex-row sm:w-3/4">
                {/* cột trái 1/5 chứa filter */}
                <div className="flex-1 hidden pr-4 md:block md:flex-none md:w-1/5">
                    <span className="text-lg font-semibold text-gray-900 sm:text-xl">Bộ lọc tìm kiếm</span>
                    <div className="flex-col items-center mt-4">
                        <div id="dropdown" className="z-10 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Phân loại</h6>
                            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                {categories.map((category) => (
                                    <li key={category.iD_NK} className="flex items-center">
                                        <input
                                            id={category.category.name}
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-700-600 focus:ring-blue-700-500 dark:focus:ring-blue-700-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            onClick={() => handleCategory(category.category)}
                                        />
                                        <label
                                            htmlFor={category.category.name}
                                            className="py-1 ml-2 text-sm text-gray-900 dark:text-gray-100"
                                        >
                                            {category.category.name} ({category.total})
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="dropdown" className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Thương hiệu</h6>
                            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                {brands.map((brand) => (
                                    <li key={brand.brand.ID_NK} className="flex items-center">
                                        <input
                                            id={brand.brand.name}
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-700-600 focus:ring-blue-700-500 dark:focus:ring-blue-700-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            onClick={() => handleBrand(brand.brand)}
                                        />
                                        <label
                                            htmlFor={brand.brand.name}
                                            className="py-1 ml-2 text-sm text-gray-900 dark:text-gray-100"
                                        >
                                            {brand.brand.name} ({brand.totalProduct})
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="dropdown" className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Giá thành</h6>
                            <div>
                                <div class="flex flex-col mt-2 rounded-md shadow-sm">
                                    <div className="flex mb-4">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                        <span className="m-2 text-sm"> đến </span>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <a
                                        href="#a"
                                        className="p-2 text-sm font-medium text-center text-blue-700 bg-white border border-blue-700 rounded-lg hover:text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                                    >
                                        Áp dụng
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="dropdown" className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Đánh giá</h6>
                            <ProductRating ratingAverage={5}></ProductRating>
                            <ProductRating ratingAverage={4}></ProductRating>
                            <ProductRating ratingAverage={3}></ProductRating>
                            <ProductRating ratingAverage={2}></ProductRating>
                            <ProductRating ratingAverage={1}></ProductRating>
                        </div>
                    </div>
                </div>

                {/* cột phải 4/5 chứa products */}
                <div className="flex-1 md:flex-none md:w-4/5">
                    {searchQuery ? (
                        <span className="text-lg font-semibold text-gray-900 sm:text-xl">
                            Kết quả tìm kiếm của "{searchQuery}" - {totalProducts} sản phẩm
                        </span>
                    ) : (
                        <span className="text-lg font-semibold text-gray-900 sm:text-xl">
                            Kết quả tìm kiếm - {totalProducts} sản phẩm
                        </span>
                    )}
                    {/* danh sách sản phẩm */}
                    <div className="mt-4 product-content">
                        <div className="flex items-center justify-center bg-background">
                            <div className="">
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                                    {products.map((product) => (
                                        <ProductCard key={product.idx} product={product.product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* phân trang */}
                    <div className="flex justify-center m-8">
                        <PaginationAntd
                            defaultPageSize={20}
                            defaultCurrent={1}
                            total={totalProducts}
                            onChange={handlePagination}
                            onShowSizeChange={handleSizePagination}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
