import React, { useState } from "react";
import './BagShopPage.scss';

import { FaAngleUp, FaPen, FaAngleDown } from "react-icons/fa";

const BagShopPage = () => {


    const [showContent, setShowContent] = useState(true);



    const toggleContent = () => {
        setShowContent(!showContent);
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
                        )}

                    </div>
                </div>
            )}



        </div>
    );

}

export default BagShopPage;