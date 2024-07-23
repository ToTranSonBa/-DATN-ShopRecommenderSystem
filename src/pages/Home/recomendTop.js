import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import DefaultImg from "../../assets/imageDefault.jpg";
import MaxWidthWrapper from "./../../components/MaxWidthWrapper/index";
import { Title } from "chart.js";
import Loading from "../../components/Loading/index";
// API
import {
  fetchTopPopProducts,
  fetchTopNewProducts,
  fetchTop10Seller,
  fetchTopViewProducts,
} from "../../services/HomeApi/home";


const RecommendTop = ({ onFetchComplete }) => {
  const navigate = useNavigate();
  const [topPopProducts, setTopPopProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newArrivalsToDay, setNewArrivalsToDay] = useState([]);
  const [topSeller, setTopSeller] = useState([]);
  const [topViewProducts, setTopViewProducts] = useState([]);


  const getTopPopProducts = useCallback(() => {
    return fetchTopPopProducts()
      .then(response => {
        setTopPopProducts(response);
        return response;
      })
      .catch(error => console.error('Failed to fetch top popular products:', error));
  }, []);

  const fetchDataTopNewProduct = useCallback(() => {
    return fetchTopNewProducts()
      .then(response => {
        setNewArrivalsToDay(response);
        return response;
      })
      .catch(error => console.log('Failed to fetch top new product: ', error));
  }, []);

  const getTopSeller = useCallback(() => {
    return fetchTop10Seller()
      .then(response => {
        setTopSeller(response);
        return response;
      })
      .catch(error => console.error('Failed to fetch top sellers:', error));
  }, []);

  const getTopViewProduct = useCallback(() => {
    return fetchTopViewProducts()
      .then(response => {
        setTopViewProducts(response);
        return response;
      })
      .catch(error => console.error('Failed to fetch top view products:', error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getTopPopProducts(),
          fetchDataTopNewProduct(),
          getTopSeller(),
          getTopViewProduct()
        ]);
        if (onFetchComplete) onFetchComplete();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [getTopPopProducts, fetchDataTopNewProduct, getTopSeller, getTopViewProduct, onFetchComplete]);



  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topPopProducts.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === topPopProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Ensure that topPopProducts[currentIndex] exists before trying to access its properties
  const currentProduct = topPopProducts[currentIndex] || {};
  const images = currentProduct.Images || [];
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
              <span className="font-semibold lg:text-2xl">
                Xếp hạng hàng đầu
              </span>
              {/* <a className="font-light underline cursor-pointer">Xem thêm</a> */}
            </div>
            <div className="relative col-span-3 col-start-1 row-span-4 row-start-2 bg-white rounded-lg h-max">
              {topPopProducts.length > 0 && (
                <a href={`/productdetail/${currentProduct.iD_NK}`}>
                  <div className="lg:px-4 lg:pt-4">
                    <span className="block font-medium lg:text-lg">
                      Phổ biến nhất
                    </span>
                    <span className="block font-light text-nowrap overflow-x-clip lg:text-md">
                      {currentProduct.name}
                    </span>
                  </div>
                  <div className="h-full lg:px-4 lg:pt-3 lg:pb-12">
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
                        className={`cursor-pointer rounded-full ${currentIndex === slideIndex
                          ? "bg-gray-500 h-2 w-2 lg:px-3"
                          : "bg-gray-500 h-2 w-2"
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
              <span className="font-semibold lg:text-2xl">Mới nhất</span>
              <a className="font-light underline cursor-pointer">Xem thêm</a>
            </div>
            <div className="flex-row ">
              <div className="bg-white rounded-lg">
                <span className="block lg:px-4 lg:py-4 lg:text-xl lg:leading-7">
                  Những sản phẩm được thêm gần đây nhất
                </span>
                <div className="grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4 lg:px-4 lg:py-4">
                  {newArrivalsToDay.length > 0 ? (
                    newArrivalsToDay.slice(0, 4).map((item, index) =>
                      item.Images && item.Images.length > 0 ? (
                        <img
                          key={item.iD_NK}
                          data-twe-lazy-load-init
                          data-twe-lazy-src
                          className="w-[220px] rounded-xl h-[220px] object-cover"
                          src={
                            item.Images[0] !== "string"
                              ? item.Images[0]
                              : DefaultImg
                          }
                          alt={`Image of ${item.name}`}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/220"; // Placeholder image in case of error
                          }}
                        />
                      ) : (
                        <p key={item.iD_NK}>No image available</p>
                      )
                    )
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg lg:gap-4 lg:mt-4 lg:px-4 lg:py-4">
                {newArrivalsToDay.length > 4 ? (
                  newArrivalsToDay.slice(4, 7).map((item, index) =>
                    item.Images && item.Images.length > 0 ? (
                      <img
                        key={item.iD_NK}
                        data-twe-lazy-load-init
                        data-twe-lazy-src
                        className="w-[150px] rounded-xl h-[150px] cursor-pointer object-cover"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add your navigation logic here
                        }}
                        src={
                          item.Images[0] !== "string"
                            ? item.Images[0]
                            : DefaultImg
                        }
                        alt={`Image of ${item.name}`}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150"; // Placeholder image in case of error
                        }}
                      />
                    ) : (
                      <p key={item.iD_NK}>No image available</p>
                    )
                  )
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
          {/* saving spotlight */}
          <div className="col-span-3 col-start-7 row-span-5 row-start-1 h-[800px]">
            <div className="flex justify-between col-span-3 row-span-1 row-start-1 ">
              <span className="font-semibold lg:text-2xl">
                Được quan tâm nhiều nhất
              </span>
              {/* <a className="font-light underline cursor-pointer">Xem thêm</a> */}
            </div>

            <div className="lg:py-4">
              <div className="bg-white rounded-xl">
                <div className="flex items-center lg:gap-4 lg:px-4 lg:py-4">
                  <img
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/productdetail/${topViewProducts[0]?.iD_NK}`);
                    }}
                    data-twe-lazy-load-init
                    data-twe-lazy-src
                    className="w-[160px] h-[160px] cursor-pointer object-cover rounded-xl"
                    src={
                      topViewProducts[0]?.Images[0]
                        ? topViewProducts[0]?.Images[0]
                        : DefaultImg
                    }
                    alt="This is image"
                  />
                  <span className="font-normal lg:text-2xl">
                    Sản phẩm được quan tâm nhiều nhất ngày hôm qua
                  </span>
                </div>
              </div>

              <div className="lg:mt-4">
                <div className="bg-white rounded-xl">
                  <span className="block lg:px-4 lg:py-4 lg:text-xl">
                    Cửa hàng được quan tâm nhiều nhất ngày hôm qua
                  </span>
                  {/* {topSeller?.map((seller) => (
                                        <img
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/shoppage/${seller?.iD_NK}`);
                                            }}
                                            data-twe-lazy-load-init
                                            data-twe-lazy-src
                                            className="w-full cursor-pointer h-[450px] object-cover lg:px-4 lg:py-4 rounded-3xl"
                                            src={
                                                seller?.imageUrl
                                                    ? seller?.imageUrl
                                                    : 'https://vcdn.tikicdn.com/ts/seller/4b/54/1a/f385a79a716cb3505f152e7af8c769aa.png'
                                            }
                                            alt="this is image"
                                        />
                                    ))} */}

                  <img
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/shoppage/${topSeller[0]?.iD_NK}`);
                    }}
                    data-twe-lazy-load-init
                    data-twe-lazy-src
                    className="w-full cursor-pointer h-[450px] object-cover lg:px-4 lg:py-4 rounded-3xl"
                    src={
                      topSeller[0]?.imageUrl
                        ? topSeller[0]?.imageUrl
                        : "https://vcdn.tikicdn.com/ts/seller/4b/54/1a/f385a79a716cb3505f152e7af8c769aa.png"
                    }
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