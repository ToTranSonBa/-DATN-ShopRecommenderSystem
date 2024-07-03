import MaxWidthWrapper from './../../components/MaxWidthWrapper/index';

const TimeLine = () => {
    return (
        <div className="bg-white lg:py-12">
            <MaxWidthWrapper className={'py-12'}>
                <p className="w-3/4 font-semibold text-black lg:ml-12 md:text-2xl lg:text-4xl lg:pb-24">
                    Đơn giản hóa hoạt động đặt hàng từ tìm kiếm đến thực hiện đơn hàng, tất cả mọi nơi
                </p>
                <ol className="relative border-gray-200 lg:ml-16 border-s dark:border-gray-700 lg:w-2/3">
                    <li className="mb-10 ms-4 group">
                        <div className="absolute flex items-center justify-center border border-gray-300 rounded-full group-hover:scale-125 group-hover:bg-orange-100 group-hover:border-none group-hover:text-secondary size-12 -start-6 -top-3 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2.5"
                                stroke="currentColor"
                                class="size-6 group-hover:scale-125 font-semibold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </div>

                        <span className="mb-1 ml-8 text-xl font-normal leading-none group-hover:text-4xl group-hover:font-semibold text-brown-600 ">
                            Tìm kiếm kết quả phù hợp
                        </span>

                        <p className="invisible mt-2 ml-8 text-base font-normal text-gray-500 group-hover:visible ">
                            Tìm kiếm và lọc từ hàng triệu sản phẩm, dịch vụ của nhà cung cấp để tìm sản phẩm, dịch vụ
                            phù hợp cho doanh nghiệp của bạn.
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute flex items-center justify-center border border-gray-300 rounded-full group-hover:scale-125 group-hover:bg-orange-100 group-hover:border-none group-hover:text-secondary size-12 -start-6 top-28 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 group-hover:scale-125 font-semibold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </svg>
                        </div>

                        <span className="mb-1 ml-8 text-xl font-normal leading-none group-hover:text-4xl group-hover:font-semibold text-brown-600 ">
                            Xác định đúng
                        </span>

                        <p className="invisible mt-2 ml-8 text-base font-normal text-gray-500 group-hover:visible ">
                            Đánh giá chất lượng sản phẩm cũng như năng lực của nhà cung cấp một cách dễ dàng và hiệu quả
                            thông qua hoạt động kiểm tra đã được xác minh và các công cụ tìm nguồn cung kỹ thuật số.
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute flex items-center justify-center border border-gray-300 rounded-full group-hover:scale-125 group-hover:bg-orange-100 group-hover:border-none group-hover:text-secondary size-12 -start-6 top-56 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 group-hover:scale-125 font-semibold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                />
                            </svg>
                        </div>

                        <span className="mb-1 ml-8 text-xl font-normal leading-none group-hover:text-4xl group-hover:font-semibold text-brown-600 ">
                            Tự tin thanh toán
                        </span>

                        <p className="invisible mt-2 ml-8 text-base font-normal text-gray-500 group-hover:visible ">
                            Thanh toán đơn hàng của bạn bằng hơn 20 loại tiền tệ thông qua hơn 20 phương thức thanh toán
                            đa dạng, an toàn, bao gồm các điều khoản thanh toán linh hoạt.
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute flex items-center justify-center border border-gray-300 rounded-full group-hover:scale-125 group-hover:bg-orange-100 group-hover:border-none group-hover:text-secondary size-12 -start-6 top-[350px] ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 group-hover:scale-125 font-semibold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                                />
                            </svg>
                        </div>

                        <span className="mb-1 ml-8 text-xl font-normal leading-none group-hover:text-4xl group-hover:font-semibold text-brown-600 ">
                            Thực hiện đơn hàng minh bạch
                        </span>

                        <p className="invisible mt-2 ml-8 text-base font-normal text-gray-500 group-hover:visible ">
                            Đáp ứng nhu cầu kho vận của bạn bằng các giải pháp tùy chỉnh tại ShopLY Logistics
                            Marketplace, với tính năng theo dõi theo thời gian thực cho hơn 26.000 tuyến đường trên 220
                            quốc gia và khu vực, tất cả đều được cung cấp bởi ShopLY Logistics.
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute flex items-center justify-center border border-gray-300 rounded-full group-hover:scale-125 group-hover:bg-orange-100 group-hover:border-none group-hover:text-secondary size-12 -start-6 top-[470px] ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 group-hover:scale-125 font-semibold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                />
                            </svg>
                        </div>

                        <span className="mb-1 ml-8 text-xl font-normal leading-none group-hover:text-4xl group-hover:font-semibold text-brown-600 ">
                            Quản lý dễ dàng
                        </span>

                        <p className="invisible mt-2 ml-8 text-base font-normal text-gray-500 group-hover:visible ">
                            Tìm kiếm và lọc từ hàng triệu sản phẩm, dịch vụ của nhà cung cấp để tìm sản phẩm, dịch vụ
                            phù hợp cho doanh nghiệp của bạn.
                        </p>
                    </li>
                </ol>
            </MaxWidthWrapper>
        </div>
    );
};
export default TimeLine;
