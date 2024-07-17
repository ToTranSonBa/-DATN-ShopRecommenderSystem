import React, { useEffect, useState, useCallback } from 'react';
import Preloader from './components/preloader';
import flatpickr from 'flatpickr';
import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import { formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale'; // Import locale for Vietnamese language
//
import ChartOne from './components/charts/chart-01';
import ChartTwo from './components/charts/chart-02';
import ChartThree from './components/charts/chart-03';
import MapOne from './components/maps/map-01';
import TableProduct from './components/tables/table-product';
//
import DefaultAVT from '../../assets/default-avatar.png';
import { message } from 'antd';
//
import { getSellerInforForDashboard } from '../../services/SellerApi/Dashboard/dashboardApi'
//
Alpine.plugin(persist);
window.Alpine = Alpine;
Alpine.start();

const Chats = [
    {
        id: 123,
        avt: DefaultAVT,
        name: 'Nguyễn Văn A',
        message: 'Dạ chào shop ạ!',
        createAt: '2023-01-01 00:00:00',
    },
    {
        id: 123,
        avt: DefaultAVT,
        name: 'Nguyễn Văn B',
        message: 'Shop ơi!',
        createAt: '2023-01-01 00:00:00',
    },
    {
        id: 123,
        avt: DefaultAVT,
        name: 'Nguyễn Văn C',
        message:
            'Combo 5 quần lót nam BIZON boxer DA2 thun lạnh cao cấp, quần sịp nam mềm mại co giãn 4 chiều, thấm hút kháng khuẩn tốt giáo bao nhiêu ạ !',
        createAt: '2023-01-01 00:00:00',
    },
    {
        id: 123,
        avt: DefaultAVT,
        name: 'Nguyễn Văn D',
        message: 'Shop tôi muốn hỏi cái này!',
        createAt: '2023-01-01 00:00:00',
    },
    {
        id: 123,
        avt: DefaultAVT,
        name: 'Nguyễn Văn E',
        message: 'Sản phẩm này thât tuêtj!',
        createAt: '2023-01-01 00:00:00',
    },
];

const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

const ECommerceDoashboard = () => {
    const token = localStorage.getItem('token');
    const [sellerInfor, setSellerInfor] = useState({});
    useEffect(() => {
        // Init flatpickr
        flatpickr('.datepicker', {
            mode: 'range',
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'M j, Y',
            defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
            prevArrow:
                '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
                '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
            onReady: (selectedDates, dateStr, instance) => {
                instance.element.value = dateStr.replace('to', '-');
                const customClass = instance.element.getAttribute('data-class');
                instance.calendarContainer.classList.add(customClass);
            },
            onChange: (selectedDates, dateStr, instance) => {
                instance.element.value = dateStr.replace('to', '-');
            },
        });

        flatpickr('.form-datepicker', {
            mode: 'single',
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'M j, Y',
            prevArrow:
                '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
                '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });
    }, []);

    const fetchSellerInforForDashboard = useCallback(async () => {
        try {
            const response = await getSellerInforForDashboard(token);
            setSellerInfor(response);
            console.log('SellerInforForDashboard data in ECommerceDoashboard: ', response);
        } catch (error) {
            console.error('Failed to fetch getSellerInforForDashboard:', error);
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetchSellerInforForDashboard();
        };
        fetchData();
    }, []);

    return (
        <body>
            <div class="flex h-screen overflow-hidden">
                <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <main>
                        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
                                <div class="rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div class="flex size-14 items-center justify-center rounded-full bg-background  dark:bg-meta-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-6 text-primary"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                                            />
                                        </svg>
                                    </div>

                                    <div class="mt-4 flex items-end justify-between">
                                        <div>
                                            <h4 class="text-3xl font-medium text-black dark:text-white">{sellerInfor && sellerInfor.totalpro ? sellerInfor.totalpro : 0}</h4>
                                            <span class="text-sm font-medium text-gray-400">Tổng sản phẩm</span>
                                        </div>


                                    </div>
                                </div>

                                <div class="rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div class="flex size-14 items-center justify-center rounded-full bg-background  dark:bg-meta-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-6 text-primary"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                            />
                                        </svg>
                                    </div>

                                    <div class="mt-4 flex items-end justify-between">
                                        <div>
                                            <h4 class="text-3xl font-medium text-black dark:text-white">{sellerInfor && sellerInfor.totalOrder ? sellerInfor.totalOrder : 0}</h4>
                                            <span class="text-sm font-medium text-gray-400">Tổng đơn hàng</span>
                                        </div>


                                    </div>
                                </div>

                                <div class="rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div class="flex size-14 items-center justify-center rounded-full bg-background  dark:bg-meta-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-6 text-primary"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                            />
                                        </svg>
                                    </div>

                                    <div class="mt-4 flex items-end justify-between">
                                        <div>
                                            <h4 class="text-3xl font-medium text-black dark:text-white">{sellerInfor && sellerInfor.interest ? formatNumber(sellerInfor.interest) : 0}  ₫</h4>
                                            <span class="text-sm font-medium text-gray-400">Tổng doanh thu</span>
                                        </div>


                                    </div>
                                </div>

                                <div class="rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div class="flex size-14 items-center justify-center rounded-full bg-background  dark:bg-meta-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-6 text-primary"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    </div>

                                    <div class="mt-4 flex items-end justify-between">
                                        <div>
                                            <h4 class="text-3xl font-medium text-black dark:text-white">{sellerInfor && sellerInfor.totalFollow ? sellerInfor.totalFollow : 0}</h4>
                                            <span class="text-sm font-medium text-gray-400">Tổng lượt theo dõi</span>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
                                <ChartOne />
                                <ChartTwo />
                                <ChartThree />
                                <MapOne />

                                {/* <div class="col-span-12 xl:col-span-8">
                                    <TableProduct inDoashboard={true} />
                                </div>

                                <div class=" col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
                                    <h4 class="mb-6 px-7 text-xl font-bold text-black dark:text-white">Tin nhắn</h4>

                                    <div className="overflow-y-scroll max-h-[300px]">
                                        {Chats.map((chat, index) => (
                                            <a class="flex items-center gap-5 px-7 py-3 hover:bg-gray-3 dark:hover:bg-meta-4">
                                                <div class="relative size-12 rounded-full">
                                                    <img className="rounded-full" src={chat.avt} alt={chat.name} />
                                                    <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-700"></span>
                                                </div>

                                                <div class="flex flex-1 items-center justify-between">
                                                    <div>
                                                        <h5 class="font-medium  text-black dark:text-white">
                                                            {chat.name}
                                                        </h5>
                                                        <p
                                                            class="text-sm max-h-16 overflow-y-clip font-medium
                                                            text-black dark:text-white"
                                                        >
                                                            {chat.message}
                                                        </p>
                                                        <span class="text-xs ml-auto">
                                                            {' '}
                                                            {formatDistanceToNow(new Date(chat.createAt), {
                                                                addSuffix: true,
                                                                locale: vi,
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </body>
    );
};
export default ECommerceDoashboard;
