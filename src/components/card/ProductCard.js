/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ProductRating from "./ProductRating";
import ProductPricing from "./ProductPricing";

const ProductCard = ({ product, image = null }) => {
    return (
        <div
            key={product.iD_NK}
            className="max-w-sm bg-white rounded-lg shadow-sm hover:shadow-lg hover:border hover:border-blue-700"
        >
            <a href={`/productdetail/${product.iD_NK}`}>
                {product.allTimeQuantitySold > 1000 && product?.brandID_NK ? (
                    <div>
                        <span className="absolute px-2 py-1 m-4 text-xs font-semibold text-blue-700 bg-blue-100 rounded">
                            ✓ Chính hãng
                        </span>
                        <span className="absolute px-2 py-1 mx-4 my-12 text-xs font-semibold text-orange-500 bg-orange-100 rounded">
                            Bán chạy
                        </span>
                    </div>
                ) : <></>}

                {product?.brandID_NK ? (
                    <div>
                        <span className="absolute px-2 py-1 m-4 text-xs font-semibold text-blue-700 bg-blue-100 rounded">
                            ✓ Chính hãng
                        </span>
                    </div>
                ) : <></>}

                <img
                    data-twe-lazy-load-init
                    data-twe-lazy-src
                    className="p-2 rounded-t-lg sm:p-4 h-72 m-auto"
                    src={image ? image : product.image}
                    alt="product image"
                />
            </a>
            <div className="items-baseline p-3 sm:p-5 align-bot">
                <a href={`/productdetail/${product.iD_NK}`}>
                    <h3 className="h-[55px] text-sm font-semibold text-gray-900 sm:text-lg limit-text">
                        {product.name}
                    </h3>
                </a>
                <ProductRating
                    ratingAverage={product.ratingAverage}
                    allTimeQuantitySold={product.allTimeQuantitySold}
                    sort={true}
                />

                <ProductPricing
                    id={product.iD_NK}
                    originalPrice={product.originalPrice}
                    price={product.price}
                />
            </div>
        </div>
    );
};

export default ProductCard;