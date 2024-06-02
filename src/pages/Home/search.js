import React, { useContext, useState } from 'react';
import HomeBG from '../../assets/HomeImg/home.jpg';
import MaxWidthWrapper from '../../components/MaxWidthWrapper/index';
import { SearchContext } from '../../components/searchContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const { setSearchQuery } = useContext(SearchContext);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSearchQuery(inputValue);
        navigate('/productpage');
    }

    return (
        <div className="relative w-full">
            <img
                className="hidden w-full h-full border-transparent bl md:block md:max-lg:object-cover md:max-lg:min-h-3/4 md:max-lg:h-imgBG"
                src={HomeBG}
                alt="This is home background"
            />
            <MaxWidthWrapper>
                <div className="absolute flex-row items-start w-3/6 h-1/2 start-20 top-1/3 z-2 lg:left-44 md:left-8">
                    <span className="font-bold text-white uppercase md:text-2xl lg:text-3xl">
                        The leading B2B e-commerce platform for global trade
                    </span>
                    <form class="w-full mx-auto md:my-8 lg:my-12" onSubmit={handleSubmit}>
                        <label
                            for="default-search"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div class="relative">
                            <input
                                type="search"
                                id="default-search"
                                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary/50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Mockups, HomeBGs..."
                                required
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                class="text-white flex gap-2 items-center absolute end-2.5 bottom-1 bg-primary hover:bg-primary/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
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
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                                <span>Search</span>
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-between ">
                        <span className="text-white basis-1/4">Frequently searched: </span>
                        <div className="flex basis-3/4">
                            <button className="py-2 font-normal text-white truncate bg-transparent border border-white text-nowrap max-w-1/3 lg:px-2 lg:text-xs rounded-3xl hover:bg-primary/50 hover:text-white hover:border-transparent">
                                Iphone 12 promax
                            </button>
                            <button className="py-2 font-normal text-white truncate bg-transparent border border-white text-nowrap max-w-1/3 lg:px-2 lg:text-xs md:mx-3 lg:mx-5 rounded-3xl hover:bg-primary/50 hover:text-white hover:border-transparent">
                                Iphone
                            </button>
                            <button className="py-2 font-normal text-white truncate bg-transparent border border-white text-nowrap max-w-1/3 lg:px-2 lg:text-xs rounded-3xl hover:bg-primary/50 hover:text-white hover:border-transparent">
                                Máy tính bảng
                            </button>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default Search;
