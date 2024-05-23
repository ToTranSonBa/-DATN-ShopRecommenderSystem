import React from 'react';
import ProductRating from './ProductRating';
import ProductPricing from './ProductPricing';

const data = {"Image": [
    {
        "base_url": "https://salt.tikicdn.com/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg",
        "is_gallery": true,
        "label": null,
        "large_url": "https://salt.tikicdn.com/cache/w1200/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg",
        "medium_url": "https://salt.tikicdn.com/cache/w300/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg",
        "position": null,
        "small_url": "https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg",
        "thumbnail_url": "https://salt.tikicdn.com/cache/200x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg"
    }
],}

const ProductCard = ({ product }) => {
    return (
        <div key={product.iD_NK} className="bg-white shadow-sm rounded-lg max-w-sm hover:shadow-lg hover:border hover:border-primary">
            <a href="#a">
                {product.allTimeQuantitySold > 1000 
                && 
                <span className="absolute px-2 py-1 mx-4 my-12 bg-orange-100 text-xs text-orange-500 rounded font-semibold">
                    Bán chạy
                </span>}
                
                {product?.brandID_NK ? 
                <span className="absolute px-2 py-1 m-4 bg-blue-100 text-xs text-primary rounded font-semibold">
                    ✓ Chính hãng
                </span> : <div></div>}
                
                <img className="rounded-t-lg p-4" src={data.Image[0].base_url} alt="product image"/>
            </a>
            <div className="px-5 pb-5 align-bot items-baseline">
                <a href="#a">
                    <h3 className="text-gray-900 font-semibold text-lg limit-text">{product.name}</h3>
                </a>
                <ProductRating ratingAverage={product.ratingAverage} />
                <ProductPricing originalPrice={product.originalPrice} price={product.price} />
            </div>
        </div>
    );
};

export default ProductCard;