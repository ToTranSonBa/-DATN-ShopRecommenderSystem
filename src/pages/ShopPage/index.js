import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import axios from '../../services/axios-customize';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/card/ProductCard';
import { Pagination as PaginationAntd } from 'antd';
import DefaultAVT from '../../assets/default-avatar.png';
import ProductRating from '../../components/card/ProductRating';
import {
    getSellerbyID,
    getProductsQuantitySoldMax,
    getProductsLastest,
    getAllProducts,
    fetchCategories,
    fetchBrands,
} from '../../services/ShopPageApi';

const calculateTimeDifference = (date) => {
    const createdDate = new Date(date);
    const currentDate = new Date();

    let yearsDifference = currentDate.getFullYear() - createdDate.getFullYear();
    let monthsDifference = currentDate.getMonth() - createdDate.getMonth();

    if (monthsDifference < 0) {
        yearsDifference -= 1;
        monthsDifference += 12;
    }

    return { years: yearsDifference, months: monthsDifference };
};

function ShopPage({}) {
    const [brands, setBrands] = useState([]);

    const [seller, setSeller] = useState([]);
    const isFollow = undefined;
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [newProducts, setNewProducts] = useState([]);
    const [bestSellProduct, setBestSellProduct] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [viewType, setViewType] = useState('all'); // state to track which view to show
    const allProductsRef = useRef(null); // ref for all products section
    const [productsPerPage, setProductsPerPage] = useState(20);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    //
    const [loading, setLoading] = useState(true);

    const sellerId = parseInt(useParams().id);

    const { years, months } = calculateTimeDifference(seller.createdAt);
    const getJoinTimeText = (years, months) => {
        if (years < 1 && months < 1) {
            return 'Chưa tới 1 tháng';
        } else if (years < 1) {
            return `${months} tháng trước`;
        } else {
            return `${years} năm ${months} tháng trước`;
        }
    };

    const joinTimeText = getJoinTimeText(years, months);

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const response = await getSellerbyID(sellerId);
                setSeller("seller: ",response);
            } catch (error) {
                setError('Failed to fetch seller');
                console.error('Failed to fetch seller:', error);
            }
        };
        fetchSeller();
    }, [sellerId]);

    const fetchNewProducts = useCallback(async () => {
        try {
            const response = await getProductsLastest(0, 5, sellerId);
            if (response && response.products) {
                // Kiểm tra response và response.data có tồn tại
                setNewProducts(response.products);
                console.log(' response new product: ', response.products); // Cập nhật sản phẩm
            } else {
                setNewProducts([]); // Nếu không có dữ liệu, setProducts với một mảng trống
            }
        } catch (error) {
            setError('Failed to fetch seller');
            console.error('Failed to fetch seller:', error);
        }
    }, [sellerId]);

    const fetchBestSellProducts = useCallback(async () => {
        try {
            const response = await getProductsQuantitySoldMax(0, 5, sellerId);

            if (response && response.products) {
                // Kiểm tra response và response.data có tồn tại
                setBestSellProduct(response.products);
                console.log(' response getProductsQuantitySoldMax: ', response.products); // Cập nhật sản phẩm
            } else {
                setBestSellProduct([]); // Nếu không có dữ liệu, setProducts với một mảng trống
            }
        } catch (error) {
            setError('Failed to fetch seller');
            console.error('Failed to fetch seller:', error);
        }
    }, [sellerId]);

    const fetchAllProducts = useCallback(async () => {
        try {
            const response = await getAllProducts(currentPage, productsPerPage, sellerId); // Thay 'someSellerID' bằng ID hợp lệ
            console.log('res all product: ', response);
            if (response && response.products) {
                // Kiểm tra response và response.data có tồn tại
                setAllProducts(response.products);
                setTotalProducts(response.totalProducts); // Cập nhật sản phẩm
            } else {
                setAllProducts([]); // Nếu không có dữ liệu, setProducts với một mảng trống
            }
        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setLoading(false); // Kết thúc quá trình loading dữ liệu
        }
    }, [sellerId, currentPage, productsPerPage]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchAllProducts();
            await fetchBestSellProducts();
            await fetchNewProducts();
        };
        fetchData();
    }, [sellerId, currentPage, productsPerPage]);

    // const fetchCategories = useCallback(async () => {
    //     try {
    //         const response = await fetchCategories();
    //         console.log('categories data: ', response);
    //         setCategories(response.data.data);
    //     } catch (error) {
    //         console.error('Failed to fetch categories:', error);
    //     }
    // });
    // const fetchBrands = useCallback(async () => {
    //     try {
    //         const response = await fetchBrands();
    //         console.log('categories data: ', response);
    //         setBrands(response.data);
    //     } catch (error) {
    //         console.error('Failed to fetch brands:', error);
    //     }
    // });
    // useEffect(() => {
    //     const fetchData = async () => {
    //         await fetchCategories();
    //         await fetchBrands();
    //     };
    //     fetchData();
    // }, []);
    // Pagination

    async function handlePagination(value) {
        try {
            setCurrentPage(value - 1);
            fetchAllProducts();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSizePagination(current, pageSize) {
        try {
            setProductsPerPage(pageSize);
            fetchAllProducts();
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
        fetchAllProducts();
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
        fetchAllProducts();
    };
    //

    const formatNumber = (num) => {
        return new Intl.NumberFormat('de-DE').format(num);
    };

    const handleViewAll = (type) => {
        setViewType(type);
        if (allProductsRef.current) {
            allProductsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="lg:pt-44">
            <MaxWidthWrapper>
                <div className="bg-white">
                    {error && <div>{error}</div>}
                    <div className="flex justify-around w-full h-auto lg:py-4">
                        <div className="bg-gray-300 lg:rounded-r-md ">
                            <div className="flex items-center justify-between lg:gap-4 lg:px-4 lg:py-4 backdrop-blur-3xl">
                                <div className="flex justify-center items-center bg-gray-500 rounded-full w-[90px] h-[90px]">
                                    <img
                                        className="rounded-full object-cover w-[80px] h-[80px]"
                                        src={seller?.imageUrl ? seller?.imageUrl : DefaultAVT}
                                        alt="this is avt"
                                    />
                                </div>
                                <div>
                                    <span className="flex items-center w-full font-medium text-white lg:gap-2 lg:leading-8 lg:text-lg">
                                        {seller?.name}
                                    </span>
                                    <span className="block font-light text-white lg:text-md">
                                        Online <span>1</span> <soan>giờ </soan>trước
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-around backdrop-blur-3xl lg:py-4 lg:px-4 lg:gap-4">
                                {isFollow ? (
                                    <button className="flex items-center justify-center text-red-700 border-2 border-red-500 lg:gap-1 lg:rounded-r-sm lg:w-1/2">
                                        Đang theo dõi{' '}
                                    </button>
                                ) : (
                                    <button className="flex items-center justify-center text-white border-2 lg:gap-1 lg:rounded-r-sm lg:w-1/2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                        Theo dõi{' '}
                                    </button>
                                )}

                                <button className="flex items-center justify-center text-white border-2 lg:gap-1 lg:rounded-r-sm lg:w-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                        />
                                    </svg>
                                    Chat
                                </button>
                            </div>
                        </div>
                        <div className="flex-row">
                            <div className="flex items-center w-full lg:gap-2 lg:py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                                <span> Sản phẩm: </span>
                                <span className="font-light text-red-700">59</span>
                            </div>
                            <div className="flex items-center w-full lg:gap-2 lg:py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                    />
                                </svg>

                                <span> Đang theo: </span>
                                <span className="font-light text-red-700">9</span>
                            </div>
                            <div className="flex items-center w-full lg:gap-2 lg:py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                    />
                                </svg>

                                <span> Tỉ lệ phản hồi chat: </span>
                                <span className="font-light text-red-700">90% (Trong vài giờ)</span>
                            </div>
                            <div className="flex items-center w-full lg:gap-2 lg:py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                    />
                                </svg>

                                <span> Tỉ lệ shop huỷ đơn: </span>
                                <span className="font-light text-red-700">33%</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center w-full lg:gap-2 lg:py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                    />
                                </svg>

                                <span> Người theo dõi: </span>
                                <span className="font-light text-red-700">{seller?.totalFollower}</span>
                            </div>
                            <div className="flex items-center w-full lg:gap-2 lg:py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    />
                                </svg>

                                <span> Đánh giá: </span>
                                <div>
                                    <span className="font-light text-red-700">{seller?.avgRatingPoint}</span>
                                    <span className="font-light text-red-700 lg:pl-1">({seller?.reviewCount})</span>
                                </div>
                            </div>
                            <div className="flex items-center w-full lg:gap-2 lg:py-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                                    />
                                </svg>

                                <span> Tham gia: </span>
                                <span className="font-light text-red-700">{joinTimeText}</span>
                            </div>
                        </div>
                    </div>
                    <ul className="flex justify-between w-full border-t-2 lg:py-4 lg:px-12">
                        <li className="relative group">
                            <span className="text-red-700 uppercase after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-red-700">
                                Shop
                            </span>
                        </li>
                        <a href="#allproduct">
                            {' '}
                            <li className="text-lg uppercase hover:text-red-700 hover:cursor-pointer">
                                Tất cả sản phẩm
                            </li>
                        </a>
                        {/* <a href="#recommendforu">
                            <li className="text-lg hover:text-red-700 hover:cursor-pointer">Gợi ý cho bạn</li>
                        </a> */}
                        <a href="#newproduct">
                            <li className="text-lg uppercase hover:text-red-700 hover:cursor-pointer">Sản phẩm mới</li>
                        </a>
                        <a href="#bestsellproduct">
                            <li className="text-lg uppercase hover:text-red-700 hover:cursor-pointer">Sản phẩm bán chạy</li>
                        </a>
                    </ul>
                </div>
            </MaxWidthWrapper>
            <div id="newproduct" className="bg-gray-100 lg:py-8">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <span className="uppercase lg:text-xl">Sản phẩm mới</span>
                        <a
                            href="#"
                            className="flex items-center text-red-700 hover:underline"
                            onClick={() => handleViewAll('new')}
                        >
                            Xem tất cả{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-5"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center justify-between flex-nowrap lg:py-4 lg:rounded-md lg:gap-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                            {newProducts.map((product) => (
                                <ProductCard
                                    key={product?.product.iD_NK}
                                    image={product?.images[0].image}
                                    product={product?.product}
                                />
                            ))}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
            <div id="bestsellproduct" className="bg-gray-100 lg:py-8">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <span className="uppercase lg:text-xl">Sản phẩm bán chạy</span>
                        <a
                            href="#"
                            className="flex items-center text-red-700 hover:underline"
                            onClick={() => handleViewAll('bestsell')}
                        >
                            Xem tất cả{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-5"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center justify-between flex-nowrap lg:py-4 lg:rounded-md lg:gap-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                            {bestSellProduct.map((product) => (
                                <ProductCard
                                    key={product?.product.iD_NK}
                                    image={product?.images[0].image}
                                    product={product?.product}
                                />
                            ))}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
            <div id="allproduct" className="bg-gray-100 lg:py-8">
                <MaxWidthWrapper>
                    <div className="flex justify-between lg:pb-4">
                        <span className="uppercase lg:text-xl">Tất cả sản phẩm</span>
                        <a href="#" className="flex items-center text-red-700 hover:underline">
                            Xem tất cả{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-5"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex bg-white rounded-lg">
                        {/* layout 2 cột */}
                        <div className="flex w-full m-auto md:flex-row">
                            {/* cột trái 1/5 chứa filter */}
                            {/* <div className="flex-1 hidden pr-4 md:block md:flex-none md:w-1/5">
                                <span className="text-lg font-semibold text-gray-900 sm:text-xl">Bộ lọc tìm kiếm</span>
                                <div className="flex-col items-center mt-4">
                                    <div id="dropdown" className="z-10 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Phân loại
                                        </h6>
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
                                    <div
                                        id="dropdown"
                                        className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Thương hiệu
                                        </h6>
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
                                    <div
                                        id="dropdown"
                                        className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Giá thành
                                        </h6>
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
                                    <div
                                        id="dropdown"
                                        className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Đánh giá
                                        </h6>
                                        <ProductRating ratingAverage={5}></ProductRating>
                                        <ProductRating ratingAverage={4}></ProductRating>
                                        <ProductRating ratingAverage={3}></ProductRating>
                                        <ProductRating ratingAverage={2}></ProductRating>
                                        <ProductRating ratingAverage={1}></ProductRating>
                                    </div>
                                </div>
                            </div> */}
                            {/* cột phải 4/5 chứa products */}
                            <div ref={allProductsRef} className="flex-1 p-4 bg-gray-100 md:flex-none md:w-full">
                                <div className="flex items-center justify-between lg:py-4 lg:rounded-md lg:gap-2">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                                        {allProducts.map((product) => (
                                            <ProductCard
                                                key={product?.product.iD_NK}
                                                image={product?.images[0].image}
                                                product={product?.product}
                                            />
                                        ))}
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
                </MaxWidthWrapper>
            </div>
        </div>
    );
}

export default ShopPage;
