import React, { useState } from "react";
import './BagShopPage.scss';
import { FaAngleUp, FaPen, FaAngleDown } from "react-icons/fa";
import { BsX } from "react-icons/bs";

import PaymentForm from "./PaymentForm";

import Button from '@mui/material/Button';

const BagShopPage = () => {

    const [showContent, setShowContent] = useState(true);
    const [showProfile, setShowProfile] = useState(true);
    const [showPayment, setShowPayment] = useState(true);






    const toggleContent = () => {
        setShowContent(!showContent);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const togglePayment = () => {
        setShowPayment(!showPayment);
    };


    const toggleOrder = (orderId) => {
        setIsExpanded(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };
    const orders = [
        {
            id: 1, orderCode: '543322', amount: '4,500 $', products: [
                { id: 1, name: 'Gray Backpack', price: '$ 350', quantity: 1, total: '$ 350', image: 'https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014' },
                { id: 2, name: 'Gray Backpack', price: '$ 350', quantity: 1, total: '$ 350', image: 'https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014' },
                { id: 3, name: 'Gray Backpack', price: '$ 350', quantity: 1, total: '$ 350', image: 'https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014' },
                // Thêm các sản phẩm khác của đơn hàng vào đây nếu cần
            ], status: 'In Delivery'
        }, {
            id: 2, orderCode: '543322', amount: '4,500 $', products: [
                { id: 1, name: 'Gray Backpack', price: '$ 350', quantity: 1, total: '$ 350', image: 'https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014' },
                { id: 2, name: 'Gray Backpack', price: '$ 350', quantity: 1, total: '$ 350', image: 'https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014' },

            ], status: 'In Delivery'
        },
    ];

    const [isExpanded, setIsExpanded] = useState(() => {
        const initialState = {};
        orders.forEach(order => {
            initialState[order.id] = true;
        });
        return initialState;
    });

    const [activeTab, setActiveTab] = useState('Main');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const cityData = ["Adamsville", "Bristol", "Canton", "Denton"]; // Mảng dữ liệu thành phố

    // State để lưu trữ giá trị thành phố được chọn
    const [selectedCity, setSelectedCity] = useState(cityData[0]);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    return (
        <div className="Bag-Shop-Page">
            <div className="header-section">
                <div className="bag-shop-header">
                    <div className="account-button">Account</div>
                    <h1 className="header-title">Account & Settings</h1>
                </div>
            </div>

            <div className="tab-section">
                <div className="tab-list">
                    <div className={`tab-name ${activeTab === 'Main' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Main')}>Main</div>
                    <div className={`tab-name ${activeTab === 'Account' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Account')}>Account</div>
                    <div className={`tab-name ${activeTab === 'Orders' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Orders')}>Orders</div>
                    <div className={`tab-name ${activeTab === 'Cart' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Cart')}>Cart</div>
                </div>

            </div>

            {activeTab === 'Main' && (
                <div className="account-order-section">
                    <div className="account-order-content">
                        <div className="account-section">
                            <div className="account-content">
                                <div className="avatar-account-bg">
                                    <img className="user-avatar" src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain" />
                                    <button className="edit-button"><FaPen /></button>
                                </div>

                                <div className="information-section">
                                    <div className="left-right-content">
                                        <div className="information-content">
                                            <p className="information-title">Full name</p>
                                            <p className="information-main">Adeline Casey</p>
                                        </div>
                                        <div className="information-content">
                                            <p className="information-title">Date of birth</p>
                                            <p className="information-main">21 January 1999</p>
                                        </div><div className="information-content">
                                            <p className="information-title">gender</p>
                                            <p className="information-main">Female</p>
                                        </div>
                                    </div>

                                    <div className="left-right-content">
                                        <div className="information-content">
                                            <p className="information-title">Phone</p>
                                            <p className="information-main">+1 654 321 76 76</p>
                                        </div>
                                        <div className="information-content">
                                            <p className="information-title">Email</p>
                                            <p className="information-main">newtemp@gmail.com</p>
                                        </div><div className="information-content">
                                            <p className="information-title">Country, City</p>
                                            <p className="information-main">France, Paris</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <FaAngleUp className="style-icon" />
                        </div>

                        <div className="orders-section">
                            <div className="orders-header">
                                <p className="orders-title">Orders</p>
                                <div className="up-down-icon">
                                    {showContent ? (
                                        <FaAngleUp className="style-icon" onClick={toggleContent} />
                                    ) : (
                                        <FaAngleDown className="style-icon" onClick={toggleContent} />
                                    )}
                                </div>
                            </div>

                            {showContent && (
                                <div className="bag-orders-content">
                                    {orders.map(order => (
                                        <div className="order-content" key={order.id}>
                                            <div className="order-header">
                                                <div className="list-order-header">
                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Order:</p>
                                                        <p className="order-code">{order.orderCode}</p>
                                                    </div>
                                                </div>

                                                <div className="list-order-header">
                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Amount:</p>
                                                        <p className="order-code">{order.amount}</p>
                                                    </div>

                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Products:</p>
                                                        <p className="order-code">{order.products.length}</p>
                                                    </div>

                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Status:</p>
                                                        <p className="order-status">{order.status}</p>
                                                        <div className="up-down-icon">
                                                            {isExpanded[order.id] ? (
                                                                <FaAngleUp className="style-icon" onClick={() => toggleOrder(order.id)} />
                                                            ) : (
                                                                <FaAngleDown className="style-icon" onClick={() => toggleOrder(order.id)} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {isExpanded[order.id] && (
                                                <div className="product-order-list">
                                                    {order.products.map(product => (
                                                        <div className="product-order" key={product.id}>
                                                            <div className="left-right-content">
                                                                <img className="product-image" src={product.image} alt={product.name} />
                                                                <p className="product-name">{product.name}</p>
                                                            </div>

                                                            <div className="left-right-content">
                                                                <p className="order-information">{product.price}</p>
                                                                <p className="order-information">{product.quantity}</p>
                                                                <p className="order-information">{product.total}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            )}

            {activeTab !== 'Main' && (
                <div className="account-order-section">
                    <div className="account-order-content">

                        {activeTab === 'Account' && (
                            <div className="account-section">
                                <div className="account-content">
                                    <div className="avatar-account-bg">
                                        <img className="user-avatar" src="https://th.bing.com/th/id/OIF.yAvT7538kbL6wtA0gHPpkw?rs=1&pid=ImgDetMain" />
                                        <button className="edit-button"><FaPen /></button>
                                    </div>

                                    <div className="information-section">
                                        <div className="left-right-content">
                                            <div className="information-content">
                                                <p className="information-title">Full name</p>
                                                <p className="information-main">Adeline Casey</p>
                                            </div>
                                            <div className="information-content">
                                                <p className="information-title">Date of birth</p>
                                                <p className="information-main">21 January 1999</p>
                                            </div><div className="information-content">
                                                <p className="information-title">gender</p>
                                                <p className="information-main">Female</p>
                                            </div>
                                        </div>

                                        <div className="left-right-content">
                                            <div className="information-content">
                                                <p className="information-title">Phone</p>
                                                <p className="information-main">+1 654 321 76 76</p>
                                            </div>
                                            <div className="information-content">
                                                <p className="information-title">Email</p>
                                                <p className="information-main">newtemp@gmail.com</p>
                                            </div><div className="information-content">
                                                <p className="information-title">Country, City</p>
                                                <p className="information-main">France, Paris</p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <FaAngleUp className="style-icon" />
                            </div>
                        )}


                        {activeTab === 'Orders' && (
                            <div className="orders-section">
                                <div className="bag-orders-content">
                                    {orders.map(order => (
                                        <div className="order-content" key={order.id}>
                                            <div className="order-header">
                                                <div className="list-order-header">
                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Order:</p>
                                                        <p className="order-code">{order.orderCode}</p>
                                                    </div>
                                                </div>

                                                <div className="list-order-header">
                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Amount:</p>
                                                        <p className="order-code">{order.amount}</p>
                                                    </div>

                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Products:</p>
                                                        <p className="order-code">{order.products.length}</p>
                                                    </div>

                                                    <div className="left-right-order-header">
                                                        <p className="order-title">Status:</p>
                                                        <p className="order-status">{order.status}</p>
                                                        <div>
                                                            {isExpanded[order.id] ? (
                                                                <FaAngleUp className="style-icon" onClick={() => toggleOrder(order.id)} />
                                                            ) : (
                                                                <FaAngleDown className="style-icon" onClick={() => toggleOrder(order.id)} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {isExpanded[order.id] && (
                                                <div className="product-order-list">
                                                    {order.products.map(product => (
                                                        <div className="product-order" key={product.id}>
                                                            <div className="left-right-content">
                                                                <img className="product-image" src={product.image} alt={product.name} />
                                                                <p className="product-name">{product.name}</p>
                                                            </div>

                                                            <div className="left-right-content">
                                                                <p className="order-information">{product.price}</p>
                                                                <p className="order-information">{product.quantity}</p>
                                                                <p className="order-information">{product.total}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>


                            </div>
                        )}

                        {activeTab === 'Cart' && (
                            <div className="orders-section">
                                <div className="bag-orders-content">
                                    {orders.length > 0 && (
                                        <div className="order-content" key={orders[0].id}>

                                            <div className="orders-header">
                                                <p className="orders-title">Orders</p>
                                                <div >
                                                    {isExpanded[orders[0].id] ? (
                                                        <FaAngleUp className="style-icon" onClick={() => toggleOrder(orders[0].id)} />
                                                    ) : (
                                                        <FaAngleDown className="style-icon" onClick={() => toggleOrder(orders[0].id)} />
                                                    )}
                                                </div>
                                            </div>
                                            {isExpanded[orders[0].id] && (
                                                <div>
                                                    <div className="product-order-list">
                                                        {orders[0].products.map(product => (
                                                            <div className="product-cart" key={product.id}>
                                                                <div className="left-right-content">
                                                                    <img className="product-image" src={product.image} alt={product.name} />
                                                                    <p className="product-name">{product.name}</p>
                                                                </div>

                                                                <div className="left-right-content">
                                                                    <p className="order-information">{product.price}</p>
                                                                    <p className="order-information">{product.quantity}</p>
                                                                    <p className="order-information">{product.total}</p>
                                                                    <BsX className=" style-icon" />
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <div className="order-footer">
                                                        <p className="total-amount">Total Amount</p>
                                                        <p className="total-amount">{orders[0].amount}    </p>
                                                    </div>
                                                </div>

                                            )}


                                        </div>
                                    )}

                                    <div className="order-content">

                                        <div className="orders-header">
                                            <p className="orders-title">Profile Customer</p>
                                            <div >
                                                {showProfile ? (
                                                    <FaAngleUp className="style-icon" onClick={toggleProfile} />
                                                ) : (
                                                    <FaAngleDown className="style-icon" onClick={toggleProfile} />
                                                )}
                                            </div>
                                        </div>
                                        {showProfile && (

                                            <div className="profile-content">
                                                <div className="profile-field">
                                                    <label className="profile-label">First Name</label>
                                                    <input className="profile-input" type="text" value='Brent' />
                                                </div>
                                                <div className="profile-field">
                                                    <label className="profile-label">Second Name</label>
                                                    <input className="profile-input" type="text" value='Cook' />
                                                </div>
                                                <div className="profile-field">
                                                    <label className="profile-label">Phone</label>
                                                    <input className="profile-input" type="text" value='+ 1 543 345 22 21' />
                                                </div>
                                                <div className="profile-field">
                                                    <label className="profile-label">Email</label>
                                                    <input className="profile-input" type="text" value='brent-cook@gmail.com' />
                                                </div>

                                            </div>

                                        )}

                                        {showProfile && (

                                            <div className="profile-content">
                                                <div className="profile-field">
                                                    <label className="profile-label">Zip Code</label>
                                                    <input className="profile-input" type="text" value='10001' />
                                                </div>
                                                <div className="profile-field">
                                                    <label className="profile-label">Country/ Region</label>
                                                    <select className="profile-input" value={selectedCity} onChange={handleCityChange}>
                                                        {cityData.map((city, index) => (
                                                            <option key={index} value={city}>{city}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="profile-field">
                                                    <label className="profile-label">State</label>
                                                    <select className="profile-input" value={selectedCity} onChange={handleCityChange}>
                                                        {cityData.map((city, index) => (
                                                            <option key={index} value={city}>{city}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="profile-field">
                                                    <label className="profile-label">City</label>
                                                    <select className="profile-input" value={selectedCity} onChange={handleCityChange}>
                                                        {cityData.map((city, index) => (
                                                            <option key={index} value={city}>{city}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                            </div>

                                        )}
                                        {showProfile && (

                                            <div className="profile-content">
                                                <div className="profile-field">
                                                    <label className="profile-label">Address</label>
                                                    <input className="profile-input" type="text" value='121 Blue Hill Rd, Hopewell Junction, NY 12533' />
                                                </div>

                                            </div>

                                        )}


                                    </div>

                                    <div className="order-content">

                                        <div className="orders-header">
                                            <p className="orders-title">Payment options</p>
                                            <div >
                                                {showPayment ? (
                                                    <FaAngleUp className="style-icon" onClick={togglePayment} />
                                                ) : (
                                                    <FaAngleDown className="style-icon" onClick={togglePayment} />
                                                )}
                                            </div>
                                        </div>
                                        {showPayment && (
                                            <PaymentForm />
                                        )}






                                    </div>

                                    <Button className="checkout-btn" variant="contained" disableElevation>
                                        <span className="checkout-text">Checkout</span>
                                    </Button>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            )}



        </div>
    );

}

export default BagShopPage;