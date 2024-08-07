import OneColumnChart from '../charts/one-column-bar-chart';
import SearchAPIChart from '../charts/API charts/search-api-chart';

const dates = [
    [1327359600000, 30.95],
    [1327446000000, 31.34],
    [1327532400000, 31.18],
    [1327618800000, 31.05],
    [1327878000000, 31.0],
    [1327964400000, 30.95],
    [1328050800000, 31.24],
    [1328137200000, 31.29],
    [1328223600000, 31.85],
    [1328482800000, 31.86],
    [1328569200000, 32.28],
    [1328655600000, 32.1],
    [1328742000000, 32.65],
    [1328828400000, 32.21],
    [1329087600000, 32.35],
    [1329174000000, 32.44],
    [1329260400000, 32.46],
    [1329346800000, 32.86],
    [1329433200000, 32.75],
    [1329778800000, 32.54],
    [1329865200000, 32.33],
    [1329951600000, 32.97],
    [1330038000000, 33.41],
    [1330297200000, 33.27],
    [1330383600000, 33.27],
    [1330470000000, 32.89],
    [1330556400000, 33.1],
    [1330642800000, 33.73],
    [1330902000000, 33.22],
    [1330988400000, 31.99],
    [1331074800000, 32.41],
    [1331161200000, 33.05],
    [1331247600000, 33.64],
    [1331506800000, 33.56],
    [1331593200000, 34.22],
    [1331679600000, 33.77],
    [1331766000000, 34.17],
    [1331852400000, 33.82],
    [1332111600000, 34.51],
    [1332198000000, 33.16],
    [1332284400000, 33.56],
    [1332370800000, 33.71],
    [1332457200000, 33.81],
    [1332712800000, 34.4],
    [1332799200000, 34.63],
    [1332885600000, 34.46],
    [1332972000000, 34.48],
    [1333058400000, 34.31],
    [1333317600000, 34.7],
    [1333404000000, 34.31],
    [1333490400000, 33.46],
    [1333576800000, 33.59],
    [1333922400000, 33.22],
    [1334008800000, 32.61],
    [1334095200000, 33.01],
    [1334181600000, 33.55],
    [1334268000000, 33.18],
    [1334527200000, 32.84],
    [1334613600000, 33.84],
    [1334700000000, 33.39],
    [1334786400000, 32.91],
    [1334872800000, 33.06],
    [1335132000000, 32.62],
    [1335218400000, 32.4],
    [1335304800000, 33.13],
    [1335391200000, 33.26],
    [1335477600000, 33.58],
    [1335736800000, 33.55],
    [1335823200000, 33.77],
    [1335909600000, 33.76],
    [1335996000000, 33.32],
    [1336082400000, 32.61],
    [1336341600000, 32.52],
    [1336428000000, 32.67],
    [1336514400000, 32.52],
    [1336600800000, 31.92],
    [1336687200000, 32.2],
    [1336946400000, 32.23],
    [1337032800000, 32.33],
    [1337119200000, 32.36],
    [1337205600000, 32.01],
    [1337292000000, 31.31],
    [1337551200000, 32.01],
    [1337637600000, 32.01],
    [1337724000000, 32.18],
    [1337810400000, 31.54],
    [1337896800000, 31.6],
    [1338242400000, 32.05],
    [1338328800000, 31.29],
    [1338415200000, 31.05],
    [1338501600000, 29.82],
    [1338760800000, 30.31],
    [1338847200000, 30.7],
    [1338933600000, 31.69],
    [1339020000000, 31.32],
    [1339106400000, 31.65],
    [1339365600000, 31.13],
    [1339452000000, 31.77],
    [1339538400000, 31.79],
    [1339624800000, 31.67],
    [1339711200000, 32.39],
    [1339970400000, 32.63],
    [1340056800000, 32.89],
    [1340143200000, 31.99],
    [1340229600000, 31.23],
    [1340316000000, 31.57],
    [1340575200000, 30.84],
    [1340661600000, 31.07],
    [1340748000000, 31.41],
    [1340834400000, 31.17],
    [1340920800000, 32.37],
    [1341180000000, 32.19],
    [1341266400000, 32.51],
    [1341352800000, 32.53],
    [1341439200000, 32.83],
    [1341525600000, 32.8],
    [1341784800000, 32.44],
    [1341871200000, 32.65],
    [1341957600000, 32.64],
    [1342044000000, 32.27],
    [1342130400000, 32.1],
    [1342389600000, 32.47],
    [1342476000000, 32.23],
    [1342562400000, 32.5],
];
const AdminDoashboard = () => {
    return (
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-44">
                <div class="flex justify-between gap-4 mb-4">
                    <div class="w-full shadow-sm  rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
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
                                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                />
                            </svg>
                        </div>

                        <div class="mt-4 flex items-end justify-between">
                            <div>
                                <h4 class="text-3xl font-medium text-black dark:text-white">440</h4>
                                <span class="text-sm font-medium text-gray-400">Người dùng mới</span>
                            </div>
                        </div>
                        <OneColumnChart />
                    </div>

                    <div class="w-full  shadow-sm rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
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
                                <h4 class="text-3xl font-medium text-black dark:text-white">245</h4>
                                <span class="text-sm font-medium text-gray-400">Sản phẩm mới</span>
                            </div>
                        </div>
                        <OneColumnChart />
                    </div>
                </div>

                <div class="flex items-center justify-center h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <SearchAPIChart dates={dates} />
                </div>
            </div>
        </div>
    );
};
export default AdminDoashboard;
