import React from 'react';

const renderStars = (ratingStar) => {
    const maxStars = 5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        if (i <= Math.floor(ratingStar)) {
            stars.push(
                <svg
                    key={i}
                    className="w-5 fill-yellow-300"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                        stroke="none"
                    />
                </svg>
            );
        } else if (i - 1 < ratingStar && ratingStar < i) {
            const percentage = (ratingStar - (i - 1)) * 100;
            stars.push(
                <svg
                    key={i}
                    className="w-5"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id={`partial-fill-${i}`} x1="0" x2="100%" y1="0" y2="0">
                            <stop offset={`${percentage}%`} stopColor="#FBBF24" />
                            <stop offset={`${percentage}%`} stopColor="#CED5D8" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                        stroke="none"
                        fill={`url(#partial-fill-${i})`}
                    />
                </svg>
            );
        } else {
            stars.push(
                <svg
                    key={i}
                    className="w-5 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                        stroke="none"
                    />
                </svg>
            );
        }
    }

    return stars;
};

export default renderStars;