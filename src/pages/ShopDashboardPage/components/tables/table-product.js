import { formatDistanceToNow, format } from 'date-fns';
import { vi } from 'date-fns/locale'; // Import locale for Vietnamese language
import React, { useState, useCallback, useEffect } from 'react';
import FormProductManager from '../forms/form-product';
import MaxWidthWrapper from '../../../../components/MaxWidthWrapper';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { Value } from 'sass';
import { getSellerApi, getProductsBySellerApi, deleteProductApi } from '../../../../services/SellerApi/sellerApi';


const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const TableProduct = ({ inDoashboard = false }) => {

    const token = localStorage.getItem('token');
    const [isOpenDropdownAddProduct, setIsOpenDropdownAddProduct] = useState(false);
    const [isOpenDropdownEditProduct, setIsOpenDropdownEditProduct] = useState(false);
    const [isOpenDropdownDetailProduct, setIsOpenDropdownDetailProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State để lưu sản phẩm được chọn để chỉnh sửa
    const [sellerData, setSellerData] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [products, setProducts] = useState([]);
    const [productDeleted, setProductDeleted] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(false);


    const fetchSeller = useCallback(async (page, size) => {
        try {
            const seller = await getSellerApi(token);
            if (seller) {
                const productsbySeller = await getProductsBySellerApi(page, size, seller.iD_NK);
                console.log('productsbySeller: ', productsbySeller);
                setProducts(productsbySeller.products);
            }
        } catch (error) {
            console.error('Failed to fetch fetchSeller:', error);
        }
    }, [token]);

    const handleDeleteProduct = async (productId) => {
        try {
            const deleteProductData = await deleteProductApi(productId, token);
            if (deleteProductData) {
                setProducts((prevProducts) => prevProducts.filter(product => product.iD_NK !== productId));
                setFetchTrigger(prev => !prev); // Cập nhật state để trigger fetch lại
            }
        } catch (error) {
            console.log('Failed to call deleteProductApi:', error);
        }
    };

    const openEditProductForm = (product) => {
        setSelectedProduct(product);
        setIsOpenDropdownEditProduct(true);
        setFetchTrigger(prev => !prev); // Cập nhật state để trigger fetch lại
    };

    const openDetailProductForm = (product) => {
        setSelectedProduct(product);
        setIsOpenDropdownDetailProduct(true);
        setFetchTrigger(prev => !prev); // Cập nhật state để trigger fetch lại
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchSeller(pageNumber, pageSize);
        };
        fetchData();
    }, [pageNumber, pageSize, fetchTrigger, fetchSeller]);


    // Pagination handlers
    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);

    };

    const handlePageClick = (page) => {
        setPageNumber(page);
    };




    return (
        <>
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {!inDoashboard && (
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
                )}

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="max-w-[10rem] overflow-hidden px-6 py-3">
                                    Tên
                                </th>
                                {!inDoashboard && (
                                    <th scope="col" class="max-w-[20rem] overflow-hidden px-6 py-3">
                                        Mô tả
                                    </th>
                                )}
                                <th scope="col" class="px-6 py-3">
                                    Giá
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Đánh giá
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tổng đánh giá
                                </th>
                                {!inDoashboard && (
                                    <>
                                        <th scope="col" class="px-6 py-3">
                                            Danh mục
                                        </th>
                                        {/* <th scope="col" class="px-6 py-3">
                                            Ngày tạo
                                        </th> */}
                                        <th scope="col" class="px-6 py-3"></th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="overflow-y-auto">
                            {products && products.map((product) => (
                                <tr
                                    key={product.product.iD_NK}
                                    class="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        class={`${inDoashboard === true ? 'max-w-[10rem] overflow-hidden' : ''
                                            } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                                    >
                                        {product.product.iD_NK}
                                    </th>
                                    <td class="w-48 overflow-hidden px-6 py-3">
                                        {!inDoashboard && (
                                            <textarea
                                                disabled
                                                className="w-full bg-transparent border-0 resize-none"
                                                rows={5}
                                            >
                                                {product.product.name}
                                            </textarea>
                                        )}
                                        {inDoashboard && <div className="h-20">{product.name}</div>}
                                    </td>
                                    {!inDoashboard && (
                                        <td class="w-96  overflow-hidden ">
                                            <textarea
                                                disabled
                                                className="resize-none bg-transparent w-full h-28 cols={50} border-0"
                                                rows={5}
                                            >
                                                {product.product.shortDescription}
                                            </textarea>
                                        </td>
                                    )}
                                    <td class="px-6 py-4">{formatNumber(product.product.price)}</td>
                                    <td class="px-6 py-4">{product.product.RatingAvg}</td>
                                    <td class="px-6 py-4">{product.product.RatingTotal}</td>
                                    {!inDoashboard && (
                                        <>
                                            <td class="px-6 py-4">
                                                {!inDoashboard && (
                                                    <textarea
                                                        disabled
                                                        className="w-full bg-transparent border-0 resize-none"
                                                        rows={5}
                                                    >
                                                        {product.category.name}
                                                    </textarea>
                                                )}
                                                {inDoashboard && <div className="h-20">{product.product.Category}</div>}
                                            </td>
                                            {/* <td class="px-6 py-4">
                                                {formatDistanceToNow(new Date(product.product.CreateAt), {
                                                    addSuffix: true,
                                                    locale: vi,
                                                })}
                                            </td> */}
                                            <td class="px-6 py-4 ">
                                                <div class="flex-row items-center space-x-2">
                                                    <div
                                                        onClick={() => openDetailProductForm(product)}
                                                        class="font-medium hover:cursor-pointer w-[80px] bg-green-600/25  lg:px-3 lg:py-1 mx-auto text-center rounded-sm lg:my-2 text-green-700 dark:text-blue-500 hover:underline"
                                                    >
                                                        Chi tiết
                                                    </div>
                                                    <div
                                                        onClick={() => openEditProductForm(product)}
                                                        class="font-medium hover:cursor-pointer w-[80px] bg-blue-600/25  lg:px-3 lg:py-1 mx-auto text-center rounded-sm lg:my-2 text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Sửa
                                                    </div>
                                                    <div
                                                        onClick={() => handleDeleteProduct(product.product.iD_NK)}
                                                        class="font-medium hover:cursor-pointer w-[80px] bg-red-600/25  lg:px-3 lg:py-1 mx-auto text-center rounded-sm lg:my-2 text-red-700 dark:text-blue-500 hover:underline">
                                                        Xoá
                                                    </div>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!inDoashboard && (
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
                                        onClick={handlePreviousPage}
                                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        trước
                                    </a>
                                </li>

                                <li>
                                    <a
                                        onClick={handleNextPage}
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        sau
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    )}
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
                                open={setIsOpenDropdownDetailProduct}
                            />
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
        </>
    );
};
export default TableProduct;
