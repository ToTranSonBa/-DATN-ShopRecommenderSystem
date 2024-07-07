import React, { useState, useEffect } from 'react';
import OneLineChart from '../charts/one-line-chart';

const AlgorithmNeighBase = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const logMessages = [
            '2024-06-19 08:00:00 - Bắt đầu quá trình chạy thuật toán KNN',
            '2024-06-19 08:00:01 - Tải dữ liệu Iris từ thư viện sklearn.datasets',
            '2024-06-19 08:00:02 - Chia dữ liệu thành tập huấn luyện và tập kiểm tra',
            // Thêm các log tin nhắn khác ở đây
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < logMessages.length) {
                setLogs((prevLogs) => [...prevLogs, logMessages[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div class="p-4 sm:ml-64 h-min">
            <div class="p-4 border-2 h-full border-dashed rounded-lg dark:border-gray-700 mt-20">
                <div class="flex h-1/2  items-center justify-center w-full mb-4 rounded  dark:bg-gray-800">
                    <OneLineChart className={`h-full`} />
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="flex relative col-span-2 items-center justify-center rounded h-72 overflow-y-auto bg-gray-100  dark:bg-gray-800">
                        <div className="absolute top-0 right-0 z-50 h-12 text-lg font-semibold lg:p-4">
                            Tiến trình thực thi
                        </div>
                        <div className="w-full p-4 overflow-auto text-sm text-gray-600 ">
                            {logs.map((log, idx) => (
                                <p key={idx} className="mb-1">
                                    {log}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div class="flex justify-stretch items-center lg:gap-4  rounded  h-28 dark:bg-gray-800">
                        <button className="w-full text-white rounded-md cursor-pointer bg-primary lg:px-4 lg:py-2">
                            Cập nhật
                        </button>
                        <button className="w-full text-white bg-red-600 rounded-md lg:px-4 lg:py-2">Huỷ</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AlgorithmNeighBase;
