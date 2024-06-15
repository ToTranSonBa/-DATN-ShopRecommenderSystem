/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ProductRating from "./ProductRating";
import ProductPricing from "./ProductPricing";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product.iD_NK}
      className="bg-white shadow-sm hover:shadow-lg rounded-lg max-w-sm hover:border hover:border-blue-700"
    >
      <a href={`/productdetail/${product.iD_NK}`}>
        {product.allTimeQuantitySold > 1000 && (
          <span className="absolute px-2 py-1 mx-4 my-12 bg-orange-100 text-xs text-orange-500 rounded font-semibold">
            Bán chạy
          </span>
        )}

        {product?.brandID_NK ? (
          <span className="absolute px-2 py-1 m-4 bg-blue-100 text-xs text-blue-700 rounded font-semibold">
            ✓ Chính hãng
          </span>
        ) : (
          <div></div>
        )}

        <img
          className="rounded-t-lg p-2 sm:p-4 h-72"
          src={product.image}
          alt="product image"
        />
      </a>
      <div className="p-3 sm:p-5 align-bot items-baseline">
        <a href={`/productdetail/${product.iD_NK}`}>
          <h3 className="text-gray-900 font-semibold text-sm sm:text-lg limit-text">
            {product.name}
          </h3>
        </a>
        <ProductRating ratingAverage={product.ratingAverage} />
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
