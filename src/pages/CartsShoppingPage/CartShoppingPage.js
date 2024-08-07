import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartsApi, deleteCartItem, updateProduct } from '../../services/CartApi/cartApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const CartShoppingPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [quantities, setQuantities] = useState([]);
    const [cartData, setCartData] = useState([]);

    const fetchCart = useCallback(async () => {
        try {
            const response = await cartsApi(token);
            const updatedCartData = response.data.map((item) => {
                // Tìm chuỗi trong dấu ngoặc kép
                const match = item.product.image.match(/'base_url': '([^']+)'/);

                if (match && match[1]) {
                    const baseUrl = match[1];

                    return {
                        ...item,
                        product: {
                            ...item.product,
                            image: baseUrl,
                        },
                        checked: false,
                    };
                } else {
                    return item;
                }
            });
            setQuantities(response.data.map((item) => item.quantity));
            setCartData(updatedCartData);
            console.log('cart data in checkout form: ', updatedCartData);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCart();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [fetchCart]);

    const handleIncrement = async (index, idProduct) => {
        try {
            const updatedCart = [...cartData];
            const response = await updateProduct(idProduct, (updatedCart[index].quantity += 1), token);
            if (response.message === 'Success') {
                setQuantities(updatedCart.map((item) => item.quantity));
                setCartData(updatedCart);
            } else {
                console.log('error call api');
            }
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const handleDecrement = async (index, idProduct) => {
        try {
            const updatedCart = [...cartData];
            if (updatedCart[index].quantity > 1) {
                const response = await updateProduct(idProduct, (updatedCart[index].quantity -= 1), token);
                if (response.message === 'Success') {
                    setQuantities(updatedCart.map((item) => item.quantity));
                    setCartData(updatedCart);
                } else {
                    console.log('error call api');
                }
            }
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!isNaN(value) && value >= 1) {
            setQuantities((prevQuantities) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] = parseInt(value);
                return newQuantities;
            });
        }
    };

    const handleCheckout = (event) => {
        event.preventDefault();
        const selectedItems = cartData.filter((item) => item.checked);
        if (selectedItems.length > 0) {
            navigate('/checkout', {
                state: {
                    selectedItems,
                    shippingFee,
                    shippingMethod,
                },
            });
        } else {
            toast.error('Chưa có sản phẩm được chọn');
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            // Gọi API để xóa phần tử từ cơ sở dữ liệu
            await deleteCartItem(itemId, token);
            const updatedCartItems = cartData.filter((item) => item.id !== itemId);
            setCartData(updatedCartItems);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const handleCheckboxChange = (itemId) => {
        setCartData((prevCartData) =>
            prevCartData.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)),
        );
    };

    const calculateSubtotal = () => {
        return cartData.reduce((total, item) => {
            if (item.checked) {
                return total + item.product.price * item.quantity;
            }
            return total;
        }, 0);
    };
    //
    const [chooseShippingMethod, setChooseShippingMethod] = useState(false);
    const [shippingMethod, setShippingMethod] = useState('Chọn phương thức vận chuyển');
    const [shippingFee, setShippingFee] = useState(15000);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionClickMeThod = (fee, method) => {
        setSelectedOption(method);
        setShippingFee(fee);
        setShippingMethod(method);
    };
    return (
        <>
            <MaxWidthWrapper>
                <div className="pt-32 bg-white">
                    <main className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Giỏ hàng</h1>

                        <form className="mt-4 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                            <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                    {cartData.map((data, dataId) => (
                                        <li key={data.id} className="flex py-6 sm:py-10">
                                            <div className="flex items-center mr-8">
                                                <input
                                                    id={`checkbox-${data.id}`}
                                                    type="checkbox"
                                                    checked={data.checked}
                                                    onChange={() => handleCheckboxChange(data.id)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                            <div className="flex-shrink-0">
                                                <img
                                                    data-twe-lazy-load-init
                                                    data-twe-lazy-src
                                                    src={data.productImgs}
                                                    alt="chua co hinh"
                                                    className="object-cover object-center rounded-md size-24"
                                                />
                                            </div>

                                            <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <a className="font-medium text-gray-700 hover:text-gray-800">
                                                                    {data.product.name}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                        <div className="flex mt-1 text-sm">
                                                            {data.optionValues && data.optionValues.name && (
                                                                <p className="text-gray-500">
                                                                    {data.optionValues.name}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                                            {formatNumber(data.product.price)}
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                                        <div className="relative flex items-center max-w-[8rem]">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDecrement(dataId, data.product.iD_NK)
                                                                }
                                                                className="h-8 p-3 bg-white border border-gray-100 focus:outline-none"
                                                            >
                                                                <svg
                                                                    className="w-3 h-3 text-gray-900 dark:text-white"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 2"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M1 1h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <input
                                                                type="text"
                                                                id={`quantity-input-${dataId}`}
                                                                value={quantities[dataId]}
                                                                onChange={(e) => handleChange(e, dataId)}
                                                                className="block w-1/3 h-8 py-3 text-sm text-center text-gray-900 bg-white border-gray-100 "
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleIncrement(dataId, data.product.iD_NK)
                                                                }
                                                                className="h-8 p-3 bg-white border border-gray-100 focus:outline-none"
                                                            >
                                                                <svg
                                                                    className="w-3 h-3 text-gray-900 "
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 18"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M9 1v16M1 9h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <div className="absolute top-0 right-0">
                                                            <button
                                                                type="button"
                                                                className="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500"
                                                            >
                                                                <svg
                                                                    onClick={() => handleDeleteItem(data.id)}
                                                                    className="w-5 h-5"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Order summary */}
                            <section
                                aria-labelledby="summary-heading"
                                className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                    Tóm tắt đơn hàng
                                </h2>

                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Tạm tính</dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            <dd className="text-sm font-medium text-gray-900">
                                                {formatNumber(calculateSubtotal())}
                                            </dd>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <dt className="flex-row items-center text-sm text-gray-600 lg:gap-2">
                                            <span>Phí vận chuyển</span>
                                            <div
                                                onClick={() => {
                                                    setChooseShippingMethod(true);
                                                }}
                                                className="flex items-center justify-center text-xs lg:mt-2 hover:cursor-pointer hover:border-primary hover:text-primary lg:gap-2 bg-slate-50/65 border-1 lg:px-2 lg:py-1"
                                            >
                                                {shippingMethod}
                                            </div>
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            {formatNumber(shippingFee)}
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <dt className="text-base font-medium text-gray-900">Tổng thanh toán</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {formatNumber(calculateSubtotal() + shippingFee)}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        onClick={handleCheckout}
                                        className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                    >
                                        Thanh toán
                                    </button>
                                    <ToastContainer />
                                </div>
                            </section>
                        </form>
                    </main>
                </div>
            </MaxWidthWrapper>
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
                                            className={`flex justify-between shadow-sm border-x-1 rounded-md lg:px-2 lg:py-4 ${
                                                selectedOption === 'Vận chuyển Nhanh'
                                                    ? 'border-l-4 border-primary shadow-md my-2'
                                                    : 'hover:border-l-4 hover:border-primary hover:shadow-md hover:my-2'
                                            }`}
                                        >
                                            <div>Vận chuyển Nhanh</div>
                                            <div className="font-light text-red-600">{formatNumber(35000)}</div>
                                        </div>
                                        <div
                                            onClick={() => handleOptionClickMeThod(100000, 'Vận chuyển Hoả Tốc')}
                                            className={`flex justify-between shadow-sm border-x-1 rounded-md lg:px-2 lg:py-4 ${
                                                selectedOption === 'Vận chuyển Hoả Tốc'
                                                    ? 'border-l-4 border-primary shadow-md my-2'
                                                    : 'hover:border-l-4 hover:border-primary hover:shadow-md hover:my-2'
                                            }`}
                                        >
                                            <div>Vận chuyển Hoả tốc</div>
                                            <div className="font-light text-red-600">{formatNumber(100000)}</div>
                                        </div>
                                        <div
                                            onClick={() => handleOptionClickMeThod(15000, 'Vận chuyển Tiết Kiệm')}
                                            className={`flex justify-between shadow-sm border-x-1 rounded-md lg:px-2 lg:py-4 ${
                                                selectedOption === 'Vận chuyển Tiết Kiệm'
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
};

export default CartShoppingPage;
