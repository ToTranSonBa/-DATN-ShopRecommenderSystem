import React, { useEffect, useRef, useState } from "react";
import "../ShopDashboardPage/ShopDashboardPage.scss";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    BsJustify, BsThreeDots, BsSearch, BsFillPersonFill, BsBellFill,
    BsFillXCircleFill, BsFillPlusCircleFill, BsGraphUpArrow, BsHospital,
    BsFilter
} from "react-icons/bs";

import {
    FaCompass, FaStar, FaFacebookMessenger, FaGlobeAmericas, FaListUl,
    FaPlusCircle, FaCheckCircle, FaPen, FaTrashAlt
} from "react-icons/fa";

import userdata from '../ShopDashboardPage/userdata';
const ShopDashboardPage = () => {

    const [chartInstance, setChartInstance] = useState(null);
    const chartRef = useRef(null);
    const [activeOption, setActiveOption] = useState(0);
    const [selected, setSelected] = useState('');

    const handleOptionClick = (index) => {
        setActiveOption(index);
    };

    const data = [
        { name: 'January', sales: 200, total: 300 },
        { name: 'February', sales: 150, total: 350 },
        { name: 'March', sales: 300, total: 320 },
        { name: 'April', sales: 250, total: 340 },
        { name: 'May', sales: 150, total: 200 },
        { name: 'June', sales: 350, total: 390 },
        { name: 'July', sales: 300, total: 400 },
    ];
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
                        <div className="icon-bg">
                            <FaCompass className="display-icon" />
                        </div>
                        <div className="icon-bg">
                            <FaStar className="display-icon" />
                        </div>

                        <div className="icon-bg">
                            <div className="Announcement"></div>
                            <FaFacebookMessenger className="display-icon" />
                        </div>

                        <div className="icon-bg">
                            <BsGraphUpArrow className="display-icon" />
                        </div>

                        <div className="icon-bg">
                            <FaGlobeAmericas className="display-icon" />
                        </div>

                        <div className="icon-bg">
                            <BsHospital className="display-icon" />
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
                                <p className="title-name">Categories</p>
                            </div>


                            <div className="add-categories-button">
                                <FaPlusCircle className="plus-icon" />
                                <p className="add-button-content">Add Categories</p>
                            </div>
                        </div>

                        <div className="filter-section">
                            <div className="select-all-button">
                                <FaCheckCircle className="check-icon" />
                                <p className="select-all-content">Select All</p>
                            </div>

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
                                    <input type="checkbox" id="myCheckbox" class="custom-checkbox" />
                                    <label for="myCheckbox" class="checkbox-label"></label>
                                </div>

                                <div className="header-bg header-photo text">Photo</div>
                                <div className="header-bg header-id text">ID</div>
                                <div className="header-bg header-name text">Name</div>
                                <div className="header-bg header-orders text">Orders</div>
                                <div className="header-bg header-revenue text">Revenue</div>
                                <div className="header-bg header-earning text">Earning</div>
                                <div className="header-bg header-location text">Location</div>
                                <div className="header-bg header-email text">Email</div>
                                <div className="header-bg header-edit text">Edit</div>
                            </li>
                            {userdata.map((user, index) => (
                                <li key={index} className="user-item">
                                    <div className="checkbox-bg">
                                        <input type="checkbox" id={index} class="custom-checkbox" />
                                        <label for={index} class="checkbox-label"></label>
                                    </div>
                                    <div className="header-bg header-photo">

                                        <img className=" user-avatar" src={user.userAvatar} />
                                    </div>
                                    <div className="header-bg header-id text">{user.userId}</div>
                                    <div className="header-bg header-name text">{user.userName}</div>
                                    <div className="header-bg header-orders text">${user.userOrders}</div>
                                    <div className="header-bg header-revenue text">${user.userRevenue}</div>
                                    <div className="header-bg header-earning text">${user.userEarning}</div>
                                    <div className="header-bg header-location text">{user.userLocation}</div>
                                    <div className="header-bg header-email text">{user.userEmail}</div>
                                    <div className="header-bg header-edit text"><FaPen className="edit-icon" /></div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>

                <div className="dashboard-sidebar">
                    <div className="dashboard-sidebar-container">
                        <div className="total-section">
                            <div className="total-content">
                                <div className="total-main-content">
                                    <div className="total-name-number">
                                        <p className="total-name">Total Sale</p>
                                        <p className="total-number">$281.90</p>

                                    </div>
                                    <div className="chart-section">
                                        <ResponsiveContainer width={100} height={50} className="custom-chart">
                                            <AreaChart data={data}>
                                                <Area type="monotone" dataKey="sales" stroke="rgba(46, 230, 202, 1)" fill="rgba(46, 230, 202, 0.6)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                </div>
                            </div>
                            <div className="total-footer">
                                <p className={`footer-text ${selected === 'total orders' ? 'selected' : ''}`}
                                    onClick={() => setSelected('total orders')}>6 total orders</p>
                                <p className={`footer-text ${selected === 'view report1' ? 'selected' : ''}`}
                                    onClick={() => setSelected('view report1')}>view report</p>
                            </div>
                        </div>

                        <div className="total-section">
                            <div className="total-content">
                                <div className="total-main-content">
                                    <div className="total-name-number">
                                        <div className="total-name">Total Sessions</div>
                                        <div className="total-number">456</div>

                                    </div>
                                    <div className="chart-section">
                                        <ResponsiveContainer width={100} height={50} className="custom-chart">
                                            <AreaChart data={data}>
                                                <Area type="monotone" dataKey="sales" stroke="rgba(255, 102, 51, 1)" fill="rgba(255, 102, 51, 0.6)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                </div>
                            </div>
                            <div className="total-footer">
                                <div className={`footer-text ${selected === 'Live' ? 'selected' : ''}`}
                                    onClick={() => setSelected('Live')}>Live</div>
                                <div className={`footer-text ${selected === 'visitors' ? 'selected' : ''}`}
                                    onClick={() => setSelected('visitors')}>4 visitors</div>
                                <div className={`footer-text ${selected === 'See Live View' ? 'selected' : ''}`}
                                    onClick={() => setSelected('See Live View')}>See Live View</div>
                            </div>
                        </div>

                        <div className="total-section">
                            <div className="total-content">
                                <div className="total-main-content">
                                    <div className="total-name-number">
                                        <p className="total-name">Customer rate</p>
                                        <p className="total-number">5.43%</p>

                                    </div>
                                    <div className="chart-section">
                                        <ResponsiveContainer width={100} height={50} className="custom-chart">
                                            <AreaChart data={data}>
                                                <Area type="monotone" dataKey="total" fill="rgba(255, 102, 51, 0.5)" />
                                                <Area type="monotone" dataKey="sales" fill="rgba(136, 51, 255, 0.5)" />
" />
                                            </AreaChart>


                                        </ResponsiveContainer>
                                    </div>

                                </div>
                            </div>
                            <div className="total-footer">
                                <div className={`footer-text `}><div className="circle-purple"></div>First Time</div>
                                <div className={`footer-text `}> <div className="circle-orange"></div>Returning</div>
                            </div>
                        </div>

                        <div className="action-orders-section">
                            <div className="action-orders-header">
                                <p className="tile-name">Actions</p>
                                <p className="tile-name">Orders</p>
                            </div>
                            <div className="schedule-container">
                                <div className="schedule-content">
                                    <div className="left-schedule">
                                        <div className="schedule-time">11:32</div>
                                        <div className="connect-column"></div>
                                    </div>
                                    <div className="schedule-information">New Category Added «Mobile phones»</div>
                                </div>
                                <div className="schedule-content">
                                    <div className="left-schedule">
                                        <div className="schedule-time">11:22</div>
                                        <div className="connect-column"></div>
                                    </div>
                                    <div className="schedule-information">New Product Added «Apple iPhone 9»</div>
                                </div>
                                <div className="schedule-content">
                                    <div className="left-schedule">
                                        <div className="schedule-time">10:54</div>
                                        <div className="connect-column"></div>
                                    </div>
                                    <div className="schedule-information">New Product Added «Apple iPad Pro 12.9»</div>
                                </div>
                                <div className="schedule-content">
                                    <div className="left-schedule">
                                        <div className="schedule-time">09:45</div>
                                        <div className="connect-column"></div>
                                    </div>
                                    <div className="schedule-information">New Product Added «Apple iPad Pro 12.9»</div>
                                </div>
                                <div className="schedule-content">
                                    <div className="left-schedule">
                                        <div className="schedule-time">09:45</div>
                                        <div className="connect-column"></div>
                                    </div>
                                    <div className="schedule-information">New Category Added  «Smart Watches»</div>
                                </div>
                                <div className="schedule-content">
                                    <div className="left-schedule">
                                        <div className="schedule-time">09:45</div>
                                        <div className="connect-column"></div>
                                    </div>
                                    <div className="schedule-information">New Category Added  «Smart Watches»</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>





        </div>
    );
}

export default ShopDashboardPage;