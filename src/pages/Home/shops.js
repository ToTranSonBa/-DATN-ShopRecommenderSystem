import MaxWidthWrapper from '../../components/MaxWidthWrapper/index';
import SliderShops from './slider_shops';

const Shops = () => {
    return (
        <div className="w-full h-auto bg-[#F7F8FA] lg:pt-20">
            <MaxWidthWrapper className={'flex-row lg:gap-10'}>
                <div className="flex h-min lg:gap-12">
                    <div className="grid grid-cols-2 grid-rows-2 gap-y-6 basis-7/12">
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Thu thập </span>
                                <br />
                                <span className="text-xl font-light ">từ hơn 3 nghìn người dùng tham gia</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Thu thập </span>
                                <br />
                                <span className="text-xl font-light ">từ hơn 3 nghìn cửa hàng đăng kí</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Phân tích, đánh giá</span>
                                <br />
                                <span className="text-xl font-light ">dựa trên hành vi, sở thích</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Gợi ý</span>
                                <br />
                                <span className="text-xl font-light ">cửa hàng phù hợp với bạn</span>
                            </div>
                        </div>
                    </div>
                    <span className="text-4xl font-semibold text-black basis-5/12">
                        Có thể phù hợp với nhu cầu của bạn
                    </span>
                </div>
                <SliderShops />
            </MaxWidthWrapper>
        </div>
    );
};

export default Shops;
