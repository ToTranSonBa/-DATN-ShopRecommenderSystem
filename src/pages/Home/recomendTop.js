import React from 'react';
import HomeBG from '../../assets/HomeImg/home.jpg';
import MaxWidthWrapper from './../../components/MaxWidthWrapper/index';

const RecommendTop = () => {
    return (
        <div className="w-full h-auto bg-gray-100 border-none lg:py-12">
            <MaxWidthWrapper>
                <span className="text-3xl font-semibold text-black basis-1/6">
                    Discover your next business opportunity
                </span>
                <div className="grid grid-cols-9 grid-rows-5 lg:gap-8 lg:py-8">
                    {/* top rank */}
                    <div className="col-span-3 col-start-1 row-span-5 row-start-1 h-[800px]">
                        <div className="flex justify-between col-span-3 row-span-1 row-start-1 lg:pb-4">
                            <span className="font-semibold lg:text-2xl">Top raking</span>
                            <a className="font-light underline cursor-pointer">View more</a>
                        </div>
                        <div className="col-span-3 col-start-1 row-span-4 row-start-2 bg-white rounded-lg">
                            <div className="lg:px-4 lg:py-4">
                                <span className="block font-medium lg:text-lg">Most popular</span>
                                <span className="block font-light lg:text-md">Men's T-shirt's</span>
                            </div>
                            <div className="h-full lg:px-4 lg:py-4">
                                <img className="max-w-full w-full h-[450px] rounded-xl object-cover" src={HomeBG} />
                                <div className="grid grid-cols-3 grid-rows-1 gap-5 lg:mt-4">
                                    <div className="h-[150px] w-full object-cover rounded-xl bg-black"> </div>
                                    <div className="h-[150px] w-full object-cover rounded-xl bg-black"> </div>
                                    <div className="h-[150px] w-full object-cover rounded-xl bg-black"> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* new arrivals */}
                    <div className="col-span-3 col-start-4 row-span-5 row-start-1 h-[800px]">
                        <div className="flex justify-between col-span-3 row-span-1 row-start-3 lg:pb-4">
                            <span className="font-semibold lg:text-2xl">New arrivals</span>
                            <a className="font-light underline cursor-pointer">View more</a>
                        </div>
                        <div className="flex-row ">
                            <div className="bg-white rounded-lg">
                                <span className="block lg:px-4 lg:py-4 lg:text-xl lg:leading-7">
                                    87,800+ products added today
                                </span>
                                <div className="grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4 lg:px-4 lg:py-4">
                                    <img
                                        className="w-[220px] rounded-xl h-[220px] object-cover"
                                        src={HomeBG}
                                        alt="this is image"
                                    />
                                    <img
                                        className="w-[220px] rounded-xl h-[220px] object-cover"
                                        src={HomeBG}
                                        alt="this is image"
                                    />
                                    <img
                                        className="w-[220px] rounded-xl h-[220px] object-cover"
                                        src={HomeBG}
                                        alt="this is image"
                                    />
                                    <img
                                        className="w-[220px] rounded-xl h-[220px] object-cover"
                                        src={HomeBG}
                                        alt="this is image"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-white rounded-lg lg:mt-2 lg:px-4 lg:py-4">
                                <img className="w-[150px] rounded-xl h-[150px] object-cover" src={HomeBG} />
                                <div>
                                    <span className="block lg:text-2xl">New this week</span>
                                    <span className="block font-light">Products from Verified Suppliers only</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* saving spotlight */}
                    <div className="col-span-3 col-start-7 row-span-5 row-start-1 h-[800px]">
                        <div className="flex justify-between col-span-3 row-span-1 row-start-1 ">
                            <span className="font-semibold lg:text-2xl">Saving spotlight</span>
                            <a className="font-light underline cursor-pointer">View more</a>
                        </div>

                        <div className="lg:py-4">
                            <div className="bg-white rounded-xl">
                                <div className="flex items-center lg:gap-4 lg:px-4 lg:py-4">
                                    <img
                                        className="w-[160px] h-[160px] object-cover rounded-xl"
                                        src={HomeBG}
                                        alt="This is image"
                                    />
                                    <span className="font-normal lg:text-2xl">Lowest price in 180 days</span>
                                </div>
                            </div>

                            <div className="lg:mt-8">
                                <div className="bg-white rounded-xl">
                                    <span className="block lg:px-4 lg:py-4 lg:text-xl">Deals on best sellers</span>
                                    <img
                                        className="w-full h-[450px] object-cover lg:px-4 lg:py-4 rounded-3xl"
                                        src={HomeBG}
                                        alt="this is image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default RecommendTop;
