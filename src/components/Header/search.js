import React, { useState, useEffect } from 'react';
const Search = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [classNameHidden, setClassNameHidden] = useState('hidden');

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > 800) {
            setClassNameHidden('');
        } else {
            setClassNameHidden('hidden');
        }

        setScrollPosition(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <form className={`w-full mx-auto  ${classNameHidden}`}>
            <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium sr-only ">
                    Your Email
                </label>
                <button
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="z-10 inline-flex items-center flex-shrink-0 px-4 py-2 text-sm font-medium text-center text-black bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
                    type="button"
                >
                    All categories{' '}
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
                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">
                                Mockups
                            </button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">
                                Templates
                            </button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">
                                Design
                            </button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">
                                Logos
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm te bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-primary focus:border-primary  "
                        placeholder="Search Mockups, Logos, Design Templates..."
                        required
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
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
};
export default Search;
