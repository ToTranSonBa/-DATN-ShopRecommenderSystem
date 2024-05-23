import MaxWidthWrapper from '../../components/MaxWidthWrapper/index';
import SliderCategories from './slider_categories';

const Categories = () => {
    return (
        <div className="w-full h-auto py-12 bg-white">
            <MaxWidthWrapper className={'flex-row lg:gap-10'}>
                <div className="flex h-min">
                    <span className="text-4xl font-semibold text-black basis-7/12">
                        Explore millions of offerings tailored to your business needs
                    </span>
                    <div className="grid grid-cols-2 grid-rows-2 gap-y-6 basis-5/12">
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">200M+</span>
                                <br />
                                <span className="text-xl font-medium ">product</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">200K+</span>
                                <br />
                                <span className="text-xl font-medium ">suppliers</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">5,900</span>
                                <br />
                                <span className="text-xl font-medium ">product categories</span>
                            </div>
                        </div>
                        <div className="border-l-4 border-solid border-gray-600/55">
                            <div className="px-6">
                                <span className="text-3xl font-semibold text-primary">200+</span>
                                <br />
                                <span className="text-xl font-medium ">countries and regions</span>
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
