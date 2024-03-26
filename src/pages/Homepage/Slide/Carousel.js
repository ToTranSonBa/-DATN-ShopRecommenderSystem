import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill, BsArrowRight } from "react-icons/bs";
import { FaRegSquare, FaRegCircle } from "react-icons/fa";
import "../Slide/Slide.scss";
import BrandLogo1 from '../../../assets/BrandLogos/coffee-place-logo-vector.jpg';
import BrandLogo2 from '../../../assets/BrandLogos/coffee-shop-logo-with-inscription-vector-29217749.jpg';
import BrandLogo3 from '../../../assets/BrandLogos/f89c08df04ea1d8257438035c9df2b0b.jpg';
import BrandLogo4 from '../../../assets/BrandLogos/coffee-shop-logo-with-inscription-vector-29217749.jpg';
import BrandLogo5 from '../../../assets/BrandLogos/coffee-place-logo-vector.jpg';
const Carousel = () => {
    const [slide, setSlide] = useState(0);
    const images = [
        "https://images3.alphacoders.com/106/1069102.jpg",
        "https://i.pinimg.com/originals/71/9e/80/719e80760999b4c355a723224120eb07.png",
        "https://images5.alphacoders.com/112/thumb-1920-1123013.jpg"
    ];

    const nextSlide = () => {
        setSlide(prevSlide => (prevSlide + 1) % images.length);
    };

    const prevSlide = () => {
        setSlide(prevSlide => (prevSlide - 1 + images.length) % images.length);
    };

    return (
        <div className="HomePage">
            <div className="slider-section">
                <div className="carousel">
                    <BsArrowLeftCircleFill
                        onClick={prevSlide}
                        className={`arrow arrow-left ${slide === 0 ? 'arrow-disabled' : ''}`}
                    />
                    {images.map((item, idx) => {
                        return (
                            <img
                                src={item}
                                key={idx}
                                className={slide === idx ? "slide" : "slide slide-hidden"}
                            />
                        );
                    })}
                    <BsArrowRightCircleFill
                        onClick={nextSlide}
                        className={`arrow arrow-right ${slide === images.length - 1 ? 'arrow-disabled' : ''}`}
                    />
                    <span className="indicators">
                        {images.map((_, idx) => {
                            return (
                                <button
                                    key={idx}
                                    className={`indicator ${slide === idx ? 'active' : ''}`}
                                    onClick={() => setSlide(idx)}
                                >
                                    {slide === idx ? <FaRegSquare /> : <FaRegCircle />}
                                </button>
                            );
                        })}
                    </span>
                </div>
                <div className="slogan">
                    <div className="text-column">
                        <div className="text-column-left">Simply Unique<i style={{ color: '#6C7275' }}>/</i></div>
                        <div className="text-column-left">Simply Better<i style={{ color: '#6C7275' }}>.</i></div>
                    </div>
                    <div className="text-column">

                        <div className="text-column-right">3lengants<i style={{ color: '#6C7275' }}> is a gift & decorations store based in HCHC,</i></div>
                        <i className="text-column-right" style={{ color: '#6C7275' }}> Vietnam.Est since 2019.</i>
                    </div>
                </div>
            </div>
            <div className="brand-logos-section">
                <div className="brand-logos" >
                    <img className="brand-logo" src={BrandLogo1} alt="Hình ảnh mẫu" />
                    <img className="brand-logo" src={BrandLogo2} alt="Hình ảnh mẫu" />
                    <img className="brand-logo" src={BrandLogo3} alt="Hình ảnh mẫu" />
                    <img className="brand-logo" src={BrandLogo4} alt="Hình ảnh mẫu" />
                    <img className="brand-logo" src={BrandLogo5} alt="Hình ảnh mẫu" />
                </div>
            </div>

            <div className="Banner-Grid-Section">
                <h2 className="brand-grid-title">Shop collection</h2>
                <div className="Banner-grid-content">
                    <div className="Banner-grid-card">
                        <div className="Banner-grid-card-content">
                            <h2 className="Banner-grid-card-content-title">
                                Headband
                            </h2>
                            <button className="Banner-grid-card-content-button">
                                Collection  <BsArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="Banner-grid-small-card">
                        <div className="Banner-grid-small-card-row">
                            <div className="Banner-grid-card-content">
                                <h2 className="Banner-grid-card-content-title">
                                    Headband
                                </h2>
                                <button className="Banner-grid-card-content-button">
                                    Collection  <BsArrowRight />
                                </button>
                            </div>
                        </div>
                        <div className="Banner-grid-small-card-row">
                            <div className="Banner-grid-card-content">
                                <h2 className="Banner-grid-card-content-title">
                                    Headband
                                </h2>
                                <button className="Banner-grid-card-content-button">
                                    Collection  <BsArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default Carousel;