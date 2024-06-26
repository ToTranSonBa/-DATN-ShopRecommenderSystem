import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SearchAPIChart = ({ dates }) => {
    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                name: 'XYZ MOTORS',
                data: dates,
            },
        ],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true,
                },
                toolbar: {
                    autoSelected: 'zoom',
                },
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 0,
            },

            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100],
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return (val / 1000000).toFixed(0);
                    },
                },
                title: {
                    text: 'ms',
                },
            },
            xaxis: {
                type: '',
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return (val / 1000000).toFixed(0);
                    },
                },
            },
        },
    });

    return (
        <div className="w-full p-4">
            <h5 className="pb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                Tốc độ phản hồi API tìm kiếm
            </h5>

            <div id="chart" className="w-full mx-auto">
                <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="area" height={500} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default SearchAPIChart;
