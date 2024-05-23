import React from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper/index';

const Trade = () => {
    return (
        <div className="relative w-full ">
            <img
                className="hidden w-full h-full border-transparent lg:pd-20 md:block md:max-lg:object-cover md:max-lg:min-h-3/4 md:max-lg:h-imgBG"
                src={HomeBG}
                alt="This is home background"
            />
            <MaxWidthWrapper>
                <div className="absolute flex-row gap-12 h-1/2 top-16 z-2 lg:left-44 md:left-8">
                    <p className="w-2/3 font-semibold text-white md:text-2xl lg:text-3xl">
                        Trade with confidence from production quality to purchase protection
                    </p>
                    <div className="flex justify-between lg:py-12 gap-x-10">
                        <div className="w-1/2 p-6 bg-transparent rounded-lg shadow backdrop-blur-lg lg:max-w-screen-sm dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-xl text-white ">Ensure production quality with</p>
                            <p className="text-3xl font-semibold text-white lg:my-6">
                                <span className="text-5xl text-blue-600">V</span>erified Suppliers
                            </p>
                            <p className="text-lg font-light text-white">
                                Connect with a variety of suppliers with third-party-verified credentials and
                                capabilities. Look for the "Verified" logo to begin sourcing with experienced suppliers
                                your business could rely on.
                            </p>
                            <div className="flex items-center justify-between lg:my-6">
                                <button className="text-xl text-white border-2 border-white border-solid rounded-full backdrop-blur-sm lg:py-4 lg:px-8">
                                    Watch video
                                </button>
                                <a className="text-lg text-white underline">Learn more</a>
                            </div>
                        </div>

                        <div className="w-1/2 p-6 bg-transparent rounded-lg shadow backdrop-blur-lg lg:max-w-screen-sm dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-xl text-white">Protect your purchase with</p>
                            <p className="text-3xl font-semibold text-white lg:my-6">
                                <span className="text-5xl text-yellow-600">T</span>rade Assurance
                            </p>
                            <p className="text-lg font-light text-white">
                                Source confidently with access to secure payment options, protection against product or
                                shipping issues, and mediation support for any purchase-related concerns when you order
                                and pay on Alibaba.com.
                            </p>
                            <div className="flex items-center justify-between lg:my-6">
                                <button className="text-xl text-white border-2 border-white border-solid rounded-full backdrop-blur-sm lg:py-4 lg:px-8">
                                    Watch video
                                </button>
                                <a className="text-lg text-white underline">Learn more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};
export default Trade;
