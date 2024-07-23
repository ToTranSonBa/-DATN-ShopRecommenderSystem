import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
// API
import { fetchProduct, fetchTopViewProducts, fetchTop10Seller } from '../../services/HomeApi/home';
import { SearchContext } from '../searchContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../useDebounce/useDebounce';

const Search = () => {
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [classNameHidden, setClassNameHidden] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [hideSuggestion, setHideSuggestion] = useState(true);
    const [isChooseCategory, setIsChooseCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    //
    const debouncedInputValue = useDebounce(inputValue, 500); // Debounce input value
    const [seeMore, setSeeMore] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    //

    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    const divRef = useRef(null);
    const [isHideSuggestion, setIsHideSuggestion] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsHideSuggestion(false);
                setHideSuggestion(true);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleScroll = () => {
        if (location.pathname === '/') {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos > 800) {
                setClassNameHidden('');
            } else {
                setClassNameHidden('hidden');
            }

            setScrollPosition(currentScrollPos);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    const getInitialStates = () => {
        if (location.pathname === '/') {
            return {
                classNameHidden: 'hidden',
            };
        } else {
            return {
                classNameHidden: '',
            };
        }
    };

    useEffect(() => {
        const newStates = getInitialStates();
        setClassNameHidden(newStates.classNameHidden);
    }, [location.pathname]);

    const navigate = useNavigate();

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e, searchKey) => {
        e.preventDefault();
        console.log('search key: ', searchKey);

        // Update recent searches
        if (searchKey !== '') {
            const updatedRecentSearch = [...recentSearch];

            if (!updatedRecentSearch.includes(searchKey)) {
                updatedRecentSearch.push(searchKey);
            }

            // Limit recent searches to a maximum number (e.g., 5)
            const maxRecentSearches = 5;
            if (updatedRecentSearch.length > maxRecentSearches) {
                updatedRecentSearch.splice(0, updatedRecentSearch.length - maxRecentSearches);
            }

            // Update state and local storage
            setRecentSearch(updatedRecentSearch);
            localStorage.setItem('recentSearch', JSON.stringify(updatedRecentSearch));
        }

        // Set search query and navigate to product page
        setSearchQuery(searchKey);
        localStorage.setItem('searchQuery', searchKey);

        if (window.location.href === 'http://localhost:3000/productpage') window.location.reload();
        else navigate('/productpage');
    };

    const handleSubmitSuggestion = (event, id) => {
        event.preventDefault();
        setHideSuggestion(!hideSuggestion);
        navigate(`/productDetail/${id}`);
        if (window.location.href.includes('productDetail')) window.location.reload();
    };

    const handleClearRecentSearch = () => {
        // Clear recent searches from local storage and state
        localStorage.removeItem('recentSearch');
        setRecentSearch([]);
        // console.log(localStorage.getItem("recentSearch"));
    };
    // State for recent searches
    const [recentSearch, setRecentSearch] = useState([]);

    // Fetch recent searches from local storage on component mount
    useEffect(() => {
        const storedRecentSearch = JSON.parse(localStorage.getItem('recentSearch')) || [];
        setRecentSearch(storedRecentSearch);
    }, []);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    useEffect(() => {
        if (debouncedInputValue) {
            const fetchDataProduct = async () => {
                try {
                    const response = await fetchProduct({
                        searchKey: debouncedInputValue,
                    });
                    console.log('response suggestions search key: ', response);
                    setSuggestions(response);
                    setIsHideSuggestion(true);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchDataProduct();
            setHideSuggestion(true);
        } else {
            setSuggestions([]);
            setHideSuggestion(true); // Clear suggestions when input is empty
        }
    }, [debouncedInputValue]);
    //
    //
    const [topViewProducts, setTopViewProducts] = useState([]);
    const [topSeller, setTopSeller] = useState([]);
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
            console.log('getTopViewProduct: ', response);
            setTopViewProducts(response); // Gọi hàm setter với giá trị response
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    });
    useEffect(() => {
        const fetchData = async () => {
            await getTopViewProduct();
            await getTopSeller();
        };
        fetchData();
    }, []);

    // Tạo mảng các placeholder từ dữ liệu topViewProducts
    const searchPlaceholders = topViewProducts?.map((product) => ({
        title: `${product?.Name}`,
    }));

    // Đảm bảo currentPlaceholder luôn hợp lệ
    const currentPlaceholder = searchPlaceholders.length > 0 ? searchPlaceholders[currentPlaceholderIndex]?.title : '';

    // Cập nhật placeholder định kỳ
    useEffect(() => {
        if (searchPlaceholders.length > 0) {
            const interval = setInterval(() => {
                setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % searchPlaceholders.length);
            }, 3000); // Thay đổi sau mỗi 3 giây

            return () => clearInterval(interval);
        }
    }, [searchPlaceholders]);

    return (
        <form className={`w-full max-w-screen-lg  ${classNameHidden}`} onSubmit={(e) => handleSubmit(e, inputValue)}>
            {error && <div className="error">{error}</div>}
            <div className="flex">
                {/* <button
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="relative z-10 inline-flex items-center flex-shrink-0 px-4 py-2 text-sm font-medium text-center text-black bg-gray-100 border border-gray-300 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100 "
                    type="button"
                    onClick={handleToggleChooseCategory}
                >
                    {selectedCategory}{' '}
                    <svg
                        className="w-2.5 h-2.5 ms-2.5 text-black"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button> */}
                {/* {isChooseCategory && (
                    <div
                        id="dropdown"
                        class="z-10 absolute top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-64"
                    >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => handleSelectCategory('All categories')}
                                >
                                    All categories
                                </button>
                            </li>
                            {categories.map((category, index) => (
                                <li key={category.category.iD_NK}>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleSelectCategory(category.category.name)}
                                    >
                                        {category.category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}

                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm te bg-gray-50 rounded-lg border border-gray-200 focus:ring-primary focus:border-primary"
                        placeholder={currentPlaceholder}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="absolute top-0 h-full px-4 text-sm font-medium text-white border border-primary bg-primary end-0 rounded-e-lg hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-primary "
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </button>
                    <div
                        id="searchexpand"
                        className={`shadow-md absolute left-0 z-20 w-full h-auto bg-white border-gray-300 rounded-lg`}
                    >
                        {inputValue.length === 0 ? (
                            <div className={`${isFocused ? 'block' : 'hidden'} top-14 lg:py-2`}>
                                <div class="w-full text-sm text-gray-900 lg:pr-4">
                                    {recentSearch.length !== 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold lg:ml-10 lg:text-lg">Tìm kiếm gần đây</span>
                                            <button
                                                onClick={handleClearRecentSearch}
                                                className="text-xs font-light text-red-600 underline cursor-pointer"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                    {recentSearch.slice(0, seeMore ? recentSearch.length : 4).map((search, index) => (
                                        <div
                                            className="flex items-center cursor-pointer hover:bg-gray-200/55 lg:leading-10 lg:gap-4"
                                            key={index}
                                        >
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full lg:ml-10 bg-gray-300/80">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-light">{search}</span>
                                        </div>
                                    ))}

                                    {recentSearch.length >= 5 && (
                                        <button
                                            onClick={() => setSeeMore(!seeMore)}
                                            className="flex items-center justify-center w-full gap-2 mx-auto text-xs underline lg:leading-10 hover:bg-background"
                                        >
                                            {seeMore ? (
                                                <>
                                                    <span>Hiển thị thêm </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                        />
                                                    </svg>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Rút gọn </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                        />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                                <div class=" w-full text-sm text-gray-900  ">
                                    <span className="font-semibold lg:ml-10 lg:text-lg">Đề xuất cho bạn</span>
                                    {topViewProducts.slice(0, 3).map((product) => (
                                        <div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/productdetail/${product.iD_NK}`);
                                            }}
                                            className="flex items-center cursor-pointer hover:bg-gray-200/55 lg:leading-10 lg:gap-4"
                                            key={product.iD_NK}
                                        >
                                            <div className="flex items-center justify-center w-6 h-6 lg:ml-10 ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="size-5 text-red-300"
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
                                            </div>
                                            <span className="font-light text-nowrap overflow-hidden w-3/4 ">{product.Name}</span>
                                            <span className="ml-auto text-xs font-light text-gray-400 lg:mr-10">
                                                sản phẩm
                                            </span>
                                        </div>
                                    ))}
                                    {topSeller.slice(0, 3).map((seller) => (
                                        <div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/shoppage/${seller.iD_NK}`);
                                            }}
                                            className="flex items-center cursor-pointer hover:bg-gray-200/55 lg:leading-10 lg:gap-4"
                                            key={seller.iD_NK}
                                        >
                                            <div className="flex items-center justify-center w-6 h-6 lg:ml-10 ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="size-5 text-red-300"
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
                                            </div>
                                            <span className="font-light ">{seller.name}</span>
                                            <span className="ml-auto text-xs font-light text-gray-400 lg:mr-10">
                                                cửa hàng
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`${hideSuggestion ? 'block' : 'hidden'} ${isHideSuggestion ? 'block' : 'hidden'
                                    }`}
                                ref={divRef}
                            >
                                {suggestions.length > 0 && (
                                    <div className="w-full text-sm text-gray-900">
                                        {suggestions.map((suggestion) => (
                                            <form
                                                key={suggestion.iD_NK}
                                                onSubmit={(e) => handleSubmitSuggestion(e, suggestion.iD_NK)}
                                                className="flex items-center cursor-pointer hover:bg-gray-200/55 lg:leading-10 lg:gap-4"
                                            >
                                                <div className="w-[10px] lg:ml-4">
                                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300/80">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-4 h-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <button
                                                    className="w-11/12 overflow-hidden font-light text-left lg:pl-4 text-nowrap limit-text"
                                                    type="button"
                                                    onClick={(e) => handleSubmitSuggestion(e, suggestion.iD_NK)}
                                                >
                                                    {suggestion.name}
                                                </button>
                                            </form>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};
export default Search;
