import React from 'react';

const renderLine = (ratingCount, ratingTotal, index) => {
    const percentage = Math.round((ratingCount / ratingTotal) * 100);
    const gradientId = `line-fill-${index}`;

    return (
        <svg
            key={index}
            className="flex w-full h-full rounded"
            // viewBox="0 0 100 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id={gradientId} x1="0" x2="100%" y1="0" y2="0">
                    <stop offset={`${percentage}%`} stopColor="#FBBF24" />
                    <stop offset={`${percentage}%`} stopColor="#CED5D8" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </svg>
    );
};

export default renderLine;
