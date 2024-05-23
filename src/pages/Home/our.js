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
                        <div className="text-center font-normal text-brown-600 lg:text-5xl">
                            Empowering businesses through global trade
                        </div>
                        <div className="w-full flex justify-center lg:pt-6">
                            <div className=" text-center w-2/3 h-auto font-light">
                                Alibaba.com offers one-stop B2B trading solutions for global small and medium-sized
                                businesses, empowering them to transform through digital trade, grasp opportunities, and
                                accelerate growth internationally.
                            </div>
                        </div>
                    </div>
                    <div className="grid h-auto lg:max-h-[650px] grid-cols-2 grid-rows-3 lg:gap-12">
                        <div className="relative col-span-1 row-span-3">
                            <img src={HomeBG_mission} className="w-full h-full rounded-xl" />
                            <div className="absolute z-10 flex-row lg:gap-12 lg:left-14 lg:bottom-8">
                                <span className="uppercase text-primary lg:text-xl">Our mission</span>
                                <p className="text-white lg:text-3xl">Make it easy to do business everywhere</p>
                            </div>
                        </div>
                        <div className="relative col-span-1 row-span-2">
                            <img src={HomeBG_map} className="w-full h-full rounded-xl" />
                            <div className="absolute z-2 flex h-full  lg:top-8 lg:px-8">
                                <div className="content-end lg:h-4/5 basis-3/4">
                                    <span className="block uppercase text-primary lg:text-2xl">Our locations</span>
                                    <p className="block text-brown-800 lg:text-3xl">We have teams around the world</p>
                                </div>
                                <p className="basis-1/4 text-brown-800">
                                    Hangzhou, China Paris, France Munich, Germany Tokyo, Japan Seoul, Korea London, UK
                                    New York, US ... and many other locations worldwide.
                                </p>
                            </div>
                        </div>

                        <div className="relative col-span-1 row-span-1">
                            <img src={HomeBG_esgpromies} className=" w-full h-full rounded-xl" />
                            <div className="absolute z-10 flex-row lg:gap-12 lg:left-14 lg:bottom-8">
                                <span className="uppercase text-primary lg:text-xl">OUR ESG PROMISES</span>
                                <p className="text-white lg:text-3xl">Responsible technology. Sustainable future.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};
export default Our;
