import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
const ChartThree = () => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Số đơn hàng',
                type: 'column',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },

            {
                name: 'Lượt tăng theo dõi',
                type: 'line',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
            },
            stroke: {
                width: [0, 2, 5],
                curve: 'smooth',
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                },
            },
            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: 'vertical',
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
                '09/01/2024',
                '10/01/2024',
                '11/01/2024',
            ],
            markers: {
                size: 0,
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: '',
                },
                min: 0,
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== 'undefined') {
                            return y.toFixed(0);
                        }
                        return y;
                    },
                },
            },
        },
    });

    return (
        <div className="col-span-12 px-2 pb-3 bg-white border rounded-sm border-stroke pt-7 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:col-span-5">
            <div className="justify-between gap-4 mb-3 sm:flex">
                <div>
                    <h4 className="text-xl font-bold text-black dark:text-white">
                        Tương quan lượt tăng theo dõi với số đơn hàng
                    </h4>
                </div>
            </div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ChartThree;
