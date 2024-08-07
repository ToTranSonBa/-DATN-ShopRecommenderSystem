import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const OneColumnChart = () => {
    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return '$ ' + val + ' thousands';
                    },
                },
            },
        },
    });

    return (
        <div className="p-4">
            <div id="chart" className="mx-auto max-w-7xl">
                <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="bar" height={200} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default OneColumnChart;
