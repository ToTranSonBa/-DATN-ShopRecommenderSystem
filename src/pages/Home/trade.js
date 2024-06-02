import React from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper/index';
import HomeBG_Cart from '../../assets/HomeImg/homeBG_card.jpg';
const Trade = () => {
    return (
        <div className="relative w-full ">
            <img
                className="hidden w-full h-full border-transparent lg:pd-20 md:block md:max-lg:object-cover md:max-lg:min-h-3/4 md:max-lg:h-imgBG"
                src={HomeBG_Cart}
                alt="This is home background"
            />
            <MaxWidthWrapper>
                <div className="absolute flex-row gap-12 h-1/2 top-32 z-2 lg:left-44 md:left-8">
                    <p className="w-1/2 font-semibold text-white md:text-2xl lg:text-4xl">
                        Tự tin giao dịch từ mặt chất lượng sản xuất cho đến bảo vệ mua hàng
                    </p>
                    <div className="flex justify-between lg:py-28 gap-x-20">
                        <div className="w-1/2 p-6 bg-transparent rounded-lg shadow backdrop-blur-3xl lg:max-w-screen-sm dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-xl text-white ">Đảm bảo chất lượng sản xuất với</p>
                            <p className="text-3xl font-semibold text-white lg:my-6">
                                <span className="text-5xl text-blue-600">V</span>erified Suppliers
                            </p>
                            <p className="text-lg font-light text-white">
                                Kết nối với nhiều nhà cung cấp khác nhau có thông tin xác thực và năng lực đã được bên
                                thứ ba xác minh. Hãy tìm biểu tượng "Đã xác minh" để bắt đầu tìm nguồn cung từ các nhà
                                cung cấp có kinh nghiệm mà doanh nghiệp của bạn có thể tin cậy.
                            </p>
                            <div className="flex items-center justify-between lg:my-6">
                                <button className="text-xl text-white border-2 border-white border-solid rounded-full hover:underline backdrop-blur-sm lg:py-4 lg:px-8">
                                    Xem video
                                </button>
                                <a className="text-white underline cursor-pointer text-md hover:text-lg">
                                    Tìm hiểu thêm
                                </a>
                            </div>
                        </div>

                        <div className="w-1/2 p-6 bg-transparent rounded-lg shadow backdrop-blur-3xl lg:max-w-screen-sm dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-xl text-white">Bảo vệ giao dịch mua hàng của bạn với</p>
                            <p className="text-3xl font-semibold text-white lg:my-6">
                                <span className="text-5xl text-yellow-600">T</span>rade Assurance
                            </p>
                            <p className="text-lg font-light text-white">
                                Tự tin tìm nguồn cung với khả năng tiếp cận các tùy chọn thanh toán an toàn, bảo vệ khỏi
                                các vấn đề về sản phẩm hoặc vận chuyển cũng như hỗ trợ hòa giải cho mọi mối lo ngại liên
                                quan đến mua hàng khi bạn đặt hàng và thanh toán trên ShopLY
                            </p>
                            <div className="flex items-center justify-between lg:my-6">
                                <button className="text-xl text-white border-2 border-white border-solid rounded-full hover:underline backdrop-blur-sm lg:py-4 lg:px-8">
                                    Xem video
                                </button>
                                <a className="text-white underline cursor-pointer text-md hover:text-lg">
                                    Tìm hiểu thêm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};
export default Trade;
