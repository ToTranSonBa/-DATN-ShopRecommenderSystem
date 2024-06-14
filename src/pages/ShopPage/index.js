import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import Avatar from '../../assets/HomeImg/home.jpg';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { getSellerbyID, getProductsQuantitySoldMax, getProductsLastest } from '../../services/ShopPageApi';
//
import { useLocation } from 'react-router-dom';
const data = [
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
    const [seller, setSeller] = useState([]);
    const isFollow = undefined;
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const [error, setError] = useState('');
    const [newProducts, setNewProducts] = useState([]);
    const [allProducts, setAllProdcts] = useState([]);
    const sellerId = 10;
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

                setSeller(response);
            } catch (error) {
                setError('Failed to fetch seller');
                console.error('Failed to fetch seller:', error);
            }
        };

        fetchSeller();
    }, [sellerId]);

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

    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
        };
        fetchData();
    }, [fetchCategories]);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('de-DE').format(num);
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
                                        src={seller.imageUrl}
                                        alt="this is avt"
                                    />
                                </div>
                                <div>
                                    <span className="flex items-center w-full font-medium text-white lg:gap-2 lg:leading-8 lg:text-lg">
                                        {seller.name}
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

                                <span> Tỉ Lệ Phản Hồi Chat: </span>
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

                                <span> Tỉ Lệ Shop Huỷ Đơn: </span>
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
                                <span className="font-light text-red-700">{seller.totalFollower}</span>
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
                                    <span className="font-light text-red-700">{seller.avgRatingPoint}</span>
                                    <span className="font-light text-red-700 lg:pl-1">({seller.reviewCount})</span>
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
                            <span className="text-red-700 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-red-700">
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
                            <li className="text-lg hover:text-red-700 hover:cursor-pointer">Sản phẩm mới</li>
                        </a>
                        <a href="#bestsellproduct">
                            <li className="text-lg hover:text-red-700 hover:cursor-pointer">Sản phẩm bán chạy</li>
                        </a>
                    </ul>
                </div>
            </MaxWidthWrapper>
            {/* <div id="recommendforu" className="bg-gray-100 lg:py-8">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <span className="uppercase lg:text-xl">Gợi ý cho bạn</span>
                        <a
                            href="#"
                            className="flex items-center text-red-700 hover:decoration-red-600 hover:decoration-solid"
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
                            {data.map((product) => (
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
                </MaxWidthWrapper>
            </div> */}
            <div id="newproduct" className="bg-gray-100 lg:py-8">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <span className="uppercase lg:text-xl">Sản phẩm mới</span>
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
                    <div className="flex items-center justify-between flex-nowrap lg:py-4 lg:rounded-md lg:gap-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                            {data.map((product) => (
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
                </MaxWidthWrapper>
            </div>
            <div id="bestsellproduct" className="bg-gray-100 lg:py-8">
                <MaxWidthWrapper>
                    <div className="flex justify-between">
                        <span className="uppercase lg:text-xl">Sản phẩm bán chạy</span>
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
                    <div className="flex items-center justify-between flex-nowrap lg:py-4 lg:rounded-md lg:gap-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                            {data.map((product) => (
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
                            <div className="flex-1 hidden md:block md:flex-none md:w-1/5">
                                <div className="flex-col items-center justify-center p-4">
                                    <div id="dropdown" className="z-10 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Phân loại
                                        </h6>
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
                                    <div
                                        id="dropdown"
                                        className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Thương hiệu
                                        </h6>
                                    </div>
                                    <div
                                        id="dropdown"
                                        className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Giá thành
                                        </h6>
                                    </div>
                                    <div
                                        id="dropdown"
                                        className="z-10 p-3 mt-4 bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <h6 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                                            Đánh giá
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            {/* cột phải 4/5 chứa products */}
                            <div className="flex-1 p-4 bg-gray-100 md:flex-none md:w-4/5">
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
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
}

export default ShopPage;
