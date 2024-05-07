import React, { useState, useEffect } from "react";
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

import { ProductsApi } from '../../services/HomeApi/home'
const ShopPage = () => {
    const [productsData, setProductsData] = useState([]);


    useEffect(() => {
        console.log("1");
        fetchData();
    }, []);
    const fetchData = async () => {
        try {

            const response = await ProductsApi();
            console.log('>>>check response: ', response);
            if (response) {
                setProductsData(response);
            } else {
                setProductsData([]);
            }

        } catch (error) {
            console.error('>>> Error fetching data: ', error);
        }
    };
    return (
        <div className="shop-page">
            <Navigation />



            <div className="product-section">
                <Sidebar />
                <div className="product-content">
                    <div className="product-content-header">
                        <div className="top-header">
                            <div className="left-top-header">Main <BsChevronRight />Tablets </div>

                        </div>

                        <div className="content-header">
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