import MaxWidthWrapper from '../MaxWidthWrapper';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    fetchTop10Seller,
    fetchRecommendSeller,
    fetchTopPopProducts,
    fetchTopNewProducts,
    fetchTopViewProducts,
} from '../../services/HeaderApi/index';

const NavbarCustom = ({ className_bg, className_textcolor, className_dropshadow, onHover, onLeave }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();
    const [role, setRole] = useState(location.state?.role || []);
    //
    // useEffect để lấy và cập nhật role từ localStorage khi component được render
    useEffect(() => {
        // Lấy vai trò từ localStorage nếu có
        const storedRoles = JSON.parse(localStorage.getItem('roles'));

        // Nếu vai trò lưu trong localStorage khác null hoặc undefined thì cập nhật state
        if (storedRoles) {
            setRole(storedRoles);
        }
    }, []); // Chỉ chạy một lần sau khi component được render lần đầu tiên

    // useEffect để cập nhật lại role nếu location.state?.role thay đổi
    useEffect(() => {
        if (location.state?.role) {
            setRole(location.state.role);
        }
    }, [location.state?.role]);
    const handleMouseOver = (id) => {
        setHoveredItem(id);
    };

    const handleMouseOut = () => {
        setHoveredItem(null);
    };

    const handleMouseOnUl = () => {
        if (onHover) {
            onHover();
        }
    };

    const handleMouseOutUl = () => {
        if (onLeave) {
            onLeave();
        }
    };

    const handleSignUp = () => {
        if (token) {
            navigate('/signup/seller');
        } else {
            navigate('/login');
        }
    };

    const [topRecommendSellerData, setRecommendSellerData] = useState([]);
    const [topPopProducts, setTopPopProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newArrivalsToDay, setNewArrivalsToDay] = useState([]);
    const [topSeller, setTopSeller] = useState([]);
    const [topViewProducts, setTopViewProducts] = useState([]);

    const getTopPopProducts = useCallback(async () => {
        try {
            const response = await fetchTopPopProducts();
            setTopPopProducts(response);
        } catch (error) {
            console.error('Failed to fetch top popular products:', error);
        }
    }, []);

    const fetchDataTopNewProduct = useCallback(async () => {
        try {
            const response = await fetchTopNewProducts();
            setNewArrivalsToDay(response);
        } catch (error) {
            console.log('Faile to fetch top new product: ', error);
        }
    });

    const getTopSeller = useCallback(async () => {
        try {
            const response = await fetchTop10Seller();
            setTopSeller(response); // Gọi hàm setter với giá trị response
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    });

    const getTopViewProduct = useCallback(async () => {
        try {
            const response = await fetchTopViewProducts();
            setTopViewProducts(response); // Gọi hàm setter với giá trị response
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    });

    const getRecommendSeller = useCallback(async () => {
        try {
            const response = await fetchRecommendSeller();
            setRecommendSellerData(response);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            await getTopPopProducts();
            await fetchDataTopNewProduct();
            await getTopSeller();
            await getTopViewProduct();
            await getRecommendSeller();
        };
        fetchData();
    }, []);

    const Hot = [
        {
            title: 'Cửa hàng phù hợp với bạn',
            submenu: topRecommendSellerData?.map((seller) => ({
                title: `${seller?.name}`,
                url: `/shoppage/${seller.iD_NK}`,
            })),
        },
        {
            title: 'Sản phẩm phổ biển nhất',
            submenu: topPopProducts?.map((product) => ({
                title: `${product?.name}`,
                url: `/productdetail/${product?.iD_NK}`,
            })),
        },
        {
            title: 'Sản phẩm mới nhất',
            submenu: newArrivalsToDay?.map((product) => ({
                title: `${product?.name}`,
                url: `/productdetail/${product?.iD_NK}`,
            })),
        },
        {
            title: 'Những sản phẩm được quan tâm nhiều nhất',
            submenu: topViewProducts?.map((product) => ({
                title: `${product?.name}`,
                url: `/productdetail/${product?.iD_NK}`,
            })),
        },
        {
            title: 'Những cửa hàng được quan tâm nhiều nhất',
            submenu: topSeller?.map((seller) => ({ title: `${seller?.name}`, url: `/shoppage/${seller?.iD_NK}` })),
        },
    ];

    const BuyerCentral = [
        {
            title: 'Bắt đầu',
            submenu: [
                {
                    title: 'ShopLY là gì',
                    url: '#',
                },
            ],
        },
        {
            title: 'Tại sao lại là ShopLY',
            submenu: [
                {
                    title: 'Làm thế nào tìm nguồn cung ứng',
                    url: '#',
                },
                {
                    title: 'Chương trình dành cho thành viên',
                    url: '#',
                },
            ],
        },
        {
            title: 'Dịch vụ thương mại',
            submenu: [
                {
                    title: 'Đảm bảo thương mại',
                    url: '#',
                },
                {
                    title: 'Dịch vụ logistic',
                    url: '#',
                },
                {
                    title: 'Thư tín dụng',
                    url: '#',
                },
                {
                    title: 'Chương trình tuân thủ thuế',
                    url: '#',
                },
            ],
        },
        {
            title: 'Tài nguyên',
            submenu: [
                {
                    title: 'Những câu chuyện',
                    url: '#',
                },
                {
                    title: 'Blogs',
                    url: '#',
                },
                {
                    title: 'Báo cáo về ngành công nghiệp',
                    url: '#',
                },
                {
                    title: 'Trung tâm hỗ trợ',
                    url: '#',
                },
            ],
        },

        {
            title: 'Hội thảo trực tuyến',
            submenu: [
                {
                    title: 'Khái quát',
                    url: '#',
                },
                {
                    title: 'Gặp gỡ các đối tác cùng ngành',
                    url: '#',
                },
                {
                    title: 'Học viện Thương mại Điện tử',
                    url: '#',
                },
            ],
        },
    ];

    const handleMouseOverHot = (index) => {
        setHoveredIndex(index);
    };
    const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
    const handleMouseOutUlHoverMenu = () => {
        setHoveredSubmenu(null);
    };

    return (
        <div className={`hidden md:block inset-x-0 top-24 md:absolute md:z-11 ${className_dropshadow}`}>
            <nav className={`${className_bg} border-gray-200 lg:pb-2 relative`}>
                <MaxWidthWrapper>
                    <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-2xl">
                        <div className="flex items-center justify-between w-full mx-auto">
                            <ul
                                onMouseOver={handleMouseOnUl}
                                onMouseOut={handleMouseOutUl}
                                className="flex flex-col font-normal cursor-pointer lg:text-sm md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse"
                            >
                                <li
                                    id="menu-categories"
                                    className={`flex lg:gap-1 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                    onMouseOver={() => handleMouseOver('categories')}
                                    onMouseOut={handleMouseOut}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                        />
                                    </svg>
                                    HOT
                                </li>
                                <li
                                    id="menu-featured-selection"
                                    className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                    onMouseOver={() => handleMouseOver('featured-selection')}
                                    onMouseOut={handleMouseOut}
                                >
                                    Lựa chọn nổi bật
                                </li>
                                <li
                                    id="menu-trade-assurance"
                                    className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                    onMouseOver={() => handleMouseOver('trade-assurance')}
                                    onMouseOut={handleMouseOut}
                                >
                                    Trade Assurance
                                </li>
                            </ul>

                            {/* right */}
                            {role?.length === 0 ? (
                                <ul
                                    onMouseOver={handleMouseOnUl}
                                    onMouseOut={handleMouseOutUl}
                                    className="flex flex-col font-normal cursor-pointer lg:text-sm md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse"
                                >
                                    <li
                                        id="menu-buyer-central"
                                        className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                        onMouseOver={() => handleMouseOver('buyer-central')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Trung tâm Người mua
                                    </li>
                                    <li
                                        id="menu-help-center"
                                        className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                        onMouseOver={() => handleMouseOver('help-center')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Trung tâm trợ giúp
                                    </li>
                                </ul>
                            ) : (
                                <ul
                                    onMouseOver={handleMouseOnUl}
                                    onMouseOut={handleMouseOutUl}
                                    className="flex flex-col font-normal cursor-pointer lg:text-sm md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse"
                                >
                                    <li
                                        id="menu-buyer-central"
                                        className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                        onMouseOver={() => handleMouseOver('buyer-central')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Trung tâm Người mua
                                    </li>
                                    <li
                                        id="menu-help-center"
                                        className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                        onMouseOver={() => handleMouseOver('help-center')}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Trung tâm trợ giúp
                                    </li>
                                    <li className="hover:underline">
                                        {role.length === 1 && (
                                            <a
                                                onClick={handleSignUp}
                                                className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                            >
                                                Đăng kí trở thành nhà bán lẻ
                                            </a>
                                        )}
                                        {role.length === 2 && (
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate('/shopdashboard');
                                                }}
                                                className={`flex lg:gap-2 px-3 leading-8 py-2 ${className_textcolor} cursor-pointer border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 flex-grow`}
                                            >
                                                Quản lí cửa hàng của bạn
                                            </a>
                                        )}
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </MaxWidthWrapper>

                {/* Dropdown for categories */}
                <div
                    id="menu-categories-dropdown"
                    className={`absolute ${
                        hoveredItem === 'categories' ? 'block fade-down' : 'hidden'
                    } bg-white border-gray-200 shadow-sm border-y w-full lg:h-auto lg:min-h-[300px] lg:max-h-[600px]`}
                    onMouseOver={() => handleMouseOver('categories')}
                    onMouseOut={handleMouseOut}
                    onMouseEnter={handleMouseOnUl}
                    onMouseLeave={handleMouseOutUl}
                >
                    <MaxWidthWrapper>
                        <div className="w-full h-auto overflow-y-auto lg:gap-x-12 lg:py-8">
                            <div className="flex gap-x-4 lg:gap-x-0">
                                {/* col-1 */}
                                <div className="w-full h-auto max-h-full col-span-1 col-start-1 row-span-1 row-start-1 overflow-y-scroll">
                                    <ul className="flex-row">
                                        {Hot.map((menu, index) => (
                                            <li
                                                className={`font-light text-black border-r-2 lg:px-7 lg:py-1 lg:leading-10 ${
                                                    hoveredIndex === index || hoveredSubmenu === index
                                                        ? 'hover:bg-gray-100 bg-gray-100'
                                                        : 'hover:bg-gray-100'
                                                }`}
                                                key={index}
                                                onMouseEnter={() => handleMouseOverHot(index)}
                                            >
                                                <a href="#">{menu.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* col-2 */}
                                <div className="w-full h-auto col-span-1 col-start-2 row-span-1 row-start-1 overflow-y-scroll border-r-2 lg:max-h-[400px]">
                                    <ul
                                        className="flex-row"
                                        onMouseEnter={() => setHoveredSubmenu(hoveredIndex)}
                                        onMouseLeave={handleMouseOutUl}
                                    >
                                        {Hot[hoveredIndex] &&
                                            Hot[hoveredIndex].submenu &&
                                            Hot[hoveredIndex].submenu.map((submenuItem, subIndex) => (
                                                <li
                                                    className="overflow-hidden font-light text-black border-r-2 cursor-pointer text-nowrap lg:px-7 lg:pr-7 lg:leading-10 hover:bg-gray-100"
                                                    key={subIndex}
                                                >
                                                    <a href={submenuItem.url}>{submenuItem.title}</a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>

                {/* Dropdown for featured selection */}
                <div
                    id="menu-categories-dropdown"
                    className={`absolute ${
                        hoveredItem === 'featured-selection' ? 'block fade-down' : 'hidden'
                    } bg-white border-gray-200 shadow-sm border-y w-full lg:h-auto lg:min-h-[300px] lg:max-h-[600px]`}
                    onMouseOver={() => handleMouseOver('featured-selection')}
                    onMouseOut={handleMouseOut}
                    onMouseEnter={handleMouseOnUl}
                    onMouseLeave={handleMouseOutUl}
                >
                    <MaxWidthWrapper>
                        <div className="flex h-auto overflow-y-scroll lg:py-16 lg:max-h-2/3">
                            <div className="flex items-center justify-around w-2/3 h-full">
                                <div className="h-full mx-auto font-light border-2 rounded-md w-ful lg:px-20 lg:py-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-10 lg:h-10 mx-auto lg:mb-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                                        />
                                    </svg>
                                    Đánh giá hàng đầu
                                </div>
                                <div className="h-full mx-auto font-light border-2 rounded-md w-ful lg:px-20 lg:py-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-10 lg:h-10 mx-auto lg:mb-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                        />
                                    </svg>
                                    Sản phẩm mới
                                </div>
                                <div className="h-full mx-auto font-light border-2 rounded-md w-ful lg:px-20 lg:py-8">
                                    <div className="rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="lg:w-10 lg:h-10 mx-auto lg:mb-4 -rotate-45"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                                            />
                                        </svg>
                                    </div>
                                    Tiêu điểm tiết kiệm
                                </div>
                            </div>
                            <div className="w-1/3 h-full border-l-2 lg:pl-32">
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    Trung tâm hàng mẫu
                                </a>
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    Triển lãm Thương mại Trực tuyến
                                </a>
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    Mẹo
                                </a>
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    LIVE
                                </a>
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    Nhà cung cấp toàn cầu
                                </a>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
                {/* Dropdown for trade assurance */}
                <div
                    id="menu-trade-assurance-dropdown"
                    className={`absolute ${
                        hoveredItem === 'trade-assurance' ? 'block fade-down' : 'hidden'
                    } bg-white border-gray-200 shadow-sm border-y w-full lg:h-auto lg:min-h-[300px] lg:max-h-[600px]`}
                    onMouseOver={() => handleMouseOver('trade-assurance')}
                    onMouseOut={handleMouseOut}
                    onMouseEnter={handleMouseOnUl}
                    onMouseLeave={handleMouseOutUl}
                >
                    <MaxWidthWrapper>
                        <div className="flex items-center justify-around w-full h-auto lg:py-12">
                            <div className="flex-row mx-auto">
                                <span className="text-orange-600 lg:text-3xl lg:leading-10">
                                    T<span className="text-black lg:text-2xl">rade Assurance</span>
                                </span>
                                <p className="w-3/4 lg:text-3xl lg:leading-10 lg:py-6">
                                    Thưởng thức bảo vệ từ thanh toán để giao hàng
                                </p>
                                <button className="text-white rounded-full bg-primary lg:px-12 lg:py-2 hover:bg-primary/60">
                                    Tìm hiểu thêm
                                </button>
                            </div>
                            <div className="grid mx-auto lg:grid-cols-2 lg:grid-rows-2 lg:gap-x-3 lg:gap-y-6">
                                <div className="flex items-center bg-gray-100 rounded-xl lg:py- lg:px-12 lg:gap-4">
                                    <div className="relative rounded-full bg-secondary/85 w-14 h-14">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 text-white"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                            />
                                        </svg>
                                    </div>
                                    <span>Chính sách hoàn tiền</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-6 lg:h-6"
                                        ml-auto
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </div>
                                <div className="flex items-center w-full h-full bg-gray-100 rounded-xl lg:py-8 lg:px-12 lg:gap-4">
                                    <div className="relative rounded-full bg-secondary/85 w-14 h-14">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 text-white"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                            />
                                        </svg>
                                    </div>
                                    <span>Dịch vụ vận chuyển & kho hàng</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-6 lg:h-6"
                                        ml-auto
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </div>
                                <div className="flex items-center w-full h-full bg-gray-100 rounded-xl lg:py-8 lg:px-12 lg:gap-4">
                                    <div className="relative rounded-full bg-secondary/85 w-14 h-14">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 text-white"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                                            />
                                        </svg>
                                    </div>
                                    <span>Bảo vệ sau bán hàng</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-6 lg:h-6"
                                        ml-auto
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </div>
                                <div className="flex items-center w-full h-full bg-gray-100 rounded-xl lg:py-8 lg:px-12 lg:gap-4">
                                    <div className="relative rounded-full bg-secondary/85 w-14 h-14">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="absolute top-3 md:w-8 md:h-8 lg:w-14 w-14 text-white"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                            />
                                        </svg>
                                    </div>
                                    <span>Thanh toán an toàn và dễ dàng</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-6 lg:h-6 ml-auto"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
                {/* Dropdown for buyer central */}
                <div
                    id="menu-buyer-central-dropdown"
                    className={`absolute ${
                        hoveredItem === 'buyer-central' ? 'block fade-down' : 'hidden'
                    } bg-white border-gray-200 shadow-sm border-y w-full lg:h-auto lg:min-h-[200px] lg:max-h-[600px]`}
                    onMouseOver={() => handleMouseOver('buyer-central')}
                    onMouseOut={handleMouseOut}
                    onMouseEnter={handleMouseOnUl}
                    onMouseLeave={handleMouseOutUl}
                >
                    <MaxWidthWrapper>
                        <div className="flex items-start justify-between w-full h-auto lg:py-6">
                            {BuyerCentral.map(
                                (buyer, index) =>
                                    buyer.title &&
                                    buyer.submenu && (
                                        <ul className="flex-row" key={index}>
                                            <li className="font-semibold lg:leading-10">{buyer.title}</li>
                                            {buyer.submenu.map((subbuyer, subindex) => (
                                                <li className="font-light lg:leading-10 hover:underline" key={subindex}>
                                                    <a href={subbuyer.url}>{subbuyer.title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    ),
                            )}
                        </div>
                    </MaxWidthWrapper>
                </div>

                {/* Dropdown for help center */}
                <div
                    id="menu-help-center-dropdown"
                    className={`absolute ${
                        hoveredItem === 'help-center' ? 'block fade-down' : 'hidden'
                    } bg-white border-gray-200 shadow-sm border-y w-full lg:h-auto lg:min-h-[300px] lg:max-h-[600px]`}
                    onMouseOver={() => handleMouseOver('help-center')}
                    onMouseOut={handleMouseOut}
                    onMouseEnter={handleMouseOnUl}
                    onMouseLeave={handleMouseOutUl}
                >
                    <MaxWidthWrapper>
                        <div className="flex h-auto overflow-y-scroll lg:py-16 lg:max-h-2/3">
                            <div className="flex items-center justify-center w-2/3 h-full">
                                <div className="h-full mx-auto font-light border-2 rounded-md w-ful lg:px-20 lg:py-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-10 lg:h-10 mx-auto lg:mb-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                        />
                                    </svg>
                                    Dành cho người dùng
                                </div>
                                <div className="h-full mx-auto font-light border-2 rounded-md w-ful lg:px-20 lg:py-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="lg:w-10 lg:h-10 mx-auto lg:mb-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                                        />
                                    </svg>
                                    Dành cho nhà cung ứng
                                </div>
                            </div>
                            <div className="w-1/3 h-full border-l-2 lg:pl-32">
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    Mở khiếu nại
                                </a>
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    Báo cáo vi phạm IPR
                                </a>
                                <a className="block font-light lg:leading-10 lg:py-2 hover:underline lg:hover:text-medium">
                                    Báo cáo vi phạm
                                </a>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
            </nav>
        </div>
    );
};

export default NavbarCustom;
