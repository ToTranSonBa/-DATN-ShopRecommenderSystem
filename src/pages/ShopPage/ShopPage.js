/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useCallback } from 'react';
// import "../ShopPage/ShopPage.scss";
import '../../index.css';
import '../../styles/reset.css';
import axios from 'axios';
// import { ProductsApi } from '../../services/HomeApi/home'

const data = {
    ID_NK: 74793,
    ID_SK: 50685547,
    Name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
    ShortDescription:
        'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
    Image: [
        {
            base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            is_gallery: true,
            label: null,
            large_url: 'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            medium_url: 'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            position: null,
            small_url:
                'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            thumbnail_url:
                'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
        },
    ],
    Price: 327750.0,
    ListPrice: 345000.0,
    OriginalPrice: 345000.0,
    RatingAverage: 4.5,
    RatingCount: 0,
    MaxSaleQuantity: 1000,
    MinSaleQuantity: 1,
    Quantity: 1000,
    AllTimeQuantitySold: 2000,
    CreatedAt: '2024-04-26T02:16:45.8174062',
    UpdatedAt: '2024-04-26T02:16:49.3694852',
    DeletedAt: null,
    BrandID_NK: 559,
    CategoryID_NK: 45347,
    SellerID_NK: 2970,
    ShortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
};

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7016/api/Categories?level=0');
            setCategories(response.data.data);
            // console.log(response);
            // console.log(categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                'https://localhost:7016/api/Products?PageNumber=1&PageSize=1000&keyWord=s%C3%A1ch',
            );
            console.log(response);
            setProducts(response.data);
            // console.log(products);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
            await fetchProducts();
        };
        fetchData();
    }, [fetchCategories, fetchProducts]);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('de-DE').format(num);
    };

    return (
        <div className="lg:pt-36 shop-page bg-background">
            {/* layout 2 cột */}
            <div className="flex w-3/4 m-auto md:flex-row">
                {/* cột trái 1/5 chứa filter */}
                <div className="flex-1 hidden md:block md:flex-none md:w-1/5">
                    <div className="flex-col items-center p-4">
                        <div id="dropdown" className="z-10 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Phân loại</h6>
                            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                {categories.map((category) => (
                                    <li key={category.category.ID_NK} className="flex items-center">
                                        <input
                                            id="apple"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <label className="py-1 ml-2 text-sm text-gray-900 dark:text-gray-100">
                                            {category.category.name} ({category.total})
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="dropdown" className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Thương hiệu</h6>
                        </div>
                        <div id="dropdown" className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Giá thành</h6>
                        </div>
                        <div id="dropdown" className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Đánh giá</h6>
                        </div>
                    </div>
                </div>

                {/* cột phải 4/5 chứa products */}
                <div className="flex-1 p-4 md:flex-none md:w-4/5">
                    <div className="product-content">
                        {/* breadcrumb */}
                        <div className="product-content-header ">
                            <div className="flex place-items-start">
                                <nav className="text-sm sm:text-base">
                                    <ol className="inline-flex p-0 space-x-2 list-none">
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="1em"
                                                viewBox="0 0 576 512"
                                                className="transition-colors duration-300 cursor-pointer hover:fill-blue-500"
                                                fill="#4b5563"
                                            >
                                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                                            </svg>
                                            <span className="mx-2">/</span>
                                        </li>
                                        <li className="flex items-center">
                                            <a
                                                href="#a"
                                                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
                                            >
                                                Tools
                                            </a>
                                            <span className="mx-2">/</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-gray-800">Qr Code Generator</span>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        {/* danh sách sản phẩm */}
                        <div className="flex items-center justify-center mt-8 bg-background">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                                    {products.map((product) => (
                                        <div
                                            key={product.iD_NK}
                                            className="max-w-sm bg-white rounded-lg shadow-sm hover:shadow-lg hover:border hover:border-primary"
                                        >
                                            <a href="#a">
                                                {product.allTimeQuantitySold > 1000 && (
                                                    <span className="absolute px-2 py-1 mx-4 my-12 text-xs font-semibold text-orange-500 bg-orange-100 rounded">
                                                        Bán chạy
                                                    </span>
                                                )}

                                                {product?.brandID_NK ? (
                                                    <span className="absolute px-2 py-1 m-4 text-xs font-semibold bg-blue-100 rounded text-primary">
                                                        ✓ Chính hãng
                                                    </span>
                                                ) : (
                                                    <div></div>
                                                )}

                                                <img
                                                    className="p-4 rounded-t-lg"
                                                    src={data.Image[0].base_url}
                                                    alt="product image"
                                                />
                                            </a>
                                            <div className="h-auto px-5 pb-5">
                                                <a href="#a">
                                                    <h3 className="text-lg font-semibold text-gray-900 limit-text">
                                                        {product.name}
                                                    </h3>
                                                </a>
                                                <div className="flex items-center mt-2.5 mb-5">
                                                    <svg
                                                        className="w-5 h-5 text-yellow-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                    <svg
                                                        className="w-5 h-5 text-yellow-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                    <svg
                                                        className="w-5 h-5 text-yellow-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                    <svg
                                                        className="w-5 h-5 text-yellow-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                    <svg
                                                        className="w-5 h-5 text-yellow-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                                                        {typeof product.RatingAverage === 'number'
                                                            ? product.ratingAverage
                                                            : 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between align-bottom">
                                                    {product.originalPrice !== product.price ? (
                                                        <div>
                                                            <p className="text-xs text-gray-300 line-through">
                                                                {formatNumber(product.originalPrice)}₫
                                                            </p>
                                                            <span className="text-xl font-semibold text-gray-900">
                                                                {formatNumber(product.price)}₫
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xl font-semibold text-gray-900">
                                                            {formatNumber(product.originalPrice)}₫
                                                        </span>
                                                    )}
                                                    <a
                                                        href="#a"
                                                        className="p-2 text-sm font-medium text-center text-blue-700 bg-white border border-blue-700 rounded-lg hover:text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                                                    >
                                                        Mua ngay
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* phân trang */}
                    <div className="items-center justify-center hidden p-8 m-auto md:flex">
                        <ul className="flex items-center -mx-[6px]">
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    border border-[#EDEFF1]
                                    text-[#838995] text-base
                                    hover:bg-primary hover:border-primary hover:text-white
                                    "
                                >
                                    <span>
                                        <svg
                                            width="8"
                                            height="15"
                                            viewBox="0 0 8 15"
                                            className="fill-current stroke-current"
                                        >
                                            <path
                                                d="M7.12979 1.91389L7.1299 1.914L7.1344 1.90875C7.31476 1.69833 7.31528 1.36878 7.1047 1.15819C7.01062 1.06412 6.86296 1.00488 6.73613 1.00488C6.57736 1.00488 6.4537 1.07206 6.34569 1.18007L6.34564 1.18001L6.34229 1.18358L0.830207 7.06752C0.830152 7.06757 0.830098 7.06763 0.830043 7.06769C0.402311 7.52078 0.406126 8.26524 0.827473 8.73615L0.827439 8.73618L0.829982 8.73889L6.34248 14.6014L6.34243 14.6014L6.34569 14.6047C6.546 14.805 6.88221 14.8491 7.1047 14.6266C7.30447 14.4268 7.34883 14.0918 7.12833 13.8693L1.62078 8.01209C1.55579 7.93114 1.56859 7.82519 1.61408 7.7797L1.61413 7.77975L1.61729 7.77639L7.12979 1.91389Z"
                                                strokeWidth="0.3"
                                            ></path>
                                        </svg>
                                    </span>
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    border border-[#EDEFF1]
                                    text-[#838995] text-base
                                    hover:bg-primary hover:border-primary hover:text-white
                                    "
                                >
                                    1
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    border border-[#EDEFF1]
                                    text-[#838995] text-base
                                    hover:bg-primary hover:border-primary hover:text-white
                                    "
                                >
                                    2
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    border border-[#EDEFF1]
                                    text-[#838995] text-base
                                    hover:bg-primary hover:border-primary hover:text-white
                                    "
                                >
                                    3
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    border border-[#EDEFF1]
                                    text-[#838995] text-base
                                    hover:bg-primary hover:border-primary hover:text-white
                                    "
                                >
                                    4
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    rounded-md
                                    border border-[#EDEFF1]
                                    text-[#838995] text-base
                                    hover:bg-primary hover:border-primary hover:text-white
                                    "
                                >
                                    <span>
                                        <svg
                                            width="8"
                                            height="15"
                                            viewBox="0 0 8 15"
                                            className="fill-current stroke-current"
                                        >
                                            <path
                                                d="M0.870212 13.0861L0.870097 13.086L0.865602 13.0912C0.685237 13.3017 0.684716 13.6312 0.895299 13.8418C0.989374 13.9359 1.13704 13.9951 1.26387 13.9951C1.42264 13.9951 1.5463 13.9279 1.65431 13.8199L1.65436 13.82L1.65771 13.8164L7.16979 7.93248C7.16985 7.93243 7.1699 7.93237 7.16996 7.93231C7.59769 7.47923 7.59387 6.73477 7.17253 6.26385L7.17256 6.26382L7.17002 6.26111L1.65752 0.398611L1.65757 0.398563L1.65431 0.395299C1.454 0.194997 1.11779 0.150934 0.895299 0.373424C0.695526 0.573197 0.651169 0.908167 0.871667 1.13067L6.37922 6.98791C6.4442 7.06886 6.43141 7.17481 6.38592 7.2203L6.38587 7.22025L6.38271 7.22361L0.870212 13.0861Z"
                                                strokeWidth="0.3"
                                            ></path>
                                        </svg>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
