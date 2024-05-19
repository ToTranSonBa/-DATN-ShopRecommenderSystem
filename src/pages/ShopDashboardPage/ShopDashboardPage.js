import React, { useEffect, useRef, useState } from "react";
import "../ShopDashboardPage/ShopDashboardPage.scss";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import {
    BsJustify, BsThreeDots, BsSearch, BsFillPersonFill, BsBellFill,
    BsFillXCircleFill, BsFillPlusCircleFill, BsGraphUpArrow, BsHospital,
    BsFilter, BsArrowRight
} from "react-icons/bs";

import {
    FaCompass, FaStar, FaFacebookMessenger, FaGlobeAmericas, FaListUl,
    FaPlusCircle, FaPen, FaTrashAlt
} from "react-icons/fa";

import userdata from './userdata';
import productdata from './productdata';
import categoriesdata from './categoriesdata';
import ordersdata from './ordersdata'

import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

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
        <div className="shop-dashboard-page">
            <div className="top-navigation">
                <div className="nav-content">
                    <div className="icon-bg">
                        <BsJustify className="display-icon" />
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
                    < BsSearch className="search-icon" />
                    <input className="search-element" type="text" placeholder="Search Transactions and Doccuments" />
                </div>

                <div className="nav-content">
                    <div className="account-content">
                        <div className="account-icon-bg">
                            <BsFillPersonFill className="account-icon" />
                        </div>

                        <p className="account-name"> Clayton Santos</p>
                    </div>

                    <div className="announcement-icon-content">
                        <div className="icon-bg">
                            <div className="Announcement"></div>
                            <BsBellFill className="display-icon" />
                        </div>
                        <div className="icon-bg">
                            <BsFillXCircleFill className="display-icon" />
                        </div>
                    </div>
                </div>


            </div>

            <div className="container-section">
                <div className="left-navigation">
                    <div className="left-navigation-content">
                        <div className={`icon-bg ${selectedData === 'userdata' ? 'active' : ''}`} onClick={() => handleIconClick('userdata')}>
                            <FaCompass className="display-icon" />
                        </div>
                        <div className={`icon-bg ${selectedData === 'productdata' ? 'active' : ''}`} onClick={() => handleIconClick('productdata')}>
                            <FaStar className="display-icon" />
                        </div>
                        <div className={`icon-bg ${selectedData === 'categoriesdata' ? 'active' : ''}`} onClick={() => handleIconClick('categoriesdata')}>
                            <BsGraphUpArrow className="display-icon" />
                        </div>
                        <div className={`icon-bg ${selectedData === 'ordersdata' ? 'active' : ''}`} onClick={() => handleIconClick('ordersdata')}>
                            <div className="Announcement"></div>
                            <FaFacebookMessenger className="display-icon" />
                        </div>
                    </div>

                    <div className="left-navigation-content">
                        <div className="icon-bg">
                            <BsFillPlusCircleFill className="display-icon" />
                        </div>
                        <div className="mess-bg">
                            <div className="Announcement"></div>
                            <img className="user-avatar" src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain" />
                        </div>

                        <div className="mess-bg">
                            <img className="user-avatar" src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain" />
                        </div>

                        <div className="mess-bg">
                            <img className="user-avatar" src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain" />
                        </div>


                    </div>

                </div>

                <div className="dashboard-content-section">
                    <div className="management-content">
                        <div className="header-section">
                            <div className="header-title">
                                <div className="list-icon-bg">
                                    <FaListUl className="list-icon" />
                                </div>
                                <p className="title-name">{getTitleName()}</p>
                            </div>


                            <div className="add-categories-button" onClick={selectedItem ? handleBackToList : () => setSelectedItem(null)}>
                                <FaPlusCircle className="plus-icon" />
                                <p className="add-button-content">
                                    {getAddButtonContent()}
                                </p>
                            </div>
                        </div>

                        {!selectedItem && (
                            <>
                                <div className="filter-section">
                                    <div className="filter-container">
                                        <div className="filter-content">
                                            <BsFilter className="filter-icon" />
                                            <p className="filter-name">Filters</p>
                                        </div>
                                        <div className="filter-content">
                                            <BsSearch className="filter-icon" />
                                            <p className="filter-name">Search</p>
                                        </div>
                                        <div className="filter-content">
                                            <FaPen className="filter-icon" />
                                            <p className="filter-name">Edit</p>
                                        </div>
                                        <div className="filter-content">
                                            <FaTrashAlt className="filter-icon" />
                                            <p className="filter-name">Delete</p>
                                        </div>
                                    </div>
                                </div>

                                <ul className="data-list">

                                    <li className="list-header">
                                        <div className="checkbox-bg">
                                            <Checkbox
                                                className="checkbox-color"
                                                checked={isAllChecked}
                                                onChange={() => handleAllCheckboxChange(productdata)}
                                                icon={<CircleUnchecked />} // Biểu tượng khi chưa được tích vào
                                                checkedIcon={<CircleCheckedFilled />} // Biểu tượng khi được tích vào
                                            />
                                        </div>
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
                                                <div className="header-bg header-center-large  text">ID</div>
                                                <div className="header-bg header-center-large  text">Products</div>
                                                <div className="header-bg header-center-large  text">Link</div>
                                                <div className="header-bg header-center-large  text">Section</div>
                                                <div className="header-bg header-center-large  text">Priority</div>
                                                <div className="header-bg header-center  text">Edit</div>
                                            </>
                                        )}
                                        {selectedData === 'ordersdata' && (
                                            <>
                                                <div className="header-bg header-center text">ID</div>
                                                <div className="header-bg header-center  text">Amount</div>
                                                <div className="header-bg header-center  text">Income</div>
                                                <div className="header-bg header-center-large  text">Products</div>
                                                <div className="header-bg header-center-large  text">Client</div>
                                                <div className="header-bg header-center-large  text">Update</div>
                                                <div className="header-bg header-center-large  text">Created</div>
                                                <div className="header-bg header-center-large  text">status</div>
                                                <div className="header-bg header-center  text">Edit</div>
                                            </>
                                        )}
                                    </li>

                                    {currentData.map((item, index) => (
                                        <li key={index} className="user-item" onClick={() => handleItemClick(item)}>
                                            <div className="checkbox-bg">
                                                <Checkbox
                                                    className="checkbox-color"
                                                    checked={checkedItems[index]}
                                                    onChange={() => handleCheckboxChange(index)}
                                                    icon={<CircleUnchecked />}
                                                    checkedIcon={<CircleCheckedFilled />}
                                                />
                                            </div>
                                            {selectedData === 'userdata' && (
                                                <>
                                                    <div className="header-bg header-center">
                                                        <img className="user-avatar" src={item.userAvatar} alt="User Avatar" />
                                                    </div>
                                                    <div className="header-bg header-center text">{item.userId}</div>
                                                    <div className="header-bg header-name text">{item.userName}</div>
                                                    <div className="header-bg header-center text">{item.userOrders}</div>
                                                    <div className="header-bg header-center text">${item.userRevenue}</div>
                                                    <div className="header-bg header-center text">${item.userEarning}</div>
                                                    <div className="header-bg header-location text">{item.userLocation}</div>
                                                    <div className="header-bg header-email text">{item.userEmail}</div>
                                                    <div className="header-bg header-center text"><FaPen className="edit-icon" /></div>
                                                </>
                                            )}

                                            {selectedData === 'productdata' && (
                                                <>
                                                    <div className="header-bg header-center-large">
                                                        <img className="product-image" src={item.productImage} alt="Product" />
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
                                                    <div className="header-bg header-center text"><FaPen className="edit-icon" /></div>
                                                </>
                                            )}

                                            {selectedData === 'categoriesdata' && (
                                                <>
                                                    <div className="header-bg header-name text">{item.category}</div>
                                                    <div className="header-bg header-center-large text">{item.id}</div>
                                                    <div className="header-bg header-center-large text">{item.products}</div>
                                                    <div className="header-bg header-center-large text">{item.link}</div>
                                                    <div className="header-bg header-center-large text">{item.section}</div>
                                                    <div className="header-bg header-center-large text">{item.priority}</div>
                                                    <div className="header-bg header-center text"><FaPen className="edit-icon" /></div>
                                                </>
                                            )}

                                            {selectedData === 'ordersdata' && (
                                                <>
                                                    <div className="header-bg header-center text">{item.id}</div>
                                                    <div className="header-bg header-center text">{item.amount}</div>
                                                    <div className="header-bg header-center text">{item.income}</div>
                                                    <div className="header-bg header-center-large text">{item.products}</div>
                                                    <div className="header-bg header-center-large text">{item.client}</div>
                                                    <div className="header-bg header-center-large text">{item.update}</div>
                                                    <div className="header-bg header-center-large text">{item.created}</div>
                                                    <div className="header-bg header-center-large text">
                                                        <div className={`status-color ${getStatusColorClass(item.status)}`}></div>
                                                        {item.status}
                                                    </div>
                                                    <div className="header-bg header-center text"><BsArrowRight className="edit-icon" /></div>
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
                                            <div className="infor-box  ">
                                                <div className="p-10 grid items-center">
                                                    <img className="user-avatar-detail" src={selectedItem.userAvatar} alt="User Avatar" />
                                                    <div className="infor-detail">
                                                        <p className="user-text">{selectedItem.userName}</p>
                                                        <p className="infor-label">{selectedItem.userId}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="infor-box">
                                                <div className="label-box pt-5">Analytics</div>
                                                <div className="grid p-10 gap-10" >
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
                                            <div className="  infor-box  ">
                                                <div className="grid gap-7 pt-5 pb-5" >
                                                    <div className="label-box">Profile</div>
                                                    <div className="grid gap-4">
                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5 px-2 ">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label px-3 py-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label px-3 py-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label px-3 py-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label px-3 py-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label px-3 py-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label px-3 py-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="  infor-box  ">
                                                <div className="grid gap-7 pt-5 pb-5" >
                                                    <div className="label-box">Analytics</div>
                                                    <div className="grid gap-4">
                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label p-3  rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label p-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label p-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-5">
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-48 bg-white infor-label p-3 rounded-lg">{selectedItem.userId}</div>
                                                            </div>
                                                            <div className="grid gap-2.5">
                                                                <p className="column-label">ID</p>
                                                                <div className="w-98 bg-white infor-label px-3 py-3 rounded-lg">{selectedItem.userId}</div>
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
                                                <div className="label-box pt-5">Analytics</div>
                                                <div className="grid p-10 gap-10" >
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


                                            <div className="  infor-box  ">
                                                <div className="grid gap-7 pt-5 pb-5" >
                                                    <div className="label-box">Analytics</div>
                                                    <div className="grid gap-4">



                                                    </div>
                                                </div>
                                            </div>


                                        </div>


                                    </div>
                                )}

                                {selectedData === 'categoriesdata' && (
                                    <>
                                        <p><strong>Category:</strong> {selectedItem.category}</p>
                                        <p><strong>ID:</strong> {selectedItem.id}</p>
                                        <p><strong>Products:</strong> {selectedItem.products}</p>
                                        <p><strong>Link:</strong> {selectedItem.link}</p>
                                        <p><strong>Section:</strong> {selectedItem.section}</p>
                                        <p><strong>Priority:</strong> {selectedItem.priority}</p>
                                    </>
                                )}

                                {selectedData === 'ordersdata' && (
                                    <>
                                        <p><strong>ID:</strong> {selectedItem.id}</p>
                                        <p><strong>Amount:</strong> {selectedItem.amount}</p>
                                        <p><strong>Income:</strong> {selectedItem.income}</p>
                                        <p><strong>Products:</strong> {selectedItem.products}</p>
                                        <p><strong>Client:</strong> {selectedItem.client}</p>
                                        <p><strong>Update:</strong> {selectedItem.update}</p>
                                        <p><strong>Created:</strong> {selectedItem.created}</p>
                                        <p><strong>Status:</strong> {selectedItem.status}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ShopDashboardPage;