import MaxWidthWrapper from './../../components/MaxWidthWrapper/index';

const TimeLine = () => {
    return (
        <div className="bg-white lg:py-12">
            <MaxWidthWrapper className={'py-12'}>
                <p className="w-1/2 font-semibold text-black md:text-2xl lg:text-4xl lg:pb-24">
                    Streamline ordering from search to fulfillment, all in one place
                </p>
                <ol className="relative border-gray-200 border-s dark:border-gray-700 lg:w-2/3">
                    <li className="mb-10 ms-4 group">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white "></div>
                        <span className="mb-1 text-xl font-normal leading-none text-black ">Search for matches</span>

                        <p className="invisible text-base font-normal text-gray-500 group-hover:visible ">
                            Search and filter from millions of product and supplier offerings to find the matching ones
                            for your business.
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white "></div>
                        <span className="mb-1 text-xl font-normal leading-none text-black ">
                            Identify the right one
                        </span>

                        <p className="invisible text-base font-normal text-gray-500 group-hover:visible ">
                            Evaluate product quality and supplier capabilities easily and efficiently through verified
                            inspections and digital sourcing tools
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white "></div>
                        <span className="mb-1 text-xl font-normal leading-none text-black ">Pay with confidence</span>
                        <p className="invisible text-base font-normal text-gray-500 group-hover:visible ">
                            Pay for your order in over 20 currencies via 20+ secure payment methods, including flexible
                            payment terms.
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white "></div>
                        <span className="mb-1 text-xl font-normal leading-none text-black ">
                            Fulfill with transparency
                        </span>
                        <p className="invisible text-base font-normal text-gray-500 group-hover:visible ">
                            Get your logistics needs fulfilled with customized solutions at the Alibaba.com Logistics
                            Marketplace, with real-time tracking for 26,000+ routes across 220 countries and regions,
                            all powered by Alibaba.com Logistics.
                        </p>
                    </li>
                    <li className="mb-10 ms-4 group">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white "></div>
                        <span className="mb-1 text-xl font-normal leading-none text-black ">Manage with ease</span>
                        <p className="invisible text-base font-normal text-gray-500 group-hover:visible ">
                            Check order status, manage suppliers, track payments and shipments, and contact after-sales
                            support all via My Alibaba.
                        </p>
                    </li>
                </ol>
            </MaxWidthWrapper>
        </div>
    );
};
export default TimeLine;
