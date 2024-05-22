import React, { useState } from 'react';


const UserPage = () => {
    const [firstName, setFirstName] = useState('Jane');
    const [lastName, setLastName] = useState('Ferguson');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [bio, setBio] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        // Add your save logic here
        console.log({ firstName, lastName, email, profession, bio });
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    return (
        <div className="bg-background w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100">
                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                    <a >
                        <button
                            type="button"
                            className="flex w-full items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
                            aria-controls="dropdown-example"
                            onClick={toggleDropdown}
                        >

                            <span className="flex-1 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                            <svg className="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        <ul
                            id="dropdown-example"
                            className={`space-y-2 ${isOpen ? 'block' : 'hidden'
                                }`}
                        >
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handleOptionClick('Products')}
                                >
                                    Products
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center w-full p-2 text-gray-900  duration-75 rounded-lg pl-11 hover:bg-gray-100 "
                                    onClick={() => handleOptionClick('Billing')}

                                >
                                    Billing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handleOptionClick('Invoice')}
                                >
                                    Invoice
                                </a>
                            </li>
                        </ul>
                    </a>
                    <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full" onClick={() => handleOptionClick('Account Settings')}>
                        Account Settings
                    </a>
                    <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full" onClick={() => handleOptionClick('Notifications')}>
                        Notifications
                    </a>
                    <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full" onClick={() => handleOptionClick('PRO Account')}>
                        PRO Account
                    </a>
                </div>
            </aside>

            {selectedOption && (
                <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 bg-white">
                    <div className="grid justify-center p-2 md:p-4">
                        {selectedOption === 'Products' && (
                            <div className=" w-full px-6 pb-8 mt-4 sm:max-w-xl sm:rounded-lg">
                                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
                                <form className="grid max-w-2xl mx-auto mt-8" onSubmit={handleSave}>
                                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                        <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                            alt="Bordered avatar" />
                                        <div className="flex flex-col space-y-5 sm:ml-8">
                                            <button type="button"
                                                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-700 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                                Change picture
                                            </button>
                                        </div>
                                    </div>

                                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                            <div className="w-full">
                                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your first name</label>
                                                <input type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                    placeholder="Your first name" required />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your last name</label>
                                                <input type="text" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                    placeholder="Your last name" required />
                                            </div>
                                        </div>
                                        <div className="mb-2 sm:mb-6">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your email</label>
                                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="your.email@mail.com" required />
                                        </div>
                                        <div className="mb-2 sm:mb-6">
                                            <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Profession</label>
                                            <input type="text" id="profession" value={profession} onChange={(e) => setProfession(e.target.value)}
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="your profession" required />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                                            <textarea id="message" rows="4" value={bio} onChange={(e) => setBio(e.target.value)}
                                                className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                                placeholder="Write your bio here..."></textarea>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit"
                                                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {selectedOption === 'Account Settings' && (
                            <div className=''>
                            </div>
                        )}

                    </div>
                </main>
            )}



        </div>
    );
};

export default UserPage;
