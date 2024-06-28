import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import CreditCard from './creditCard';
import PaymentSuccess from './paymentsuccess';
import AddressManager from '../../components/Address';
import { createOrderApi, addOrderItemsApi } from '../../services/CheckoutApi/checkoutApi';
import { addressDefaultApi, AddressesApi } from '../../services/addressApi/addressApi';
import { deleteCartItem } from '../../services/CartApi/cartApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// format number
const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const vouchers = [
    {
        id: 1,
        type: 1,
        discount: '30000',
        minOrder: '0',
    },
    {
        id: 2,
        type: 1,
        discount: '30000',
        minOrder: '50000',
    },
    {
        id: 3,
        type: 2,
        discount: '30000',
        minOrder: '100000',
    },
    {
        id: 4,
        type: 2,
        discount: '50000',
        minOrder: '200000',
    },
];

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [shippingFee, setShippingFee] = useState(location.state?.shippingFee || 0);
    const [shippingMethod, setShippingMethod] = useState(
        location.state?.shippingMethod || 'Chọn phương thức vận chuyển',
    );
    const { selectedItems = [] } = location.state || {};

    console.log('Shipping FEE, ', shippingFee);
    console.log('Shipping Method, ', shippingMethod);

    const [selectedAddress, setSelectedAddress] = useState({});
    const [addresses, setAddresses] = useState([]);

    const subTotal = selectedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const total = subTotal;
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
                console.log(`Processing item : `, item);
                if (sellerOrderMap.has(sellerId)) {
                    // Get the existing order ID
                    const orderId = sellerOrderMap.get(sellerId);
                    console.log(`Found existing orderId: ${orderId} for sellerId: ${sellerId}`);

                    // Add item to the existing order
                    const response = await addOrderItemsApi(
                        orderId,
                        item.product.iD_NK,
                        item.productImgs,
                        item.optionValues ? item.optionValues.id : undefined,
                        item.quantity,
                        token,
                    );

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
                        const orderItem = await addOrderItemsApi(
                            orderId,
                            item.product.iD_NK,
                            item.productImgs,
                            item.optionValues ? item.optionValues.id : undefined,
                            item.quantity,
                            token,
                        );

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

    //
    const [chooseVoucher, setChooseVoucher] = useState(false);

    const [voucher, setVoucher] = useState('Chọn phiếu giảm giá');
    const [voucherFee, setVoucherFee] = useState(15000);
    const [selectedOptionVoucher, setSelectedOptionVoucher] = useState(null);
    const handleOptionClickVoucher = (fee, voucher) => {
        setSelectedOptionVoucher(voucher);
        setVoucherFee(fee);
        setVoucher(voucher);
    };
    //

    const [selectedShippingVoucher, setSelectedShippingVoucher] = useState(null);
    const [selectedDiscountVoucher, setSelectedDiscountVoucher] = useState(null);

    const handleSelectVoucher = (voucher) => {
        if (voucher.type === 1) {
            // Selecting a shipping voucher
            if (selectedShippingVoucher && selectedShippingVoucher.id === voucher.id) {
                setSelectedShippingVoucher(null); // Unselect if already selected
            } else {
                setSelectedShippingVoucher(voucher); // Select the voucher
            }
        } else if (voucher.type === 2) {
            // Selecting a discount voucher
            if (selectedDiscountVoucher && selectedDiscountVoucher.id === voucher.id) {
                setSelectedDiscountVoucher(null); // Unselect if already selected
            } else {
                setSelectedDiscountVoucher(voucher); // Select the voucher
            }
        }
    };

    const handleConfirm = () => {
        console.log('Selected Shipping Voucher:', selectedShippingVoucher);
        console.log('Selected Discount Voucher:', selectedDiscountVoucher);
        // Handle further logic here, like applying discounts
        setChooseVoucher(false);
    };
    //
    const [chooseShippingMethod, setChooseShippingMethod] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionClickMeThod = (fee, method) => {
        setSelectedOption(method);
        setShippingFee(fee);
        setShippingMethod(method);
    };
    return (
        <>
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
                                        <div className="flex justify-between lg:pb-3">
                                            <h2 className="my-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">
                                                Giao hàng & thông tin hóa đơn{' '}
                                            </h2>
                                            <button
                                                onClick={handleOpenAddressManager}
                                                className="text-sm font-light cursor-pointer border-1 text-primary border-primary lg:px-6"
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
                                                <div className="w-10/12 focus:outline-none">
                                                    {selectedAddress.email}
                                                </div>
                                            </label>
                                            <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                                <span className="w-2/12 text-right">Địa chỉ</span>
                                                <div className="w-10/12 focus:outline-none">
                                                    {selectedAddress.address}
                                                </div>
                                            </label>
                                            <label className="flex items-center h-12 py-3 border-b border-gray-200 lg:gap-12">
                                                <span className="w-2/12 text-right">Số điện thoại</span>
                                                <div className="w-10/12 focus:outline-none">
                                                    {selectedAddress.phoneNumber}
                                                </div>
                                            </label>
                                        </fieldset>
                                    </section>
                                    <section className="h-auto rounded-lg lg:mt-14">
                                        <h2 className="my-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">
                                            Thông tin thanh toán
                                        </h2>
                                        <CreditCard onCheckFullFill={handleCheckFullFill} />
                                    </section>
                                    <div className={` ${isFullFill ? 'flex' : 'hidden'} flex justify-end w-full`}>
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
                                                    {/* <span className="pl-3">{total + 5000}</span> */}
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
                            <ul className="max-h-[550px] h-[550px] px-4 py-4 overflow-y-scroll border-b">
                                {selectedItems.map((item, index) => (
                                    <OrderItem
                                        key={index}
                                        imgSrc={item.productImgs}
                                        title={item.product.name}
                                        description={item?.optionValues?.name || ''}
                                        quantity={item.quantity}
                                        price={item.product.price}
                                    />
                                ))}
                            </ul>
                            <div className="w-full border-b">
                                <div className="flex justify-between w-full px-4 py-2 text-gray-600 border-dashed min-h-10 border-y-1">
                                    <span>Tạm tính</span>
                                    <span className="font-semibold text-blue-500">{formatNumber(subTotal)}</span>
                                </div>
                                <div className="flex justify-between w-full px-4 py-2 text-gray-600 border-dashed min-h-10 border-y-1">
                                    <div
                                        onClick={() => {
                                            setChooseShippingMethod(true);
                                        }}
                                    >
                                        <span>Phí vận chuyển</span>
                                        <div className="flex items-center justify-center text-xs lg:mt-2 lg:gap-2 bg-slate-50/65 border-1 lg:px-2 lg:py-1">
                                            {shippingMethod}
                                        </div>
                                    </div>
                                    {shippingFee !== 0 && <span className="font-semibold text-blue-500">+ {formatNumber(shippingFee)}</span>}
                                </div>
                                <div className="flex-row w-full px-4 py-2 text-gray-600 border-dashed min-h-10 border-y-1">
                                    <div className="flex items-center justify-between">
                                        <span>Phiếu giảm giá</span>
                                        <div
                                            onClick={() => {
                                                setChooseVoucher(true);
                                            }}
                                            className="flex items-center justify-center text-xs lg:mt-2 hover:cursor-pointer hover:border-primary hover:text-primary lg:gap-2 bg-slate-50/65 border-1 lg:px-2 lg:py-1"
                                        >
                                            Chọn phiếu giảm giá
                                        </div>
                                    </div>
                                    <div className="mt-4 lg:pl-6">
                                        {selectedShippingVoucher ? (
                                            <div className="flex justify-between text-sm text-gray-600 min-h-10">
                                                <span>Giảm phí vận chuyển</span>
                                                <span className="font-semibold text-blue-500">
                                                    - {formatNumber(selectedShippingVoucher.discount)}
                                                </span>
                                            </div>
                                        ) : (
                                            ' '
                                        )}

                                        {selectedDiscountVoucher ? (
                                            <div className="flex justify-between text-sm text-gray-600 min-h-10">
                                                <span>Giảm giá</span>
                                                <span className="font-semibold text-blue-500">
                                                    - {formatNumber(selectedDiscountVoucher.discount)}
                                                </span>
                                            </div>
                                        ) : (
                                            ' '
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between px-4 py-8 text-xl font-semibold text-gray-600">
                                <span>Thành tiền </span>
                                <span>
                                    {formatNumber(
                                        total +
                                        shippingFee -
                                        (selectedShippingVoucher ? selectedShippingVoucher.discount : 0) -
                                        (selectedDiscountVoucher ? selectedDiscountVoucher.discount : 0),
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>

                {isAddressManagerOpen && (
                    <div className="absolute top-0 left-0 z-50 w-screen h-full bg-gray-600/70">
                        <MaxWidthWrapper className={'flex justify-center items-center'}>
                            <AddressManager
                                onCancel={handleCloseAddressManager}
                                onConfirm={handleConfirmAddress}
                                addresses={addresses}
                                selectedAddressCheckout={selectedAddress}
                            />
                        </MaxWidthWrapper>
                    </div>
                )}
            </div>
            {chooseVoucher && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
                    <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                        <div className="w-1/2 overflow-y-scroll max-h-3/4 lg:px-2 lg:py-2">
                            <div className="w-full h-full bg-background lg:px-2 lg:py-2">
                                <header className="lg:pt-4 lg:px-4 lg:text-2xl">Chọn phiếu giảm giá</header>
                                <div className="lg:px-4 lg:py-4">
                                    <div className="lg:mb-12">
                                        <header>Mã Miễn Phí Vận Chuyển</header>
                                        <div className="lg:px-6">
                                            {vouchers
                                                .filter((voucher) => voucher.type === 1)
                                                .map((voucher) => (
                                                    <VoucherShipping
                                                        key={voucher.id}
                                                        id={voucher.id}
                                                        type={voucher.type}
                                                        discount={voucher.discount}
                                                        minOrder={voucher.minOrder}
                                                        onSelect={handleSelectVoucher}
                                                        isSelected={
                                                            selectedShippingVoucher &&
                                                            selectedShippingVoucher.id === voucher.id
                                                        }
                                                        totalPrice={total}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                    <div className="shadow-sm lg:mb-4">
                                        <header>Mã Giảm Giá</header>
                                        <div className="lg:px-6">
                                            {vouchers
                                                .filter((voucher) => voucher.type === 2)
                                                .map((voucher) => (
                                                    <VoucherDiscount
                                                        key={voucher.id}
                                                        id={voucher.id}
                                                        type={voucher.type}
                                                        discount={voucher.discount}
                                                        minOrder={voucher.minOrder}
                                                        onSelect={handleSelectVoucher}
                                                        isSelected={
                                                            selectedDiscountVoucher &&
                                                            selectedDiscountVoucher.id === voucher.id
                                                        }
                                                        totalPrice={total}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end bg-background lg:gap-4 lg:px-4 lg:py-6">
                                    <button
                                        className="font-light text-white rounded-sm text-md bg-primary lg:px-12 lg:py-2 h-min"
                                        onClick={handleConfirm}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
            {chooseShippingMethod && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
                    <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                        <div className="w-3/4 max-w-screen-sm overflow-auto lg:px-2 lg:py-2">
                            <div className="w-3/4 max-w-screen-sm overflow-auto lg:px-2 lg:py-2">
                                <div className="bg-background">
                                    <header className="lg:py-4 lg:px-4">Chọn phương thức vận chuyển</header>
                                    <div className="lg:px-4 lg:py-4">
                                        <div
                                            onClick={() => handleOptionClickMeThod(35000, 'Vận chuyển Nhanh')}
                                            className={`flex justify-between shadow-sm border-x-1 rounded-md lg:px-2 lg:py-4 ${selectedOption === 'Vận chuyển Nhanh'
                                                ? 'border-l-4 border-primary shadow-md my-2'
                                                : 'hover:border-l-4 hover:border-primary hover:shadow-md hover:my-2'
                                                }`}
                                        >
                                            <div>Vận chuyển Nhanh</div>
                                            <div className="font-light text-red-600">{formatNumber(35000)}</div>
                                        </div>
                                        <div
                                            onClick={() => handleOptionClickMeThod(100000, 'Vận chuyển Hoả Tốc')}
                                            className={`flex justify-between shadow-sm border-x-1 rounded-md lg:px-2 lg:py-4 ${selectedOption === 'Vận chuyển Hoả Tốc'
                                                ? 'border-l-4 border-primary shadow-md my-2'
                                                : 'hover:border-l-4 hover:border-primary hover:shadow-md hover:my-2'
                                                }`}
                                        >
                                            <div>Vận chuyển Hoả tốc</div>
                                            <div className="font-light text-red-600">{formatNumber(100000)}</div>
                                        </div>
                                        <div
                                            onClick={() => handleOptionClickMeThod(15000, 'Vận chuyển Tiết Kiệm')}
                                            className={`flex justify-between shadow-sm border-x-1 rounded-md lg:px-2 lg:py-4 ${selectedOption === 'Vận chuyển Tiết Kiệm'
                                                ? 'border-l-4 border-primary shadow-md my-2'
                                                : 'hover:border-l-4 hover:border-primary hover:shadow-md hover:my-2'
                                                }`}
                                        >
                                            <div>Vận chuyển Tiết Kiệm</div>
                                            <div className="font-light text-red-600">{formatNumber(15000)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end bg-background lg:gap-4 lg:px-4 lg:py-6">
                                    <button
                                        onClick={() => {
                                            if (selectedOption) {
                                                setChooseShippingMethod(false);
                                            }
                                        }}
                                        className="font-light text-white rounded-sm text-md bg-primary lg:px-12 lg:py-2 h-min"
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
        </>
    );
}

const OrderItem = ({ imgSrc, title, description, quantity, price }) => {
    const totalPrice = quantity * price;
    return (
        <li className="grid items-start grid-cols-6 gap-2 lg:py-2 border-b-1">
            <div className="self-center col-span-1">
                <img src={imgSrc} alt="Product" className="rounded size-14" />
            </div>
            <div className="flex flex-col col-span-3 pt-2">
                <span className="text-gray-600 text-md text-nowrap overflow-x-clip font-semi-bold">{title}</span>
                <span className="inline-block pt-2 text-sm text-gray-400 text-nowrap overflow-x-clip">
                    {description}
                </span>
            </div>
            <div className="col-span-2 pt-3">
                <div className="flex items-center justify-between space-x-2 text-sm">
                    <span className="text-gray-400">
                        {quantity} x {formatNumber(price)}
                    </span>
                    <span className="inline-block font-semibold text-blue-400">{formatNumber(totalPrice)}</span>
                </div>
            </div>
        </li>
    );
};
const VoucherShipping = ({ id, type, discount, minOrder, onSelect, isSelected, totalPrice }) => {
    const isDisabled = totalPrice <= minOrder;

    return (
        <div
            className={`flex lg:gap-4 border shadow-md rounded-lg p-4 my-4 ${isSelected ? 'bg-gray-200' : ''} ${isDisabled ? 'opacity-50 pointer-events-none' : ''
                }`}
        >
            <div className="relative justify-center p-2 rounded-l-lg item-center basis-1/4 bg-secondary">
                <div className="absolute z-10 text-lg font-bold text-white border-4 border-white top-8 left-12 lg:p-2 rounded-tl-xl rounded-br-xl">
                    Free <br />
                    <span className="ml-4">Ship</span>
                </div>
                <div className="flex items-center mx-auto lg:pt-28">
                    <div className="mx-auto font-semibold text-white text-md">Mã vận chuyển</div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-between basis-2/4">
                <div className="flex flex-col space-y-2" role="presentation">
                    <div className="flex items-center">
                        <div className="px-2 py-1 text-white rounded bg-secondary">
                            Giảm tối đa {formatNumber(discount)}
                        </div>
                    </div>
                    <div className="text-gray-500">Đơn Tối Thiểu {formatNumber(minOrder)}</div>
                </div>
            </div>
            <div className="flex items-center justify-end basis-1/4">
                <div
                    className={`flex items-center justify-center h-4 w-4 bg-gray-300 rounded-full cursor-pointer ${isSelected ? 'bg-primary' : ''
                        }`}
                    aria-label=""
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => !isDisabled && onSelect({ id, type, discount, minOrder })}
                    tabIndex="0"
                >
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
            </div>
        </div>
    );
};

const VoucherDiscount = ({ id, type, discount, minOrder, onSelect, isSelected, totalPrice }) => {
    const isDisabled = totalPrice <= minOrder;

    return (
        <div
            className={`flex lg:gap-4 border shadow-md rounded-lg p-4 my-4 ${isSelected ? 'bg-gray-200' : ''} ${isDisabled ? 'opacity-50 pointer-events-none' : ''
                }`}
        >
            <div className="relative justify-center p-2 rounded-l-lg item-center basis-1/4 bg-primary">
                <div className="absolute z-10 text-lg font-bold text-white border-4 border-white top-8 left-12 lg:p-2 rounded-tl-xl rounded-br-xl">
                    Giảm <br />
                    <span className="ml-6">Giá</span>
                </div>
                <div className="flex items-center mx-auto lg:pt-28">
                    <div className="mx-auto font-semibold text-white text-md">Mã giảm giá</div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-between basis-2/4">
                <div className="flex flex-col space-y-2" role="presentation">
                    <div className="flex items-center">
                        <div className="px-2 py-1 text-white rounded bg-primary">
                            Giảm tối đa {formatNumber(discount)}
                        </div>
                    </div>
                    <div className="text-gray-500">Đơn Tối Thiểu {formatNumber(minOrder)}</div>
                </div>
            </div>
            <div className="flex items-center justify-end basis-1/4">
                <div
                    className={`flex items-center justify-center h-4 w-4 bg-gray-300 rounded-full cursor-pointer ${isSelected ? 'bg-primary' : ''
                        }`}
                    aria-label=""
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => !isDisabled && onSelect({ id, type, discount, minOrder })}
                    tabIndex="0"
                >
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
