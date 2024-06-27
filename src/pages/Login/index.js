import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/LoginApi/loginApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Move the <head> section outside of the component
// It's usually included in the HTML file, not within React components
// So, it's not necessary to include it here
// You can include the external CSS link directly in the HTML file

const LoginPage = () => {
    const navigate = useNavigate();
    const goToSignUP = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const GoToSignUP = () => {
        goToSignUP('/signup');
    };
    useEffect(() => {
        let token = localStorage.getItem('token');

        if (token) {
            navigate('/');
        }
    }, [localStorage.getItem]);

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            if (!email || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                toast.error('Vui lòng nhập địa chỉ email của bạn');
                return;
            }

            if (!password) {
                toast.error('Vui lòng nhập mật khẩu của bạn');
                return;
            }
            const response = await loginApi(email, password);

            if (response && response.accessToken) {
                const token = response.accessToken;
                localStorage.setItem('token', token);
                navigate('/');
            } else if (response && response.status === 401) {
                localStorage.removeItem('token');
                toast.error('Không được phép. Vui lòng kiểm tra thông tin đăng nhập của bạn.');
            } else {
                localStorage.removeItem('token');
                toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
        }
    }, []);
    return (
        <>
            <div className="py-5 bg-white rounded-lg">
                <div className="container flex flex-col pt-12 mx-auto my-5 bg-white rounded-lg">
                    <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                        <div className="flex items-center justify-center w-full lg:p-12">
                            <div className="flex items-center xl:p-10">
                                <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                                    <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Đăng nhập</h3>
                                    <p className="mb-4 text-grey-700 lg:pb-6">
                                        Đăng nhập với email và mật khẩu của bạn
                                    </p>

                                    {/* <a
                                        className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                                        href="#"
                                    >
                                        <img
                                            className="h-5 mr-2"
                                            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                            alt=""
                                        />
                                        Đăng nhập với Google
                                    </a> */}
                                    <div className="flex items-center mb-3">
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                        <p className="mx-4 text-2xl text-grey-600">' '</p>
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    </div>
                                    <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
                                        Email <span className="text-red-600 lg:pl-1">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="mail@loopple.com"
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                    />
                                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">
                                        Mật khẩu<span className="text-red-600 lg:pl-1">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                                    />
                                    <div className="flex flex-row justify-end mb-8">
                                        <button
                                            // onClick={handleForgotPassword}
                                            className="mr-4 text-sm font-medium text-purple-blue-500"
                                        >
                                            Quên mật khẩu?
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleClick}
                                        className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                                    >
                                        Đăng nhập
                                    </button>
                                    <ToastContainer />
                                    <p className="flex justify-between text-sm leading-relaxed text-grey-900">
                                        Chưa đăng kí?{' '}
                                        <a
                                            onClick={GoToSignUP}
                                            className="font-bold cursor-pointer hover:underline text-grey-700"
                                        >
                                            Tạo tài khoản
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
