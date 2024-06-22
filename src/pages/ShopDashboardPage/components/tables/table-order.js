import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import MaxWidthWrapper from '../../../../components/MaxWidthWrapper';
// format number
const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const formatDateTime = (inputDateTime) => {
    const dateObj = new Date(inputDateTime); // Tạo đối tượng Date từ chuỗi đầu vào

    // Lấy thông tin về giờ, phút, ngày, tháng và năm từ đối tượng Date
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = dateObj.getFullYear();

    // Định dạng lại chuỗi ngày giờ theo yêu cầu 'hh:mm dd-mm-yyyy'
    const formattedDateTime = `${hours}:${minutes} ${day}-${month}-${year}`;

    return formattedDateTime;
};
const formatDateTimeAddOneHour = (inputDateTime) => {
    const dateObj = new Date(inputDateTime); // Tạo đối tượng Date từ chuỗi đầu vào

    dateObj.setHours(dateObj.getHours() + 1); // Thêm một giờ vào thời gian hiện tại

    // Định dạng lại chuỗi ngày giờ theo yêu cầu 'hh:mm dd-mm-yyyy'
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = dateObj.getFullYear();

    const formattedDateTime = `${hours}:${minutes} ${day}-${month}-${year}`;

    return formattedDateTime;
};
const initialOrders = [
    {
        orderID: 'MH149182H94719',
        products: [
            {
                iD_NK: '123',
                name: 'Combo 5 quần lót nam BIZON boxer DA2 thun lạnh cao cấp, quần sịp nam mềm mại co giãn 4 chiều, thấm hút kháng khuẩn tốt',
                price: '126000',
                Category: 'Quân áo thời trang',
                CreateAt: '2024-12-20 10:12:12',
                Quatity: 3,
                category: 'Quần áo',

                Option: {
                    Value: [
                        {
                            namevalue: 'Loại bìa',
                            optionvalue: [
                                {
                                    name: 'Bìa Hồng',
                                    imagechild:
                                        'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                iD_NK: '123',
                name: 'Combo 5 quần lót nam BIZON boxer DA2 thun lạnh cao cấp, quần sịp nam mềm mại co giãn 4 chiều, thấm hút kháng khuẩn tốt',
                price: '126000',
                Category: 'Quân áo thời trang',
                CreateAt: '2024-12-20 10:12:12',
                Quatity: 3,
                category: 'Quần áo',

                Option: {
                    Value: [
                        {
                            namevalue: 'Loại bìa',
                            optionvalue: [
                                {
                                    name: 'Bìa Hồng',
                                    imagechild:
                                        'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        totalPrice: '1231',
        createAt: '2022-03-15 14:25:36',
        customer: {
            name: 'Nguyễn Văn A',
            address: 'C3/40/3 Phạm Hùng',
            phone: '08340129012',
            gmail: 'example@gmail.com',
        },
        status: '1',
    },
    {
        orderID: 'MH149182H94719',
        products: [
            {
                iD_NK: '123',
                name: 'Combo 5 quần lót nam BIZON boxer DA2 thun lạnh cao cấp, quần sịp nam mềm mại co giãn 4 chiều, thấm hút kháng khuẩn tốt',
                price: '126000',
                Category: 'Quân áo thời trang',
                CreateAt: '2024-12-20 10:12:12',
                Quatity: 3,
                category: 'Quần áo',

                Option: {
                    Value: [
                        {
                            namevalue: 'Loại bìa',
                            optionvalue: [
                                {
                                    name: 'Bìa Hồng',
                                    imagechild:
                                        'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                iD_NK: '123',
                name: 'Combo 5 quần lót nam BIZON boxer DA2 thun lạnh cao cấp, quần sịp nam mềm mại co giãn 4 chiều, thấm hút kháng khuẩn tốt',
                price: '126000',
                Category: 'Quân áo thời trang',
                CreateAt: '2024-12-20 10:12:12',
                Quatity: 3,
                category: 'Quần áo',

                Option: {
                    Value: [
                        {
                            namevalue: 'Loại bìa',
                            optionvalue: [
                                {
                                    name: 'Bìa Hồng',
                                    imagechild:
                                        'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        totalPrice: '1231',
        createAt: '2022-03-15 14:25:36',
        customer: {
            name: 'Nguyễn Văn A',
            address: 'C3/40/3 Phạm Hùng',
            phone: '08340129012',
            gmail: 'example@gmail.com',
        },
        status: '0',
    },
];
const formatCreateAt = (createAt) => {
    const date = parseISO(createAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
};
const TableOrder = () => {
    const [orderView, setOrderView] = useState(false);
    const [orderEditView, setOrderEditView] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu sản phẩm được chọn để chỉnh sửa

    // Hàm mở form chi tiết sản phẩm
    const openDetailOrderForm = (order) => {
        setSelectedOrder(order); // Lưu sản phẩm được chọn vào state
        setOrderView(true); // Mở form chỉnh sửa
    };

    // Hàm mở form chi tiết sản phẩm
    const openEditOrderForm = (order) => {
        setSelectedOrder(order); // Lưu sản phẩm được chọn vào state
        setOrderEditView(true); // Mở form chỉnh sửa
    };

    const [orders, setOrders] = useState(initialOrders); // assuming initialOrders is defined elsewhere

    // Hàm xử lý khi trạng thái đơn hàng thay đổi
    const handleStatusChange = (newStatus) => {
        // Cập nhật trạng thái trong đơn hàng được chọn
        const updatedOrder = { ...selectedOrder, status: newStatus };
        setSelectedOrder(updatedOrder);
    };

    return (
        <>
            <div class=" bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-1">
                <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                        <div class="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
                            <div>
                                <h5 class="block  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    Giao dịch gần đây
                                </h5>
                                <p class="block mt-1  text-base antialiased font-normal leading-relaxed text-gray-700">
                                    Đây là thông tin chi tiết về các giao dịch cuối cùng
                                </p>
                            </div>
                            <div class="flex w-full gap-2 shrink-0 md:w-max">
                                <div class="w-full md:w-72">
                                    <div class="relative h-10 w-full min-w-[200px]">
                                        <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                class="w-5 h-5"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                        />
                                        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Tìm kiếm
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 px-0 overflow-scroll">
                        <table class="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Mã đơn hàng
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Sản phẩm
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Thành tiền
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Ngày đặt
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Status
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Khách hàng
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block  text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Hành động
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {order.orderID}
                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img
                                                    src={order.products[0].Option.Value[0].optionvalue[0].imagechild}
                                                    alt={order.products[0].name}
                                                    className="relative inline-block object-contain object-center p-1 border size-14 border-blue-gray-50 bg-blue-gray-50/50"
                                                />

                                                <div className="flex-row max-w-xs overflow-x-auto text-nowrap">
                                                    <p className="block text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                                        {order.products[0].name}
                                                    </p>
                                                    <div className="text-sm text-gray-400">
                                                        <p>
                                                            {order.products[0].Option.Value[0].namevalue +
                                                                ': ' +
                                                                order.products[0].Option.Value[0].optionvalue[0].name}
                                                        </p>
                                                        <p>x{order.products[0].Quatity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {formatNumber(order.totalPrice)}
                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {formatCreateAt(order.createAt)}
                                            </p>
                                        </td>

                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="w-max">
                                                <div
                                                    className={`relative grid items-center px-2 py-1 text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                                                        order.status === '0'
                                                            ? 'text-blue-900 bg-blue-500/20'
                                                            : order.status === '1'
                                                            ? 'text-green-900 bg-green-500/20'
                                                            : order.status === '2'
                                                            ? 'text-yellow-900 bg-yellow-500/20'
                                                            : order.status === '3'
                                                            ? 'text-gray-900 bg-gray-500/20'
                                                            : 'text-red-900 bg-red-500/20'
                                                    }`}
                                                >
                                                    <span>
                                                        {order.status === '0' ? 'Vận chuyển' : ''}
                                                        {order.status === '1' ? 'Chờ giao hàng' : ''}
                                                        {order.status === '2' ? 'Hoàn thành' : ''}
                                                        {order.status === '3' ? 'Đã huỷ' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="flex flex-col">
                                                <p className="block text-sm antialiased font-normal leading-normal capitalize text-blue-gray-900">
                                                    {order.customer.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="flex items-center justify-center p-3 pr-4 ">
                                            <span
                                                className="text-sm cursor-pointer "
                                                onClick={() => {
                                                    openEditOrderForm(order);
                                                }}
                                            >
                                                Sửa
                                            </span>
                                            <button
                                                onClick={() => openDetailOrderForm(order)}
                                                className="group  hover:animate-bounce ml-auto relative text-secondary-dark bg-light-dark hover:text-primary bg-gray-200 rounded-full flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
                                            >
                                                <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
                        <button
                            class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle  text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            Trước
                        </button>
                        <div class="flex items-center gap-2">
                            <button
                                class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle  text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    1
                                </span>
                            </button>
                            <button
                                class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle  text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    2
                                </span>
                            </button>
                            <button
                                class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle  text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    3
                                </span>
                            </button>
                            <button
                                class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle  text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    ...
                                </span>
                            </button>
                            <button
                                class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle  text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    8
                                </span>
                            </button>
                            <button
                                class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle  text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    9
                                </span>
                            </button>
                            <button
                                class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle  text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    10
                                </span>
                            </button>
                        </div>
                        <button
                            class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle  text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>

            {orderView && <DetailOrder order={selectedOrder} open={setOrderView} />}
            {orderEditView && (
                <EditOrder order={selectedOrder} open={setOrderEditView} onStatusChange={handleStatusChange} />
            )}
        </>
    );
};

const DetailOrder = ({ action = 0, order = {}, open }) => {
    console.log('order detail: ', order);
    return (
        <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
            <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                <div className="w-3/4 overflow-auto bg-white h-3/4 lg:px-2 lg:py-2">
                    <header className="flex items-center justify-between font-light uppercase border-dashed shadow-md border-b-1 lg:px-4 lg:py-3 rounded-b-md">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                open(false);
                            }}
                            className="flex items-center text-sm uppercase lg:gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-4"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            Trở lại
                        </button>
                        <div className="flex items-center justify-between text-sm lg:gap-2">
                            <span className="flex items-center lg:gap-1 text-nowrap">Mã đơn hàng: {order.orderID}</span>
                            <div className="text-gray-300 lg:px-6 ">|</div>
                            <span className="text-primary">ĐƠN HÀNG ĐANG ĐƯỢC CHUẨN BỊ</span>
                        </div>
                    </header>
                    <div className="overflow-auto h-5/6">
                        <div class="bg-white rounded-md shadow-sm lg:px-4 lg:pt-4 lg:pb-2">
                            <ol class="relative border-s border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-s-0 ">
                                <li className="absolute z-10 w-full border-t-1 top-4"></li>
                                <li className="flex flex-col items-start flex-1 bg-transparent md:items-center md:text-center">
                                    <div class="relative flex items-center pt-2 md:flex-col md:pt-0 md:items-center">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="absolute z-20 left-9 size-6 top-1 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                            {formatDateTime(order.createAt)}
                                        </p>
                                    </div>
                                    <div class="ms-4 mt-2 pb-5 md:ms-0">
                                        <p class="mb-3 text-sm dark:text-neutral-300">Đơn Hàng Đã Đặt</p>
                                    </div>
                                </li>
                                <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                    <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                            {formatDateTimeAddOneHour(order.createAt)}
                                        </p>
                                    </div>
                                    <div class="ms-4 mt-2 pb-5 md:ms-0">
                                        <p class="mb-3 text-sm dark:text-neutral-300">Đã Xác Nhận Thông Tin Đơn Hàng</p>
                                    </div>
                                </li>
                                {/* <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                    <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>{' '}
                                        <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                            11:31 27-03-2024
                                        </p>
                                    </div>
                                    <div class="ms-4 mt-2 pb-5 md:ms-0">
                                        <p class="mb-3 text-sm dark:text-neutral-300">Đã Giao Cho ĐVVC</p>
                                    </div>
                                </li>

                                <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                    <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                            07:08 07-04-2024
                                        </p>
                                    </div>
                                    <div class="ms-4 mt-2 pb-5 md:ms-0">
                                        <p class="mb-3 text-sm dark:text-neutral-300">Đã Nhận Được Hàng</p>
                                    </div>
                                </li>
                                <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                    <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                            07:08 07-04-2024
                                        </p>
                                    </div>
                                    <div class="ms-4 mt-2 pb-5 md:ms-0">
                                        <p class="mb-3 text-sm  dark:text-neutral-300">Đơn Hàng Đã Hoàn Thành</p>
                                    </div>
                                </li> */}
                            </ol>
                        </div>
                        <div className="flex justify-between rounded-md shadow-sm lg:px-4 lg:py-2 ">
                            <div className="w-1/3">
                                <header className="lg:text-xl lg:mb-4">Địa chỉ nhận hàng</header>
                                <div className="flex-row text-xs font-light">
                                    <p className="text-base font-medium lg:py-2">{order.customer.name}</p>
                                    <p className="lg:py-1">{order.customer.phone}</p>
                                    <p className="lg:py-1">{order.customer.address}</p>
                                    <p>{order.customer.gmail}</p>
                                </div>
                            </div>
                            <div className="w-2/3 border-l-1 lg:ml-6">
                                {/* <>
                                    <div class="ps-2 my-2 first:mt-0">
                                        <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                            17:55 30-03-2024
                                        </h3>
                                    </div>

                                    <div class="flex gap-x-3">
                                        <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                            <div class="relative z-10 size-7 flex justify-center items-center">
                                                <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grow pt-0.5 pb-8">
                                            <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                Đã giao
                                            </h3>
                                            <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                Giao hàng thành công
                                            </p>
                                        </div>
                                    </div>
                                </>
                                <>
                                    <div class="ps-2 my-2 first:mt-0">
                                        <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                            17:53 30-03-2024
                                        </h3>
                                    </div>

                                    <div class="flex gap-x-3">
                                        <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                            <div class="relative z-10 size-7 flex justify-center items-center">
                                                <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grow pt-0.5 pb-8">
                                            <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                Đang vận chuyển
                                            </h3>
                                            <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại
                                            </p>
                                        </div>
                                    </div>
                                </> */}
                                <>
                                    <div class="ps-2 my-2 first:mt-0">
                                        <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                            {formatDateTimeAddOneHour(order.createAt)}
                                        </h3>
                                    </div>

                                    <div class="flex gap-x-3">
                                        <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                            <div class="relative z-10 size-7 flex justify-center items-center">
                                                <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grow pt-0.5 pb-8">
                                            <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                Đang được chuẩn bị
                                            </h3>
                                            <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                Người gửi đang chuẩn bị hàng
                                            </p>
                                        </div>
                                    </div>
                                </>
                                <>
                                    <div class="ps-2 my-2 first:mt-0">
                                        <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                            {formatDateTime(order.createAt)}
                                        </h3>
                                    </div>

                                    <div class="flex gap-x-3">
                                        <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                            <div class="relative z-10 size-7 flex justify-center items-center">
                                                <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grow pt-0.5 pb-8">
                                            <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                Đặt hàng thành công
                                            </h3>
                                            <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                Đơn hàng đã được đặt
                                            </p>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                        <main className="w-full bg-background">
                            <div className="w-full mx-auto">
                                <div className="max-w-2xl space-y-8 sm:px-4 lg:max-w-full lg:px-0">
                                    <div className="border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border">
                                        {/* Products */}
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {order.products.map((product) => (
                                                <li key={product.iD_NK} className="p-4 sm:p-6">
                                                    <div className="flex items-center sm:items-start">
                                                        <div className="flex-shrink-0 overflow-hidden bg-gray-200 size-20">
                                                            <img
                                                                src={product.Option.Value[0].optionvalue[0].imagechild}
                                                                alt={product.name}
                                                                className="object-cover object-center w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="flex-1 ml-6 text-sm">
                                                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                <h5 className="max-w-3xl overflow-clip text-nowrap">
                                                                    {product.name}
                                                                </h5>
                                                                <p className="mt-2 sm:mt-0">
                                                                    {formatNumber(product.price)}₫
                                                                </p>
                                                            </div>

                                                            <div className="flex items-center lg:gap-2">
                                                                <p className="hidden text-gray-400 sm:block sm:mt-2">
                                                                    {product.Option.Value[0].optionvalue[0].name}
                                                                </p>

                                                                <p className="hidden text-xs text-gray-400 sm:block sm:mt-2">
                                                                    X {product.Quatity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex items-center border-dashed border-1">
                                            <div className="h-auto text-sm font-light border-dashed lg:py-4 lg:px-4 text-end border-r-1 basis-4/6">
                                                Thành tiền
                                            </div>
                                            <div className="text-lg font-medium text-end text-primary lg:py-4 lg:px-4 basis-2/6">
                                                {formatNumber(order.totalPrice)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};
const EditOrder = ({ order = {}, open, onStatusChange }) => {
    const [newStatus, setNewStatus] = useState(order.status); // State để lưu trạng thái mới

    const handleChangeStatus = (e) => {
        const statusValue = e.target.value;
        setNewStatus(statusValue);
    };

    const handleConfirmStatusChange = () => {
        // Gọi hàm đã được truyền từ cha để thông báo về sự thay đổi trạng thái
        onStatusChange(newStatus);
        // Đóng form chỉnh sửa sau khi xác nhận
        open(false);
    };

    return (
        <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
            <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                <div className="w-3/4 overflow-auto bg-white h-3/4 lg:px-2 lg:py-2">
                    <header className="flex items-center justify-between font-light uppercase border-dashed shadow-md border-b-1 lg:px-4 lg:py-3 rounded-b-md">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                open(false);
                            }}
                            className="flex items-center text-sm uppercase lg:gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-4"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            Trở lại
                        </button>
                        <div className="flex items-center justify-between text-sm lg:gap-2">
                            <span className="flex items-center lg:gap-1 text-nowrap">Mã đơn hàng: {order.orderID}</span>
                            <div className="text-gray-300 lg:px-6 ">|</div>
                            <span className="uppercase text-primary">Chỉnh sửa đơn hàng</span>
                        </div>
                    </header>
                    <div className="overflow-auto h-5/6">
                        <div class="bg-white rounded-md shadow-sm lg:px-4 lg:pt-4 lg:pb-2">
                            <ol class="relative border-s border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-s-0 ">
                                <li className="absolute z-10 w-full border-t-1 top-4"></li>
                                <li className="flex flex-col items-start flex-1 bg-transparent md:items-center md:text-center">
                                    <div class="relative flex items-center pt-2 md:flex-col md:pt-0 md:items-center">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="absolute z-20 left-9 size-6 top-1 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                            {formatDateTime(order.createAt)}
                                        </p>
                                    </div>
                                    <div class="ms-4 mt-2 pb-5 md:ms-0">
                                        <p class="mb-3 text-sm dark:text-neutral-300">Đơn Hàng Đã Đặt</p>
                                    </div>
                                </li>
                                <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                    <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                            {formatDateTimeAddOneHour(order.createAt)}
                                        </p>
                                    </div>
                                    <div class="ms-4 mt-2 pb-5 md:ms-0">
                                        <p class="mb-3 text-sm dark:text-neutral-300">Đã Xác Nhận Thông Tin Đơn Hàng</p>
                                    </div>
                                </li>
                                {order.status == 2 && (
                                    <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                        <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                            </div>{' '}
                                            <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                11:31 27-03-2024
                                            </p>
                                        </div>
                                        <div class="ms-4 mt-2 pb-5 md:ms-0">
                                            <p class="mb-3 text-sm dark:text-neutral-300">Đã Giao Cho ĐVVC</p>
                                        </div>
                                    </li>
                                )}

                                {order.status == 3 && (
                                    <>
                                        <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                            <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                    07:08 07-04-2024
                                                </p>
                                            </div>
                                            <div class="ms-4 mt-2 pb-5 md:ms-0">
                                                <p class="mb-3 text-sm dark:text-neutral-300">Đã Nhận Được Hàng</p>
                                            </div>
                                        </li>
                                        <li className="flex flex-col items-start flex-1 md:items-center md:text-center">
                                            <div class="flex items-center pt-2 relative md:flex-col md:pt-0 md:items-center">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-6 top-1 absolute z-20 left-9 text-white bg-green-500 rounded-full"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p class="mt-12 text-sm text-neutral-500 dark:text-neutral-300">
                                                    07:08 07-04-2024
                                                </p>
                                            </div>
                                            <div class="ms-4 mt-2 pb-5 md:ms-0">
                                                <p class="mb-3 text-sm  dark:text-neutral-300">
                                                    Đơn Hàng Đã Hoàn Thành
                                                </p>
                                            </div>
                                        </li>
                                    </>
                                )}
                            </ol>
                        </div>
                        <div className="flex rounded-md shadow-sm lg:px-4 lg:py-2 ">
                            <div className="w-1/5 ">
                                <header className="lg:text-xl lg:mb-4">Địa chỉ nhận hàng</header>
                                <div className="flex-row text-xs font-light">
                                    <p className="text-base font-medium lg:py-2">{order.customer.name}</p>
                                    <p className="lg:py-1">{order.customer.phone}</p>
                                    <p className="lg:py-1">{order.customer.address}</p>
                                    <p>{order.customer.gmail}</p>
                                </div>
                            </div>
                            <div className="w-2/5 border-dashed border-x-1 lg:ml-6">
                                {order.status === 2 && (
                                    <>
                                        <div class="ps-2 my-2 first:mt-0">
                                            <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                                17:55 30-03-2024
                                            </h3>
                                        </div>

                                        <div class="flex gap-x-3">
                                            <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                                <div class="relative z-10 size-7 flex justify-center items-center">
                                                    <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            class="size-4"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="grow pt-0.5 pb-8">
                                                <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                    Đã giao
                                                </h3>
                                                <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                    Giao hàng thành công
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {order.status === 0 && (
                                    <>
                                        <div class="ps-2 my-2 first:mt-0">
                                            <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                                17:53 30-03-2024
                                            </h3>
                                        </div>

                                        <div class="flex gap-x-3">
                                            <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                                <div class="relative z-10 size-7 flex justify-center items-center">
                                                    <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            class="size-4"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="grow pt-0.5 pb-8">
                                                <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                    Đang vận chuyển
                                                </h3>
                                                <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                    Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <>
                                    <div class="ps-2 my-2 first:mt-0">
                                        <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                            {formatDateTimeAddOneHour(order.createAt)}
                                        </h3>
                                    </div>

                                    <div class="flex gap-x-3">
                                        <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                            <div class="relative z-10 size-7 flex justify-center items-center">
                                                <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grow pt-0.5 pb-8">
                                            <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                Đang được chuẩn bị
                                            </h3>
                                            <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                Người gửi đang chuẩn bị hàng
                                            </p>
                                        </div>
                                    </div>
                                </>
                                <>
                                    <div class="ps-2 my-2 first:mt-0">
                                        <h3 class="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
                                            {formatDateTime(order.createAt)}
                                        </h3>
                                    </div>

                                    <div class="flex gap-x-3">
                                        <div class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                            <div class="relative z-10 size-7 flex justify-center items-center">
                                                <div class="size-6 border-2 rounded-full bg-tranparent flex justify-center items-center dark:bg-neutral-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        class="size-4"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grow pt-0.5 pb-8">
                                            <h3 class="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                Đặt hàng thành công
                                            </h3>
                                            <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                Đơn hàng đã được đặt
                                            </p>
                                        </div>
                                    </div>
                                </>
                            </div>
                            <div className="w-2/5 p-4">
                                <span className="text-sm text-gray-500 uppercase">Chỉnh sửa trạng thái đơn hàng</span>
                                <div className="w-full h-auto text-sm font-light lg:py-4 lg:px-4 text-end">
                                    <select
                                        className={`relative grid items-center w-2/3 px-2 py-3 text-xs font-bold uppercase rounded-sm select-none whitespace-nowrap ${
                                            newStatus === '0'
                                                ? 'text-blue-900 bg-blue-500/20'
                                                : newStatus === '1'
                                                ? 'text-green-900 bg-green-500/20'
                                                : newStatus === '2'
                                                ? 'text-yellow-900 bg-yellow-500/20'
                                                : newStatus === '3'
                                                ? 'text-gray-900 bg-gray-500/20'
                                                : 'text-red-900 bg-red-500/20'
                                        }`}
                                        value={newStatus}
                                        onChange={handleChangeStatus}
                                    >
                                        <option value="0">Vận chuyển</option>
                                        <option value="1">Chờ giao hàng</option>
                                        <option value="2">Hoàn thành</option>
                                        <option value="3">Đã huỷ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <main className="w-full bg-background">
                            <div className="w-full mx-auto">
                                <div className="max-w-2xl space-y-8 sm:px-4 lg:max-w-full lg:px-0">
                                    <div className="border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border">
                                        {/* Products */}
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {order.products.map((product) => (
                                                <li key={product.iD_NK} className="p-4 sm:p-6">
                                                    <div className="flex items-center sm:items-start">
                                                        <div className="flex-shrink-0 overflow-hidden bg-gray-200 size-20">
                                                            <img
                                                                src={product.Option.Value[0].optionvalue[0].imagechild}
                                                                alt={product.name}
                                                                className="object-cover object-center w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="flex-1 ml-6 text-sm">
                                                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                <h5 className="max-w-3xl overflow-clip text-nowrap">
                                                                    {product.name}
                                                                </h5>
                                                                <p className="mt-2 sm:mt-0">
                                                                    {formatNumber(product.price)}₫
                                                                </p>
                                                            </div>

                                                            <div className="flex items-center lg:gap-2">
                                                                <p className="hidden text-gray-400 sm:block sm:mt-2">
                                                                    {product.Option.Value[0].optionvalue[0].name}
                                                                </p>

                                                                <p className="hidden text-xs text-gray-400 sm:block sm:mt-2">
                                                                    X {product.Quatity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex items-center border-dashed border-1">
                                            <div className="h-auto text-sm font-light border-dashed lg:py-4 lg:px-4 text-end border-r-1 basis-4/6">
                                                Thành tiền
                                            </div>
                                            <div className="text-lg font-medium text-end text-primary lg:py-4 lg:px-4 basis-2/6">
                                                {formatNumber(order.totalPrice)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div
                        onClick={handleConfirmStatusChange}
                        className="ml-auto text-white w-max lg:px-4 lg:py-2 text-md bg-primary lg:mt-4"
                    >
                        Xác nhận
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default TableOrder;
