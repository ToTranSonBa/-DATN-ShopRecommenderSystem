import React, { useState, useCallback, useEffect } from 'react';
import Logo from '../../assets/BrandLogos/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupSellerApi } from '../../services/SignupApi/SignUpApi';
import { userApi } from '../../services/UserApi/userApi';
const SellerSignUp = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [shopPhoneNumber, setShopPhoneNumber] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const fetchUser = useCallback(async () => {
        try {
            const response = await userApi(token);
            setShopAddress(response.address);
            setShopPhoneNumber(response.phoneNumber);
            console.log('user data in ussepage: ', response);
        } catch (error) {
            console.error('Failed to fetch userApi:', error);
        }
    });
    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
        };
        fetchData();
    }, [token]);

    const handleShopNumberChange = (e) => {
        if (e.target.value.length <= 50) {
            setShopPhoneNumber(e.target.value);
        }
    };
    const handleShopAddressChange = (e) => {
        if (e.target.value.length <= 50) {
            setShopAddress(e.target.value);
        }
    };
    const handleShopNameChange = (e) => {
        if (e.target.value.length <= 50) {
            setShopName(e.target.value);
        }
    };

    const isShopNameFilled = () => {
        return shopName.trim() !== '';
    };

    const isShopAddressFilled = () => {
        return shopAddress.trim() !== '';
    };

    const isShopPhoneNumberFilled = () => {
        return shopPhoneNumber.trim() !== '';
    };

    const isShopInfoFilled = () => {
        return shopName.trim() !== '' && shopAddress.trim() !== '' && shopPhoneNumber.trim() !== '';
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };
    const handleClick = async () => {
        try {
            if (!shopName) {
                toast.error('Vui lòng nhập tên cửa hàng');
                return;
            }
            if (!shopPhoneNumber) {
                toast.error('Vui lòng nhập số điện thoại liên hệ');
                return;
            }
            if (!shopAddress) {
                toast.error('Vui lòng nhập địa chỉ cửa hàng');
                return;
            }
            if (termsAccepted !== true) {
                toast.error('Vui lòng đọc kĩ điều khoản của chúng tôi');
                return;
            }
            const response = await signupSellerApi(shopName, shopPhoneNumber, shopAddress, token);
            const accessToken = response.accessToken;
            if (accessToken) {
                localStorage.clear();
                toast.success('Hãy đăng nhập lại ');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                if (response) {
                    toast.error(response);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <section className="w-full bg-gray-50">
            <div className="flex flex-col items-center justify-center w-full max-w-screen-xl px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex flex-col items-center w-full mx-auto lg:pb-4">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                        <span className="font-bold md:text-xl lg:text-3xl text-primary">ShopLY</span>
                    </a>
                    <span className="text-gray-400 uppercase">Cùng Chúng Tôi Phát Triển Cửa Hàng Của Bạn</span>
                </div>

                <div className="flex justify-center w-full overflow-y-scroll bg-white rounded-lg shadow max-h-3/4 lg:gap-12 md:mt-0 sm:max-w-md md:max-w-screen-md ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form
                            className="space-y-4 md:space-y-6 lg:pb-8"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleClick();
                            }}
                        >
                            <div className="relative">
                                <label htmlFor="shop-name" className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Tên cửa hàng
                                </label>
                                <input
                                    type="text"
                                    name="shop-name"
                                    id="shop-name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block min-w-[390px] w-full lg:pr-16 py-2.5 pl-2.5"
                                    placeholder="ShopLY"
                                    onChange={handleShopNameChange}
                                    maxLength="50"
                                    required
                                />
                                <span className="absolute text-sm text-gray-400 right-3 top-10">
                                    {shopName.length} / 50
                                </span>
                            </div>
                            <div>
                                <label htmlFor="shop-address" className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Địa chỉ cửa hàng
                                </label>
                                <input
                                    type="text"
                                    name="shop-address"
                                    id="shop-address"
                                    placeholder="Số nhà, Đường, Quận, Thành phố"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    value={shopAddress}
                                    onChange={handleShopAddressChange}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="shop-phone-number"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Số điện thoại liên hệ
                                </label>
                                <input
                                    type="tel"
                                    name="shop-phone-number"
                                    id="shop-phone-number"
                                    placeholder="0123456789"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    value={shopPhoneNumber}
                                    onChange={handleShopNumberChange}
                                    required
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        onChange={handleTermsChange}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 ">
                                        Tôi chấp nhận tất cả{' '}
                                        <a className="font-medium text-primary-600 hover:underline " href="#">
                                            điều khoản
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                            >
                                Đăng kí
                            </button>

                            <ToastContainer />
                            <p className="flex justify-end text-sm font-light text-gray-500 ">
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/');
                                    }}
                                    className="font-medium cursor-pointer hover:underline text-primary-600 "
                                >
                                    Trang chủ
                                </a>
                            </p>
                        </form>
                    </div>
                    <ol class="relative lg:mt-8 justify-self-end  text-gray-500  ">
                        <div className="border-gray-200 border-s ">
                            <li className="mb-10 ms-6">
                                {isShopInfoFilled() ? (
                                    <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="text-white bg-green-500 rounded-full size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-7"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                            />
                                        </svg>
                                    </span>
                                )}
                                <h3
                                    className={`${isShopInfoFilled() ? 'text-green-700' : ''
                                        } font-medium leading-tight`}
                                >
                                    Thông tin cửa hàng
                                </h3>
                                <p className={`${isShopNameFilled() ? 'text-green-700' : ''} text-sm`}>Tên cửa hàng</p>
                                <p className={`${isShopAddressFilled() ? 'text-green-700' : ''} text-sm`}>
                                    Địa chỉ cửa hàng
                                </p>
                                <p className={`${isShopPhoneNumberFilled() ? 'text-green-700' : ''} text-sm`} r>
                                    Số điện thoại liên hệ
                                </p>
                            </li>
                            <li class="mb-10 ms-6">
                                {isShopInfoFilled() && termsAccepted === true ? (
                                    <>
                                        <span class="absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-6 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </span>
                                        <h3 class="text-green-700 font-medium leading-tight">Tổng quan</h3>
                                        <p class="text-green-700 text-sm">Hoàn thành</p>
                                    </>
                                ) : (
                                    <>
                                        <span class="absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-7"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                                />
                                            </svg>
                                        </span>
                                        <h3 class="font-medium leading-tight">Tổng quan</h3>
                                        <p class="text-sm">Hoàn thành</p>
                                    </>
                                )}
                            </li>
                        </div>
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default SellerSignUp;
