import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

// API
import { fetchCategories } from '../../services/HomeApi/home';

function SliderShops() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [error, setError] = useState(null);
    const [slides, setSlides] = useState([]);

    //

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchCategories();
                const categoriesData = response.data;

                createSlides(categoriesData);
            } catch (error) {
                setError('Failed to fetch categories');
                console.error('Failed to fetch categories:', error);
            }
        };

        getCategories();
    }, []);

    const createSlides = (items) => {
        const slidesArray = [];
        let tempArray = [...items]; // Tạo bản sao của danh sách ban đầu

        for (let i = 0; i < items.length; i += 16) {
            let slide = tempArray.slice(i, i + 16);
            if (slide.length < 16) {
                // Nếu slide không đủ 16 phần tử, bổ sung từ danh sách ban đầu
                slide = slide.concat(items.slice(0, 16 - slide.length));
            }
            slidesArray.push(slide);
        }

        setSlides(slidesArray);
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (!slides[currentIndex]) {
        return null; // Avoid rendering if the slide is undefined
    }

    // Chia các mục thành các cột, mỗi cột chứa 2 mục
    const columns = [];
    for (let i = 0; i < slides[currentIndex].length; i += 2) {
        columns.push(slides[currentIndex].slice(i, i + 2));
    }

    return (
        <div className="relative min-h-[400px] w-full m-auto lg:px-4 lg:py-16 group ">
            <div className="flex items-center justify-around">
                {error && <div className="error">{error}</div>}
                {columns.map((column, columnIndex) => (
                    <div className="w-[150px] h-[150px]" key={columnIndex}>
                        {column.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center w-full h-full border-2 border-separate border-gray-200 rounded-full cursor-pointer hover:border-secondary lg:mb-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="mx-auto size-9"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                    />
                                </svg>

                                <div className="mt-2 text-sm text-center lg:px-1">{item.category.name}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Left Arrow */}
            {currentIndex > 0 && (
                <div className="hidden lg:mt-6 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 text-xl rounded-full p-2 bg-black/30 text-white cursor-pointer backdrop-blur-xl">
                    <BsChevronCompactLeft onClick={prevSlide} size={20} />
                </div>
            )}
            {/* Right Arrow */}
            {currentIndex < slides.length - 1 && (
                <div className="hidden lg:mt-6 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-0 text-xl rounded-full p-2 bg-black/30 text-white cursor-pointer backdrop-blur-xl">
                    <BsChevronCompactRight onClick={nextSlide} size={20} />
                </div>
            )}
            <div className="absolute flex items-end justify-center w-full py-2 -bottom-4 ">
                {slides.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => setCurrentIndex(slideIndex)}
                        className={`text-2xl cursor-pointer ${
                            currentIndex === slideIndex ? 'text-blue-500' : 'text-gray-500'
                        }`}
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SliderShops;
