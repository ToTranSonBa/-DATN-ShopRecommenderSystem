import React, { useEffect, useRef, useState } from 'react';
import '../ShopDashboardPage/ShopDashboardPage.scss';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import {
    BsJustify,
    BsThreeDots,
    BsSearch,
    BsFillPersonFill,
    BsBellFill,
    BsFillXCircleFill,
    BsFillPlusCircleFill,
    BsGraphUpArrow,
    BsHospital,
    BsFilter,
    BsArrowRight,
} from 'react-icons/bs';

import {
    FaCompass,
    FaStar,
    FaFacebookMessenger,
    FaGlobeAmericas,
    FaListUl,
    FaPlusCircle,
    FaPen,
    FaTrashAlt,
} from 'react-icons/fa';

import userdata from './userdata';
import productdata from './productdata';
import categoriesdata from './categoriesdata';
import ordersdata from './ordersdata';

// import Checkbox from '@material-ui/core/Checkbox';
// import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
// import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

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
    };

    const [isAllChecked, setIsAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Array(userdata.length).fill(false));

    const handleAllCheckboxChange = (datatype) => {
        setIsAllChecked(!isAllChecked); // Đảo ngược trạng thái kiểm tra chung
        setCheckedItems(new Array(datatype.length).fill(!isAllChecked)); // Cập nhật trạng thái kiểm tra của từng phần tử trong userdata
    };

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems]; // Tạo một bản sao của mảng trạng thái kiểm tra hiện tại
        newCheckedItems[index] = !newCheckedItems[index]; // Đảo ngược trạng thái kiểm tra của phần tử tại index
        setCheckedItems(newCheckedItems); // Cập nhật mảng trạng thái kiểm tra mới
        setIsAllChecked(newCheckedItems.every((item) => item === true)); // Cập nhật trạng thái kiểm tra chung dựa trên trạng thái kiểm tra của tất cả các phần tử trong userdata
    };

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
    };

    const handleBackToList = () => {
        setSelectedItem(null);
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

                    <div className="left-navigation-content">
                        <div className="icon-bg">
                            {/* <BsFillPlusCircleFill className="display-icon" /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="display-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="mess-bg">
                            <div className="Announcement"></div>
                            <img
                                className="user-avatar"
                                src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain"
                            />
                        </div>

                        <div className="mess-bg">
                            <img
                                className="user-avatar"
                                src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain"
                            />
                        </div>

                        <div className="mess-bg">
                            <img
                                className="user-avatar"
                                src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain"
                            />
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
                                className="add-categories-button"
                                onClick={selectedItem ? handleBackToList : () => setSelectedItem(null)}
                            >
                                {/* <FaPlusCircle className="plus-icon" /> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="plus-icon"
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
                                        {/* <div className="checkbox-bg">
                                            <Checkbox
                                                className="checkbox-color"
                                                checked={isAllChecked}
                                                onChange={() => handleAllCheckboxChange(productdata)}
                                                icon={<CircleUnchecked />} // Biểu tượng khi chưa được tích vào
                                                checkedIcon={<CircleCheckedFilled />} // Biểu tượng khi được tích vào
                                            />
                                        </div> */}
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
                                            {/* <div className="checkbox-bg">
                                                <Checkbox
                                                    className="checkbox-color"
                                                    checked={checkedItems[index]}
                                                    onChange={() => handleCheckboxChange(index)}
                                                    icon={<CircleUnchecked />}
                                                    checkedIcon={<CircleCheckedFilled />}
                                                />
                                            </div> */}
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

                        {selectedItem && (
                            <div className="item-details">
                                {selectedData === 'userdata' && (
                                    <div className="infor-section">
                                        <div className="infor-column">
                                            <div className="infor-box ">
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

                                            <div className="infor-box">
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
                                        <div className="infor-column">
                                            <div className=" infor-box">
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

                                            <div className=" infor-box">
                                                <div className="grid pt-5 pb-5 gap-7">
                                                    <div className="label-box">Analytics</div>
                                                    <div className="grid gap-4">
                                                        <div className="flex gap-5">
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
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 p-3 bg-white rounded-lg infor-label">
                                                                    {selectedItem.userId}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5">
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
                                            <div className="infor-box">
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
                                        <div className="infor-column w-45p">
                                            <div className=" infor-box">
                                                <div className="grid pt-5 pb-5 gap-7">
                                                    <div className="label-box">Analytics</div>
                                                    <div className="grid gap-4"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedData === 'categoriesdata' && (
                                    <>
                                        <p>
                                            <strong>Category:</strong> {selectedItem.category}
                                        </p>
                                        <p>
                                            <strong>ID:</strong> {selectedItem.id}
                                        </p>
                                        <p>
                                            <strong>Products:</strong> {selectedItem.products}
                                        </p>
                                        <p>
                                            <strong>Link:</strong> {selectedItem.link}
                                        </p>
                                        <p>
                                            <strong>Section:</strong> {selectedItem.section}
                                        </p>
                                        <p>
                                            <strong>Priority:</strong> {selectedItem.priority}
                                        </p>
                                    </>
                                )}

                                {selectedData === 'ordersdata' && (
                                    <>
                                        <p>
                                            <strong>ID:</strong> {selectedItem.id}
                                        </p>
                                        <p>
                                            <strong>Amount:</strong> {selectedItem.amount}
                                        </p>
                                        <p>
                                            <strong>Income:</strong> {selectedItem.income}
                                        </p>
                                        <p>
                                            <strong>Products:</strong> {selectedItem.products}
                                        </p>
                                        <p>
                                            <strong>Client:</strong> {selectedItem.client}
                                        </p>
                                        <p>
                                            <strong>Update:</strong> {selectedItem.update}
                                        </p>
                                        <p>
                                            <strong>Created:</strong> {selectedItem.created}
                                        </p>
                                        <p>
                                            <strong>Status:</strong> {selectedItem.status}
                                        </p>
                                    </>
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
