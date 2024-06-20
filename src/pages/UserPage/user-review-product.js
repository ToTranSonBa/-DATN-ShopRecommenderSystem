import React, { useState, useEffect } from 'react';

const ReviewProduct = () => {
    const [reviews, setReviews] = useState({});

    // Handle rating change
    const handleRatingChange = (orderId, itemId, rating) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [orderId]: {
                ...prevReviews[orderId],
                [itemId]: {
                    ...prevReviews[orderId]?.[itemId],
                    rating,
                },
            },
        }));
    };

    // Handle comment change
    const handleCommentChange = (orderId, itemId, field, value) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [orderId]: {
                ...prevReviews[orderId],
                [itemId]: {
                    ...prevReviews[orderId]?.[itemId],
                    [field]: value,
                },
            },
        }));
    };
    {
        return (
            <div
                key={order.id}
                className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
            >
                <div className="flex items-center p-4 border-b border-gray-200 sm:grid sm:grid-cols-6 sm:gap-x-6">
                    <dl className="grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-7 lg:col-span-4">
                        <div className="lg:col-span-3">
                            <div className="flex items-center font-medium text-gray-900 lg:gap-2">
                                Cửa hàng
                                <a
                                    href={`/shoppage/${order.seller.iD_NK}`}
                                    className="flex items-center justify-center text-xs lg:gap-2 bg-slate-50 border-1 lg:px-2 lg:py-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-3"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                                        />
                                    </svg>
                                    Xem shop
                                </a>
                            </div>
                            <dd className="mt-1 text-gray-500">{order.seller}</dd>
                        </div>
                        <div className="hidden lg:col-span-2 sm:block">
                            <dt className="font-medium text-gray-900">Ngày đặt</dt>
                            <dd className="mt-1 text-gray-500">
                                <time dateTime={order.createdAt}>
                                    {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </dd>
                        </div>
                    </dl>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                        {order.status === 2 && (
                            <div className="flex items-center text-sm font-medium text-green-600 lg:gap-2 lg:text-md">
                                <span className="flex items-center lg:gap-1 text-nowrap">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                        />
                                    </svg>
                                    Giao hàng thành công
                                </span>
                                <div className="text-gray-300 lg:py-6 lg:leading-10">| </div>
                            </div>
                        )}
                        <div className="text-sm font-medium text-blue-700">
                            <span className="uppercase lg:text-md text-nowrap">
                                {(() => {
                                    switch (order.status) {
                                        case 0:
                                            return 'Vận chuyển';
                                        case 1:
                                            return 'Chờ giao hàng';
                                        case 2:
                                            return 'Hoàn thành';
                                        case 3:
                                            return 'Đã Hủy';
                                        default:
                                            return 'Unknown Status';
                                    }
                                })()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Products */}

                <ul role="list" className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                        <li key={item.id} className="p-4 sm:p-6">
                            <div className="flex items-center sm:items-start">
                                <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200">
                                    <img
                                        src={item.image}
                                        alt={item.product.name}
                                        className="object-cover object-center w-full h-full"
                                    />
                                </div>
                                <div className="flex-1 ml-6 text-sm">
                                    <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                        <h5>{item.product.name}</h5>
                                        <p className="mt-2 sm:mt-0">{formatNumber(item.product.price)}₫</p>
                                    </div>
                                    {item.optionValues && item.optionValues.name && (
                                        <p className="hidden text-gray-400 sm:block sm:mt-2">
                                            Phân loại hàng: {item.optionValues.name}
                                        </p>
                                    )}
                                    <p className="hidden text-xs text-gray-400 sm:block sm:mt-2">X {item.quantity}</p>
                                </div>
                            </div>

                            <div className="mt-6 sm:flex sm:justify-between">
                                <div className="flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                    <div className="flex justify-center flex-1">
                                        <a
                                            href={`/productdetail/${item.product.iD_NK}`}
                                            className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                        >
                                            Xem sản phẩm
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="bg-white border-t-2 border-gray-200 lg:px-4 lg:py-6">
                    <div className="flex items-center justify-between">
                        {order.status === 2 && (
                            <div className="w-1/2 lg:col-span-2 sm:block">
                                <dt className="font-medium text-gray-900">Ngày giao hàng thành công</dt>
                                <dd className="mt-1 text-gray-500">
                                    <time dateTime={order.createdAt}>
                                        {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                </dd>
                            </div>
                        )}
                        <div className="flex items-center justify-end w-1/2 lg:gap-6">
                            Thành tiền:{'   '}
                            <span className="font-medium lg:text-xl text-primary">
                                ₫{formatNumber(order.totalPrice)}
                            </span>
                        </div>
                    </div>
                    {order.status === 2 && (
                        <div className="flex items-center justify-between">
                            {rating === 0 && (
                                <>
                                    <span className="text-sm font-light">Đánh giá trước </span>
                                    <div className="flex lg:py-6 lg:gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setDropDownRating(true);
                                            }}
                                            className="text-sm font-light text-white rounded-sm bg-primary lg:px-12 lg:py-2"
                                        >
                                            Đánh giá
                                        </button>
                                        <button className="text-sm font-light bg-white rounded-sm border-1 lg:px-12 lg:py-2">
                                            Mua lại
                                        </button>
                                    </div>
                                </>
                            )}
                            {rating === 1 && (
                                <button className="text-sm font-light text-white rounded-sm bg-primary lg:px-12 lg:py-2">
                                    Mua lại
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};
export default ReviewProduct;
