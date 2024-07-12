import React, { useState, useEffect } from 'react';
import DefaultAVT from '../../assets/default-avatar.png';

// API
import { fetchTop10Seller } from '../../services/HomeApi/home';

function SliderShops() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [error, setError] = useState(null);
    const [slides, setSlides] = useState([]);

    //

    useEffect(() => {
        const getTop10Seller = async () => {
            try {
                const response = await fetchTop10Seller();
                const top10SellerData = response;
                createSlides(top10SellerData);
            } catch (error) {
                setError('Failed to fetch categories');
                console.error('Failed to fetch categories:', error);
            }
        };

        getTop10Seller();
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
        <div className="relative min-h-[450px] w-full m-auto lg:py-16 group ">
            <div className="flex items-center justify-around">
                {error && <div className="error">{error}</div>}
                {columns.map((column, columnIndex) => (
                    <div className="w-[150px] h-[150px]" key={columnIndex}>
                        {column.map((item, index) => (
                            <a
                                href={`/shoppage/${item.iD_NK}`}
                                key={index}
                                className="flex flex-col items-center justify-center w-full h-full border-2 border-separate border-transparent rounded-full cursor-pointer hover:border-secondary lg:mb-4"
                            >
                                <div className="mx-auto size-16">
                                    <img
                                        data-twe-lazy-load-init
                                        data-twe-lazy-src
                                        className="rounded-full"
                                        src={item.imageUrl ? item.imageUrl : DefaultAVT}
                                        alt={item.iD_NK}
                                    />
                                </div>

                                <div className="mt-2 text-sm text-center lg:px-1">{item.name}</div>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SliderShops;
