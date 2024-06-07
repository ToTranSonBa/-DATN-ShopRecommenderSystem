import React, { useState } from 'react';
import { Fragment } from 'react';
import AddressManager from '../../components/Address';

const UserPage = () => {
    const [firstName, setFirstName] = useState('Jane');
    const [lastName, setLastName] = useState('Ferguson');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [bio, setBio] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('profile');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleSave = (e) => {
        e.preventDefault();
        // Add your save logic here
        console.log({ firstName, lastName, email, profession, bio });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic thay đổi mật khẩu ở đây
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option === 'profile' || option === 'address' || option === 'changepassword') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };
    const orders = [
        {
            number: 'WU88191111',
            store: 'Sidotech Official Store',
            href: '#',
            invoiceHref: '#',
            createdDate: 'Jul 6, 2021',
            createdDatetime: '2021-07-06',
            deliveredDate: 'July 12, 2021',
            deliveredDatetime: '2021-07-12',
            total: '$160.00',
            status: 1,

            products: [
                {
                    id: 1,
                    name: 'Micro Backpack',
                    description:
                        'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
                    href: '#',
                    price: '$70.00',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
                    imageAlt:
                        'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
                },
                {
                    id: 2,
                    name: 'Micro Backpack',
                    description:
                        'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
                    href: '#',
                    price: '$70.00',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
                    imageAlt:
                        'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
                },
                // More products...
            ],
        },
        {
            number: 'WU88191121',
            store: 'Sidotech Official Store',
            href: '#',
            invoiceHref: '#',
            createdDate: 'Jul 6, 2021',
            createdDatetime: '2021-07-06',
            deliveredDate: 'July 12, 2021',
            deliveredDatetime: '2021-07-12',
            total: '$160.00',
            status: 0,
            products: [
                {
                    id: 1,
                    name: 'Micro Backpack',
                    description:
                        'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
                    href: '#',
                    price: '$70.00',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
                    imageAlt:
                        'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
                },
                // More products...
            ],
        },
        // More orders...
    ];

    const handleStatusClick = (status) => {
        setSelectedStatus(status);
    };

    const filteredOrders =
        selectedStatus === 'all' ? orders : orders.filter((order) => order.status === selectedStatus);

    return (
        <div className="lg:pt-36 bg-background w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100">
                    <a>
                        <button
                            type="button"
                            className="flex w-full items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
                            aria-controls="dropdown-example"
                            onClick={toggleDropdown}
                        >
                            <span className="flex-1 text-left rtl:text-right whitespace-nowrap">Tài khoản của tôi</span>
                            <svg
                                className="w-3 h-3 ml-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        <ul id="dropdown-example" className={`space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 hover:bg-gray-100 "
                                    onClick={() => handleOptionClick('profile')}
                                >
                                    Hồ sơ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center w-full p-2 text-gray-900 duration-75 rounded-lg pl-11 hover:bg-gray-100 "
                                    onClick={() => handleOptionClick('address')}
                                >
                                    Địa chỉ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => handleOptionClick('changepassword')}
                                >
                                    Đổi mật khẩu
                                </a>
                            </li>
                        </ul>
                    </a>
                    <a
                        href="#"
                        className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
                        onClick={() => handleOptionClick('orders')}
                    >
                        Đơn mua
                    </a>
                </div>
            </aside>

            {selectedOption && (
                <main className="w-full min-h-screen py-1 mb-4 md:w-2/3 lg:w-3/4">
                    {selectedOption === 'profile' && (
                        <div className="flex justify-center bg-white ">
                            <div className="w-3/5 px-6 pb-8 mt-12 ">
                                {/* <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2> */}
                                <form className="grid max-w-2xl mx-auto mt-8" onSubmit={handleSave}>
                                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                        <img
                                            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                            alt="Bordered avatar"
                                        />
                                        <div className="flex flex-col space-y-5 sm:ml-8">
                                            <button
                                                type="button"
                                                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-700 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                                            >
                                                Chọn ảnh
                                            </button>
                                        </div>
                                    </div>

                                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                            <div className="w-full">
                                                <label
                                                    htmlFor="first_name"
                                                    className="block mb-2 text-sm font-medium text-indigo-900 "
                                                >
                                                    Tên đăng nhập
                                                </label>
                                                <input
                                                    type="text"
                                                    id="first_name"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                    placeholder="Your first name"
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    htmlFor="last_name"
                                                    className="block mb-2 text-sm font-medium text-indigo-900 "
                                                >
                                                    Tên
                                                </label>
                                                <input
                                                    type="text"
                                                    id="last_name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                    placeholder="Your last name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-2 sm:mb-6">
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-indigo-900 "
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="your.email@mail.com"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2 sm:mb-6">
                                            <label
                                                htmlFor="profession"
                                                className="block mb-2 text-sm font-medium text-indigo-900 "
                                            >
                                                Số điện thoại
                                            </label>
                                            <input
                                                type="text"
                                                id="profession"
                                                value={profession}
                                                onChange={(e) => setProfession(e.target.value)}
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="your profession"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2 sm:mb-6">
                                            <label
                                                htmlFor="profession"
                                                className="block mb-2 text-sm font-medium text-indigo-900 "
                                            >
                                                Giới tính
                                            </label>
                                            <input
                                                type="text"
                                                id="profession"
                                                value={profession}
                                                onChange={(e) => setProfession(e.target.value)}
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="your profession"
                                                required
                                            />
                                        </div>

                                        <div className="mb-2 sm:mb-6">
                                            <label
                                                htmlFor="profession"
                                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                            >
                                                Ngày tháng năm sinh
                                            </label>
                                            <input
                                                type="text"
                                                id="profession"
                                                value={profession}
                                                onChange={(e) => setProfession(e.target.value)}
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="your profession"
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                            >
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {selectedOption === 'address' && (
                        <div className="flex justify-center w-full h-full bg-white ">
                            <AddressManager className={'w-full lg:mt-12'} isUserPage={true} />
                        </div>
                    )}

                    {selectedOption === 'changepassword' && (
                        <div className="flex flex-col items-center w-full h-full bg-white">
                            <div className="w-3/5 h-auto lg:mt-12">
                                <h2 className="pb-2 mb-1 text-xl leading-tight tracking-tight text-gray-900 border-b-1 md:text-2xl">
                                    Thay đổi mật khẩu
                                </h2>
                                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            for="old-password"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Mật khẩu cũ
                                        </label>
                                        <input
                                            type="password"
                                            name="old-password"
                                            id="old-password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="new-password"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Mật khẩu mới
                                        </label>
                                        <input
                                            type="password"
                                            name="new-password"
                                            id="new-password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="confirm-password"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Xác nhận mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            id="confirm-password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-max ml-auto text-white bg-primary hover:bg-primary/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {selectedOption === 'orders' && (
                        <div className="p-2 md:py-6 ">
                            <nav class="relative flex w-full items-center bg-white py-2 shadow-dark-mild  lg:flex-wrap lg:justify-start lg:py-4">
                                <div
                                    class="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left lg:w-full "
                                    id="navbarSupportedContentY"
                                >
                                    <ul class="w-full flex  justify-between">
                                        <li class="mb-4 lg:mb-0 lg:pe-2">
                                            <a
                                                class="block text-lg text-gray-700 font-light  hover:text-blue-700  focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                href="#"
                                                onClick={() => handleStatusClick('all')}
                                            >
                                                Tất cả
                                            </a>
                                        </li>
                                        <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                            <a
                                                class="block text-lg font-light text-gray-700 hover:text-blue-700 focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                href="#"
                                                onClick={() => handleStatusClick(0)}
                                            >
                                                Chờ thanh toán
                                            </a>
                                        </li>
                                        <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                            <a
                                                class="block text-lg text-gray-700 font-light hover:text-blue-700 focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                href="#"
                                                onClick={() => handleStatusClick(1)}
                                            >
                                                Vận chuyển
                                            </a>
                                        </li>
                                        <li class="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                            <a
                                                class="block text-lg font-light hover:text-blue-700  focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                href="#"
                                                onClick={() => handleStatusClick(2)}
                                            >
                                                Chờ giao hàng
                                            </a>
                                        </li>
                                        <li class="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                            <a
                                                class="block text-lg font-light hover:text-blue-700  focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                href="#"
                                                onClick={() => handleStatusClick('3')}
                                            >
                                                Hoàn thành
                                            </a>
                                        </li>
                                        <li class="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                            <a
                                                class="block text-lg font-light hover:text-blue-700  focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                href="#"
                                                onClick={() => handleStatusClick(4)}
                                            >
                                                Đã Hủy
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>

                            <main className="w-full pt-4 lg:pt-0">
                                <section aria-labelledby="recent-heading" className="mt-16">
                                    <div className="w-full mx-auto">
                                        <div className="max-w-2xl space-y-8 sm:px-4 lg:max-w-full lg:px-0">
                                            {filteredOrders.map((order) => (
                                                <div
                                                    key={order.number}
                                                    className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                                                >
                                                    <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-6 sm:gap-x-6">
                                                        <dl className="grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-7 lg:col-span-3">
                                                            <div className="lg:col-span-3">
                                                                <dt className="font-medium text-gray-900">Cửa hàng</dt>
                                                                <dd className="mt-1 text-gray-500">{order.store}</dd>
                                                            </div>
                                                            <div className="hidden lg:col-span-2 sm:block">
                                                                <dt className="font-medium text-gray-900">Ngày đặt</dt>
                                                                <dd className="mt-1 text-gray-500">
                                                                    <time dateTime={order.createdDatetime}>
                                                                        {order.createdDate}
                                                                    </time>
                                                                </dd>
                                                            </div>
                                                            <div className="lg:col-span-2">
                                                                <dt className="font-medium text-gray-900">
                                                                    Thành tiền
                                                                </dt>
                                                                <dd className="mt-1 font-medium text-gray-900">
                                                                    {order.total}
                                                                </dd>
                                                            </div>
                                                        </dl>

                                                        <div className="hidden lg:col-span-3 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                                            <div className="text-sm font-medium text-gray-700">
                                                                <span>
                                                                    Đơn hàng đã đến kho phân loại Kho Trung Chuyển Hồ
                                                                    Chí Minh 01
                                                                </span>
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-700">
                                                                <span>
                                                                    {(() => {
                                                                        switch (order.status) {
                                                                            case 0:
                                                                                return 'Chờ thanh toán';
                                                                            case 1:
                                                                                return 'Vận chuyển';
                                                                            case 2:
                                                                                return 'Chờ giao hàng';
                                                                            case 3:
                                                                                return 'Hoàn thành';
                                                                            case 4:
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
                                                        {order.products.map((product) => (
                                                            <li key={product.id} className="p-4 sm:p-6">
                                                                <div className="flex items-center sm:items-start">
                                                                    <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg sm:w-40 sm:h-40">
                                                                        <img
                                                                            src={product.imageSrc}
                                                                            alt={product.imageAlt}
                                                                            className="object-cover object-center w-full h-full"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 ml-6 text-sm">
                                                                        <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                            <h5>{product.name}</h5>
                                                                            <p className="mt-2 sm:mt-0">
                                                                                {product.price}
                                                                            </p>
                                                                        </div>
                                                                        <p className="hidden text-gray-500 sm:block sm:mt-2">
                                                                            {product.description}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="mt-6 sm:flex sm:justify-between">
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            className="w-5 h-5 text-green-500"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                        <p className="ml-2 text-sm font-medium text-gray-500">
                                                                            Đã giao vào ngày{' '}
                                                                            <time dateTime={order.deliveredDatetime}>
                                                                                {order.deliveredDate}
                                                                            </time>
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                                                        <div className="flex justify-center flex-1">
                                                                            <a
                                                                                href={product.href}
                                                                                className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                                                            >
                                                                                Xem sản phẩm
                                                                            </a>
                                                                        </div>
                                                                        <div className="flex justify-center flex-1 pl-4">
                                                                            <a
                                                                                href="#"
                                                                                className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                                                            >
                                                                                Mua lại
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </main>
                        </div>
                    )}
                </main>
            )}
        </div>
    );
};

export default UserPage;
