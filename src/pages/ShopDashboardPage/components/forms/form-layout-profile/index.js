import React, { useRef, useState, useCallback, useEffect } from 'react';
import DefaultAVT from '../../../../../assets/default-avatar.png';
import { cloudinaryConfig } from '../../../../../cloudinaryConfig';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { getSellerApi, updateSellerApi } from '../../../../../services/SellerApi/sellerApi';
import Preloader from '../../preloader/index';

const FormLayoutProfile = () => {
    const [avatarFile, setAvatarFile] = useState(null);
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token');
    const [sellerData, setSellerData] = useState({});
    const [shopName, setShopName] = useState('');
    const [shopPhone, setShopPhone] = useState('');
    const [shopAddress, setShopAddress] = useState('');

    const fetchSeller = useCallback(async () => {
        try {
            const response = await getSellerApi(token);
            setSellerData(response);
            console.log('seller data in sellerProfilePage: ', response);
        } catch (error) {
            console.error('Failed to fetch sellerProfilePage:', error);
        }
    });
    useEffect(() => {
        const fetchData = async () => {
            await fetchSeller();
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSellerData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const [loading, setLoading] = useState(false);

    const handleFileChangeAndSubmitShopInfo = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file); // Lưu tệp hình ảnh vào state
            setLoading(true); // Bắt đầu hiển thị loader

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', cloudinaryConfig.upload_preset);

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
                    formData,
                );

                const fileURL = response.data.secure_url;

                const updatedSellerData = { ...sellerData, imageUrl: fileURL };
                const updateSeller = await updateSellerApi(
                    updatedSellerData.name,
                    updatedSellerData.imageUrl,
                    updatedSellerData.address,
                    updatedSellerData.phone,
                    token,
                );

                if (!updateSeller) {
                    console.log('Failed to call updateSellerApi');
                } else {
                    setSellerData(updatedSellerData);
                }
            } catch (error) {
                console.error('Error uploading the file:', error);
            } finally {
                setLoading(false); // Dừng hiển thị loader
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true); // Bắt đầu hiển thị loader

        try {
            const updateSeller = await updateSellerApi(
                sellerData.name,
                sellerData.imageUrl,
                sellerData.address,
                sellerData.phone,
                token,
            );

            if (updateSeller) {
                toast.success('Thay đổi thành công');
            }
        } catch (error) {
            console.log('Error when calling updateSellerApi', error);
        } finally {
            setLoading(false); // Dừng hiển thị loader
        }
    };

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
                                        <Preloader loading={loading} />
                                        <form action="#">
                                            <div class="flex flex-col gap-9">
                                                <div class="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                                                    <form action="#">
                                                        <div className="flex flex-col items-center justify-center w-full p-[18px] mx-auto space-y-5 sm:flex-row sm:space-y-0">
                                                            <img
                                                                className="object-cover p-1 rounded-full size-32 ring-2 ring-indigo-300 dark:ring-indigo-500"
                                                                src={
                                                                    sellerData.imageUrl
                                                                        ? sellerData.imageUrl
                                                                        : DefaultAVT
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
                                                                        id="name"
                                                                        placeholder="Tên cửa hàng"
                                                                        class="w-full  border-gray-300 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                        value={sellerData.name}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>

                                                                <div class="w-full xl:w-1/2">
                                                                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                                        Số điện thoại liên hệ
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="phone"
                                                                        placeholder="Số điện thoại liên hệ của cửa hàng"
                                                                        class="w-full  border-gray-300 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                        value={sellerData.phone}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="mb-5">
                                                                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                                    Địa chỉ cửa hàng
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    placeholder="Số nhà, Đường, Quận - Huyện, Thành Phố, Tỉnh"
                                                                    class="w-full bg-gray-50  border-gray-300 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                    value={sellerData.address}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <button
                                                                onClick={handleSave}
                                                                class="flex w-full justify-center text-white rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                                            >
                                                                Lưu thay đổi thông tin cửa hàng
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </body>
    );
};
export default FormLayoutProfile;
