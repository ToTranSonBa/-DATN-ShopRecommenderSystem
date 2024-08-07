import React from 'react';

const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

const ProductPricing = ({ id, originalPrice, price }) => {
    return (
        <div className="flex items-center justify-between align-bottom">
            {originalPrice !== price ? (
                <div>
                    <p className="text-sm text-gray-300 line-through">{formatNumber(originalPrice)}₫</p>
                    <span className="text-lg sm:text-xl font-semibold text-gray-900">{formatNumber(price)}₫</span>
                </div>
            ) : (
                <span className="text-lg sm:text-xl font-semibold text-gray-900">{formatNumber(originalPrice)}₫</span>
            )}
            <a href={`/productdetail/${id}`}
                className="hidden sm:block border-blue-700 text-blue-700 border bg-white hover:text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm p-1 sm:p-2 text-center">
                Mua ngay
            </a>
        </div>
    );
};

export default ProductPricing;