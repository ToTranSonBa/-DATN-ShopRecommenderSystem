import React from 'react';
const formatQuantity = (quantity) => {
    if (quantity < 1000) {
        return quantity.toString(); // Trả về số dưới 1000 với định dạng chuỗi
    } else if (quantity >= 1000 && quantity < 1000000) {
        return (quantity / 1000).toFixed(1) + 'K'; // Chuyển đổi thành K với một chữ số thập phân
    } else if (quantity >= 1000000 && quantity < 1000000000) {
        return (quantity / 1000000).toFixed(2) + 'M'; // Chuyển đổi thành M với hai chữ số thập phân
    } else {
        return (quantity / 1000000000).toFixed(2) + 'B'; // Chuyển đổi thành B với hai chữ số thập phân
    }
};

const ProductRating = ({ ratingAverage, allTimeQuantitySold, sort = false }) => {
    const filledStars = Math.floor(ratingAverage); // Get the integer part of the rating
    const hasHalfStar = ratingAverage - filledStars >= 0.5; // Check if there is a half star

    // Create an array of stars with appropriate fill color
    const stars = Array(5)
        .fill()
        .map((_, index) => {
            let fillColor = 'text-gray-300'; // Default fill color for empty star
            if (index < filledStars) {
                fillColor = 'text-yellow-300'; // Fill color for filled star
            } else if (index === filledStars && hasHalfStar) {
                fillColor = 'text-yellow-300'; // Fill color for half star
            }

            return (
                <svg
                    key={index}
                    className={`${sort ? 'size-4' : 'size-6'}  ${fillColor} `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        });

    return (
        <div className="flex justify-between lg:gap-2 items-center my-2.5">
            <div className={`${sort ? '' : 'w-full'} flex `}>
                <div className="flex">{stars}</div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-3 hidden sm:block">
                    {ratingAverage === 0 ? 'N/A' : ratingAverage}
                </span>
            </div>

            <span className={` ${sort ? '' : 'hidden'} text-xs font-light`}>
                Đã bán {allTimeQuantitySold !== null ? formatQuantity(allTimeQuantitySold) : 'Loading...'}
            </span>
        </div>
    );
};

export default ProductRating;
