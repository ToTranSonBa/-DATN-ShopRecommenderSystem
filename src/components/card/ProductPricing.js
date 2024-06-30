import React from "react";

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

const ProductPricing = ({ id, originalPrice, price }) => {
  return (
    <div className="flex items-center justify-between align-bottom">
      {originalPrice !== price ? (
        <div>
          <p className="text-sm text-gray-300 line-through">
            {formatNumber(originalPrice)}₫
          </p>
        </div>
      ) : (
        <span className="text-lg sm:text-xl font-semibold text-gray-900">
        </span>
      )}

      {originalPrice !== price ? (
        <div>
          <span className="text-lg sm:text-xl font-semibold text-gray-900">
            {formatNumber(price)}₫
          </span>
        </div>
      ) : (
        <span className="text-lg sm:text-xl font-semibold text-gray-900">
          {formatNumber(originalPrice)}₫
        </span>
      )}
    </div>
  );
};

export default ProductPricing;
