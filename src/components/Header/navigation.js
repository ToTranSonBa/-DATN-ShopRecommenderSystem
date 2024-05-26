import React, { useState, useEffect } from 'react';
import Logo from '../../assets/BrandLogos/Logo.png';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Search from './search';
import Vietnam from '../../assets/vn.png';

const navigation = [
    { name: 'Dashboard', href: '#', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navigation = ({ className_bg, className_textcolor }) => {
    const getUser = localStorage.getItem('token');
    ;
    return (
        <div className="inset-x-0 top-8 md:absolute md:z-10">
            <Disclosure as="nav" className={`max-w-full  ${className_bg}`}>
                {({ open }) => (
                    <MaxWidthWrapper>
                        <div className="max-w-full px-2 mx-auto sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16 lg:gap-8 ">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex items-center justify-center flex-1 lg:gap-12 sm:items-stretch sm:justify-start">
                                    <div className="flex items-center flex-shrink-0">
                                        <img className="w-auto h-5" src={Logo} alt="Your Company" />
                                        <span
                                            className={`px-1 font-semibold ${className_textcolor} text-md md:text-xl lg:text-xl`}
                                        >
                                            ShopLY
                                        </span>
                                    </div>
                                    <Search />
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* Profile dropdown */}
                                    {getUser ? (
                                        <Menu as="div" className="relative ml-3">
                                            <Menu.Button className="relative flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>

                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </Menu.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700',
                                                                )}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700',
                                                                )}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700',
                                                                )}
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    ) : (
                                        <>
                                            <div className="items-center justify-between hidden md:flex lg:gap-12">
                                                <div className="flex-row justify-between lg:gap-4">
                                                    <span className={`text-sm font-light ${className_textcolor}`}>
                                                        Deliver to:
                                                    </span>
                                                    <div className="flex items-center lg:gap-2">
                                                        <img className="object-cover lg:w-6 lg:h-4" src={Vietnam} />
                                                        <span className={`text-sm  ${className_textcolor}`}>VN</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between lg:gap-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className={`w-6 h-6 ${className_textcolor}`}
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                                        />
                                                    </svg>
                                                    <span className={`text-sm font-light ${className_textcolor}`}>
                                                        Vietnamese
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between lg:gap-1 ">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className={`w-6 h-6 ${className_textcolor}`}
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                        />
                                                    </svg>
                                                    <span className={`text-sm font-light ${className_textcolor}`}>
                                                        Login
                                                    </span>
                                                </div>
                                                <button
                                                    className={`text-sm font-normal rounded-full lg:py-3 lg:px-6 bg-primary hover:bg-primary/80 text-white `}
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-white text-primary'
                                                : 'text-primary hover:bg-gray-400 hover:text-secondary',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </MaxWidthWrapper>
                )}
            </Disclosure>
        </div>
    );
};

export default Navigation;
