import React, { useState } from "react";
import "../ShopPage/ShopPage.scss";
import { FaFilter, FaAngleDown, FaTh, FaThLarge, FaThList, FaBars, FaStar, FaMailBulk } from "react-icons/fa";
import ProductData from '../ShopPage/ProductData';
const ShopPage = () => {
    const prices = ['All Price', '$0.00-99.99', '$100.00-199.99', , '$200.00-299.99', '$300.00-399.99', '$400.00+'];
    const categories = ['All Rooms', 'Living Room', 'bedroom', , 'Kitchen', 'Bathroom', 'Dinning', 'Outdoor', 'Inside'];
    const [activeButton, setActiveButton] = useState(null);
    const [categoryIndex, setcategoryIndex] = useState(null);

    const handleButtonClick = (buttonId, index) => {
        setActiveButton(buttonId);
        setcategoryIndex(index);
    };

    // Sử dụng useState để lưu trữ giá trị được chọn
    const [selectedPrice, setSelectedPrice] = useState(prices[0]);

    // Hàm xử lý sự kiện khi radio button được chọn
    const handleRadioChange = (price) => {
        setSelectedPrice(price);
    };
    return (
        <div className="ShopPage">
            <div className="shopPage-header">
                <div>
                    <h1 className="shop-name">Shop Page</h1>
                    <p className="shop-description">Let's design the  place you always imagined</p>
                </div>
            </div>
            <div className="shop-product">
                <div className="shop-sidebar">
                    <div className="sidebar-filter">
                        <FaFilter />
                        <div>Filter</div>
                    </div>

                    <div className="categories">
                        <p className="category-header">Category</p>
                        <ul className="category-list">
                            {categories.map((category, index) => (
                                <li key={category}>
                                    <button
                                        className={`category-button ${activeButton === category ? 'active' : ''}`}
                                        onClick={() => handleButtonClick(category, index)}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="prices">
                        <p className="price-header">Price</p>
                        <ul className="price-list">
                            {prices.map(price => (
                                <li className="price-element" key={price}>
                                    <label>
                                        {price}
                                        <input
                                            type="radio"
                                            value={price}
                                            checked={selectedPrice === price}
                                            onChange={() => handleRadioChange(price)}
                                        />
                                        <span className="custom-radio"></span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div></div>
                </div>
                <div className="shop-grids">
                    <div className="grid-header">
                        <h2 className="category-name">{categories[categoryIndex]}</h2>
                        <div className="sort-icons">
                            <p className="sort-header">Sort by<FaAngleDown /></p>
                            <div className="icon-container">
                                <button className="icon"><FaTh /></button>
                                <button className="icon"><FaThLarge /></button>
                                <button className="icon"><FaThList /></button>
                                <button className="icon"><FaBars /></button>
                            </div>
                        </div>
                    </div>

                    <div className="product-section">
                        {
                            ProductData.map((product) => (
                                <div className="product-box" key={product.id}>

                                    <div className="img-box" >
                                        <img src={product.img} alt={product.title} />
                                        <div className="product-type">{product.type}</div>
                                        <div className="product-discount">{product.discount}</div>
                                    </div>
                                    <div className="product-rating">
                                        {
                                            Array.from({ length: product.rating }, (_, index) => (
                                                <FaStar key={index} />
                                            ))
                                        }
                                    </div>
                                    <div className="product-title">{product.title}</div>
                                    <div className="product-cost">
                                        <div className="product-price">${product.price}</div>
                                        {product.originalPrice !== 0 && (
                                            <del className="product-original-price">${product.originalPrice}</del>
                                        )}

                                    </div>
                                </div>
                            ))
                        }


                    </div>



                    <button className="show-more">Show more</button>
                </div>

            </div>

            <div className="shop-information">
                <div className="shop-information-content">
                    <div>
                        <h1 className="shop-infor-slogan">Join Our Newsletter</h1>
                    </div>

                    <p className="shop-infor-description">sign up for deals, new products and promotions </p>
                    <div className="shop-contact">
                        <p><FaMailBulk />  email address</p>
                        <p>signup</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShopPage;