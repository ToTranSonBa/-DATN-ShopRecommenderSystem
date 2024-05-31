import React, { useState, useEffect } from 'react';
// API
import { fetchCategories } from '../../services/HomeApi/home';
const recentSearch = [
    { searchkey: 'điện thoại' },
    { searchkey: 'quần áo' },
    { searchkey: 'trang trí' },
    { searchkey: 'sách vở' },
];

const searchPlaceholders = [
    {
        title: 'iphone',
    },
    {
        title: 'điện thoại',
    },
    {
        title: 'quần áo',
    },
];

const Search = () => {
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [classNameHidden, setClassNameHidden] = useState('hidden');
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [isFocused, setIsFocused] = useState(false);
    const [isChooseCategory, setIsChooseCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    //
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchCategories();
                const categoriesData = response.data;
                setCategories(categoriesData);
            } catch (error) {
                setError('Failed to fetch categories');
                console.error('Failed to fetch categories:', error);
            }
        };

        getCategories();
    }, []);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setIsChooseCategory(false); // Đóng dropdown sau khi chọn
    };

    const handleToggleChooseCategory = () => {
        setIsChooseCategory((prevState) => !prevState);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > 800) {
            setClassNameHidden('');
        } else {
            if (currentPage !== '/') {
                setClassNameHidden('');
            } else {
                setClassNameHidden('hidden');
            }
        }

        setScrollPosition(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setCurrentPage(window.location.pathname);
        if (window.location.pathname !== '/') {
            setClassNameHidden('');
        }
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % searchPlaceholders.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const currentPlaceholder = searchPlaceholders[currentPlaceholderIndex];
    return (
        <form className={`w-full max-w-screen-lg  ${classNameHidden}`}>
            {error && <div className="error">{error}</div>}
            <div className="flex">
                <button
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
                </button>
                {isChooseCategory && (
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
                )}

                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm te bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-primary focus:border-primary  "
                        placeholder={searchPlaceholders[currentPlaceholderIndex].title}
                        required
                        onFocus={handleFocus}
                        onBlur={handleBlur}
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
                        className={` ${
                            isFocused ? 'block' : 'hidden'
                        } absolute left-0 z-50  w-full h-auto bg-white border-gray-300 rounded-lg top-14 lg:py-2 shadow-lg`}
                    >
                        <div class=" w-full text-sm text-gray-900 ">
                            <span className="font-semibold lg:ml-10 lg:text-lg">Tìm kiếm gần đây</span>
                            {recentSearch.map((search, index) => (
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
                                    <span className="font-light ">{search.searchkey}</span>
                                </div>
                            ))}
                        </div>
                        <div class=" w-full  text-sm text-gray-900  ">
                            <span className="font-semibold lg:ml-10 lg:text-lg">Đề xuất cho bạn</span>
                            {recentSearch.map((search, index) => (
                                <div
                                    className="flex items-center hover:bg-gray-200/55 lg:leading-10 lg:gap-4"
                                    key={index}
                                >
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full lg:ml-10 bg-gray-300/80">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-light ">{search.searchkey}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default Search;
