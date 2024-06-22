import { formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale'; // Import locale for Vietnamese language
import React, { useState, useEffect } from 'react';
import FormProductManager from '../forms/form-product';
import MaxWidthWrapper from '../../../../components/MaxWidthWrapper';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { Value } from 'sass';

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const products = [
    {
        iD_NK: '123',
        name: 'Combo 5 quần lót nam BIZON boxer DA2 thun lạnh cao cấp, quần sịp nam mềm mại co giãn 4 chiều, thấm hút kháng khuẩn tốt',
        shortdes:
            '- Đồ lót nam là một phần không thể thiếu trong tủ đồ của các quý ông, không chỉ vì tính chất bảo vệ nhạy cảm mà còn vì vai trò quan trọng trong việc tôn lên sự tự tin và thẩm mỹ của bản thân. Đặc biệt, quần lót đùi nam không chỉ giúp che chắn mà còn mang lại cảm giác thoải mái và tạo điểm nhấn thẩm mỹ cho các trang phục bên ngoài.Hiện nay, thị trường đồ lót nam đa dạng với nhiều kiểu dáng, chất liệu và màu sắc khác nhau, đáp ứng mọi nhu cầu và sở thích của người tiêu dùng. Từ quần lót đơn giản đến những thiết kế cao cấp, từ chất liệu cotton mềm mại đến các loại vải cao cấp khác, khách hàng có thể dễ dàng lựa chọn sản phẩm phù hợp nhất với họ.',
        price: '126000',
        RatingAvg: '4.9',
        RatingTotal: '1234',
        Category: 'Quân áo thời trang',
        CreateAt: '2024-12-20 10:12:12',
        images: [
            'https://salt.tikicdn.com/ts/product/03/cb/e9/2e12445e8fe2c5efc82b65e86ca14840.jpg',
            'https://salt.tikicdn.com/ts/product/b6/de/b3/8712cc3f74bcf0da63d46f7f4c7f8c72.jpg',
            'https://salt.tikicdn.com/ts/product/ee/c6/9f/bd62cb04140041602496c6ad619b40cf.jpg',
            'https://salt.tikicdn.com/ts/product/1c/46/ed/6e098d0427546c8e2abbf4841200592f.png',
            'https://salt.tikicdn.com/ts/product/d5/93/21/cc98dae75c50185afc01f9e8921f0d12.png',
            'https://salt.tikicdn.com/ts/product/41/eb/f3/747b413ac6f4e0569fef92a3d0fdd231.png',
            'https://salt.tikicdn.com/ts/product/e5/f1/5a/926ad276a29819243b41eb825087ad9e.png',
            'https://salt.tikicdn.com/ts/product/89/36/6a/8c6e28f8619b4c0e132d0b8ed889007d.png',
            'https://salt.tikicdn.com/ts/product/a6/74/ac/283cec826e58f3bb45f6fff4fea53f6b.png',
            'https://salt.tikicdn.com/ts/product/73/ba/2c/31335b536af33ac3fc06cc74bf93e6ec.png',
        ],
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
                        {
                            name: 'Bìa Đen',
                            imagechild:
                                'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                        },
                    ],
                },
                {
                    namevalue: 'Loại a',
                    optionvalue: [
                        {
                            name: 'Bìa Hồng',
                            imagechild:
                                'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                        },
                        {
                            name: 'Bìa Đen',
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
        shortdes:
            '- Đồ lót nam là một phần không thể thiếu trong tủ đồ của các quý ông, không chỉ vì tính chất bảo vệ nhạy cảm mà còn vì vai trò quan trọng trong việc tôn lên sự tự tin và thẩm mỹ của bản thân. Đặc biệt, quần lót đùi nam không chỉ giúp che chắn mà còn mang lại cảm giác thoải mái và tạo điểm nhấn thẩm mỹ cho các trang phục bên ngoài.Hiện nay, thị trường đồ lót nam đa dạng với nhiều kiểu dáng, chất liệu và màu sắc khác nhau, đáp ứng mọi nhu cầu và sở thích của người tiêu dùng. Từ quần lót đơn giản đến những thiết kế cao cấp, từ chất liệu cotton mềm mại đến các loại vải cao cấp khác, khách hàng có thể dễ dàng lựa chọn sản phẩm phù hợp nhất với họ.',
        price: '126000',
        RatingAvg: '4.9',
        RatingTotal: '1234',
        Category: 'Quân áo thời trang',
        CreateAt: '2024-12-20 10:12:12',
        images: [
            'https://salt.tikicdn.com/ts/product/03/cb/e9/2e12445e8fe2c5efc82b65e86ca14840.jpg',
            'https://salt.tikicdn.com/ts/product/b6/de/b3/8712cc3f74bcf0da63d46f7f4c7f8c72.jpg',
            'https://salt.tikicdn.com/ts/product/ee/c6/9f/bd62cb04140041602496c6ad619b40cf.jpg',
            'https://salt.tikicdn.com/ts/product/1c/46/ed/6e098d0427546c8e2abbf4841200592f.png',
            'https://salt.tikicdn.com/ts/product/d5/93/21/cc98dae75c50185afc01f9e8921f0d12.png',
            'https://salt.tikicdn.com/ts/product/41/eb/f3/747b413ac6f4e0569fef92a3d0fdd231.png',
            'https://salt.tikicdn.com/ts/product/e5/f1/5a/926ad276a29819243b41eb825087ad9e.png',
            'https://salt.tikicdn.com/ts/product/89/36/6a/8c6e28f8619b4c0e132d0b8ed889007d.png',
            'https://salt.tikicdn.com/ts/product/a6/74/ac/283cec826e58f3bb45f6fff4fea53f6b.png',
            'https://salt.tikicdn.com/ts/product/73/ba/2c/31335b536af33ac3fc06cc74bf93e6ec.png',
        ],
        Category: 'Quần áo',
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
                        {
                            name: 'Bìa Đen',
                            imagechild:
                                'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                        },
                    ],
                },
                {
                    namevalue: 'Loại a',
                    optionvalue: [
                        {
                            name: 'Bìa Hồng',
                            imagechild:
                                'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                        },
                        {
                            name: 'Bìa Đen',
                            imagechild:
                                'https://salt.tikicdn.com/cache/280x280/ts/product/6f/c4/48/574854f032ae36fc0d0a57b61f588965.jpg',
                        },
                    ],
                },
            ],
        },
    },
];

const TableProduct = () => {
    const [isOpenDropdownAddProduct, setIsOpenDropdownAddProduct] = useState(false);
    const [isOpenDropdownEditProduct, setIsOpenDropdownEditProduct] = useState(false);
    const [isOpenDropdownDetailProduct, setIsOpenDropdownDetailProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State để lưu sản phẩm được chọn để chỉnh sửa

    // Hàm mở form chỉnh sửa sản phẩm
    const openEditProductForm = (product) => {
        setSelectedProduct(product); // Lưu sản phẩm được chọn vào state
        setIsOpenDropdownEditProduct(true); // Mở form chỉnh sửa
    };
    // Hàm mở form chi tiết sản phẩm
    const openDetailProductForm = (product) => {
        setSelectedProduct(product); // Lưu sản phẩm được chọn vào state
        setIsOpenDropdownDetailProduct(true); // Mở form chỉnh sửa
    };

    return (
        <>
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="flex items-start justify-between px-4 py-6 md:px-6 xl:px-8">
                    <div>
                        <h5 class="block text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Sản phẩm
                        </h5>
                        <p class="block mt-1  text-sm antialiased font-normal leading-relaxed text-gray-700">
                            Thông tin chi tiết về các sản phẩm
                        </p>
                    </div>
                    <div class="flex w-full gap-2 shrink-0 md:w-2/3">
                        <div class="w-full md:w-2/3">
                            <div class="relative h-10 w-full min-w-2/3">
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
                    <div
                        onClick={() => {
                            setIsOpenDropdownAddProduct(true);
                        }}
                        className="flex items-center justify-center text-sm text-white rounded-sm cursor-pointer text-nowrap bg-primary lg:px-4 lg:py-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Thêm sản phẩm
                    </div>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {/* <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label for="checkbox-all-search" class="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th> */}
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tên
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Mô tả
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Giá
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Đánh giá
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tổng đánh giá
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Danh mục
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Ngày tạo
                                </th>
                                <th scope="col" class="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.iD_NK}
                                    class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    {/* <td class="w-4 p-4">
                                        <div class="flex items-center">
                                            <input
                                                id="checkbox-table-search-3"
                                                type="checkbox"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label for="checkbox-table-search-3" class="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td> */}
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {product.iD_NK}
                                    </th>
                                    <td class="px-6 py-4">{product.name}</td>
                                    <td class="px-6 py-4">{product.shortdes}</td>
                                    <td class="px-6 py-4">{formatNumber(product.price)}</td>
                                    <td class="px-6 py-4">{product.RatingAvg}</td>
                                    <td class="px-6 py-4">{product.RatingTotal}</td>
                                    <td class="px-6 py-4">{product.Category}</td>
                                    <td class="px-6 py-4">
                                        {formatDistanceToNow(new Date(product.CreateAt), {
                                            addSuffix: true,
                                            locale: vi,
                                        })}
                                    </td>
                                    <td class="px-6 py-4 items-center my-auto flex gap-2 justify-between">
                                        <button
                                            onClick={() => openDetailProductForm(product)} // Gọi hàm mở form chỉnh sửa khi nhấn nút Chi tiết
                                            className="font-medium text-green-700 dark:text-blue-500 hover:underline"
                                        >
                                            Chi tiết
                                        </button>
                                        <button
                                            onClick={() => openEditProductForm(product)} // Gọi hàm mở form chỉnh sửa khi nhấn nút Chi tiết
                                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Sửa
                                        </button>
                                        <button class="font-medium text-red-700 dark:text-blue-500 hover:underline">
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav
                        class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                        aria-label="Table navigation"
                    >
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of{' '}
                            <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                        </span>
                        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <a
                                    href="#"
                                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    1
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    2
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    aria-current="page"
                                    class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                >
                                    3
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    4
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    5
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {isOpenDropdownAddProduct && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
                    <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                        <div className="w-11/12 overflow-auto bg-white h-[85%] lg:px-2 lg:py-2">
                            <FormProductManager open={setIsOpenDropdownAddProduct} />
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
            {isOpenDropdownEditProduct && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
                    <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                        <div className="w-11/12 overflow-auto bg-white h-[85%] lg:px-2 lg:py-2">
                            <FormProductManager
                                action={1}
                                product={selectedProduct}
                                open={setIsOpenDropdownEditProduct}
                            />
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
            {isOpenDropdownDetailProduct && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600/25">
                    <MaxWidthWrapper className={'flex justify-center items-center min-h-screen'}>
                        <div className="w-11/12 overflow-auto bg-white h-[85%] lg:px-2 lg:py-2">
                            <FormProductManager
                                action={2}
                                product={selectedProduct}
                                open={setIsOpenDropdownEditProduct}
                            />
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
        </>
    );
};
export default TableProduct;
