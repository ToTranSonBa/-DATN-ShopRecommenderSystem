import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderNotificationBar = ({ className_bg, content, className_textcolor }) => {
    const navigate = useNavigate();
    const goToProductPage = () => {
        navigate('/productpage');
    };
    return (
        <div className={`items-center justify-center gap-2 px-1 py-1 flex lg:py-1 ${className_bg}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4  md:w-6 md:h-6 lg:w-7 lg:h-7 ${className_textcolor}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
            </svg>
            <span className={`text-sm font-normal md:text-md ${className_textcolor}`}>
                {content} — Thời gian có hạn!{' '}
            </span>
            <div
                onClick={goToProductPage}
                className={`flex items-center cursor-pointer text-sm font-normal md:text-md text-primary lg:underline`}
            >
                Mua ngay
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-4 h-4 md:w-5 md:h-5`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
            </div>
        </div>
    );
};

export default HeaderNotificationBar;
