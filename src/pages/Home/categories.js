import MaxWidthWrapper from '../../components/MaxWidthWrapper/index';
import SliderCategories from './slider_categories';

const Categories = () => {
    return (
        <div className="w-full h-auto bg-white lg:pt-20 lg:pb-8">
            <MaxWidthWrapper className={'flex-row lg:gap-10'}>
                <div className="flex h-min lg:gap-12">
                    <span className="text-4xl font-semibold text-black basis-7/12">
                        Khám phá hàng triệu sản phẩm, dịch vụ phù hợp với nhu cầu kinh doanh của bạn
                    </span>
                    <div className="grid grid-cols-2 grid-rows-2 gap-y-6 basis-5/12">
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Hàng ngàn</span>
                                <br />
                                <span className="text-xl font-light ">sản phẩm</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Hàng nghìn</span>
                                <br />
                                <span className="text-xl font-light ">nhà cung cấp</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Danh mục</span>
                                <br />
                                <span className="text-xl font-light ">phong phú</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">Mọi miền</span>
                                <br />
                                <span className="text-xl font-light ">Tổ quốc</span>
                            </div>
                        </div>
                    </div>
                </div>
                <SliderCategories />
            </MaxWidthWrapper>
        </div>
    );
};

export default Categories;
