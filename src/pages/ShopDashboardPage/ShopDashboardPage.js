import React, { useEffect, useRef, useState } from 'react';
import '../ShopDashboardPage/ShopDashboardPage.scss';
import {
    BsThreeDots,

} from 'react-icons/bs';

import {
    FaCompass,
} from 'react-icons/fa';

import userdata from './userdata';
import productdata from './productdata';
import categoriesdata from './categoriesdata';
import ordersdata from './ordersdata';

const orders = [
    {
        number: 'WU88191111',
        date: 'January 22, 2021',
        datetime: '2021-01-22',
        invoiceHref: '#',
        total: '$104.00',
        products: [
            {
                id: 1,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '$36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            }, {
                id: 2,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '$36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            }, {
                id: 3,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '$36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            }, {
                id: 4,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '$36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            }, {
                id: 5,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '$36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            },
            , {
                id: 6,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '$36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            },
            , {
                id: 7,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '$36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            },
            // More products...
        ],
    },
    // More orders...
]

function getStatusColorClass(status) {
    switch (status) {
        case 'Expectation':
            return 'expectation-color';
        case 'Assembly':
            return 'assembly-color';
        case 'Delivery':
            return 'delivery-color';
        case 'Done':
            return 'done-color';
        case 'Failed':
            return 'failed-color';
        default:
            return '';
    }
}
const ShopDashboardPage = () => {
    const [selectedData, setSelectedData] = useState('userdata');

    // Hàm xử lý khi người dùng click vào biểu tượng
    const handleIconClick = (dataType) => {
        setSelectedData(dataType);
        setCheckedItems(new Array(dataType.length).fill(false));
        setIsAllChecked(false);
        setSelectedItem(null);
        setIsOpenModal(false);
    };

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Array(userdata.length).fill(false));



    const [selectedItem, setSelectedItem] = useState(null);
    const getTitleName = () => {
        if (selectedItem) {
            return selectedItem.userName || selectedItem.product || selectedItem.category || selectedItem.client;
        }




        switch (selectedData) {
            case 'userdata':
                return 'Users';
            case 'productdata':
                return 'Products';
            case 'categoriesdata':
                return 'Categories';
            case 'ordersdata':
                return 'Orders';
            default:
                return '';
        }
    };

    const getAddButtonContent = () => {
        return selectedItem ? 'Save Change' : `Add ${getTitleName().slice(0, -1)}`;
    };

    const dataMap = {
        userdata,
        productdata,
        categoriesdata,
        ordersdata,
    };

    const currentData = dataMap[selectedData] || [];
    const handleItemClick = (item) => {
        setSelectedItem(item);
        if (selectedData === 'categoriesdata') {
            setSelectedItem(null);
            openModal();
        }
    };

    const handleBackToList = () => {
        setSelectedItem(null);
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const slides = [
        { src: "https://th.bing.com/th/id/OIP.SDPSNNGWcje3D2AqelhNtAHaEL?w=332&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7", alt: "Slide 1" },
        { src: "https://th.bing.com/th/id/OIP.iY8kUBDpiBe7MDujq8_BigHaEK?w=300&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", alt: "Slide 2" },
        { src: "https://th.bing.com/th/id/OIP.4iuvU_HXjT5cv2JHOi9M0gHaE7?w=280&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7", alt: "Slide 3" },
        { src: "https://th.bing.com/th/id/OIP.p2QBjJfEwLeHnQpTWnnP6gHaFK?w=271&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7", alt: "Slide 4" },
        { src: "https://th.bing.com/th/id/OIP.R-yRkj48IzXDeRKz-wO9zwHaDt?rs=1&pid=ImgDetMain", alt: "Slide 5" }
    ];

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
    };


    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <div className="lg:pt-36 shop-dashboard-page">
            <div className="top-navigation">
                <div className="nav-content">
                    <div className="icon-bg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="display-icon"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>

                        {/* <BsJustify className="" /> */}
                    </div>
                    <p className="option-title">Constructor</p>
                </div>

                <div className="nav-content">
                    <p className="option-element">Dashboard</p>
                    <p className="option-element">About Us</p>
                    <p className="option-element">New</p>
                    <p className="option-element">User Policy</p>
                    <p className="option-element">contacts</p>
                    <BsThreeDots className="option-element" />
                </div>

                <div className="search-button">
                    {/* <BsSearch className="" /> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="search-icon"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>

                    <input className="search-element" type="text" placeholder="Search Transactions and Doccuments" />
                </div>

                <div className="nav-content">
                    <div className="account-content">
                        <div className="account-icon-bg">
                            {/* <BsFillPersonFill className="account-icon" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="account-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>

                        <p className="account-name"> Clayton Santos</p>
                    </div>

                    <div className="announcement-icon-content">
                        <div className="icon-bg">
                            <div className="Announcement"></div>
                            {/* <BsBellFill className="display-icon" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="display-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="icon-bg">
                            {/* <BsFillXCircleFill className="display-icon" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="display-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-section">
                <div className="left-navigation">
                    <div className="left-navigation-content">
                        <div
                            className={`icon-bg ${selectedData === 'userdata' ? 'active' : ''}`}
                            onClick={() => handleIconClick('userdata')}
                        >
                            <FaCompass className="display-icon" />
                        </div>
                        <div
                            className={`icon-bg ${selectedData === 'productdata' ? 'active' : ''}`}
                            onClick={() => handleIconClick('productdata')}
                        >
                            {/* <FaStar className="display-icon" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="display-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div
                            className={`icon-bg ${selectedData === 'categoriesdata' ? 'active' : ''}`}
                            onClick={() => handleIconClick('categoriesdata')}
                        >
                            {/* <BsGraphUpArrow className="display-icon" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="display-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div
                            className={`icon-bg ${selectedData === 'ordersdata' ? 'active' : ''}`}
                            onClick={() => handleIconClick('ordersdata')}
                        >
                            <div className="Announcement"></div>
                            {/* <FaFacebookMessenger className="display-icon" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="display-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>


                </div>

                <div className="dashboard-content-section">
                    <div className="management-content">
                        <div className="header-section">
                            <div className="header-title">
                                <div className="list-icon-bg">
                                    {/* <FaListUl className="list-icon" /> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="list-icon"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <p className="title-name">{getTitleName()}</p>
                            </div>

                            <div
                                className="flex text-white min-w-40 h-12 items-center justify-center rounded-lg bg-[#8833ff]"
                                onClick={selectedItem ? handleBackToList : () => setSelectedItem(null)}
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="w-8 pr-2 "
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>

                                <p className="add-button-content">{getAddButtonContent()}</p>
                            </div>
                        </div>

                        {!selectedItem && (
                            <>
                                <div className="filter-section">
                                    <div className="filter-container">
                                        <div className="filter-content">
                                            {/* <BsFilter className="filter-icon" /> */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                class="filter-icon"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>

                                            <p className="filter-name">Filters</p>
                                        </div>
                                        <div className="filter-content">
                                            {/* <BsSearch className="filter-icon" /> */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="filter-icon"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                                />
                                            </svg>
                                            <p className="filter-name">Search</p>
                                        </div>
                                        <div className="filter-content">
                                            {/* <FaPen className="filter-icon" /> */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                class="filter-icon"
                                            >
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                            </svg>

                                            <p className="filter-name">Edit</p>
                                        </div>
                                        <div className="filter-content">
                                            {/* <FaTrashAlt className="filter-icon" /> */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                class="filter-icon"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>

                                            <p className="filter-name">Delete</p>
                                        </div>
                                    </div>
                                </div>

                                <ul className="data-list">
                                    <li className="list-header">

                                        {selectedData === 'userdata' && (
                                            <>
                                                <div className="header-bg header-center text">Photo</div>
                                                <div className="header-bg header-center text">ID</div>
                                                <div className="header-bg header-name text">Name</div>
                                                <div className="header-bg header-center text">Orders</div>
                                                <div className="header-bg header-center text">Revenue</div>
                                                <div className="header-bg header-center text">Earning</div>
                                                <div className="header-bg header-location text">Location</div>
                                                <div className="header-bg header-email text">Email</div>
                                                <div className="header-bg header-center text">Edit</div>
                                            </>
                                        )}
                                        {selectedData === 'productdata' && (
                                            <>
                                                <div className="header-bg header-center-large text">Image</div>
                                                <div className="header-bg header-center text">Producer</div>
                                                <div className="header-bg header-center text">Product</div>
                                                <div className="header-bg header-center text">ID</div>
                                                <div className="header-bg header-center text">Cat</div>
                                                <div className="header-bg header-center text">Link</div>
                                                <div className="header-bg header-center text">Cost</div>
                                                <div className="header-bg header-center text">Extra</div>
                                                <div className="header-bg header-center text">Price</div>
                                                <div className="header-bg header-center text">Priority</div>
                                                <div className="header-bg header-center text">Edit</div>
                                            </>
                                        )}
                                        {selectedData === 'categoriesdata' && (
                                            <>
                                                <div className="header-bg header-name text">Category</div>
                                                <div className="header-bg header-center-large text">ID</div>
                                                <div className="header-bg header-center-large text">Products</div>
                                                <div className="header-bg header-center-large text">Link</div>
                                                <div className="header-bg header-center-large text">Section</div>
                                                <div className="header-bg header-center-large text">Priority</div>
                                                <div className="header-bg header-center text">Edit</div>
                                            </>
                                        )}
                                        {selectedData === 'ordersdata' && (
                                            <>
                                                <div className="header-bg header-center text">ID</div>
                                                <div className="header-bg header-center text">Amount</div>
                                                <div className="header-bg header-center text">Income</div>
                                                <div className="header-bg header-center-large text">Products</div>
                                                <div className="header-bg header-center-large text">Client</div>
                                                <div className="header-bg header-center-large text">Update</div>
                                                <div className="header-bg header-center-large text">Created</div>
                                                <div className="header-bg header-center-large text">status</div>
                                                <div className="header-bg header-center text">Edit</div>
                                            </>
                                        )}
                                    </li>

                                    {currentData.map((item, index) => (
                                        <li key={index} className="user-item" onClick={() => handleItemClick(item)}>

                                            {selectedData === 'userdata' && (
                                                <>
                                                    <div className="header-bg header-center">
                                                        <img
                                                            className="user-avatar"
                                                            src={item.userAvatar}
                                                            alt="User Avatar"
                                                        />
                                                    </div>
                                                    <div className="header-bg header-center text">{item.userId}</div>
                                                    <div className="header-bg header-name text">{item.userName}</div>
                                                    <div className="header-bg header-center text">
                                                        {item.userOrders}
                                                    </div>
                                                    <div className="header-bg header-center text">
                                                        ${item.userRevenue}
                                                    </div>
                                                    <div className="header-bg header-center text">
                                                        ${item.userEarning}
                                                    </div>
                                                    <div className="header-bg header-location text">
                                                        {item.userLocation}
                                                    </div>
                                                    <div className="header-bg header-email text">{item.userEmail}</div>
                                                    <div className="header-bg header-center text">
                                                        {/* <FaPen className="edit-icon" /> */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            class="edit-icon"
                                                        >
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                        </svg>
                                                    </div>
                                                </>
                                            )}

                                            {selectedData === 'productdata' && (
                                                <>
                                                    <div className="header-bg header-center-large">
                                                        <img
                                                            className="product-image"
                                                            src={item.productImage}
                                                            alt="Product"
                                                        />
                                                    </div>
                                                    <div className="header-bg header-center text">{item.producer}</div>
                                                    <div className="header-bg header-center text">{item.product}</div>
                                                    <div className="header-bg header-center text">{item.id}</div>
                                                    <div className="header-bg header-center text">{item.cat}</div>
                                                    <div className="header-bg header-center text">{item.link}</div>
                                                    <div className="header-bg header-center text">${item.cost}</div>
                                                    <div className="header-bg header-center text">{item.extra}</div>
                                                    <div className="header-bg header-center text">${item.price}</div>
                                                    <div className="header-bg header-center text">{item.priority}</div>
                                                    <div className="header-bg header-center text">
                                                        {/* <FaPen className="edit-icon" /> */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            class="edit-icon"
                                                        >
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                        </svg>
                                                    </div>
                                                </>
                                            )}

                                            {selectedData === 'categoriesdata' && (
                                                <>
                                                    <div className="header-bg header-name text">{item.category}</div>
                                                    <div className="header-bg header-center-large text">{item.id}</div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.products}
                                                    </div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.link}
                                                    </div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.section}
                                                    </div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.priority}
                                                    </div>
                                                    <div className="header-bg header-center text">
                                                        {/* <FaPen className="edit-icon" /> */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            class="edit-icon"
                                                        >
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                        </svg>
                                                    </div>
                                                </>
                                            )}

                                            {selectedData === 'ordersdata' && (
                                                <>
                                                    <div className="header-bg header-center text">{item.id}</div>
                                                    <div className="header-bg header-center text">{item.amount}</div>
                                                    <div className="header-bg header-center text">{item.income}</div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.products}
                                                    </div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.client}
                                                    </div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.update}
                                                    </div>
                                                    <div className="header-bg header-center-large text">
                                                        {item.created}
                                                    </div>
                                                    <div className="header-bg header-center-large text">
                                                        <div
                                                            className={`status-color ${getStatusColorClass(
                                                                item.status,
                                                            )}`}
                                                        ></div>
                                                        {item.status}
                                                    </div>
                                                    <div className="header-bg header-center text">
                                                        {/* <BsArrowRight className="edit-icon" /> */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            class="edit-icon"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {isOpenModal && (
                            <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray bg-opacity-10 backdrop-blur-sm">
                                <div className="relative p-4 w-full max-w-4xl max-h-full">
                                    <div className="relative bg-[#EDEFF2] rounded-lg shadow dark:bg-gray-700">
                                        {/* Modal header */}
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-[#6B7A99] dark:text-white">
                                                Terms of Service
                                            </h3>
                                            <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        {/* Modal body */}
                                        <form className="space-y-4 p-8 rounded-lg md:space-y-6 bg-gray-100" onSubmit={(e) => {
                                            e.preventDefault();
                                        }} >
                                            <div className='flex lg:gap-2'>
                                                <div className='w-1/3'>
                                                    <label
                                                        htmlFor="last-name"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Họ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        placeholder="Nguyễn"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div className='w-1/3'>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        placeholder="Văn A"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div className='w-1/3'>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        placeholder="Văn A"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                            </div>

                                            <div className='flex lg:gap-2'>
                                                <div className='w-1/3'>
                                                    <label
                                                        htmlFor="last-name"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Họ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        placeholder="Nguyễn"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div className='w-1/3'>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        placeholder="Văn A"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div className='w-1/3'>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        placeholder="Văn A"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="address"
                                                    className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                >
                                                    Địa chỉ
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    placeholder="Số nhà, Đường, Quận, Thành phố"
                                                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                />
                                            </div>

                                        </form>
                                        {/* Modal footer */}
                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button onClick={closeModal} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                            <button onClick={closeModal} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedItem && (
                            <div className="h-[800px]">
                                {selectedData === 'userdata' && (
                                    <div className="infor-section">
                                        <div className="infor-column h-full">
                                            <div className="infor-box  bg-gray-100">
                                                <div className="grid items-center p-10">
                                                    <img
                                                        className="user-avatar-detail"
                                                        src={selectedItem.userAvatar}
                                                        alt="User Avatar"
                                                    />
                                                    <div className="infor-detail">
                                                        <p className="user-text">{selectedItem.userName}</p>
                                                        <p className="infor-label">{selectedItem.userId}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="infor-box bg-gray-100">
                                                <div className="pt-5 label-box">Analytics</div>
                                                <div className="grid gap-10 p-10">
                                                    <div className="infor-detail">
                                                        <p className="infor-text">$1456</p>
                                                        <p className="infor-label">Total sales </p>
                                                    </div>

                                                    <div className="infor-detail">
                                                        <p className="infor-text">14</p>
                                                        <p className="infor-label">profit sales </p>
                                                    </div>

                                                    <div className="infor-detail">
                                                        <p className="infor-text">78%</p>
                                                        <p className="infor-label">completed </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="infor-column h-full">
                                            <div className=" infor-box bg-gray-100">
                                                <div className="grid pt-5 pb-5 gap-7">
                                                    <div className="label-box">Profile</div>
                                                    <div className="grid gap-4">
                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5 px-2 ">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 px-3 py-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 px-3 py-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 px-3 py-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5 px-2">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 px-3 py-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 px-3 py-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 px-3 py-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" infor-box bg-gray-100">
                                                <div className="grid pt-5 pb-5 gap-7">
                                                    <div className="label-box">Analytics</div>
                                                    <div className="grid gap-4">
                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5 px-2">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 p-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 p-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 p-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5 px-2">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 p-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="px-3 py-3 bg-white rounded-lg w-98 infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedData === 'productdata' && (
                                    <div className="infor-section">
                                        <div className="infor-column w-45p">

                                            <form className="space-y-4 p-8 rounded-lg md:space-y-6 bg-gray-100 h-full" onSubmit={(e) => {
                                                e.preventDefault();
                                            }} >
                                                <div className="pb-2 flex justify-center text-[#6b7a99] text-lg ">Analytics</div>
                                                <div className='flex lg:gap-2'>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor="last-name"
                                                            className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                        >
                                                            Họ
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="last-name"
                                                            id="last-name"
                                                            placeholder="Nguyễn"
                                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                        />
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor="first-name"
                                                            className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                        >
                                                            Tên
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="first-name"
                                                            id="first-name"
                                                            placeholder="Văn A"
                                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="address"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Địa chỉ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        id="address"
                                                        placeholder="Số nhà, Đường, Quận, Thành phố"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>


                                                <div>
                                                    <label
                                                        htmlFor="phone-number"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone-number"
                                                        id="phone-number"
                                                        placeholder="0123456789"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Email của bạn
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="name@company.com"

                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="password"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Mật khẩu
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="••••••••"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="confirm-password"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Nhập lại mật khẩu
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirm-password"
                                                        id="confirm-password"
                                                        placeholder="••••••••"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>



                                            </form>
                                        </div>
                                        <div className="infor-column w-45p ">
                                            <div className="infor-box bg-gray-100 p-8 h-auto">
                                                <div className="pb-2 flex justify-center text-[#6b7a99] text-lg ">Analytics</div>
                                                <div id="default-carousel" className="relative w-full" data-carousel="slide">
                                                    {/* Carousel wrapper */}
                                                    <div className="relative h-60 overflow-hidden rounded-lg">
                                                        {slides.map((slide, index) => (
                                                            <div
                                                                key={index}
                                                                className={`flex items-center  justify-center w-full duration-700 ease-in-out ${index === activeIndex ? 'block' : 'hidden'}`}
                                                                data-carousel-item
                                                            >
                                                                <img
                                                                    src={slide.src}
                                                                    className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                                                    alt={slide.alt}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* Slider indicators */}
                                                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                                                        {slides.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                                                                aria-current={index === activeIndex}
                                                                aria-label={`Slide ${index + 1}`}
                                                                data-carousel-slide-to={index}
                                                                onClick={() => goToSlide(index)}
                                                            />
                                                        ))}
                                                    </div>
                                                    {/* Slider controls */}
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                                        data-carousel-prev
                                                        onClick={prevSlide}
                                                    >
                                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                            </svg>
                                                            <span className="sr-only">Previous</span>
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                                        data-carousel-next
                                                        onClick={nextSlide}
                                                    >
                                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                            </svg>
                                                            <span className="sr-only">Next</span>
                                                        </span>
                                                    </button>
                                                </div>

                                            </div>

                                            <div className="infor-box  bg-gray-100">
                                                <div className="pb-2 flex justify-center text-[#6b7a99] text-lg ">Analytics</div>
                                                <p className='block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white'>The new iPad combines the power and capability of a computer with the ease of use and versatility you’d never expect from one. And now it’s even more versatile, with a larger 10.2‑inch Retina display, support for the full-size Smart Keyboard, and the amazing new capabilities of iPadOS. It’s unbelievably fun. And unmistakably iPad.</p>
                                                <br />
                                                <p className='block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white'>With iPad, getting work done is all hustle and no hassle. You can easily edit a document while researching something on the web and making a FaceTime call to a colleague at the same time. Manage all your files in one convenient spot with the Files app.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {selectedData === 'ordersdata' && (
                                    <div className="infor-section h-full">
                                        <div className="infor-column w-45p h-full">

                                            <form className="space-y-4 p-8 rounded-lg md:space-y-6 bg-gray-100 h-full" onSubmit={(e) => {
                                                e.preventDefault();
                                            }} >
                                                <div className="pb-2 flex justify-center text-[#6b7a99] text-lg ">Analytics</div>
                                                <div className='flex lg:gap-2'>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor="last-name"
                                                            className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                        >
                                                            Họ
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="last-name"
                                                            id="last-name"
                                                            placeholder="Nguyễn"
                                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                        />
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor="first-name"
                                                            className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                        >
                                                            Tên
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="first-name"
                                                            id="first-name"
                                                            placeholder="Văn A"
                                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="address"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Địa chỉ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        id="address"
                                                        placeholder="Số nhà, Đường, Quận, Thành phố"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>


                                                <div>
                                                    <label
                                                        htmlFor="phone-number"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone-number"
                                                        id="phone-number"
                                                        placeholder="0123456789"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Email của bạn
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="name@company.com"

                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="password"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Mật khẩu
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="••••••••"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="confirm-password"
                                                        className="block mb-2 text-sm font-medium text-[#6b7a99] dark:text-white"
                                                    >
                                                        Nhập lại mật khẩu
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirm-password"
                                                        id="confirm-password"
                                                        placeholder="••••••••"
                                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                                    />
                                                </div>



                                            </form>
                                        </div>
                                        <div className="infor-column w-45p h-full">
                                            <div className="infor-box bg-gray-100 p-8 h-full">
                                                <div className="pb-2 flex justify-center text-[#6b7a99] text-lg ">Analytics</div>

                                                <main className="max-w-7xl h-[500px] overflow-y-scroll mx-auto lg:mt-16  px-2 sm:px-6 lg:px-4 ">


                                                    <section aria-labelledby="recent-heading" className="">

                                                        <div className="space-y-20  ">
                                                            {orders.map((order) => (
                                                                <div key={order.number}>
                                                                    <table className="mt-4 w-full  text-gray-500 sm:mt-6">
                                                                        <caption className="sr-only">Products</caption>
                                                                        <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                                                                            <tr>
                                                                                <th scope="col" className="sm:w-2/5 lg:w-1/2 pr-4 py-3 font-normal">
                                                                                    Product
                                                                                </th>
                                                                                <th scope="col" className="hidden w-1/5 pr-4 py-3 font-normal sm:table-cell">
                                                                                    Price
                                                                                </th>
                                                                                <th scope="col" className="hidden  py-3 font-normal sm:table-cell">
                                                                                    Status
                                                                                </th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                                                                            {order.products.map((product) => (
                                                                                <tr key={product.id}>
                                                                                    <td className="py-6 pr-4">
                                                                                        <div className="flex items-center">
                                                                                            <img
                                                                                                src={product.imageSrc}
                                                                                                alt={product.imageAlt}
                                                                                                className="w-16 h-16 object-center object-cover rounded mr-2"
                                                                                            />
                                                                                            <div>
                                                                                                <div className="text-sm text-gray-40">{product.name}</div>
                                                                                                <div className="mt-1 sm:hidden">{product.price}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="hidden py-6 pr-4 sm:table-cell">{product.price}</td>
                                                                                    <td className="hidden py-6  sm:table-cell">{product.status}</td>

                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                </main>

                                                <div className="pb-2 flex mt-8 justify-center text-[#6b7a99] text-lg ">total: $500</div>
                                            </div>


                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDashboardPage;
