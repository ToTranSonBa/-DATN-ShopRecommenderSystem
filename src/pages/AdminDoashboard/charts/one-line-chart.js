import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const OneLineChart = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const percentage = 80;

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const options = {
        chart: {
            height: '100%',
            type: 'area',
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: '#1C64F2',
                gradientToColors: ['#1C64F2'],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 6,
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: 0,
            },
        },
        series: [
            {
                name: 'New users',
                data: [6500, 6800, 7000, 6500],
                color: '#1A56DB',
            },
        ],
        xaxis: {
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
    };

    return (
        <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between">
                <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                        Tiến trình thực thi
                    </h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">20h:20m:20s</p>
                </div>
                <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                    12%
                </div>
            </div>
            <div id="area-chart">
                <ReactApexChart options={options} series={options.series} type="area" height="400" />
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${percentage}%` }}
                >
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

export default OneLineChart;
