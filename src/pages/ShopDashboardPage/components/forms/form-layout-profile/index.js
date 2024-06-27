import React, { useRef, useState } from 'react';
import DefaultAVT from '../../../../../assets/default-avatar.png';
import { cloudinaryConfig } from '../../../../../cloudinaryConfig';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
    userApi,
    updateUserApi,
    getOrdersOfUserApi,
    changePasswordUserApi,
    getSellerByIdApi,
} from '../../../../../services/UserApi/userApi';

const FormLayoutProfile = () => {
    const [avatarFile, setAvatarFile] = useState(null);
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState({});
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopPhone, setShopPhone] = useState('');
    const [shopAddress, setShopAddress] = useState('');

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChangeAndSubmitShopInfo = async (e) => {
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
    const handleSubmitAccount = async (e) => {
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

    const handleSubmitShop = async (e) => {};

    return (
        <body>
            <div class="flex h-screen overflow-hidden">
                <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <main>
                        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h2 class="text-title-md2 font-bold text-black dark:text-white">Hồ sơ</h2>

                                <nav>
                                    <ol class="flex items-center gap-2">
                                        <li>
                                            <a class="font-medium" href="index.html">
                                                Dashboard /
                                            </a>
                                        </li>
                                        <li class="font-medium text-primary">Hồ sơ</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="grid grid-cols-1 gap-9 sm:grid-cols-2">
                                <div class="col-span-2 flex flex-col gap-9">
                                    <div class=" mx-auto w-1/2 rounded-sm border border-stroke ">
                                        <form action="#" onSubmit={handleFileChangeAndSubmitShopInfo}>
                                            <div className="flex flex-col items-center justify-center w-full p-[18px] mx-auto space-y-5 sm:flex-row sm:space-y-0">
                                                <img
                                                    className="object-cover p-1 rounded-full size-32 ring-2 ring-indigo-300 dark:ring-indigo-500"
                                                    src={
                                                        userData.avatar != 'No image yet' ? userData.avatar : DefaultAVT
                                                    }
                                                />
                                                <div className="flex flex-col space-y-5 sm:ml-8">
                                                    <button
                                                        type="button"
                                                        className="py-3 text-sm font-medium text-indigo-100 border border-indigo-200 rounded-md bg-primary px-7 focus:outline-none hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                                        onClick={handleButtonClick}
                                                    >
                                                        Chọn ảnh
                                                    </button>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChangeAndSubmitShopInfo}
                                                    />
                                                </div>
                                            </div>
                                            <div class="p-7">
                                                <div class="mb-5 flex flex-col gap-6 xl:flex-row">
                                                    <div class="w-full xl:w-1/2">
                                                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                            Tên cửa hàng
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Tên cửa hàng"
                                                            class="w-full  border-gray-300 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            value={shopName}
                                                            onChange={(e) => setShopName(e.target.value)}
                                                        />
                                                    </div>

                                                    <div class="w-full xl:w-1/2">
                                                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                            Số điện thoại liên hệ
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Số điện thoại liên hệ của cửa hàng"
                                                            class="w-full  border-gray-300 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            value={shopPhone}
                                                            onChange={(e) => setShopPhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="mb-5">
                                                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                        Địa chỉ cửa hàng
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Số nhà, Đường, Quận - Huyện, Thành Phố, Tỉnh"
                                                        class="w-full bg-gray-50  border-gray-300 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        value={shopAddress}
                                                        onChange={(e) => setShopAddress(e.target.value)}
                                                    />
                                                </div>

                                                <button class="flex w-full justify-center text-white rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                                    Lưu thay đổi thông tin cửa hàng
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* <div class="flex flex-col h-max gap-9">
                                    <div class="rounded-sm border border-stroke bg-white shadow-default p-8 dark:border-strokedark dark:bg-boxdark">
                                        <div class="border-b border-stroke pb-6 dark:border-strokedark">
                                            <h3 class="font-medium text-black dark:text-white">
                                                Thay đổi thông tin tài khoản
                                            </h3>
                                        </div>
                                        <form
                                            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                                            onSubmit={handleSubmitAccount}
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
                                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-md b0 sm:text-base focus:ring-primary-600 focus:border-primary-600"
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
                                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-md sm:text-base focus:ring-primary-600 focus:border-primary-600"
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
                                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-md sm:text-base focus:ring-primary-600 focus:border-primary-600"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full ml-auto text-white bg-primary hover:bg-primary/80 font-medium rounded-md text-base px-5 py-2.5 text-center"
                                            >
                                                Đổi mật khẩu
                                            </button>
                                        </form>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </body>
    );
};
export default FormLayoutProfile;
