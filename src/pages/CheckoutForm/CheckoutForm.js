import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import CreditCard from './creditCard';
import PaymentSuccess from './paymentsuccess';
import AddressManager from '../../components/Address';
import { createOrderApi, addOrderItemsApi } from '../../services/CheckoutApi/checkoutApi'
import { addressDefaultApi, AddressesApi } from '../../services/addressApi/addressApi'
import { deleteCartItem } from '../../services/CartApi/cartApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// format number
const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token')
    const { selectedItems } = location.state || { selectedItems: [] };
    const [selectedAddress, setSelectedAddress] = useState({});
    const [addresses, setAddresses] = useState([]);
    const subTotal = selectedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shippingFee = 0; // Assuming shipping is free
    const total = subTotal + shippingFee;
    // Tạo state để kiểm soát việc hiển thị của thẻ div
    const [isVisible, setIsVisible] = useState(false);



    const fetchAddresses = useCallback(async () => {
        try {
            const response = await AddressesApi(token);

            setAddresses(response);
            const defaultAddress = response.find((address) => address.user.shippingAddress === address.id);
            setSelectedAddress(defaultAddress);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchAddresses();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Tạo state kiểm xoát edit address đóng mở
    const [isAddressManagerOpen, setIsAddressManagerOpen] = useState(false);

    const handleOpenAddressManager = () => {
        setIsAddressManagerOpen(true);
        setIsVisible(!isVisible);
    };

    const handleCloseAddressManager = () => {
        setIsAddressManagerOpen(false);
    };

    const handleConfirmAddress = (address) => {
        setSelectedAddress(address);
        handleCloseAddressManager();
    };

    const inprocessing = undefined;
    const succes = undefined;

    const [formData, setFormData] = useState({});

    const [isFullFill, setIsFullFill] = useState(false);

    const handleCheckFullFill = (isFull) => {
        setIsFullFill(isFull);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const handleAddOrders = async (e) => {
        const sellerOrderMap = new Map();
        console.log('selectedItems: ', selectedItems);

        try {
            for (const item of selectedItems) {
                const sellerId = item.sellerId;
                console.log(`Processing item with sellerId: ${sellerId}`);

                if (sellerOrderMap.has(sellerId)) {
                    // Get the existing order ID
                    const orderId = sellerOrderMap.get(sellerId);
                    console.log(`Found existing orderId: ${orderId} for sellerId: ${sellerId}`);

                    // Add item to the existing order
                    const response = await addOrderItemsApi(orderId, item.product.iD_NK, item.productImgs,
                        item.optionValues ? item.optionValues.id : undefined, item.quantity, token);

                    console.log(`Added item to existing order: ${orderId}, response: `, response);
                } else {
                    // Create a new order for this seller
                    console.log(`Creating new order for sellerId: ${sellerId}`);
                    const order = await createOrderApi(selectedAddress.id, token);

                    if (order.status === 201) {
                        const orderId = order.data.id;
                        console.log(`Created new orderId: ${orderId} for sellerId: ${sellerId}`);

                        // Add the new order ID to the map
                        sellerOrderMap.set(sellerId, orderId);

                        // Add item to the new order
                        const orderItem = await addOrderItemsApi(orderId, item.product.iD_NK, item.productImgs,
                            item.optionValues ? item.optionValues.id : undefined, item.quantity, token);

                        console.log(`Added item to new order: ${orderId}, response: `, orderItem);
                    }
                }
            }

            //Uncomment below lines if you want to delete items from cart and navigate after placing orders
            for (const item of selectedItems) {
                await deleteCartItem(item.id, token);
            }

            toast.success('Đặt hàng thành công');
            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch (error) {
            console.error('Error processing orders:', error);
        }
    };
    return (
        <div className="relative bg-background lg:pt-36">
            <MaxWidthWrapper>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-3 px-12 space-y-8 lg:col-span-2 pb- bg-indigo-50 lg:pb-12">
                        <div
                            className={`relative flex flex-col p-4 mt-8 bg-white rounded-md border-red-600 border-1 shadow-md sm:flex-row sm:items-center ${!isFullFill ? 'visible' : 'invisible'
                                }`}
                        >
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
                                    <div className=" flex justify-between lg:pb-3">
                                        <h2 className="my-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">
                                            Giao hàng & thông tin hóa đơn{' '}
                                        </h2>
                                        <button
                                            onClick={handleOpenAddressManager}
                                            className="border-1 font-light text-sm text-primary border-primary lg:px-6 cursor-pointer"
                                        >
                                            {' '}
                                            Thay đổi
                                        </button>
                                    </div>
                                    <fieldset className="mb-3 text-gray-600 bg-white shadow-md">
                                        <label className="flex items-center py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">Tên</span>
                                            <div className="w-10/12 focus:outline-none">
                                                {selectedAddress.fullName}
                                            </div>
                                        </label>
                                        <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">Email</span>
                                            <div className="w-10/12 focus:outline-none">{selectedAddress.email}</div>
                                        </label>
                                        <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">Địa chỉ</span>
                                            <div className="w-10/12 focus:outline-none">{selectedAddress.address}</div>
                                        </label>
                                        <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                            <span className="w-2/12 text-right">Số điện thoại</span>
                                            <div className="w-10/12 focus:outline-none">{selectedAddress.phoneNumber}</div>
                                        </label>
                                    </fieldset>
                                </section>
                                <section className="h-auto rounded-lg lg:mt-14">
                                    <h2 className="my-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">
                                        Thông tin thanh toán
                                    </h2>
                                    <CreditCard onCheckFullFill={handleCheckFullFill} />
                                </section>
                                <div className="flex justify-end w-full">
                                    <button
                                        type="submit"
                                        className="flex px-4 py-3 text-xl font-semibold text-white transition-colors rounded-md bg-blue-600/85 w-max submit-button focus:ring focus:outline-none"
                                        onClick={handleAddOrders}
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
                                                <span className="pl-3">{total + 5000}</span>
                                            </>
                                        )}
                                    </button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="hidden col-span-1 bg-white shadow-md lg:mt-7 h-min lg:block">
                        <h1 className="px-8 py-6 text-xl text-gray-600 border-b-2">Tóm tắt đơn Hàng</h1>
                        <ul className="max-h-[550px] h-[550px] px-8 py-6 space-y-6 overflow-y-scroll border-b">
                            {selectedItems.map((item, index) => (
                                <OrderItem
                                    key={index}
                                    imgSrc={item.product.image}
                                    title={item.product.name}
                                    description={item?.optionValues?.name || ''}
                                    quantity={item.quantity}
                                    price={item.product.price}
                                />
                            ))}
                        </ul>
                        <div className="px-8 border-b">
                            <div className="flex justify-between py-4 text-gray-600">
                                <span>Tạm tính</span>
                                <span className="font-semibold text-blue-500">{subTotal}đ</span>
                            </div>
                            <div className="flex justify-between py-4 text-gray-600">
                                <span>Phí giao hàng</span>
                                <span className="font-semibold text-blue-500">5000</span>
                            </div>
                        </div>
                        <div className="flex justify-between px-8 py-8 text-xl font-semibold text-gray-600">
                            <span>Tổng </span>
                            <span>{total + 5000} đ</span>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>

            {isAddressManagerOpen && (
                <div className="absolute z-50 bg-gray-600/70 h-full  w-screen top-0 left-0">
                    <MaxWidthWrapper className={'flex justify-center items-center'}>
                        <AddressManager onCancel={handleCloseAddressManager} onConfirm={handleConfirmAddress} addresses={addresses} selectedAddressCheckout={selectedAddress} />
                    </MaxWidthWrapper>
                </div>
            )}
        </div>
    );
}

const OrderItem = ({ imgSrc, title, description, quantity, price }) => {
    const totalPrice = quantity * price;
    return (
        <li className="grid grid-cols-6 gap-2 border-b-1 items-start">
            <div className="self-center col-span-1">
                <img src={imgSrc} alt="Product" className="size-14 rounded" />
            </div>
            <div className="flex flex-col col-span-3 pt-2">
                <span className="text-gray-600 text-md text-nowrap overflow-x-clip font-semi-bold">{title}</span>
                <span className="inline-block pt-2 text-sm text-nowrap overflow-x-clip text-gray-400">{description}</span>
            </div>
            <div className="col-span-2 pt-3">
                <div className="flex items-center justify-between space-x-2 text-sm">
                    <span className="text-gray-400">
                        {quantity} x {formatNumber(price)}
                    </span>
                    <span className="inline-block font-semibold text-blue-400">
                        {formatNumber(totalPrice)}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default Checkout;
