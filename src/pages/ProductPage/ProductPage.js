import React, { useState } from 'react'
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

import renderStars from './RenderStars';


const ProductPage = () => {
    const product = {
        name: 'Zip Tote Basket',
        price: '$140',
        rating: 4,
        images: [
            {
                id: 1,
                name: 'Angled view',
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
                alt: 'Angled front view with bag zipped and handles upright.',
            }, {
                id: 2,
                name: 'Angled view',
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
                alt: 'Angled front view with bag zipped and handles upright.',
            }, {
                id: 3,
                name: 'Angled view',
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
                alt: 'Angled front view with bag zipped and handles upright.',
            }, {
                id: 4,
                name: 'Angled view',
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
                alt: 'Angled front view with bag zipped and handles upright.',
            },
            {
                id: 5,
                name: 'Angled view',
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
                alt: 'Angled front view with bag zipped and handles upright.',
            },
            // More images...
        ],
        colors: [
            { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
            { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
            { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
        ],
        description: `
          <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
        `,
        details: [
            {
                name: 'Features',
                items: [
                    'Multiple strap configurations',
                    'Spacious interior with top zip',
                    'Leather handle and tabs',
                    'Interior dividers',
                    'Stainless strap loops',
                    'Double stitched construction',
                    'Water-resistant',
                ],
            },
            // More sections...
        ],
    };
    const [quantity, setQuantity] = useState(1);
    const pricePerItem = 12;
    const ratingStar = 4.7;


    const handleDecrement = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
        } else {
            setQuantity(value);
        }
    };

    const totalPrice = pricePerItem * quantity;

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    return (
        <div class="lg:pt-36 font-sans bg-background grid justify-center pt-20">
            <div class="p-6 lg:max-w-5xl max-w-2xl max-lg:mx-auto  bg-white " >
                <div class="grid items-start grid-cols-1 lg:grid-cols-9 gap-12">
                    <div class="lg:col-span-4">
                        <div className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
                                <div className="grid grid-cols-4 gap-6">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            className="relative flex items-center justify-center h-16 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                            onClick={() => setSelectedImageIndex(index)}
                                        >
                                            <span className="sr-only">{image.name}</span>
                                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                                <img src={image.src} alt={image.alt} className="object-cover object-center w-full h-full" />
                                            </span>
                                            <span
                                                className={classNames(
                                                    selectedImageIndex === index ? 'ring-indigo-500' : 'ring-transparent',
                                                    'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Display selected image */}
                            <div className="w-full aspect-w-1 aspect-h-1">
                                <img
                                    src={product.images[selectedImageIndex].src}
                                    alt={product.images[selectedImageIndex].alt}
                                    className="object-cover object-center w-full h-full sm:rounded-lg"
                                />
                            </div>
                        </div>
                    </div>


                    <div class="lg:col-span-5">
                        <h2 class="text-3xl font-semibold text-gray-700">Espresso Elegante | Coffee</h2>
                        <div class="flex flex-wrap gap-4 mt-4">
                            <p class="text-gray-700 text-4xl font-semibold">$12</p>
                            <p class="text-gray-400 text-xl"><strike>$16</strike> <span class="text-sm ml-1">Tax included</span></p>
                        </div>

                        <div className="flex items-center mt-4 space-x-2">
                            {renderStars(ratingStar)}
                            <h4 className="text-base text-gray-700">1000 đánh giá</h4>
                            <h4 className="text-base text-gray-700">1234 đã mua</h4>
                        </div>


                        <form className="flex items-center max-w-full gap-5 mt-8">
                            <label htmlFor="quantity-input" className="block mr-2 text-xs font-medium text-gray-500 dark:text-white">Số Lượng:</label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" onClick={handleDecrement} className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input" value={quantity} onChange={handleChange} className="bg-gray-50 border-x-0 border-gray-300 h-9 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-1/3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <button type="button" onClick={handleIncrement} className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            <label htmlFor="quantity-input" className="block mr-2 text-xs font-medium text-gray-500 dark:text-white">1245 sản phẩm có sẵn</label>
                        </form>

                        <div className="max-w-full mt-8">
                            <h3 className="text-xs font-medium text-gray-600">Color</h3>

                            <div className="flex items-center mt-2 space-x-3">
                                {product.colors.map((color) => (
                                    <div
                                        key={color.name}
                                        onClick={() => setSelectedColor(color)}
                                        className={classNames(
                                            color.selectedColor,
                                            selectedColor.name === color.name ? 'ring-2' : '',
                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                        )}
                                    >
                                        <p className="sr-only">{color.name}</p>
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                color.bgColor,
                                                'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-8">
                            <p className="text-2xl font-semibold text-gray-700">Tạm Tính: </p>
                            <p className="text-4xl font-semibold text-gray-700">${totalPrice}</p>
                        </div>


                        <div class="flex flex-wrap w-full justify-between mt-8">
                            <button type="button" class="sm:min-w-[210px] min-w-[180px] px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded shadow-md">Mua ngay</button>
                            <button type="button" class="sm:min-w-[210px] min-w-[100px] px-4 py-2.5 border  bg-transparent text-blue-700 text-sm font-semibold rounded shadow-md">Thêm vào giỏ hàng</button>
                        </div>

                    </div>
                </div>
            </div>

            <div class="p-6 mt-8 grid items-start grid-cols-1 lg:grid-cols-7 gap-8  bg-white">
                <div class="lg:col-span-3 ">
                    <div class="flex items-start w-full gap-4">
                        <img src="https://readymadeui.com/team-2.webp" class=" lg:w-20 lg:h-20 w-12 h-12 rounded-full border-2 border-white" />

                        <div class="lg:h-20 h-12 ml-3 grid items-center ">
                            <h4 class="text-sm font-semibold w-48 text-gray-700">Bag shop</h4>
                            <div class="flex space-x-1 mt-1">
                                <p class="text-sm !ml-2 font-semibold text-gray-400">4.7 </p>
                                <svg class="w-4 fill-yellow-300" viewBox="0 0 14 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>

                            </div>

                        </div>
                    </div>
                </div>

                <div className='items-center hidden h-20 lg:grid lg:col-span-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm !ml-2 font-semibold text-gray-400'>Đánh giá</p>
                        <p className='text-sm !ml-2 font-semibold text-blue-700'>123432</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sm !ml-2 font-semibold text-gray-400'>sản phẩm</p>
                        <p className='text-sm !ml-2 font-semibold text-blue-700'>444</p>
                    </div>
                </div>
                <div className='items-center hidden h-20 lg:grid lg:col-span-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm !ml-2 font-semibold text-gray-400'>Người theo dõi</p>
                        <p className='text-sm !ml-2 font-semibold text-blue-700'>123432</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sm !ml-2 font-semibold text-gray-400'>Tham gia</p>
                        <p className='text-sm !ml-2 font-semibold text-blue-700'>chưa có dữ liệu</p>
                    </div>
                </div>

            </div>

            <div class="p-6 mt-8 bg-white">
                <h3 class="text-lg font-semibold text-gray-700">About the coffee</h3>
                <ul class="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-700">
                    <li>A cup of coffee is a beverage essential because of its timeless appeal</li>
                    <li>Easy to prepare. It can be brewed using various methods, from drip machines to manual pour-overs.</li>
                    <li>Available in various sizes, from a standard espresso shot to a large Americano, catering to different preferences.</li>
                    <li>You can customize your coffee by adding cream, sugar, or flavorings to suit your taste preferences.</li>
                </ul>
            </div>

            <div class="p-6 mt-8 bg-white">
                <div>
                    <h3 class="text-lg font-semibold text-gray-700">Reviews(10)</h3>

                    <div class=" space-y-3 mt-4 w-full sm:w-2/4 ">
                        <div class="flex items-center">
                            <p class="text-sm text-gray-700 font-semibold">5.0</p>
                            <svg class="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-2/3 h-full rounded bg-yellow-300"></div>
                            </div>
                            <p class="text-sm text-gray-700 font-semibold ml-3">66%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-700 font-semibold">4.0</p>
                            <svg class="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-1/3 h-full rounded bg-yellow-300"></div>
                            </div>
                            <p class="text-sm text-gray-700 font-semibold ml-3">33%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-700 font-semibold">3.0</p>
                            <svg class="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-1/6 h-full rounded bg-yellow-300"></div>
                            </div>
                            <p class="text-sm text-gray-700 font-semibold ml-3">16%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-700 font-semibold">2.0</p>
                            <svg class="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-1/12 h-full rounded bg-yellow-300"></div>
                            </div>
                            <p class="text-sm text-gray-700 font-semibold ml-3">8%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-700 font-semibold">1.0</p>
                            <svg class="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-[6%] h-full rounded bg-yellow-300"></div>
                            </div>
                            <p class="text-sm text-gray-700 font-semibold ml-3">6%</p>
                        </div>
                    </div>
                </div>

                <div class="flex items-start mt-8">
                    <img src="https://readymadeui.com/team-2.webp" class="w-12 h-12 rounded-full border-2 border-white" />

                    <div class="ml-3">
                        <h4 class="text-sm font-semibold text-gray-700">John Doe</h4>
                        <div class="flex space-x-1 mt-1">
                            <svg class="w-4 fill-yellow-300" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg class="w-4 fill-yellow-300" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg class="w-4 fill-yellow-300" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg class="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg class="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <p class="text-xs !ml-2 font-semibold text-gray-700">2 mins ago</p>
                        </div>
                        <p class="text-xs mt-4 text-gray-700">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                    </div>
                </div>
                <button type="button" class="w-full mb-6 mt-8 px-4 py-2.5 bg-transparent border border-blue-700 text-blue-700 font-semibold rounded">Read all reviews</button>

            </div>
        </div >
    )
}

export default ProductPage;