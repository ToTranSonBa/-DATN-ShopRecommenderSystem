import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import HomeBG_mission from '../../assets/HomeImg/homeBG_mission.jpg';
import HomeBG_map from '../../assets/HomeImg/homeBG_map.jpg';
import HomeBG_esgpromies from '../../assets/HomeImg/homeBG_esgpromies.jpg';

const Our = () => {
    return (
        <div className="w-full h-auto bg-white lg:pt-24 lg:pb-12">
            <MaxWidthWrapper>
                <div className="lg:h-3/4">
                    <div className="flex-row w-full h-auto lg:pb-8">
                        <div className="w-2/3 mx-auto font-normal text-center text-brown-600 lg:text-5xl">
                            Hỗ trợ các doanh nghiệp thực hiện thương mại toàn cầu
                        </div>
                        <div className="flex justify-center w-full lg:pt-6">
                            <div className="w-2/3 h-auto font-light text-center ">
                                ShopLY cung cấp giải pháp giao dịch B2B toàn diện cho các doanh nghiệp vừa và nhỏ trên
                                toàn cầu, hỗ trợ họ chuyển đổi sang giao dịch kỹ thuật số, nắm bắt cơ hội và thúc đẩy
                                tăng trưởng trên phạm vi quốc tế.
                            </div>
                        </div>
                    </div>
                    <div className="grid h-auto lg:max-h-[650px] grid-cols-2 grid-rows-3 lg:gap-12">
                        <div className="relative col-span-1 row-span-3">
                            <img
                                data-twe-lazy-load-init
                                data-twe-lazy-src
                                src={HomeBG_mission}
                                className="object-cover w-full h-full rounded-xl"
                            />
                            <div className="absolute z-10 flex-row lg:gap-12 lg:left-14 lg:bottom-8">
                                <span className="uppercase text-primary lg:text-xl">SỨ MỆNH CỦA CHÚNG TÔI</span>
                                <p className="text-white lg:text-3xl">Giúp bạn dễ dàng kinh doanh ở bất cứ đâu.</p>
                            </div>
                        </div>
                        <div className="relative col-span-1 row-span-2">
                            <img
                                data-twe-lazy-load-init
                                data-twe-lazy-src
                                src={HomeBG_map}
                                className="w-full h-full  rounded-xl"
                            />
                            <div className="absolute flex h-full z-2 lg:top-8 lg:px-8">
                                <div className="content-end lg:h-4/5 basis-3/4">
                                    <span className="block uppercase text-primary lg:text-xl">
                                        ĐỊA ĐIỂM CỦA CHÚNG TÔI
                                    </span>
                                    <p className="block text-brown-800 lg:text-3xl">
                                        Chúng tôi có đội ngũ trên khắp thế giới.
                                    </p>
                                </div>
                                <p className="basis-1/4 text-brown-800">
                                    Hangzhou, China Paris, France Munich, Germany Tokyo, Japan Seoul, Korea London, UK
                                    New York, US ... và nhiều địa điểm khác trên toàn thế giới.
                                </p>
                            </div>
                        </div>

                        <div className="relative col-span-1 row-span-1">
                            <img
                                data-twe-lazy-load-init
                                data-twe-lazy-src
                                src={HomeBG_esgpromies}
                                className="object-cover w-full h-full rounded-xl"
                            />
                            <div className="absolute z-10 flex-row lg:gap-12 lg:left-8 lg:bottom-8">
                                <span className="uppercase text-primary lg:text-xl">CAM KẾT ESG CỦA CHÚNG TÔI</span>
                                <p className="text-white lg:text-3xl">Công nghệ có trách nhiệm. Tương lai bền vững.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};
export default Our;
