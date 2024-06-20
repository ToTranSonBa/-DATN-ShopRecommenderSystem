import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Logo from '../../assets/BrandLogos/Logo.png';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Search from './search';
import Vietnam from '../../assets/vn.png';
import DefaultAVT from '../../assets/default-avatar.png';
//
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// API
import { fetchCartUser } from '../../services/HeaderApi/index';
import { userApi } from '../../services/UserApi/userApi';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
// format number
const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};
const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
];
const Navigation = ({ className_bg, className_textcolor, onHover, onLeave }) => {
    const [open, setOpen] = useState(true);
    //
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
    const [isHoverCart, setIsHoverCart] = useState(false);
    const [itemInCart, setItemInCart] = useState(0);
    const [listsItemCart, setListsItemCart] = useState([]);
    const [error, setError] = useState(null);
    const [userInfor, setUserInfor] = useState([]);
    const handleMouseOnHoverMenuUser = () => {
        setIsMenuUserOpen(true);
    };
    const handleMouseOutHoverMenuUser = () => {
        setIsMenuUserOpen(false);
    };

    const handleMouseOutCart = () => {
        setIsHoverCart(false);
    };

    const handleMouseOnCart = () => {
        setIsHoverCart(true);
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

    const fetchUser = useCallback(async () => {
        try {
            const response = await userApi(token);
            setUserInfor(response);
        } catch (error) {
            console.error('Failed to fetch userApi:', error);
        }
    });

    const getCartUser = useCallback(async () => {
        try {
            const response = await fetchCartUser(token);
            setListsItemCart(response.data);
            // Lấy chiều dài của mảng trả về từ API
            const itemInCartAPI = response.data.length;

            // Gọi hàm setItemInCart để cập nhật trạng thái
            setItemInCart(itemInCartAPI);
        } catch (error) {
            setError('Failed to fetch cart item');
            console.error('Failed to fetch cart item: ', error);
        }
    }, [token, setItemInCart, setError]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
            await getCartUser();
        };
        fetchData();
    }, []);
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
                                {token ? (
                                    <div className="flex items-center lg:gap-12">
                                        <div
                                            onClick={handleMouseOnCart}
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
                                                <span className="absolute inline-flex mx-auto text-xs text-white">
                                                    {itemInCart > 99 ? '99+' : itemInCart}
                                                </span>
                                            </span>

                                            <Transition show={isHoverCart}>
                                                <Dialog className="relative z-[100]" onClose={setIsHoverCart}>
                                                    <TransitionChild
                                                        enter="ease-in-out duration-500"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="ease-in-out duration-500"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                                                    </TransitionChild>

                                                    <div className="fixed inset-0 overflow-hidden">
                                                        <div className="absolute inset-0 overflow-hidden">
                                                            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                                                                <TransitionChild
                                                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                                                    enterFrom="translate-x-full"
                                                                    enterTo="translate-x-0"
                                                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                                                    leaveFrom="translate-x-0"
                                                                    leaveTo="translate-x-full"
                                                                >
                                                                    <DialogPanel className="w-screen max-w-md pointer-events-auto">
                                                                        <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                                                                            <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                                                                                <div className="flex items-start justify-between">
                                                                                    <DialogTitle className="text-lg font-medium text-gray-900">
                                                                                        Giỏ hàng
                                                                                    </DialogTitle>
                                                                                    <div className="flex items-center ml-3 h-7">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
                                                                                            onClick={() =>
                                                                                                setIsHoverCart(false)
                                                                                            }
                                                                                        >
                                                                                            <span className="absolute -inset-0.5" />
                                                                                            <span className="sr-only">
                                                                                                Đóng
                                                                                            </span>
                                                                                            <XMarkIcon
                                                                                                className="w-6 h-6"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="mt-8">
                                                                                    <div className="flow-root">
                                                                                        <ul
                                                                                            role="list"
                                                                                            className="-my-6 divide-y divide-gray-200"
                                                                                        >
                                                                                            {listsItemCart.map(
                                                                                                (product) => (
                                                                                                    <li
                                                                                                        key={product.id}
                                                                                                        className="flex py-6"
                                                                                                    >
                                                                                                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                                                                                            <img
                                                                                                                src={
                                                                                                                    product.productImgs
                                                                                                                }
                                                                                                                alt={
                                                                                                                    product.productImgs
                                                                                                                }
                                                                                                                className="object-cover object-center w-full h-full"
                                                                                                            />
                                                                                                        </div>

                                                                                                        <div className="flex flex-col flex-1 ml-4">
                                                                                                            <div>
                                                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                                                    <h3>
                                                                                                                        <a
                                                                                                                            href={`/productdetail/${product.product.iD_NK}`}
                                                                                                                        >
                                                                                                                            {
                                                                                                                                product
                                                                                                                                    .product
                                                                                                                                    .name
                                                                                                                            }
                                                                                                                        </a>
                                                                                                                    </h3>
                                                                                                                    <p>
                                                                                                                        {formatNumber(
                                                                                                                            product
                                                                                                                                .product
                                                                                                                                .price,
                                                                                                                        )}
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                                <p className="mt-1 text-sm text-gray-500">
                                                                                                                    {
                                                                                                                        product
                                                                                                                            .optionValues
                                                                                                                            .name
                                                                                                                    }
                                                                                                                </p>
                                                                                                            </div>
                                                                                                            <div className="flex items-end justify-between flex-1 text-sm">
                                                                                                                <p className="text-gray-500">
                                                                                                                    Số
                                                                                                                    lượng{' '}
                                                                                                                    {
                                                                                                                        product.quantity
                                                                                                                    }
                                                                                                                </p>

                                                                                                                <div className="flex">
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                                                    >
                                                                                                                        Xoá
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                ),
                                                                                            )}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <p>
                                                                                        Các sản phẩm có trong giỏ hàng
                                                                                    </p>
                                                                                </div>
                                                                                <p className="mt-0.5 text-sm text-gray-500">
                                                                                    Đi đến giỏ hàng để chọn sản phẩm cần
                                                                                    mua
                                                                                </p>
                                                                                <div className="mt-6">
                                                                                    <a
                                                                                        href="/cartshoppingpage"
                                                                                        className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                                                                                    >
                                                                                        Đến giỏ hàng
                                                                                    </a>
                                                                                </div>
                                                                                <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                                                                                    <p>
                                                                                        hoặc{' '}
                                                                                        <button
                                                                                            type="button"
                                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                            onClick={() =>
                                                                                                setIsHoverCart(false)
                                                                                            }
                                                                                        >
                                                                                            Tiếp tục mua sắm
                                                                                            <span aria-hidden="true">
                                                                                                {' '}
                                                                                                &rarr;
                                                                                            </span>
                                                                                        </button>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </DialogPanel>
                                                                </TransitionChild>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </Transition>
                                        </div>
                                        <div
                                            className="relative ml-3"
                                            onMouseEnter={handleMouseOnHoverMenuUser}
                                            onMouseLeave={handleMouseOutHoverMenuUser}
                                        >
                                            <button className="relative flex text-sm border-2 border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="object-cover rounded-full size-9 "
                                                    src={
                                                        userInfor.avatar != 'No image yet'
                                                            ? userInfor.avatar
                                                            : DefaultAVT
                                                    }
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
                                                    Tiếng Việt
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
