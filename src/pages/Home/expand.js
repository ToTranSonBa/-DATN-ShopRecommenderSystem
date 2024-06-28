import React, { useState, useRef } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import ForU from '../../assets/foru.png';
import HotDeal from '../../assets/hotdeal.png';
import Trending from '../../assets/treding.jpg';

const allProduct = [
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
    {
        iD_NK: 74793,
        iD_SK: 50685547,
        name: 'Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm',
        shortDescription:
            'Hãy khám phá thế giới cùng cuốn bản đồ khổng lồ đầu tiên ở Việt Nam! Sách gồm 52 tấm bản đồ minh họa sinh động các đặc điểm địa lý và biên giới chính trị, giới thiệu những địa điểm nổi tiếng, những nét văn hóa đặc sắc...',
        image: [
            {
                base_url: 'https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                is_gallery: true,
                label: null,
                large_url:
                    'https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                medium_url:
                    'https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                position: null,
                small_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                thumbnail_url:
                    'https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
            },
        ],
        price: 327750.0,
        listPrice: 345000.0,
        originalPrice: 345000.0,
        ratingAverage: 4.5,
        ratingCount: 0,
        maxSaleQuantity: 1000,
        minSaleQuantity: 1,
        quantity: 1000,
        allTimeQuantitySold: 2000,
        createdAt: '2024-04-26T02:16:45.8174062',
        updatedAt: '2024-04-26T02:16:49.3694852',
        deletedAt: null,
        brandID_NK: 559,
        categoryID_NK: 45347,
        sellerID_NK: 2970,
        shortUrl: 'https://tiki.vn/product-p50685547.html?spid=272190990',
    },
];

const ExpandProduct = () => {
    const productRef = useRef(null);
    const formatNumber = (num) => {
        return new Intl.NumberFormat('de-DE').format(num);
    };
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = (index) => {
        setSelectedIndex(index);
        productRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="w-full h-auto bg-gray-100">
            <div className="flex-row bg-white lg:pt-4">
                <MaxWidthWrapper>
                    <div>
                        <p className="font-medium lg:text-2xl lg:pb-4">Khám phá thêm</p>
                        <ul className="flex items-center gap-1">
                            {[
                                { src: ForU, label: 'Dành cho bạn' },
                                { src: HotDeal, label: 'Top Deal bán chạy' },
                                { src: Trending, label: 'Trending' },
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className={`max-w-52 min-w-52 lg:py-8 lg:px-12 cursor-pointer transition duration-300 ease-in-out transform ${
                                        selectedIndex === index
                                            ? 'bg-primary/10 border-b-2 border-solid border-primary scale-105 animate-wiggle'
                                            : ''
                                    }`}
                                    onClick={() => handleClick(index)}
                                >
                                    <img
                                        data-twe-lazy-load-init
                                        data-twe-lazy-src
                                        src={item.src}
                                        className="mx-auto size-10"
                                    />
                                    <div className="text-nowrap">{item.label}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </MaxWidthWrapper>
            </div>

            <div id="product" ref={productRef} className="flex-1 bg-gray-100 md:flex-none ">
                <MaxWidthWrapper>
                    <div className="flex items-center justify-between lg:py-4 lg:rounded-md lg:gap-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                            {allProduct.map((product) => (
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

                                        {product.image && product.image.length > 0 && (
                                            <img
                                                data-twe-lazy-load-init
                                                data-twe-lazy-src
                                                className="p-4 rounded-t-lg"
                                                src={product.image[0].base_url}
                                                alt="product image"
                                            />
                                        )}
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
                                                {typeof product.ratingAverage === 'number'
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

                    {/* phân trang */}
                    <div className="items-center justify-center hidden p-8 m-auto md:flex">
                        <ul className="flex items-center -mx-[6px]">
                            <li className=" px-[6px]">
                                <a
                                    href="#a"
                                    className="w-9 h-9 flex items-center justify-center bg-white  rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
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
                            <li className=" px-[6px]">
                                <a
                                    href="#a"
                                    className="w-9 h-9 flex items-center justify-center bg-white  rounded-md border border-[#EDEFF1]text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                                >
                                    1
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="w-9 h-9 flex items-center justify-center bg-white  rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                                >
                                    2
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="w-9 h-9 flex items-center justify-center bg-white  rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                                >
                                    3
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="w-9 h-9 flex items-center justify-center bg-white  rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                                >
                                    4
                                </a>
                            </li>
                            <li className="px-[6px]">
                                <a
                                    href="#a"
                                    className="w-9  h-9 flex bg-white  items-center justify-center rounded-md  border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
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
                </MaxWidthWrapper>
            </div>
        </div>
    );
};
export default ExpandProduct;
