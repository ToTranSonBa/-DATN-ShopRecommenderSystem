import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const items = [
    { icon: <IconComponent />, label: 'Agriculture' },
    { icon: <IconComponent />, label: 'Industry' },
    { icon: <IconComponent />, label: 'Technology' },
    { icon: <IconComponent />, label: 'Health' },
    { icon: <IconComponent />, label: 'Education' },
    { icon: <IconComponent />, label: 'Finance' },
    { icon: <IconComponent />, label: 'Retail' },
    { icon: <IconComponent />, label: 'Transportation' },
    { icon: <IconComponent />, label: 'Energy' },
    { icon: <IconComponent />, label: 'Construction' },
    { icon: <IconComponent />, label: 'Hospitality' },
    { icon: <IconComponent />, label: 'Real Estate' },
    { icon: <IconComponent />, label: 'Entertainment' },
    { icon: <IconComponent />, label: 'Telecommunication' },
    { icon: <IconComponent />, label: 'Utilities' },
    { icon: <IconComponent />, label: 'Media' },
    { icon: <IconComponent />, label: 'Automotive' },
    { icon: <IconComponent />, label: 'Pharmaceutical' },
    { icon: <IconComponent />, label: 'Biotechnology' },
    { icon: <IconComponent />, label: 'Food' },
    { icon: <IconComponent />, label: 'Fashion' },
    { icon: <IconComponent />, label: 'Aerospace' },
    { icon: <IconComponent />, label: 'Defense' },
    { icon: <IconComponent />, label: 'Chemicals' },
    { icon: <IconComponent />, label: 'Machinery' },
];

function IconComponent() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-auto"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
        </svg>
    );
}

function SliderCategories() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [items.slice(0, 9), items.slice(9, 18), items.slice(18, 25)];

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

    useEffect(() => {
        const autoSlide = setInterval(() => {
            if (currentIndex < slides.length - 1) {
                nextSlide();
            }
        }, 3000);

        return () => clearInterval(autoSlide);
    }, [currentIndex]);

    // Chia các mục thành các cột, mỗi cột chứa 2 mục
    const columns = [];
    for (let i = 0; i < slides[currentIndex].length; i += 2) {
        columns.push(slides[currentIndex].slice(i, i + 2));
    }

    return (
        <div className="relative w-full h-auto m-auto lg:px-4 lg:py-16 group">
            <div className="flex items-center justify-around">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-col items-center gap-y-8">
                        {column.map((item, index) => (
                            <div
                                key={index}
                                className="border-2 border-separate border-black rounded-full lg:py-6 lg:px-2 lg:w-24"
                            >
                                {item.icon}
                                <span className="block">{item.label}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Left Arrow */}
            {currentIndex > 0 && (
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
            )}
            {/* Right Arrow */}
            {currentIndex < slides.length - 1 && (
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
            )}
            <div className="flex justify-center py-2 top-4">
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

export default SliderCategories;
