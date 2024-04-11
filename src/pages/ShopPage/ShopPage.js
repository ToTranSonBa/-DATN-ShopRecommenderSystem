import React, { useState } from "react";
import "../ShopPage/ShopPage.scss";
import {
    BsJustify, BsSearch, BsFillPersonFill, BsSpeakerFill, BsChevronRight,
    BsCameraReelsFill, BsFillMouse2Fill, BsPostageFill, BsMusicNote, BsFillCalendarFill,
    BsTv, BsSmartwatch, BsBarChartFill
} from "react-icons/bs";

import { FaGamepad, FaChartLine, FaListUl, FaGripHorizontal } from "react-icons/fa";

import ProductData from '../ShopPage/ProductData';
const ShopPage = () => {

    return (
        <div className="shop-page">
            <div className="header-section">
                <img class="header-image" src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1618927830-Classic-Chuck-vs-Chuck-70s-gear-patrol-70-2.jpg">
                </img>
                <h1 className="shop-name">Men's Shoes</h1>
                <div className="shop-now-button">Shop now</div>
            </div>

            <div className="navigation">
                <div className="navigation-content">
                    <div className="left-option">
                        <BsJustify className="left-option-element" />
                        <p className="left-option-element">Constructor</p>
                    </div>

                    <div className="menu-option">
                        <p className="menu-option-element">Woman</p>
                        <p className="menu-option-element">Man</p>
                        <p className="menu-option-element">Children</p>
                    </div>

                    <div className="search-button">
                        < BsSearch className="search-element" />
                        <input className="search-element" type="text" placeholder="Search..." />
                    </div>

                    <div className="right-option">
                        <div className="right-element">
                            <BsFillPersonFill className="right-element-item right-icon" />
                            <p className="right-element-item">Account</p>
                        </div>
                        <div className="right-element">
                            <BsFillPersonFill className="right-element-item right-icon" />
                            <p className="right-element-item">Bag</p>
                        </div>

                    </div>

                </div>

            </div>

            <div className="product-section">
                <div className="category-option">
                    <div className="category-navbar">
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsSpeakerFill />
                                <p >Speaker</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsCameraReelsFill />
                                <p >Equipment</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsFillMouse2Fill />
                                <p >Control</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsPostageFill />
                                <p >Accessorios</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsMusicNote />
                                <p >Audio</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsFillCalendarFill />
                                <p >Appliances</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsTv />
                                <p >Television Set</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <BsSmartwatch />
                                <p >Digital Watch</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                        <div className="navbar-element">
                            <div className="left-navbar-element">
                                <FaGamepad />
                                <p >Video Games</p>
                            </div>
                            <BsChevronRight className="right-icon" />

                        </div>
                    </div>
                </div>

                <div className="product-content">
                    <div className="product-content-header">
                        <div className="top-header">
                            <div className="left-top-header">Main <BsChevronRight />Tablets </div>
                            <div className="right-top-header">
                                <div className="statistics">
                                    <div className="statistics-content">
                                        <BsBarChartFill className="statistics-icon" />
                                        <p className="statistics-name">Compare</p>
                                    </div>
                                    <div className="statistics-content">
                                        <FaChartLine className="statistics-icon" />
                                        <p className="statistics-name">Compare</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-header">
                            <h2 className="header-name">Apple Pro Display XDR</h2>
                            <div className="sort-method">
                                <p>Sort by:</p>
                                <p>Popularity</p>
                                <p>New</p>
                                <p>Price</p>
                                <p>Rating</p>

                            </div>
                        </div>
                    </div>

                    <div className="product-list">
                        {ProductData.map((product, index) => (
                            <div className="product-box" key={index}>
                                <img src={product.productImage} className="product-image" alt={product.productName} />
                                <div className="product-infor">
                                    <p className="product-name">{product.productName}</p>
                                    <div className="shop-price-infor">
                                        <p className="product-shop">{product.shopName}</p>
                                        <p className="product-price">${product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="footer">
                <div className="shop-address">
                    <p className="page-name">Constructor</p>
                    <p className="address">12 Water St.vacouver, BC V6B 132 United States</p>
                </div>

                <div className="footer-menu" >
                    <p>Corporate sales</p>
                    <p>Feedback</p>
                    <p>Job</p>
                    <p>New</p>
                    <p>Sales Rules</p>
                    <p>For partners</p>
                </div>

                <div className="footer-menu" >
                    <p>Bonus program</p>
                    <p>Gift Cards</p>
                    <p>Bill payment verifications</p>
                    <p>loans</p>
                    <p>Delivery</p>
                    <p>Service centers</p>
                </div>

                <div className="footer-menu" >
                    <p>How to place an order</p>
                    <p>Ways of payment</p>
                    <p>Exchange and return of goods</p>
                    <p>Warranty Service</p>
                    <p>Order status</p>
                    <p>Knowledge base</p>
                </div>

                <div className="shop-policy">
                    <p >2030 Company. All Rights Reserved</p>
                    <p>Terms & Condition</p>
                    <p>privacy policy</p>
                </div>

            </div>
        </div>
    )
}

export default ShopPage;