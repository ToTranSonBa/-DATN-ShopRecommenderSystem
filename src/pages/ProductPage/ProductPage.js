import React, { useState } from "react";
import './ProductPage.scss';
import Sidebar from '../../components/layout/components/Sidebar/Sidebar';

import { BsChevronRight, BsBarChartFill, BsHeart, BsChatSquareTextFill } from "react-icons/bs";
import { FaChartLine, FaMapMarkerAlt, FaTimes, FaPlus } from "react-icons/fa";

const ProductPage = () => {

    const [displayedImage, setDisplayedImage] = useState('https://th.bing.com/th/id/R.0ace1067fd7096bb58c350a74931fbcc?rik=WvedQPhNeX2RQA&pid=ImgRaw&r=0');
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (newImageSrc) => {
        setDisplayedImage(newImageSrc);
        setSelectedImage(newImageSrc);
    };

    const getImageBorder = (imageSrc) => {
        return selectedImage === imageSrc ? '2px solid #FF6633' : '2px solid rgba(128, 128, 128, 0.1)';
    };
    return (
        <div className="product-page">

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

                    </div>

                    <div className="product-details">
                        <div className="product-details-left">
                            <div className="product-details-left-header">
                                <div className="product-ship-name">
                                    <button className="product-ship">Free Shipping</button>
                                    <h1 className="product-name">Apple iPad Pro 11</h1>
                                </div>
                                <div className="product-price">
                                    <div className="product-current-price">$340.00</div>
                                    <div className="product-original-price">$1299.00</div>
                                </div>

                                <div className="buy-section">
                                    <button className="buy-button">Add to bag</button>
                                    <BsHeart />
                                </div>
                            </div>

                            <div className="product-details-left-delivery">
                                <div className="pickup-ship">
                                    <div className="pickup-ship-icon-bg">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="pickup-ships-header">
                                        <p className="pickup-ships-title">Pickup:</p>
                                        <p >Choose a place</p>
                                        <p>Free Pickup</p>
                                    </div>
                                </div>

                                <div className="pickup-ship">
                                    <div className="pickup-ship-icon-bg">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="pickup-ships-header">
                                        <p className="pickup-ships-title">Ships:</p>
                                        <p >223 weeks</p>
                                        <p>From $10</p>
                                    </div>
                                </div>

                            </div>

                            <div className="product-details-left-help">
                                <BsChatSquareTextFill className="help-icon" />
                                <p >need some help? Contact us</p>
                            </div>
                        </div>

                        <div className="product-images">
                            <div className="product-image-display-bg">
                                <img src={displayedImage} className="product-image-display" alt="Displayed Product" />
                            </div>
                            <div className="image-list">
                                <img className={`product-image-pick ${selectedImage === "https://th.bing.com/th/id/R.0ace1067fd7096bb58c350a74931fbcc?rik=WvedQPhNeX2RQA&pid=ImgRaw&r=0" ? "product-image-border-pick" : "product-image-border-unpick"}`} src="https://th.bing.com/th/id/R.0ace1067fd7096bb58c350a74931fbcc?rik=WvedQPhNeX2RQA&pid=ImgRaw&r=0" alt="Product Image 1" onClick={() => handleImageClick('https://th.bing.com/th/id/R.0ace1067fd7096bb58c350a74931fbcc?rik=WvedQPhNeX2RQA&pid=ImgRaw&r=0')} style={{ border: getImageBorder('https://th.bing.com/th/id/R.0ace1067fd7096bb58c350a74931fbcc?rik=WvedQPhNeX2RQA&pid=ImgRaw&r=0') }} />
                                <img className="product-image-pick" src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/refurb-ipad-pro-11-wifi-silver-2019?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1581985473264" alt="Product Image 2" onClick={() => handleImageClick('https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/refurb-ipad-pro-11-wifi-silver-2019?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1581985473264')} style={{ border: getImageBorder('https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/refurb-ipad-pro-11-wifi-silver-2019?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1581985473264') }} />
                                <img className="product-image-pick" src="https://th.bing.com/th/id/OIP.zXYWVgQ60IA8y8hlnYPEbgHaHa?rs=1&pid=ImgDetMain" alt="Product Image 3" onClick={() => handleImageClick('https://th.bing.com/th/id/OIP.zXYWVgQ60IA8y8hlnYPEbgHaHa?rs=1&pid=ImgDetMain')} style={{ border: getImageBorder('https://th.bing.com/th/id/OIP.zXYWVgQ60IA8y8hlnYPEbgHaHa?rs=1&pid=ImgDetMain') }} />
                            </div>
                        </div>
                    </div>

                    <div className="product-information">
                        <div className="product-information-header">
                            <p className="product-information-title">Product information</p>
                            <FaTimes className="product-information-icon" />
                        </div>
                        <div className="product-information-content">
                            <p className="product-information-content-header">Over view</p>
                            <div className="product-information-description-list">
                                <p >With iPad,you get what you you need from a computer, along with many incredible things you'd never expect from one. Here are a few reasons why your next computer just might be an iPad</p>
                                <p >ipad features advanced, Apple-designed chips that transform how you experience photos,gaming,and augmented reality. They also make iPad powerful enough to handle the apps you use every day. And even pro apps like Adobe photoshop CC.</p>

                            </div>

                        </div>
                        <div className="product-information-content">
                            <p className="product-information-content-header">Highlights</p>
                            <div className="product-information-description-list">
                                <p >Designed by Apple</p>
                                <p >Active Noise Cancellation</p>
                                <p >More customizable fit and seal</p>
                                <p >Transparency mode</p>
                                <p >Amazing sound quality with  Adaptive EQ</p>
                                <p >battery life: Approximately 13 hours</p>

                            </div>

                        </div>
                    </div>

                    <div className="customer-section">
                        <div className="customer-content">
                            <div className="customer-content-text">
                                <p className="customer-content-title"> Compatibility</p>
                                <FaPlus className="plus-icon" />
                            </div>
                        </div>

                        <div className="customer-content">
                            <div className="customer-content-text">
                                <p className="customer-content-title"> Questions & Answers</p>
                                <FaPlus className="plus-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="more-product-section">
                        <div className="more-product">
                            <div className="more-product-image-bg">
                                <img className="more-product-image" src="https://th.bing.com/th/id/R.470f5cded932e0c4a2edc34ed894347c?rik=oScJhHVMnWFOXA&pid=ImgRaw&r=0" />
                            </div>
                            <p className="more-product-name">AirPods pro</p>
                        </div>

                        <div className="more-product">
                            <div className="more-product-image-bg">
                                <img className="more-product-image" src="https://www.apple.com/v/pro-display-xdr/a/images/meta/og__e0rnawpqmieu.jpg?201906021506" />
                            </div>
                            <p className="more-product-name">Pro Display XDR</p>
                        </div>

                        <div className="more-product">
                            <div className="more-product-image-bg">
                                <img className="more-product-image" src="https://th.bing.com/th/id/OIP.CiJlgeq7il5dcc76Hn99YQHaHa?rs=1&pid=ImgDetMain" />
                            </div>
                            <p className="more-product-name">Wireless bluetooth Speaker</p>
                        </div>
                    </div>

                    <div className="show-more-section">
                        <button className="show-more-button">Show More</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProductPage;