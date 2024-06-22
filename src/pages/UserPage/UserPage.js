import React, { useState, useCallback, useEffect, useRef } from 'react';
import AddressManager from '../../components/Address';
import {
    userApi,
    updateUserApi,
    getOrdersOfUserApi,
    changePasswordUserApi,
    getSellerByIdApi,
} from '../../services/UserApi/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cloudinaryConfig } from '../../cloudinaryConfig';
import axios from 'axios';
//
import DefaultAVT from '../../assets/default-avatar.png';
import MaxWidthWrapper from './../../components/MaxWidthWrapper/index';
//
const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

const AutoResizeTextarea = ({ value, onChange, placeholder }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const handleChange = (e) => {
        onChange(e);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <textarea
            ref={textareaRef}
            className="w-full p-2 border-0 resize-none focus:ring-0 focus:ring-offset-0 focus:outline-none lg:p-2"
            rows={1}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
};

const UserPage = () => {
    const rating = 0;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [selectedOption, setSelectedOption] = useState('profile');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState({});
    const [ordersData, setOrderData] = useState([]);
    const [dropDownRating, setDropDownRating] = useState(false);
    const [orderView, setOrderView] = useState(false);

    const fetchUser = useCallback(async () => {
        try {
            const response = await userApi(token);
            setUserData(response);
            console.log('user data in ussepage: ', response);
        } catch (error) {
            console.error('Failed to fetch userApi:', error);
        }
    });

    const fetchOrders = useCallback(async () => {
        try {
            const response = await getOrdersOfUserApi(token);

            // Duyệt qua từng đơn hàng để thêm trường seller
            const updatedOrders = await Promise.all(
                response.map(async (order) => {
                    if (order.items && order.items.length > 0) {
                        const firstItem = order.items[0];
                        const sellerID = firstItem.product.sellerID_NK;
                        const sellerResponse = await getSellerByIdApi(sellerID); // Gọi API để lấy tên người bán
                        const sellerName = sellerResponse.name; // Giả sử API trả về một object với trường 'name'
                        return { ...order, seller: sellerName };
                    }
                    return order;
                }),
            );
            setOrderData(updatedOrders);
        } catch (error) {
            console.error('Failed to fetch getOrdersOfUserApi:', error);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
            await fetchOrders();
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Xử lý logic thay đổi mật khẩu ở đây
        try {
            const response = await changePasswordUserApi(oldPassword, newPassword, confirmPassword, token);
            if (response.status === '204') {
                if (response.data === 0) {
                    toast.success('Đổi mật khẩu thành công');
                }
                if (response.data === 1) {
                    toast.error('Người dùng không tồn tại');
                }
                if (response.data === 2) {
                    toast.error('Sai mật khẩu');
                }
                if (response.data === 3) {
                    toast.error('Mật khẩu xác nhận không chính xác');
                }
            }
            if (response.status === '400') {
                toast.error('Đổi mật khẩu thất bại');
            }
        } catch (error) {
            console.log('error when call changePasswordApi', error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = updateUserApi(
                userData.firstName,
                userData.lastName,
                userData.email,
                userData.phoneNumber,
                userData.address,
                userData.avatar,
                token,
            );
            if (response) {
                toast.success('Thay đổi thành công');
            }
        } catch (error) {
            console.log('error when call updateUserApi', error);
        }
    };

    const toggleDropdown = () => {
        if (selectedOption === 'profile' || selectedOption === 'address' || selectedOption === 'changepassword') {
            return;
        }
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

    const handleStatusClick = (status) => {
        setSelectedStatus(status);
    };
    // 0 Da Huy, 1 Cho xac nhan, 2 Cho giao hang, 3 Cho lay hang, 4 Da giao.
    const filteredOrders =
        selectedStatus === 'all' ? ordersData : ordersData.filter((order) => order.status === selectedStatus);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const [avatarFile, setAvatarFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChangeAndSubmit = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file); // Lưu tệp hình ảnh vào state

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', cloudinaryConfig.upload_preset); // Đảm bảo bạn đã tạo upload preset trong Cloudinary

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
                    formData,
                );

                // Lấy URL của hình ảnh mới tải lên từ response
                const fileURL = response.data.secure_url;

                // Tạo một đối tượng userData mới để cập nhật
                const updatedUserData = { ...userData };
                // Thêm URL của hình ảnh mới vào userData
                updatedUserData.avatar = fileURL;
                const updateUser = updateUserApi(
                    updatedUserData.firstName,
                    updatedUserData.lastName,
                    updatedUserData.email,
                    updatedUserData.phoneNumber,
                    updatedUserData.address,
                    updatedUserData.avatar,
                    token,
                );
                if (!response) {
                    console.log('fail to call updateUserApi');
                } else {
                    // Cập nhật state với thông tin mới của người dùng
                    setUserData(updatedUserData);
                }
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };

    const [ratingStart, setRatingStart] = useState(5);

    const handleRating = (value) => {
        setRatingStart(value);
        console.log('user rating: ', value);
    };

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

    // upload image
    const [files, setFiles] = useState({});
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const addFile = (file) => {
        const isImage = file.type.startsWith('image');
        if (!isImage) {
            alert('Only image files are allowed!');
            return;
        }

        const objectURL = URL.createObjectURL(file);

        setFiles((prevFiles) => ({
            ...prevFiles,
            [objectURL]: file,
        }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggedOver(false);
        for (const file of e.dataTransfer.files) {
            addFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isDraggedOver) {
            setIsDraggedOver(true);
        }
    };

    const handleDragLeave = () => {
        setIsDraggedOver(false);
    };

    const handleFileInputChange = (e) => {
        for (const file of e.target.files) {
            addFile(file);
        }
    };

    return (
        <>
            <div className="relative bg-background">
                <MaxWidthWrapper>
                    <div className="lg:pt-36  w-full flex flex-col gap-5 md:flex-row text-[#161931]">
                        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100">
                                <a>
                                    <button
                                        type="button"
                                        className="flex w-full items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
                                        aria-controls="dropdown-example"
                                        onClick={toggleDropdown}
                                    >
                                        <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                                            Tài khoản của tôi
                                        </span>
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

                                            <form className="grid max-w-2xl mx-auto mt-8">
                                                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                                    <img
                                                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                                        src={
                                                            userData.avatar != 'No image yet'
                                                                ? userData.avatar
                                                                : DefaultAVT
                                                        }
                                                    />
                                                    <div className="flex flex-col space-y-5 sm:ml-8">
                                                        <button
                                                            type="button"
                                                            className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-700 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                                            onClick={handleButtonClick}
                                                        >
                                                            Chọn ảnh
                                                        </button>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            ref={fileInputRef}
                                                            onChange={handleFileChangeAndSubmit}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                                        <div className="w-full">
                                                            <label
                                                                htmlFor="first_name"
                                                                className="block mb-2 text-sm font-medium text-indigo-900 "
                                                            >
                                                                Họ
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="lastName"
                                                                value={userData.lastName}
                                                                onChange={handleChange}
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
                                                                id="firstName"
                                                                value={userData.firstName}
                                                                onChange={handleChange}
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
                                                            value={userData.email}
                                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                            placeholder="your.email@mail.com"
                                                            required
                                                            readOnly
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
                                                            id="phoneNumber"
                                                            value={userData.phoneNumber}
                                                            onChange={handleChange}
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
                                                            Địa Chỉ
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            value={userData.address}
                                                            onChange={handleChange}
                                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                            placeholder="your profession"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={handleSave}
                                                            type="submit"
                                                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                                        >
                                                            Lưu
                                                        </button>
                                                        <ToastContainer />
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
                                            <form
                                                className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                                                onSubmit={handleSubmit}
                                            >
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
                                                <ToastContainer />
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
                                                            class="block lg:text-sm text-gray-700 font-light  hover:text-blue-700  focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                            href="#"
                                                            onClick={() => handleStatusClick('all')}
                                                        >
                                                            Tất cả
                                                        </a>
                                                    </li>
                                                    <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                                        <a
                                                            class="block lg:text-sm font-light text-gray-700 hover:text-blue-700 focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                            href="#"
                                                            onClick={() => handleStatusClick(0)}
                                                        >
                                                            Vận chuyển
                                                        </a>
                                                    </li>
                                                    <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                                        <a
                                                            class="block lg:text-sm text-gray-700 font-light hover:text-blue-700 focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                            href="#"
                                                            onClick={() => handleStatusClick(1)}
                                                        >
                                                            Chờ giao hàng
                                                        </a>
                                                    </li>
                                                    <li class="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                                        <a
                                                            class="block lg:text-sm font-light hover:text-blue-700  focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                            href="#"
                                                            onClick={() => handleStatusClick(2)}
                                                        >
                                                            Hoàn thành
                                                        </a>
                                                    </li>
                                                    <li class="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                                        <a
                                                            class="block lg:text-sm font-light hover:text-blue-700  focus:text-blue-700 active:text-blue-700 motion-reduce:transition-none lg:px-2"
                                                            href="#"
                                                            onClick={() => handleStatusClick('3')}
                                                        >
                                                            Đã hủy
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
                                                                            <dd className="mt-1 text-gray-500">
                                                                                {order.seller}
                                                                            </dd>
                                                                        </div>
                                                                        <div className="hidden lg:col-span-2 sm:block">
                                                                            <dt className="font-medium text-gray-900">
                                                                                Ngày đặt
                                                                            </dt>
                                                                            <dd className="mt-1 text-gray-500">
                                                                                <time dateTime={order.createdAt}>
                                                                                    {new Date(
                                                                                        order.createdAt,
                                                                                    ).toLocaleDateString('vi-VN', {
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
                                                                            <div
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    setOrderView(true);
                                                                                }}
                                                                                className="flex items-center text-sm font-medium text-green-600 cursor-pointer lg:gap-2 lg:text-md"
                                                                            >
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
                                                                                            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                                                                        />
                                                                                    </svg>
                                                                                    Giao hàng thành công
                                                                                </span>
                                                                                <div className="text-gray-300 lg:py-6 lg:leading-10">
                                                                                    |{' '}
                                                                                </div>
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
                                                                                        <p className="mt-2 sm:mt-0">
                                                                                            {formatNumber(
                                                                                                item.product.price,
                                                                                            )}
                                                                                            ₫
                                                                                        </p>
                                                                                    </div>
                                                                                    {item.optionValues &&
                                                                                        item.optionValues.name && (
                                                                                            <p className="hidden text-gray-400 sm:block sm:mt-2">
                                                                                                Phân loại hàng:{' '}
                                                                                                {item.optionValues.name}
                                                                                            </p>
                                                                                        )}
                                                                                    <p className="hidden text-xs text-gray-400 sm:block sm:mt-2">
                                                                                        X {item.quantity}
                                                                                    </p>
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
                                                                                <dt className="font-medium text-gray-900">
                                                                                    Ngày giao hàng thành công
                                                                                </dt>
                                                                                <dd className="mt-1 text-gray-500">
                                                                                    <time dateTime={order.createdAt}>
                                                                                        {new Date(
                                                                                            order.createdAt,
                                                                                        ).toLocaleDateString('vi-VN', {
                                                                                            year: 'numeric',
                                                                                            month: 'long',
                                                                                            day: 'numeric',
                                                                                        })}
                                                                                    </time>
                                                                                </dd>
                                                                            </div>
                                                                        )}
                                                                        <div className="flex items-center justify-end w-1/2 ml-auto lg:gap-6">
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
                                                                                    <span className="text-sm font-light">
                                                                                        Đánh giá trước{' '}
                                                                                        <span className="underline">
                                                                                            <time
                                                                                                dateTime={
                                                                                                    order.createdAt
                                                                                                }
                                                                                            >
                                                                                                {new Date(
                                                                                                    new Date(
                                                                                                        order.createdAt,
                                                                                                    ).setDate(
                                                                                                        new Date(
                                                                                                            order.createdAt,
                                                                                                        ).getDate() + 7,
                                                                                                    ),
                                                                                                ).toLocaleDateString(
                                                                                                    'vi-VN',
                                                                                                    {
                                                                                                        year: 'numeric',
                                                                                                        month: 'long',
                                                                                                        day: 'numeric',
                                                                                                    },
                                                                                                )}
                                                                                            </time>
                                                                                        </span>
                                                                                    </span>
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
                </MaxWidthWrapper>
            </div>

            {dropDownRating && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
                    <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                        <div className="w-3/4 bg-white h-3/4 lg:py-4">
                            <header className="w-full shadow-sm lg:text-lg lg:px-4 lg:pb-6">Đánh giá sản phẩm</header>
                            <div className="w-full overflow-auto h-5/6">
                                {filteredOrders.map((order) => (
                                    <ul className="w-full lg:px-4" key={order.id}>
                                        {order.items.map((item) => (
                                            <React.Fragment key={item.id}>
                                                <li className="p-4">
                                                    <div className="flex items-center sm:items-start">
                                                        <div className="flex-shrink-0 overflow-hidden bg-gray-200 size-16">
                                                            <img
                                                                src={item.image}
                                                                alt={item.product.name}
                                                                className="object-cover object-center w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="flex-1 ml-6 text-sm">
                                                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                <h5>{item.product.name}</h5>
                                                            </div>
                                                            {item.optionValues && item.optionValues.name && (
                                                                <p className="hidden text-gray-400 sm:block sm:mt-2">
                                                                    Phân loại hàng: {item.optionValues.name}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                                <div className="flex items-center lg:px-4 lg:py-2 lg:gap-4 rating">
                                                    <span>Chất lượng sản phẩm:</span>
                                                    <div className="flex items-center lg:gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRatingChange(order.id, item.id, star)
                                                                }
                                                                className={`size-5 inline-flex justify-center items-center text-2xl rounded-full ${
                                                                    (reviews[order.id]?.[item.id]?.rating || 0) >= star
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300 hover:text-yellow-400'
                                                                }`}
                                                            >
                                                                <svg
                                                                    className="flex-shrink-0 size-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                                                </svg>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-background lg:p-4">
                                                    <div className="w-full bg-white lg:p-4 border-1">
                                                        <div className="w-full">
                                                            <label className="text-base text-gray-500">
                                                                Đúng mô tả:
                                                            </label>
                                                            <AutoResizeTextarea
                                                                placeholder="hãy để lại đánh giá"
                                                                value={reviews[order.id]?.[item.id]?.description || ''}
                                                                onChange={(e) =>
                                                                    handleCommentChange(
                                                                        order.id,
                                                                        item.id,
                                                                        'description',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="w-full">
                                                            <label className="text-base text-gray-500">
                                                                Chất lượng sản phẩm:
                                                            </label>
                                                            <AutoResizeTextarea
                                                                value={reviews[order.id]?.[item.id]?.quality || ''}
                                                                onChange={(e) =>
                                                                    handleCommentChange(
                                                                        order.id,
                                                                        item.id,
                                                                        'quality',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="w-full min-h-[150px] border-t-1 border-gray-200">
                                                            <AutoResizeTextarea
                                                                placeholder="Hãy chia sẻ nhũng điều bạn thích về sản phẩm này với những người mua khác nhé."
                                                                value={reviews[order.id]?.[item.id]?.comment || ''}
                                                                onChange={(e) =>
                                                                    handleCommentChange(
                                                                        order.id,
                                                                        item.id,
                                                                        'comment',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <main className="w-full h-auto lg:py-2">
                                                        <article
                                                            className={`relative h-full flex flex-col ${
                                                                isDraggedOver ? 'draggedover' : ''
                                                            }`}
                                                            onDrop={handleDrop}
                                                            onDragOver={handleDragOver}
                                                            onDragLeave={handleDragLeave}
                                                            onDragEnter={handleDragOver}
                                                        >
                                                            <section className="flex flex-col">
                                                                <ul
                                                                    id="gallery"
                                                                    className="flex flex-1 -m-1 overflow-auto flex-nowrap"
                                                                >
                                                                    {Object.keys(files).map((key) => (
                                                                        <li key={key} className="block size-20 lg:px-1">
                                                                            <article className="relative w-full h-full bg-gray-100 cursor-pointer group focus:outline-none focus:shadow-outline">
                                                                                {files[key].type.startsWith('image') ? (
                                                                                    <img
                                                                                        src={key}
                                                                                        alt={files[key].name}
                                                                                        className="object-cover w-full h-full bg-fixed img-preview"
                                                                                    />
                                                                                ) : (
                                                                                    <h1 className="flex-1">
                                                                                        {files[key].name}
                                                                                    </h1>
                                                                                )}

                                                                                <button
                                                                                    className="absolute top-0 right-0 z-10 ml-auto text-white rounded-md delete focus:outline-none hover:bg-gray-300"
                                                                                    onClick={() => {
                                                                                        const newFiles = {
                                                                                            ...files,
                                                                                        };
                                                                                        URL.revokeObjectURL(key); // Cleanup object URL
                                                                                        delete newFiles[key];
                                                                                        setFiles(newFiles);
                                                                                    }}
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
                                                                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </article>
                                                                        </li>
                                                                    ))}
                                                                    {Object.keys(files).length >=
                                                                    5 ? null : Object.keys(files).length === 0 ? (
                                                                        <div className="px-1">
                                                                            <input
                                                                                id="hidden-input"
                                                                                type="file"
                                                                                multiple
                                                                                className="hidden"
                                                                                onChange={handleFileInputChange}
                                                                                accept="image/*"
                                                                            />
                                                                            <button
                                                                                id="button"
                                                                                className="flex items-center justify-center text-xs rounded-sm lg:gap-2 lg:px-3 text-primary lg:py-2 border-primary border-1 bg-primary/5 focus:shadow-outline focus:outline-none"
                                                                                onClick={() =>
                                                                                    document
                                                                                        .getElementById('hidden-input')
                                                                                        .click()
                                                                                }
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    strokeWidth="1.5"
                                                                                    stroke="currentColor"
                                                                                    className="size-4"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                                                                    />
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                                                                    />
                                                                                </svg>
                                                                                Thêm hình ảnh
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex items-center justify-center border-2 border-dashed size-20 lg:ml-2">
                                                                            <input
                                                                                id="hidden-input"
                                                                                type="file"
                                                                                multiple
                                                                                className="hidden"
                                                                                onChange={handleFileInputChange}
                                                                                accept="image/*"
                                                                            />
                                                                            <button
                                                                                id="button"
                                                                                className="flex-row items-center justify-center text-sm text-gray-300 rounded-sm lg:gap-2 lg:px-4 lg:py-2 focus:shadow-outline focus:outline-none"
                                                                                onClick={() =>
                                                                                    document
                                                                                        .getElementById('hidden-input')
                                                                                        .click()
                                                                                }
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="currentColor"
                                                                                    className="size-5"
                                                                                >
                                                                                    <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                                                                        clipRule="evenodd"
                                                                                    />
                                                                                </svg>
                                                                                {Object.keys(files).length}/5
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </ul>
                                                            </section>
                                                        </article>
                                                    </main>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                            <div className="flex items-center justify-end lg:gap-4 lg:px-4 lg:py-6">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDropDownRating(false);
                                    }}
                                    className="uppercase text-md"
                                >
                                    Trở lại
                                </button>
                                <button className="font-light text-white rounded-sm text-md bg-primary lg:px-12 lg:py-2 h-min">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}

            {orderView && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
                    <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                        <div className="w-3/4 overflow-auto bg-white h-3/4 lg:px-2 lg:py-2">
                            <header className="flex items-center justify-between font-light uppercase border-dashed shadow-md border-b-1 lg:px-4 lg:py-3 rounded-b-md">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOrderView(false);
                                    }}
                                    className="flex items-center text-sm uppercase lg:gap-2"
                                >
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
                                            d="M15.75 19.5 8.25 12l7.5-7.5"
                                        />
                                    </svg>
                                    Trở lại
                                </button>
                                <div className="flex items-center justify-between text-sm lg:gap-2">
                                    <span className="flex items-center lg:gap-1 text-nowrap">
                                        Mã đơn hàng: 2403264PBJXRP1
                                    </span>
                                    <div className="text-gray-300 lg:px-6 ">|</div>
                                    <span className="text-primary">ĐƠN HÀNG ĐÃ HOÀN THÀNH</span>
                                </div>
                            </header>
                            <div className="overflow-auto h-5/6">
                                <div class="bg-white rounded-md shadow-sm lg:px-4 lg:pt-4 lg:pb-2">
                                    <ol class="relative border-s border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-s-0 ">
                                        <li className="absolute z-10 w-full border-t-1 top-4"></li>
                                        <li className="flex flex-col items-start flex-1 bg-transparent md:items-center md:text-center">
                                            <div class="relative flex items-center pt-2 md:flex-col md:pt-0 md:items-center">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="absolute z-20 left-9 size-6 top-1 text-white bg-green-500 rounded-full"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                    21:10 26-03-2024
                                                </p>
                                            </div>
                                            <div class="ms-4 mt-2 pb-5 md:ms-0">
                                                <p class="mb-3 text-sm dark:text-neutral-300">Đơn Hàng Đã Đặt</p>
                                            </div>
                                        </li>
                                        <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                            <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                    21:10 26-03-2024
                                                </p>
                                            </div>
                                            <div class="ms-4 mt-2 pb-5 md:ms-0">
                                                <p class="mb-3 text-sm dark:text-neutral-300">
                                                    Đã Xác Nhận Thông Tin Đơn Hàng
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                            <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>{' '}
                                                <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                    11:31 27-03-2024
                                                </p>
                                            </div>
                                            <div class="ms-4 mt-2 pb-5 md:ms-0">
                                                <p class="mb-3 text-sm dark:text-neutral-300">Đã Giao Cho ĐVVC</p>
                                            </div>
                                        </li>

                                        <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                            <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                    07:08 07-04-2024
                                                </p>
                                            </div>
                                            <div class="ms-4 mt-2 pb-5 md:ms-0">
                                                <p class="mb-3 text-sm dark:text-neutral-300">Đã Nhận Được Hàng</p>
                                            </div>
                                        </li>
                                        <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                            <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                    07:08 07-04-2024
                                                </p>
                                            </div>
                                            <div class="ms-4 mt-2 pb-5 md:ms-0">
                                                <p class="mb-3 text-sm  dark:text-neutral-300">
                                                    Đơn Hàng Đã Hoàn Thành
                                                </p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                                <div className="flex justify-between rounded-md shadow-sm lg:px-4 lg:py-2 ">
                                    <div className="w-1/3">
                                        <header className="lg:text-xl lg:mb-4">Địa chỉ nhận hàng</header>
                                        <div className="flex-row text-xs font-light">
                                            <p className="text-base font-medium lg:py-2">Hoàng Cầu</p>
                                            <p className="lg:py-1">0845718717</p>
                                            <p>
                                                C3/40/3, Phạm Hùng, Ấp 4, Xã Bình Hưng, Huyện Bình Chánh, TP. Hồ Chí
                                                Minh
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-2/3 border-l-1 lg:ml-6">
                                        <>
                                            <div class="ps-2 my-2 first:mt-0">
                                                <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                                    17:55 30-03-2024
                                                </h3>
                                            </div>

                                            <div class="flex gap-x-3">
                                                <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                                    <div class="relative z-10 size-7 flex justify-center items-center">
                                                        <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
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
                                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="grow pt-0.5 pb-8">
                                                    <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                        Đã giao
                                                    </h3>
                                                    <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                        Giao hàng thành công
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                        <>
                                            <div class="ps-2 my-2 first:mt-0">
                                                <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                                    17:53 30-03-2024
                                                </h3>
                                            </div>

                                            <div class="flex gap-x-3">
                                                <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                                    <div class="relative z-10 size-7 flex justify-center items-center">
                                                        <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
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
                                                                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="grow pt-0.5 pb-8">
                                                    <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                        Đang vận chuyển
                                                    </h3>
                                                    <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                        Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                        <>
                                            <div class="ps-2 my-2 first:mt-0">
                                                <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                                    08:09 27-03-2024
                                                </h3>
                                            </div>

                                            <div class="flex gap-x-3">
                                                <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                                    <div class="relative z-10 size-7 flex justify-center items-center">
                                                        <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
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
                                                                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="grow pt-0.5 pb-8">
                                                    <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                        Đang được chuẩn bị
                                                    </h3>
                                                    <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                        Người gửi đang chuẩn bị hàng
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                        <>
                                            <div class="ps-2 my-2 first:mt-0">
                                                <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                                    21:10 26-03-2024
                                                </h3>
                                            </div>

                                            <div class="flex gap-x-3">
                                                <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                                    <div class="relative z-10 size-7 flex justify-center items-center">
                                                        <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
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
                                                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="grow pt-0.5 pb-8">
                                                    <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                        Đặt hàng thành công
                                                    </h3>
                                                    <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                        Đơn hàng đã được đặt
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                </div>
                                <main className="w-full bg-background">
                                    <div className="w-full mx-auto">
                                        <div className="max-w-2xl space-y-8 sm:px-4 lg:max-w-full lg:px-0">
                                            {filteredOrders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                                                >
                                                    <div className="flex items-center text-sm font-medium text-gray-500 lg:px-6 lg:py-2 lg:gap-2">
                                                        {order.seller}
                                                        <a
                                                            href={`/shoppage/${order.seller.iD_NK}`}
                                                            className="flex items-center justify-center text-xs hover:border-primary hover:text-primary lg:gap-2 bg-slate-50/65 border-1 lg:px-2 lg:py-1"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                class="size-4 hover:border-primary hover:text-primary"
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

                                                    {/* Products */}

                                                    <ul role="list" className="divide-y divide-gray-200">
                                                        {order.items.map((item) => (
                                                            <li key={item.id} className="p-4 sm:p-6">
                                                                <div className="flex items-center sm:items-start">
                                                                    <div className="flex-shrink-0 overflow-hidden bg-gray-200 size-20">
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.product.name}
                                                                            className="object-cover object-center w-full h-full"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 ml-6 text-sm">
                                                                        <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                            <h5>{item.product.name}</h5>
                                                                            <p className="mt-2 sm:mt-0">
                                                                                {formatNumber(item.product.price)}₫
                                                                            </p>
                                                                        </div>
                                                                        {item.optionValues &&
                                                                            item.optionValues.name && (
                                                                                <p className="hidden text-gray-400 sm:block sm:mt-2">
                                                                                    Phân loại hàng:{' '}
                                                                                    {item.optionValues.name}
                                                                                </p>
                                                                            )}
                                                                        <p className="hidden text-xs text-gray-400 sm:block sm:mt-2">
                                                                            X {item.quantity}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="flex items-center border-dashed border-1 ">
                                                        <div className="h-auto text-sm font-light border-dashed lg:py-4 lg:px-4 text-end border-r-1 basis-4/6 ">
                                                            Thành tiền
                                                        </div>
                                                        <div className="text-lg font-medium text-end text-primary lg:py-4 lg:px-4 basis-2/6">
                                                            ₫{formatNumber(order.totalPrice)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
        </>
    );
};

export default UserPage;
