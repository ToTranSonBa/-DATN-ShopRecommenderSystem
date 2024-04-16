import React, { useState } from "react";
import './BagShopPage.scss';

import { FaAngleUp, FaPen } from "react-icons/fa";

const BagShopPage = () => {

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
                    <div className="tab-name">Main</div>
                    <div className="tab-name">Order</div>
                    <div className="tab-name">Favorites</div>
                    <div className="tab-name">Bag</div>
                    <div className="tab-name">Settings</div>
                </div>

            </div>

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
                        <FaAngleUp className="up-icon" />
                    </div>

                    <div className="orders-section">
                        <div className="orders-header">
                            <p className="orders-title">Orders</p>
                            <FaAngleUp className="up-icon" />
                        </div>

                        <div className="bag-orders-content">
                            <div className="order-content">
                                <div className="order-header">
                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Order:</p>
                                            <p className="order-code">543322</p>
                                        </div>
                                    </div>

                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Amount:</p>
                                            <p className="order-code">4,500 $</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">Products:</p>
                                            <p className="order-code">3</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">status:</p>
                                            <p className="order-status">In Delivery</p>
                                            <FaAngleUp className="up-icon" />
                                        </div>
                                    </div>


                                </div>

                                <div className="product-order-list">
                                    <div className="product-order">
                                        <div className="left-right-content">
                                            <img className="product-image" src="https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014" />
                                            <p className="product-name">Gray Backpack</p>
                                        </div>

                                        <div className="left-right-content">
                                            <p className="order-information">$ 350</p>
                                            <p className="order-information">1</p>
                                            <p className="order-information">$ 350</p>

                                        </div>
                                    </div>

                                    <div className="product-order">
                                        <div className="left-right-content">
                                            <img className="product-image" src="https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014" />
                                            <p className="product-name">Gray Backpack</p>
                                        </div>

                                        <div className="left-right-content">
                                            <p className="order-information">$ 350</p>
                                            <p className="order-information">1</p>
                                            <p className="order-information">$ 350</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-content">
                                <div className="order-header">
                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Order:</p>
                                            <p className="order-code">543322</p>
                                        </div>
                                    </div>

                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Amount:</p>
                                            <p className="order-code">4,500 $</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">Products:</p>
                                            <p className="order-code">3</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">status:</p>
                                            <p className="order-status">In Delivery</p>
                                            <FaAngleUp className="up-icon" />
                                        </div>
                                    </div>


                                </div>

                                <div className="product-order-list">
                                    <div className="product-order">
                                        <div className="left-right-content">
                                            <img className="product-image" src="https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014" />
                                            <p className="product-name">Gray Backpack</p>
                                        </div>

                                        <div className="left-right-content">
                                            <p className="order-information">$ 350</p>
                                            <p className="order-information">1</p>
                                            <p className="order-information">$ 350</p>

                                        </div>
                                    </div>

                                    <div className="product-order">
                                        <div className="left-right-content">
                                            <img className="product-image" src="https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014" />
                                            <p className="product-name">Gray Backpack</p>
                                        </div>

                                        <div className="left-right-content">
                                            <p className="order-information">$ 350</p>
                                            <p className="order-information">1</p>
                                            <p className="order-information">$ 350</p>

                                        </div>
                                    </div>

                                    <div className="product-order">
                                        <div className="left-right-content">
                                            <img className="product-image" src="https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014" />
                                            <p className="product-name">Gray Backpack</p>
                                        </div>

                                        <div className="left-right-content">
                                            <p className="order-information">$ 350</p>
                                            <p className="order-information">1</p>
                                            <p className="order-information">$ 350</p>

                                        </div>
                                    </div>

                                    <div className="product-order">
                                        <div className="left-right-content">
                                            <img className="product-image" src="https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014" />
                                            <p className="product-name">Gray Backpack</p>
                                        </div>

                                        <div className="left-right-content">
                                            <p className="order-information">$ 350</p>
                                            <p className="order-information">1</p>
                                            <p className="order-information">$ 350</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-content">
                                <div className="order-header">
                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Order:</p>
                                            <p className="order-code">543322</p>
                                        </div>
                                    </div>

                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Amount:</p>
                                            <p className="order-code">4,500 $</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">Products:</p>
                                            <p className="order-code">3</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">status:</p>
                                            <p className="order-status">In Delivery</p>
                                            <FaAngleUp className="up-icon" />
                                        </div>
                                    </div>


                                </div>

                                <div className="product-order-list">
                                    <div className="product-order">
                                        <div className="left-right-content">
                                            <img className="product-image" src="https://cdn.shopify.com/s/files/1/0297/4770/7948/products/genuine_vintage_travel_duffle_bags_6_1024x1024@2x.jpg?v=1588479014" />
                                            <p className="product-name">Gray Backpack</p>
                                        </div>

                                        <div className="left-right-content">
                                            <p className="order-information">$ 350</p>
                                            <p className="order-information">1</p>
                                            <p className="order-information">$ 350</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-content">
                                <div className="order-header">
                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Order:</p>
                                            <p className="order-code">543322</p>
                                        </div>
                                    </div>

                                    <div className="list-order-header">
                                        <div className="left-right-order-header">
                                            <p className="order-title">Amount:</p>
                                            <p className="order-code">4,500 $</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">Products:</p>
                                            <p className="order-code">3</p>
                                        </div>

                                        <div className="left-right-order-header">
                                            <p className="order-title">status:</p>
                                            <p className="order-status">In Delivery</p>
                                            <FaAngleUp className="up-icon" />
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default BagShopPage;