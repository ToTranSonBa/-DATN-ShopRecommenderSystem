import React, { useState } from 'react';
import Logo from '../../assets/BrandLogos/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignupApi } from '../../services/SignupApi/SignUpApi';
const SignUp = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const isPersonalInfoFilled = () => {
        return lastName.trim() !== '' && firstName.trim() !== '' && address.trim() !== '' && phoneNumber.trim() !== '';
    };

    const isAccountInfoFilled = () => {
        return email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };
    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };
    const handleClick = async () => {
        try {
            if (!lastName) {
                toast.error('Vui lòng nhập họ');
                return;
            }
            if (!firstName) {
                toast.error('Vui lòng nhập tên');
                return;
            }
            if (!address) {
                toast.error('Vui lòng nhập địa chỉ');
                return;
            }
            if (!phoneNumber) {
                toast.error('Vui lòng nhập số điện thoại');
                return;
            }
            //Validate email
            if (!email || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                toast.error('Vui lòng nhập đúng cấu trúc email');
                return;
            }
            if (
                !password ||
                !password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/)
            ) {
                toast.error(
                    'Mật khẩu phải có ít nhất 10 kí tự và bao gồm ít nhất một chữ cái, một số và một kí tự đặc biệt',
                );
                return;
            }

            if (confirmPassword !== password) {
                toast.error('Xác nhận mật khẩu không đúng');
                return;
            }
            if (termsAccepted !== true) {
                toast.error('Vui lòng đọc kĩ điều khoản của chúng tôi');
                return;
            }
            const response = await SignupApi(email, password, firstName, lastName, address, phoneNumber);
            if (response === true) {
                toast.success('Tạo tài khoản thành công');
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

    const goToLogin = () => {
        navigate('/login');
    };
    return (
        <section className="w-full bg-gray-50">
            <div className="flex flex-col items-center justify-center w-full max-w-screen-xl px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                    <span className="font-bold font-weight-800 md:text-xl lg:text-3xl text-primary">ShopLY</span>
                </a>

                <div className="flex justify-center w-full bg-white rounded-lg shadow lg:gap-12 md:mt-0 sm:max-w-md md:max-w-screen-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleClick();
                            }}
                        >
                            {(step === 1 || step === 3) && (
                                <>
                                    <div className="flex lg:gap-2">
                                        <div className="w-1/2">
                                            <label
                                                htmlFor="last-name"
                                                className="block mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Họ
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                placeholder="Nguyễn"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label
                                                htmlFor="first-name"
                                                className="block mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Tên
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                placeholder="Văn A"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Số nhà, Đường, Quận, Thành phố"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone-number"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone-number"
                                            id="phone-number"
                                            placeholder="0123456789"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                            {(step === 2 || step === 3) && (
                                <>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Email của bạn
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block min-w-[390px] w-full p-2.5 "
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="confirm-password"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Nhập lại mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            id="confirm-password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between">
                                {step !== 1 && (
                                    <button
                                        className="flex items-center justify-start w-1/2 hover:underline"
                                        type="button"
                                        onClick={handlePrevStep}
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
                                        </svg>{' '}
                                        Quay lại
                                    </button>
                                )}
                                {step !== 3 && (
                                    <button
                                        className="flex items-center justify-end w-full hover:underline"
                                        type="button"
                                        onClick={handleNextStep}
                                    >
                                        Tiếp tục{' '}
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
                                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            {step === 3 && (
                                <>
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
                                </>
                            )}
                            <ToastContainer />
                            <p className="flex justify-between text-sm font-light text-gray-500 ">
                                Đã có tài khoản?{' '}
                                <p
                                    onClick={goToLogin}
                                    className="font-medium cursor-pointer hover:underline text-primary-600 "
                                >
                                    Đăng nhập
                                </p>
                            </p>
                        </form>
                    </div>
                    <ol class="relative lg:mt-8 justify-self-end  text-gray-500  ">
                        <div className="border-gray-200 border-s ">
                            <li class="mb-10 ms-6 ">
                                {(step === 2 || step === 3) && isPersonalInfoFilled ? (
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
                                ) : (
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
                                )}

                                <h3 class="font-medium leading-tight">Thông tin cá nhân</h3>
                                <p class="text-sm">Họ và tên</p>
                                <p class="text-sm">Địa chỉ</p>
                                <p class="text-sm">Số điện thoại</p>
                            </li>
                            <li class="mb-10 ms-6">
                                {step === 3 && isAccountInfoFilled ? (
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
                                ) : (
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
                                )}
                                <h3 class="font-medium leading-tight">Thông tin tài khoản</h3>
                                <p class="text-sm">Email</p>
                                <p class="text-sm">Mật khẩu</p>
                            </li>
                            <li class="mb-10 ms-6">
                                {step === 3 &&
                                isPersonalInfoFilled &&
                                isPersonalInfoFilled &&
                                termsAccepted === true ? (
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
                                ) : (
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
                                )}
                                <h3 class="font-medium leading-tight">Tổng quan</h3>
                                <p class="text-sm">Hoàn thành</p>
                            </li>
                        </div>
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
