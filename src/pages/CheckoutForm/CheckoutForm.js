import React, { useState } from 'react';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'US',
        card: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <div className=" bg-background pt-36 pb-12  grid grid-cols-3">
            <div className="lg:col-span-2 pb- col-span-3 bg-indigo-50 space-y-8 px-12">
                <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                    <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div className="text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-sm font-medium ml-3">Thanh toán</div>
                    </div>
                    <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
                        Hoàn thành chi tiết giao hàng và thanh toán của bạn bên dưới.
                    </div>
                    <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
                <div className="rounded-md">
                    <form id="payment-form" method="POST" action="" onSubmit={handleSubmit}>
                        <section>
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Giao hàng & thông tin hóa đơn </h2>
                            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Tên</span>
                                    <input name="name" className="focus:outline-none px-3" placeholder="Nguyễn Văn A" required value={formData.name} onChange={handleChange} />
                                </label>
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Email</span>
                                    <input name="email" type="email" className="focus:outline-none px-3" placeholder="nguyenvana@gmail.com" required value={formData.email} onChange={handleChange} />
                                </label>
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Địa chỉ</span>
                                    <input name="address" className="focus:outline-none px-3" placeholder="Quan 10 duong Vo Van Ngan" value={formData.address} onChange={handleChange} />
                                </label>
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">City</span>
                                    <input name="city" className="focus:outline-none px-3" placeholder="San Francisco" value={formData.city} onChange={handleChange} />
                                </label>
                                <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                                    <span className="text-right px-2">Country</span>
                                    <div id="country" className="focus:outline-none px-3 w-full flex items-center">
                                        <select name="country" className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none" value={formData.country} onChange={handleChange}>
                                            <option value="AU">Australia</option>
                                            <option value="BE">Belgium</option>
                                            <option value="BR">Brazil</option>
                                            <option value="CA">Canada</option>
                                            <option value="CN">China</option>
                                            <option value="DK">Denmark</option>
                                            <option value="FI">Finland</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                            <option value="HK">Hong Kong</option>
                                            <option value="IE">Ireland</option>
                                            <option value="IT">Italy</option>
                                            <option value="JP">Japan</option>
                                            <option value="LU">Luxembourg</option>
                                            <option value="MX">Mexico</option>
                                            <option value="NL">Netherlands</option>
                                            <option value="PL">Poland</option>
                                            <option value="PT">Portugal</option>
                                            <option value="SG">Singapore</option>
                                            <option value="ES">Spain</option>
                                            <option value="TN">Tunisia</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="US">United States</option>
                                            <option value="VN">Việt Nam</option>
                                        </select>
                                    </div>
                                </label>
                            </fieldset>
                        </section>
                        <section>
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Thông tin thanh toán</h2>
                            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">STK</span>
                                    <input name="card" className="focus:outline-none px-3 w-full" placeholder="STK MM/YY CVC" required value={formData.card} onChange={handleChange} />
                                </label>
                            </fieldset>
                        </section>
                        <button type="submit" className="submit-button px-4 py-3 rounded-full bg-blue-700 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                            Trả €846.98
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-span-1 bg-white lg:block hidden">
                <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Tóm tắt đơn Hàng</h1>
                <ul className="py-6 border-b space-y-6 px-8">
                    <OrderItem
                        imgSrc="https://bit.ly/3oW8yej"
                        title="Studio 2 Headphone"
                        description="Red Headphone"
                        quantity={2}
                        price={30.99}
                    />
                    <OrderItem
                        imgSrc="https://bit.ly/3lCyoSx"
                        title="Apple iPhone 13"
                        description="Phone"
                        quantity={1}
                        price={785}
                    />
                </ul>
                <div className="px-8 border-b">
                    <div className="flex justify-between py-4 text-gray-600">
                        <span>Tạm tính</span>
                        <span className="font-semibold text-pink-500">€846.98</span>
                    </div>
                    <div className="flex justify-between py-4 text-gray-600">
                        <span>Phí giao hàng</span>
                        <span className="font-semibold text-pink-500">Free</span>
                    </div>
                </div>
                <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                    <span>Tổng </span>
                    <span>€846.98</span>
                </div>
            </div>
        </div>
    );
};

const OrderItem = ({ imgSrc, title, description, quantity, price }) => (
    <li className="grid grid-cols-6 gap-2 border-b-1">
        <div className="col-span-1 self-center">
            <img src={imgSrc} alt="Product" className="rounded w-full" />
        </div>
        <div className="flex flex-col col-span-3 pt-2">
            <span className="text-gray-600 text-md font-semi-bold">{title}</span>
            <span className="text-gray-400 text-sm inline-block pt-2">{description}</span>
        </div>
        <div className="col-span-2 pt-3">
            <div className="flex items-center space-x-2 text-sm justify-between">
                <span className="text-gray-400">{quantity} x €{price}</span>
                <span className="text-pink-400 font-semibold inline-block">€{(quantity * price).toFixed(2)}</span>
            </div>
        </div>
    </li>
);

export default Checkout;
