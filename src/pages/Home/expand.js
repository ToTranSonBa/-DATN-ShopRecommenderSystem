import React, { useState, useRef, useCallback, useEffect } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import ForU from '../../assets/foru.png';
import HotDeal from '../../assets/hotdeal.png';
import Trending from '../../assets/treding.jpg';
import ProductCard from '../../components/card/ProductCard';
import Loading from '../../components/Loading/index';
import { Pagination as PaginationAntd } from 'antd';
// API
import { fetchRecommentProduct } from '../../services/HomeApi/home';

const ExpandProduct = () => {
    const [paging, setPaging] = useState({
        totalItems: 0,
        currentPage: 0,
        pageSize: 10,
        totalPages: 0,
        latestPage: 0,
    });
    const [productForU, setProductForU] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const token = localStorage.getItem('token');

    const fetchDataProductForU = useCallback(async () => {
        try {
            const response = await fetchRecommentProduct(currentPage, token);
            response.products.forEach((element) => {
                if (Array.isArray(element.images) && element.images.length > 0) {
                    element.image = element.images[0]; // Lấy hình ảnh đầu tiên từ mảng images
                }
            });
            setProductForU(response.products);
            setPaging(response.paging);
        } catch (error) {
            console.error('Failed to fetch Data Product for U: ', error);
        }
    }, [currentPage, token]);

    useEffect(() => {
        fetchDataProductForU();
    }, [fetchDataProductForU]);

    const handlePreviousPage = () => {
        if (paging.currentPage > 0) {
            setCurrentPage(paging.currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (paging.currentPage < paging.totalPages - 1) {
            setCurrentPage(paging.currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (paging.totalPages <= 7) {
            for (let i = 0; i < paging.totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage < 3) {
                pageNumbers.push(0, 1, 2);
                pageNumbers.push('...', paging.totalPages - 3, paging.totalPages - 2, paging.totalPages - 1);
            } else if (currentPage >= paging.totalPages - 3) {
                pageNumbers.push(0, '...');
                pageNumbers.push(paging.totalPages - 3, paging.totalPages - 2, paging.totalPages - 1);
            } else {
                pageNumbers.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', paging.totalPages - 1);
            }
        }
        return pageNumbers;
    };

    const productRef = useRef(null);
    const formatNumber = (num) => {
        return new Intl.NumberFormat('de-DE').format(num);
    };
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = (index) => {
        setSelectedIndex(index);
        productRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="w-full h-auto bg-gray-100">
            <div className="flex-row bg-white lg:pt-4">
                <MaxWidthWrapper>
                    <div>
                        <p className="font-medium lg:text-2xl lg:pb-4">Khám phá thêm</p>
                        <ul className="flex items-center gap-1">
                            {[
                                { src: ForU, label: 'Dành cho bạn' },
                                // { src: HotDeal, label: 'Top Deal bán chạy' },
                                // { src: Trending, label: 'Trending' },
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className={`max-w-52 min-w-52 lg:py-8 lg:px-12 cursor-pointer transition duration-300 ease-in-out transform ${selectedIndex === index
                                            ? 'bg-primary/10 border-b-2 border-solid border-primary scale-105 animate-wiggle'
                                            : ''
                                        }`}
                                    onClick={() => handleClick(index)}
                                >
                                    <img
                                        data-twe-lazy-load-init
                                        data-twe-lazy-src
                                        src={item.src}
                                        className="mx-auto size-10"
                                    />
                                    <div className="text-nowrap">{item.label}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </MaxWidthWrapper>
            </div>

            <div id="product" ref={productRef} className="flex-1 bg-gray-100 md:flex-none ">
                <MaxWidthWrapper>
                    <div className="flex items-center justify-between lg:py-4 lg:rounded-md lg:gap-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                            {productForU.map((product) => (
                                <ProductCard key={product?.iD_NK} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* phân trang */}
                    <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                        <button
                            onClick={handlePreviousPage}
                            disabled={paging.currentPage === 0}
                            className={`px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 bg-white border border-gray-300 rounded-lg ${paging.currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                                }`}
                        >
                            Trước
                        </button>
                        <div className="flex items-center space-x-2">
                            {renderPageNumbers().map((page, index) =>
                                page === '...' ? (
                                    <span key={index} className="px-4 py-2 text-sm font-medium leading-5 text-gray-700">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => handlePageClick(page)}
                                        className={`px-4 py-2 text-sm font-medium leading-5 ${paging.currentPage === page
                                                ? 'text-primary border-1 border-primary bg-gray-100'
                                                : 'text-gray-700 border border-gray-300 hover:bg-gray-100'
                                            } transition-colors duration-150 rounded-lg`}
                                    >
                                        {page + 1}
                                    </button>
                                ),
                            )}
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={paging.currentPage === paging.totalPages - 1}
                            className={`px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 bg-white border border-gray-300 rounded-lg ${paging.currentPage === paging.totalPages - 1
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-gray-100'
                                }`}
                        >
                            Sau
                        </button>
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};
export default ExpandProduct;
