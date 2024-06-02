import React, { useState, useEffect } from 'react';
import Logo from '../../assets/BrandLogos/Logo.png';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Search from './search';
import Vietnam from '../../assets/vn.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'Dashboard', href: '#', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navigation = ({ className_bg, className_textcolor, onHover, onLeave }) => {
    const navigate = useNavigate();
    const getUser = localStorage.getItem('token');
    const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
    const [isHoverCart, setIsHoverCart] = useState(false);
    const handleMouseOnHoverMenuUser = () => {
        setIsMenuUserOpen(true);
    };
    const handleMouseOutHoverMenuUser = () => {
        setIsMenuUserOpen(false);
    };

    const handleMouseOnCart = () => {
        // if (onHover) {
        //     onHover();
        // }
        setIsHoverCart(true);
    };

    const handleMouseOutCart = () => {
        // if (onLeave) {
        //     onLeave();
        // }
        setIsHoverCart(false);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login'); // Chuyển hướng người dùng đến trang đăng nhập
    };
    const goToSignUP = () => {
        navigate('/signup');
    };
    const goToLogin = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const goToUserPage = () => {
        navigate('/userpage');
    };
    const goToCart = () => {
        navigate('/cartshoppingpage');
    };
    return (
        <div className="inset-x-0 top-8 md:absolute md:z-10">
            <div className={`max-w-full  ${className_bg}`}>
                <MaxWidthWrapper>
                    <div className="max-w-full px-2 mx-auto sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16 lg:gap-8 ">
                            <div className="flex items-center justify-center flex-1 lg:gap-12 sm:items-stretch sm:justify-start">
                                <a href="/" className="flex items-center flex-shrink-0">
                                    <img className="w-auto h-5" src={Logo} alt="Your Company" />
                                    <span
                                        className={`px-1 font-semibold ${className_textcolor} text-md md:text-xl lg:text-xl`}
                                    >
                                        ShopLY
                                    </span>
                                </a>
                                <Search />
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                {getUser ? (
                                    <div className="flex items-center lg:gap-12">
                                        <div
                                            onMouseOver={handleMouseOnCart}
                                            onMouseOut={handleMouseOutCart}
                                            className="relative flex items-center justify-center h-16 mx-auto "
                                        >
                                            <div
                                                className={` ${className_bg}  h-12 w-12 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out before:content-[''] before:absolute before:w-0 before:h-0 before:opacity-20 before:bg-primary before:top-0 before:left-0 before:bottom-0 before:right-0 before:m-auto hover:before:animate-anim-in`}
                                            ></div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className={`z-10 font-semibold text-center ${className_textcolor} pointer-events-none size-6`}
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>

                                            <span className=" absolute flex justify-center items-center h-6 w-6 top-2 -right-3 transform translate-x-2.5 -translate-y-2.5">
                                                <span className="absolute inline-flex w-full h-full bg-red-700 rounded-full animate-ping"></span>
                                                <span className="absolute inline-flex text-white bg-purple-500 rounded-full w-7 h-7"></span>
                                                <span className="absolute inline-flex text-sm text-white">12</span>
                                            </span>

                                            {isHoverCart && (
                                                <div className="absolute z-50 bg-gray-100 rounded-sm -right-10 w-96 top-10 lg:px-2 lg:py-2">
                                                    <span className="font-light text-gray-500">Sản phẩm mới thêm</span>
                                                    <div className="lg:py-1">
                                                        <div className="flex lg:gap-2 lg:py-1">
                                                            <img className="size-10" src={Logo} />
                                                            <div className="flex justify-between lg:gap-2 ">
                                                                <p className="w-64 overflow-hidden text-ellipsis whitespace-nowrap">
                                                                    thời giant trang namm oafoas dhfahsdh ashfa shfa
                                                                    shfashf aishf aio
                                                                </p>
                                                                <span className="ml-auto font-light text-red-500">
                                                                    56.220
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex lg:gap-2 lg:py-1">
                                                            <img className="size-10" src={Logo} />
                                                            <div className="flex justify-between lg:gap-2 ">
                                                                <p className="w-64 overflow-hidden text-ellipsis whitespace-nowrap">
                                                                    thời giant trang namm oafoas dhfahsdh ashfa shfa
                                                                    shfashf aishf aio
                                                                </p>
                                                                <span className="ml-auto font-light text-red-500">
                                                                    56.220
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex lg:gap-2 lg:py-1">
                                                            <img className="size-10" src={Logo} />
                                                            <div className="flex justify-between lg:gap-2 ">
                                                                <p className="w-64 overflow-hidden text-ellipsis whitespace-nowrap">
                                                                    thời giant trang namm
                                                                </p>
                                                                <span className="font-light text-red-500 ">56.220</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex lg:gap-2 lg:py-1">
                                                            <img className="size-10" src={Logo} />
                                                            <div className="flex justify-between lg:gap-2 ">
                                                                <p className="w-64 overflow-hidden text-ellipsis whitespace-nowrap">
                                                                    thời giant trang namm oafoas dhfahsdh ashfa shfa
                                                                    shfashf aishf aio
                                                                </p>
                                                                <span className="ml-auto font-light text-red-500">
                                                                    56.220
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-light text-gray-500">
                                                            12 thêm hàng vào giỏ
                                                        </span>
                                                        <button
                                                            onClick={goToCart}
                                                            className="text-sm text-white rounded-md bg-primary lg:px-2 lg:py-2"
                                                        >
                                                            Xem giỏ hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className="relative ml-3"
                                            onMouseEnter={handleMouseOnHoverMenuUser}
                                            onMouseLeave={handleMouseOutHoverMenuUser}
                                        >
                                            <button className="relative flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>

                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </button>

                                            {isMenuUserOpen && (
                                                <ul className="absolute right-0 z-10 bg-white rounded-md shadow-lg w-80 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <li
                                                        className="block px-4 py-1 text-gray-700 bg-gray-100 cursor-pointer lg:leading-10 text-md hover:bg-white"
                                                        onClick={goToUserPage}
                                                    >
                                                        <a>Thông tin của bạn</a>
                                                    </li>
                                                    <li
                                                        className="block px-4 py-1 text-gray-700 bg-gray-100 cursor-pointer lg:leading-10 text-md hover:bg-white"
                                                        onClick={goToCart}
                                                    >
                                                        <a>Giỏ hàng</a>
                                                    </li>
                                                    <li
                                                        className="block px-4 py-1 text-gray-700 bg-gray-100 cursor-pointer lg:leading-10 text-md hover:bg-white"
                                                        onClick={goToUserPage}
                                                    >
                                                        <a>Đơn hàng của bạn</a>
                                                    </li>
                                                    <li
                                                        className={`lg:py-4 borer-t-2 bg-red-300 hover:bg-red-400 cursor-pointer font-semibold px-4 py-2 text-md text-gray-700`}
                                                        onClick={handleLogout}
                                                    >
                                                        <a className="flex items-center">
                                                            Đăng xuất{' '}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                class="size-4 font-semibold"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="items-center justify-between hidden md:flex lg:gap-12">
                                            <div className="flex-row justify-between lg:gap-4">
                                                <span className={`text-sm font-light ${className_textcolor}`}>
                                                    Giao hàng đến:
                                                </span>
                                                <div className="flex items-center cursor-pointer lg:gap-2">
                                                    <img className="object-cover lg:w-6 lg:h-4" src={Vietnam} />
                                                    <span className={`text-sm  ${className_textcolor}`}>VN</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between cursor-pointer lg:gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className={`w-6 h-6 ${className_textcolor}`}
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                                    />
                                                </svg>
                                                <span className={`text-sm font-light ${className_textcolor}`}>
                                                    Vietnamese
                                                </span>
                                            </div>
                                            <div onClick={goToLogin} href="/login">
                                                <button className="flex items-center justify-between lg:gap-1 ">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className={`w-6 h-6 ${className_textcolor}`}
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                        />
                                                    </svg>
                                                    <span className={`text-sm font-light ${className_textcolor}`}>
                                                        Đăng nhập
                                                    </span>
                                                </button>
                                            </div>
                                            <div onClick={goToSignUP}>
                                                <button
                                                    className={`text-sm font-normal rounded-full lg:py-3 lg:px-6 bg-primary hover:bg-primary/80 text-white `}
                                                >
                                                    Đăng kí
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default Navigation;
