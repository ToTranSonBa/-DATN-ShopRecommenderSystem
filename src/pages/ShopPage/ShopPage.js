import React, { useState } from "react";
import "../ShopPage/ShopPage.scss";
import "../../styles/reset.css";
import {
    BsSpeakerFill, BsChevronRight,
    BsCameraReelsFill, BsFillMouse2Fill, BsPostageFill, BsMusicNote, BsFillCalendarFill,
    BsTv, BsSmartwatch, BsBarChartFill
} from "react-icons/bs";
import { FaGamepad, FaChartLine } from "react-icons/fa";
import Sidebar from '../../components/layout/components/Sidebar/Sidebar'

import ProductData from '../ShopPage/ProductData';
import Navigation from "../../components/layout/components/Navigation/Navigation";
const ShopPage = () => {

    return (
        <div className="shop-page">
            <Navigation />
            <div className="header-section">
                <img class="header-image" src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1618927830-Classic-Chuck-vs-Chuck-70s-gear-patrol-70-2.jpg">
                </img>
                <h1 className="shop-name">Men's Shoes</h1>
                <div className="shop-now-button">Shop now</div>
            </div>


            <div className="product-section">
                <Sidebar />
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


        </div>
    )
}

export default ShopPage;