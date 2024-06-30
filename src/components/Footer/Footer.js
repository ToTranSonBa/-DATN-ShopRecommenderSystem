import React, { useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Logo from '../../assets/BrandLogos/Logo.png';
import AppStore from '../../assets/appstore.png';
import PlayStore from '../../assets/playstore.png';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };
    return (
        <div className="bg-gray-200 lg:py-8">
            <MaxWidthWrapper>
                <div class="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="sm:col-span-2">
                        <a
                            onClick={goToHome}
                            href="/"
                            aria-label="Go home"
                            title="Company"
                            class="inline-flex items-center"
                        >
                            <img src={Logo} className="size-7" />
                            <span class="ml-2 text-2xl text-primary font-bold tracking-wide ">ShopLY</span>
                        </a>
                        <div class="mt-6 ">
                            <p class="text-sm text-gray-800">
                                ShopLY là trang thương mại điện tử cho phép người mua và người bán tương tác và trao đổi
                                dễ dàng thông tin về sản phẩm và chương trình khuyến mãi của shop.
                            </p>
                            <p class="mt-4 text-sm text-gray-800">
                                Việc mua bán trên ShopLY trở nên nhanh chóng và đơn giản hơn. Bạn có thể trò chuyện trực
                                tiếp với nhà bán hàng để hỏi trực tiếp về mặt hàng cần mua
                            </p>
                        </div>
                    </div>
                    <div class="space-y-2 text-sm">
                        <p class="text-base font-medium uppercase tracking-wide text-gray-900">Liên hệ</p>
                        <div class="flex">
                            <p class="mr-1 w-1/3 text-gray-800">Điện thoại:</p>
                            <a
                                href=""
                                aria-label="Our phone"
                                title="Our phone"
                                class="transition-colors text-end w-2/3 duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                            >
                                (+84) 845 718 717
                            </a>
                        </div>
                        <div class="flex">
                            <p class="mr-1 w-1/3 text-gray-800">Email:</p>
                            <a
                                href="mailto:hvcau.work@gmail.com"
                                aria-label="Our email"
                                title="Our email"
                                class="transition-colors text-end w-2/3 duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                            >
                                hvcau.work@gmail.com
                            </a>
                        </div>
                        <div class="flex">
                            <span class="mr-1 w-1/3 text-gray-800">Địa chỉ:</span>
                            <a
                                href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Khoa+h%E1%BB%8Dc+T%E1%BB%B1+nhi%C3%AAn+-+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Qu%E1%BB%91c+gia+TP.HCM/@10.7366632,106.6645009,15z/data=!4m6!3m5!1s0x31752f1c06f4e1dd:0x43900f1d4539a3d!8m2!3d10.7628356!4d106.6824824!16s%2Fm%2F02r129r?entry=ttu"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Our address"
                                title="Our address"
                                class="transition-colors duration-300 text-end w-2/3 text-deep-purple-accent-400 hover:text-deep-purple-800"
                            >
                                227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM, Việt Nam
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span class="text-base font-medium uppercase tracking-wide text-gray-900">
                                Theo dõi chúng tôi trên:
                            </span>
                            <div class="flex items-center mt-2 space-x-3">
                                <a href="/" class=" transition-colors duration-300 hover:text-deep-purple-accent-400">
                                    <svg viewBox="0 0 24 24" fill="currentColor" class="h-5">
                                        <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
                                    </svg>
                                </a>

                                <a
                                    href="/"
                                    class=" transition-colors duration-300 hover:text-deep-purple-accent-400 w-10 h-10"
                                >
                                    <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg ">
                                        <path d="M24.325 8.309s-2.655-.334-8.357-.334c-5.517 0-8.294.334-8.294.334A2.675 2.675 0 0 0 5 10.984v10.034a2.675 2.675 0 0 0 2.674 2.676s2.582.332 8.294.332c5.709 0 8.357-.332 8.357-.332A2.673 2.673 0 0 0 27 21.018V10.982a2.673 2.673 0 0 0-2.675-2.673zM13.061 19.975V12.03L20.195 16l-7.134 3.975z" />
                                    </svg>
                                </a>
                                <a href="/" class=" transition-colors duration-300 hover:text-deep-purple-accent-400">
                                    <svg viewBox="0 0 24 24" fill="currentColor" class="h-5">
                                        <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path>
                                    </svg>
                                </a>
                                <a href="/" class=" transition-colors duration-300 hover:text-deep-purple-accent-400">
                                    <svg viewBox="0 0 30 30" fill="currentColor" class="h-6">
                                        <circle cx="15" cy="15" r="4"></circle>
                                        <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="lg:pt-4">
                            <span class="text-base font-medium tracking-wide text-gray-900 uppercase ">
                                Tải ứng dụng ngay tại:
                            </span>
                            <div class="flex items-center gap-1 lg:mt-2">
                                <a href="#" class="w-full min-w-xl">
                                    <img src={AppStore} alt="Playstore Button" class="h-11" />
                                </a>
                                <a class="w-full min-w-xl" href="#">
                                    <img src={PlayStore} alt="Youtube Button" class="h-11" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
            <div class="flex items-center pt-5 pb-5 border-t lg:flex-row  lg:gap-8 lg:justify-center lg:space-x-10">
                <MaxWidthWrapper>
                    <ul class="flex flex-col justify-center mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <a
                                href="/"
                                onClick={goToHome}
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                ShopLY{' '}
                            </a>
                        </li>
                    </ul>
                    <ul class="lg:py-4 flex flex-col w-full mx-auto items-center justify-center mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <a
                                href="/"
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                Chính sách và quy tắc
                            </a>
                        </li>
                        <div className="size-1 rounded-full bg-gray-500"></div>
                        <li>
                            <a
                                href="/"
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                Thông báo pháp lý
                            </a>
                        </li>
                        <div className="size-1 rounded-full bg-gray-500"></div>
                        <li>
                            <a
                                href="/"
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                Chính sách về danh sách sản phẩm
                            </a>
                        </li>
                        <div className="size-1 rounded-full bg-gray-500"></div>
                        <li>
                            <a
                                href="/"
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                Bảo vệ tài sản trí tuệ
                            </a>
                        </li>
                        <div className="size-1 rounded-full bg-gray-500"></div>
                        <li>
                            <a
                                href="/"
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                Chính sách Quyền riêng tư
                            </a>
                        </li>
                        <div className="size-1 rounded-full bg-gray-500"></div>
                        <li>
                            <a
                                href="/"
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                Điều khoản sử dụng
                            </a>
                        </li>
                        <div className="size-1 rounded-full bg-gray-500"></div>
                        <li>
                            <a
                                href="/"
                                class="text-sm text-gray-600 transition-colors hover:underline duration-300 hover:text-deep-purple-accent-400"
                            >
                                Tuân thủ tính chính trực
                            </a>
                        </li>
                    </ul>
                    <p class="text-sm text-gray-600 text-center">©2024-2024 ShopLY - Đã bảo lưu mọi quyền</p>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default Footer;
