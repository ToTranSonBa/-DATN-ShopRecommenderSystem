import React, { useEffect } from 'react';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.css'; // Import CSS nếu cần
import '../../us-aea-en'; // Import bản đồ của bạn
import 'jsvectormap/dist/maps/world.js';

const Map01 = () => {
    useEffect(() => {
        const mapSelector = document.querySelector('#mapOne');

        if (mapSelector) {
            const mapOne = new jsVectorMap({
                selector: '#mapOne',
                map: 'world',
                zoomButtons: true,

                regionStyle: {
                    initial: {
                        fill: '#C8D0D8',
                    },
                    hover: {
                        fillOpacity: 1,
                        fill: '#3056D3',
                    },
                },
                regionLabelStyle: {
                    initial: {
                        fontFamily: 'Satoshi',
                        fontWeight: 'semibold',
                        fill: '#fff',
                    },
                    hover: {
                        cursor: 'pointer',
                    },
                },

                labels: {
                    regions: {
                        render(code) {
                            return code.split('-')[1];
                        },
                    },
                },
            });
        }
    }, []);

    return (
        <div className="col-span-12 py-6 bg-white border rounded-sm border-stroke px-7 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
            <h4 className="mb-2 text-xl font-bold text-black dark:text-white">Bản đồ</h4>
            <div id="mapOne" className="mapOne map-btn h-90"></div>
        </div>
    );
};

export default Map01;
