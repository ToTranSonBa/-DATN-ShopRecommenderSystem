import MaxWidthWrapper from './../../components/MaxWidthWrapper/index';

const Summary = () => {
    return (
        <div className="w-full h-auto bg-brown-800">
            <MaxWidthWrapper className={'grid h-auto sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 '}>
                <div className="h-auto px-4 py-4 cursor-pointer  hover:bg-secondary/10 group lg:px-8 lg:py-8 lg:min-h-60 rounded-3xl md:mx-4 lg:mx-8 md:my-4 lg:my-8 bg-brown-600">
                    <div className="relative rounded-full bg-transparent/15 w-14 h-14 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="group-hover:text-secondary absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 text-white"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                    </div>
                    <p className="py-5 text-2xl text-white lg:py-3">Hàng triệu sản phẩm, dịch vụ cho doanh nghiệp</p>
                    <p className="text-white ">
                        Khám phá sản phẩm và nhà cung cấp cho doanh nghiệp của bạn từ hàng triệu sản phẩm, dịch vụ trên
                        toàn thế giới.
                    </p>
                </div>
                <div className="h-auto px-4 py-4 cursor-pointer lg:px-8 lg:py-8 lg:min-h-60 group hover:bg-secondary/10 rounded-3xl md:mx-4 lg:mx-8 md:my-4 lg:my-8 bg-brown-600">
                    <div className="relative rounded-full bg-transparent/15 w-14 h-14">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 group-hover:text-secondary text-white"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                            />
                        </svg>
                    </div>
                    <p className="text-2xl text-white lg:py-3">Giao dịch và chất lượng đảm bảo</p>
                    <p className="text-white">
                        Đảm bảo chất lượng sản xuất từ các nhà cung cấp đã được xác minh, bảo vệ đơn hàng của bạn từ
                        khâu thanh toán đến giao hàng.
                    </p>
                </div>
                <div className="h-auto px-4 py-4 cursor-pointer lg:px-8 lg:py-8 lg:min-h-60 group hover:bg-secondary/10 rounded-3xl md:mx-4 lg:mx-8 md:my-4 lg:my-8 bg-brown-600">
                    <div className="relative rounded-full bg-transparent/15 w-14 h-14">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 group-hover:text-secondary text-white"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                            />
                        </svg>
                    </div>
                    <p className="text-2xl text-white lg:py-3 ">GIải pháp giao dịch toàn diện</p>
                    <p className="text-white">
                        Đặt hàng trơn tru từ bước tìm kiếm sản phẩm/nhà cung cấp đến quản lý, thanh toán và thực hiện
                        đơn hàng.
                    </p>
                </div>
                <div className="h-auto px-4 py-4 cursor-pointer lg:px-8 lg:py-8 lg:min-h-60 group hover:bg-secondary/10 rounded-3xl md:mx-4 lg:mx-8 md:my-4 lg:my-8 bg-brown-600">
                    <div className="relative rounded-full bg-transparent/15 w-14 h-14">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 group-hover:text-secondary text-white"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                            />
                        </svg>
                    </div>
                    <p className="text-2xl text-white lg:py-3 ">Trải nghiệm giao dịch được thiết kế riêng</p>
                    <p className="text-white">
                        Nhận các quyền lợi chọn lọc, chẳng hạn như giảm giá độc quyền, bảo vệ nâng cao và hỗ trợ bổ
                        sung, để giúp phát triển doanh nghiệp của bạn trên mọi chặng đường.
                    </p>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default Summary;
