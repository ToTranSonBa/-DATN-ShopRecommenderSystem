import React, { useState, useEffect, useCallback } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import HomeBG from '../../assets/HomeImg/home.jpg';
import MaxWidthWrapper from './../../components/MaxWidthWrapper/index';
import { Title } from 'chart.js';
// API
import { fetchTopPopProducts } from '../../services/HomeApi/home';

const NewArrivalsToDay = [
    {
        image: ['https://via.placeholder.com/150?text=Image+1'],
        href: '#',
    },
    {
        image: ['https://via.placeholder.com/150?text=Image+1'],
        href: '#',
    },
    {
        image: ['https://via.placeholder.com/150?text=Image+1'],
        href: '#',
    },
    {
        image: ['https://via.placeholder.com/150?text=Image+1'],
        href: '#',
    },
];

const NewArrivalsWeek = [
    {
        image: ['https://via.placeholder.com/150?text=Image+1'],
        href: '#',
    },
];

const SavingSpotlight180day = [
    {
        id: '123',
        image: 'https://via.placeholder.com/150?text=Image+1',
        href: '#',
    },
];

const RecommendTop = () => {
    const [topPopProducts, setTopPopProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getTopPopProducts = useCallback(async () => {
        try {
            const response = await fetchTopPopProducts();
            console.log('res fetch top pop products: ', response);
            setTopPopProducts(response);
        } catch (error) {
            console.error('Failed to fetch top popular products:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await getTopPopProducts();
        };
        fetchData();
    }, [getTopPopProducts]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? topPopProducts.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === topPopProducts.length - 1 ? 0 : prevIndex + 1));
    };

    // Ensure that topPopProducts[currentIndex] exists before trying to access its properties
    const currentProduct = topPopProducts[currentIndex] || {};
    const images = currentProduct.images || [];
    const mainImage = images[0];
    const additionalImages = images.slice(1, 4);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(autoSlide);
    }, [currentIndex]);

    return (
        <div className="w-full h-auto bg-gray-100 border-none lg:py-12">
            <MaxWidthWrapper>
                <span className="text-3xl font-semibold text-black basis-1/6">
                    Khám phá cơ hội kinh doanh kế tiếp của bạn
                </span>
                <div className="grid grid-cols-9 grid-rows-5 lg:gap-6 lg:py-8">
                    {/* top rank */}
                    <div className="col-span-3 col-start-1 row-span-5 row-start-1 h-[800px]">
                        <div className="flex justify-between col-span-3 row-span-1 row-start-1 lg:pb-4">
                            <span className="font-semibold lg:text-2xl">Xếp hạng hàng đầu</span>
                            {/* <a className="font-light underline cursor-pointer">Xem thêm</a> */}
                        </div>
                        <div className="relative col-span-3 col-start-1 row-span-4 row-start-2 bg-white rounded-lg h-max">
                            {topPopProducts.length > 0 && (
                                <a href={`/productdetail/${currentProduct.iD_NK}`}>
                                    <div className="lg:px-4 lg:pt-4">
                                        <span className="block font-medium lg:text-lg">Phổ biến nhất</span>
                                        <span className="block font-light text-nowrap overflow-x-clip lg:text-md">
                                            {currentProduct.name}
                                        </span>
                                    </div>
                                    <div className="h-full lg:px-4 lg:pt-3 lg:pb-6">
                                        {mainImage && (
                                            <img
                                                data-twe-lazy-load-init
                                                data-twe-lazy-src
                                                className="max-w-full w-full h-[450px] rounded-xl object-cover cursor-pointer"
                                                src={mainImage}
                                                alt={currentProduct.name}
                                            />
                                        )}
                                        {additionalImages.length > 0 && (
                                            <div className="grid grid-cols-3 grid-rows-1 gap-5 cursor-pointer lg:mt-4">
                                                {additionalImages.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`Slide ${index}`}
                                                        className="h-[150px] w-full object-cover rounded-xl bg-black"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer backdrop-blur-xl"
                                        onClick={prevSlide}
                                    >
                                        <BsChevronCompactLeft size={30} />
                                    </div>
                                    <div
                                        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer backdrop-blur-xl"
                                        onClick={nextSlide}
                                    >
                                        <BsChevronCompactRight size={30} />
                                    </div>
                                    <div className="absolute flex items-end justify-center w-full mb-4 space-x-2 -bottom-2">
                                        {topPopProducts.map((_, slideIndex) => (
                                            <div
                                                key={slideIndex}
                                                onClick={() => setCurrentIndex(slideIndex)}
                                                className={`cursor-pointer rounded-full ${
                                                    currentIndex === slideIndex
                                                        ? 'bg-gray-500 h-2 w-2 lg:px-3'
                                                        : 'bg-gray-500 h-2 w-2'
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                    {/* new arrivals */}
                    <div className="col-span-3 col-start-4 row-span-5 row-start-1 h-[800px]">
                        <div className="flex justify-between col-span-3 row-span-1 row-start-3 lg:pb-4">
                            <span className="font-semibold lg:text-2xl">Xếp hạng hàng đầu</span>
                            <a className="font-light underline cursor-pointer">Xem thêm</a>
                        </div>
                        <div className="flex-row ">
                            <div className="bg-white rounded-lg">
                                <span className="block lg:px-4 lg:py-4 lg:text-xl lg:leading-7">
                                    <span>87,800+</span> sản phẩm được thêm hôm nay
                                </span>
                                <div className="grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4 lg:px-4 lg:py-4">
                                    {NewArrivalsToDay.map((newtoday, index) => (
                                        <img
                                            data-twe-lazy-load-init
                                            data-twe-lazy-src
                                            key={index}
                                            className="w-[220px] rounded-xl h-[220px] object-cover"
                                            src={newtoday.image}
                                            alt="this is image"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-white rounded-lg lg:gap-4 lg:mt-2 lg:px-4 lg:py-4">
                                {NewArrivalsWeek.map((newWeek, index) => (
                                    <img
                                        data-twe-lazy-load-init
                                        data-twe-lazy-src
                                        key={index}
                                        className="w-[150px] rounded-xl h-[150px] object-cover"
                                        src={newWeek.image}
                                    />
                                ))}
                                <div>
                                    <span className="block lg:text-2xl">Mới trong tuần này</span>
                                    <span className="block font-light">Chỉ sản phẩm từ Nhà cung ứng đã xác minh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* saving spotlight */}
                    <div className="col-span-3 col-start-7 row-span-5 row-start-1 h-[800px]">
                        <div className="flex justify-between col-span-3 row-span-1 row-start-1 ">
                            <span className="font-semibold lg:text-2xl">Được quan tâm nhiều nhất</span>
                            {/* <a className="font-light underline cursor-pointer">Xem thêm</a> */}
                        </div>

                        <div className="lg:py-4">
                            <div className="bg-white rounded-xl">
                                <div className="flex items-center lg:gap-4 lg:px-4 lg:py-4">
                                    {SavingSpotlight180day.map((saveSpotlight, index) => (
                                        <img
                                            data-twe-lazy-load-init
                                            data-twe-lazy-src
                                            key={saveSpotlight.id}
                                            className="w-[160px] h-[160px] object-cover rounded-xl"
                                            src={saveSpotlight.image}
                                            alt="This is image"
                                        />
                                    ))}
                                    <span className="font-normal lg:text-2xl">
                                        Sản phẩm được quan tâm nhiều nhất ngày hôm qua
                                    </span>
                                </div>
                            </div>

                            <div className="lg:mt-8">
                                <div className="bg-white rounded-xl">
                                    <span className="block lg:px-4 lg:py-4 lg:text-xl">
                                        Cửa hàng được quan tâm nhiều nhất ngày hôm qua
                                    </span>
                                    <img
                                        data-twe-lazy-load-init
                                        data-twe-lazy-src
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
