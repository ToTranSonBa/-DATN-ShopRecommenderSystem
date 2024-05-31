import React, { useState } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import CreditCard from './creditCard';
import PaymentSuccess from './paymentsuccess';
function Checkout() {
    const inprocessing = undefined;
    const succes = undefined;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'US',
        card: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <div className="bg-background lg:pt-36">
            <MaxWidthWrapper>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-3 px-12 space-y-8 lg:col-span-2 pb- bg-indigo-50 lg:pb-12">
                        <div className="relative flex flex-col p-4 mt-8 bg-white rounded-md shadow-md sm:flex-row sm:items-center">
                            <div className="flex flex-row items-center w-full pb-4 border-b sm:border-b-0 sm:w-auto sm:pb-0">
                                <div className="text-yellow-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 sm:w-5 sm:h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3 text-sm font-medium">Thanh toán</div>
                            </div>
                            <div className="mt-4 text-sm tracking-wide text-gray-500 sm:mt-0 sm:ml-4">
                                Hoàn thành chi tiết giao hàng và thanh toán của bạn bên dưới.
                            </div>
                            <div className="absolute ml-auto text-gray-400 cursor-pointer sm:relative sm:top-auto sm:right-auto right-4 top-4 hover:text-gray-800">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <form
                                className="flex-row"
                                id="payment-form"
                                method="POST"
                                action=""
                                onSubmit={handleSubmit}
                            >
                                <section>
                                    <h2 className="my-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">
                                        Giao hàng & thông tin hóa đơn{' '}
                                    </h2>
                                    <fieldset className="mb-3 text-gray-600 bg-white shadow-md">
                                        <label className="flex items-center py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">Tên</span>
                                            <input
                                                name="name"
                                                className="w-10/12 focus:outline-none"
                                                placeholder="Nguyễn Văn A"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">Email</span>
                                            <input
                                                name="email"
                                                type="email"
                                                className="w-10/12 border-none focus:outline-none"
                                                placeholder="nguyenvana@gmail.com"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">Địa chỉ</span>
                                            <input
                                                name="address"
                                                className="w-10/12 focus:outline-none"
                                                placeholder="Quan 10 duong Vo Van Ngan"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">City</span>
                                            <input
                                                name="city"
                                                className="w-10/12 focus:outline-none"
                                                placeholder="San Francisco"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label className="relative flex items-center h-12 py-3 border-t border-gray-200 lg:gap-12 select">
                                            <span className="w-2/12 text-right">Country</span>
                                            <div id="country" className="flex items-center w-10/12 focus:outline-none">
                                                <select
                                                    name="coutry"
                                                    className="flex-1 bg-transparent border-none appearance-none cursor-pointer focus:outline-none"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                >
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
                                <section className="h-auto rounded-lg lg:mt-14">
                                    <h2 className="my-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">
                                        Thông tin thanh toán
                                    </h2>
                                    <CreditCard />
                                </section>
                                <div className="flex justify-end w-full">
                                    <button
                                        type="submit"
                                        className="flex px-4 py-3 text-xl font-semibold text-white transition-colors rounded-md bg-blue-600/85 w-max submit-button focus:ring focus:outline-none"
                                    >
                                        {inprocessing ? (
                                            <>
                                                <div className="flex items-center justify-center m-[10px]">
                                                    <div className="w-5 h-5 border-4 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
                                                    <div className="ml-2">Đang xử lí...</div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <span>Thanh toán</span>
                                                <span className="pl-3">€846.98</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="hidden col-span-1 bg-white shadow-md lg:mt-7 h-min lg:block">
                        <h1 className="px-8 py-6 text-xl text-gray-600 border-b-2">Tóm tắt đơn Hàng</h1>
                        <ul className="max-h-[550px] h-[550px] px-8 py-6 space-y-6 overflow-y-scroll border-b">
                            <OrderItem
                                imgSrc="https://bit.ly/3oW8yej"
                                title="Studio 2 Headphone"
                                description="Red Headphone"
                                quantity={2}
                                price={30.99}
                            />
                            <OrderItem
                                imgSrc="https://bit.ly/3oW8yej"
                                title="Studio 2 Headphone"
                                description="Red Headphone"
                                quantity={2}
                                price={30.99}
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
                        <div className="flex justify-between px-8 py-8 text-xl font-semibold text-gray-600">
                            <span>Tổng </span>
                            <span>€846.98</span>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}

const OrderItem = ({ imgSrc, title, description, quantity, price }) => (
    <li className="grid grid-cols-6 gap-2 border-b-1">
        <div className="self-center col-span-1">
            <img src={imgSrc} alt="Product" className="w-full rounded" />
        </div>
        <div className="flex flex-col col-span-3 pt-2">
            <span className="text-gray-600 text-md font-semi-bold">{title}</span>
            <span className="inline-block pt-2 text-sm text-gray-400">{description}</span>
        </div>
        <div className="col-span-2 pt-3">
            <div className="flex items-center justify-between space-x-2 text-sm">
                <span className="text-gray-400">
                    {quantity} x €{price}
                </span>
                <span className="inline-block font-semibold text-pink-400">€{(quantity * price).toFixed(2)}</span>
            </div>
        </div>
    </li>
);

export default Checkout;
