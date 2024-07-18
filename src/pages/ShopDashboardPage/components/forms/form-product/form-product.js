import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getCategoriesApi, getBrandsApi } from '../../../../../services/SellerApi/sellerApi'
const FormProduct = ({ action, product, useroption, open, formValues, setFormValues, files, setFiles }) => {


    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [mode, setMode] = useState(action); // Khởi tạo giá trị ban đầu cho mode bằng action
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    console.log('action in form product: ', action);
    console.log('product data in form product: ', product);

    const addFile = (file) => {
        const isImage = file.type.startsWith('image');
        if (!isImage) {
            alert('Only image files are allowed!');
            return;
        }

        const objectURL = URL.createObjectURL(file);

        setFiles((prevFiles) => ({
            ...prevFiles,
            [objectURL]: file,
        }));
    };

    const fetchCategories = useCallback(async () => {
        try {
            const response = await getCategoriesApi();
            setCategories(response.data);
            console.log('fetchCategories: ', response.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    }, []);

    const fetchBrands = useCallback(async () => {
        try {
            const response = await getBrandsApi();
            setBrands(response);
            console.log('fetchBrands: ', response);
        } catch (error) {
            console.error('Failed to fetch Brands:', error);
        }
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
            await fetchBrands();
        };
        fetchData();
    }, []);


    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggedOver(false);
        for (const file of e.dataTransfer.files) {
            addFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isDraggedOver) {
            setIsDraggedOver(true);
        }
    };

    const handleDragLeave = () => {
        setIsDraggedOver(false);
    };

    const handleFileInputChange = (e) => {
        const { files: newFiles } = e.target;
        const newFilesObj = Array.from(newFiles).reduce((acc, file, index) => {
            const fileURL = URL.createObjectURL(file);
            const key = `new-image-${Object.keys(files).length + index}`; // Unique key
            acc[key] = {
                name: file.name,
                type: file.type.startsWith('image') ? 'image' : 'other',
                preview: fileURL,
                file: file
            };
            return acc;
        }, {});
        setFiles({ ...files, ...newFilesObj });
    };

    const handleRemoveFile = (key) => {
        const newFiles = { ...files };
        URL.revokeObjectURL(newFiles[key].preview);
        delete newFiles[key];
        setFiles(newFiles);
    };

    const handleSubmit = (e) => {
        alert(`Submitted Files:\n${JSON.stringify(files)}`);
        console.log(files);
        // Implement your submit logic here
        e.preventDefault();
        console.log('Form Values:', formValues);
    };

    const handleCancel = () => {
        setFiles({});
        // Implement your cancel logic here
    };

    const handleOptionClick = (option) => {
        // Update useroption in SellerDashboard component
        useroption(option);
    };



    const handleClose = () => {
        console.log('Close');

        open(false); // Đóng form bằng cách gọi hàm 'open' với giá trị 'false'
    };




    useEffect(() => {
        if (action === 1 && product) {
            setFormValues({
                productName: product.product.name || '',
                productPrice: product.product.price || '',
                shortDescription: product.product.shortDescription || '',
                description: product.product.description || '',
                category: product.product.category_LV0_NK || '',
                brand: product.product.brandID_NK || '',
                productQuantitySold: product.product.quantity || 0,
            });

            const initialFiles = product.images.reduce((acc, image, index) => {
                acc[`image-${index}`] = {
                    name: `Image ${index + 1}`,
                    type: 'image',
                    preview: image.image,
                    file: null
                };
                return acc;
            }, {});
            setFiles(initialFiles);
        } else if (action === 2 && product) {
            setFormValues({
                productName: product.product.name || '',
                productPrice: product.product.price || '',
                shortDescription: product.product.shortDescription || '',
                description: product.product.description || '',
                category: product.product.category_LV0_NK || '',
                brand: product.product.brandID_NK || '',
                productQuantitySold: product.product.quantity || 0,
            });

            const initialFiles = product.images.reduce((acc, image, index) => {
                acc[`image-${index}`] = {
                    name: `Image ${index + 1}`,
                    type: 'image',
                    preview: image.image,
                    file: null

                };
                return acc;
            }, {});
            setFiles(initialFiles);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'productQuantitySold' ? parseInt(value) : value; // Ép kiểu sang số nếu là productQuantitySold
        setFormValues({ ...formValues, [name]: newValue });
    };

    const validateForm = () => {
        const { images, productQuantitySold, ...rest } = formValues; // Bỏ qua trường images và productQuantitySold
        return Object.values(rest).every(value => {
            if (typeof value === 'number') {
                return value > 0; // Kiểm tra giá trị số lớn hơn 0
            }
            return value.trim() !== ''; // Kiểm tra các giá trị không phải số
        }) && productQuantitySold > 0; // Kiểm tra productQuantitySold là số và lớn hơn 0
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        if (Object.keys(files).length === 0) {
            alert('Vui lòng thêm ít nhất một hình ảnh cho sản phẩm.');
            return;
        }

        if (!validateForm()) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }



        handleOptionClick('formproductoption');
    };


    return (
        <div className="relative max-w-screen-2xl">
            <div onClick={handleClose} className="absolute top-0 right-0 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-7"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </div>
            <div className="flex overflow-hidden sm:px-8 md:px-8 sm:py-8">
                <main className="w-full max-w-sm mx-auto lg:p-4">
                    <article
                        aria-label="File Upload Modal"
                        className={`relative flex flex-col h-full w-full shadow rounded-md`}
                    >
                        <section className="flex flex-col w-full h-full overflow-y-scroll">
                            {action === 0 && (
                                <header className="flex flex-col items-center justify-center w-full py-12 border-2 border-gray-400 border-dashed">
                                    <p className="flex flex-wrap justify-center mb-3 font-semibold text-gray-900">
                                        <span className="text-sm text-center text-gray-500">
                                            Kéo và thả ảnh của bạn <br />
                                            hoặc
                                        </span>
                                    </p>
                                    <input
                                        id="hidden-input"
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileInputChange}
                                        accept="image/*" disabled={mode === 2}
                                    />
                                    <button
                                        id="button"
                                        className="px-3 py-1 mt-2 text-sm bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        onClick={() => document.getElementById('hidden-input').click()}
                                    >
                                        Chọn ảnh
                                    </button>
                                </header>
                            )}

                            <h1 className="pt-8 pb-3 font-semibold text-gray-900 sm:text-lg">Ảnh đã chọn</h1>

                            <ul id="gallery" className="grid h-auto max-h-full grid-cols-2 gap-2 overflow-y-auto">
                                {Object.keys(files).length === 0 && (
                                    <li
                                        id="empty"
                                        className="flex flex-col items-center justify-center w-full h-full col-span-2 text-center"
                                    >
                                        <img
                                            className="w-32 mx-auto"
                                            src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                            alt="no data"
                                        />
                                        <span className="text-gray-500 text-small">Chưa có ảnh được chọn</span>
                                    </li>
                                )}
                                {Object.keys(files).map((key) => (
                                    <li key={key} className="block w-full p-1 max-h-28">
                                        <article className="relative w-full h-full bg-gray-100 rounded-md cursor-pointer max-h-28 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            {files[key].type === 'image' ? (
                                                <img
                                                    src={files[key].preview}
                                                    alt={files[key].name}
                                                    className="object-cover w-full rounded-md h-28"
                                                />
                                            ) : (
                                                <h1 className="flex-1">{files[key].name}</h1>
                                            )}
                                            {action !== 2 && (
                                                <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full p-2 text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                    <span className="truncate">{files[key].name}</span>
                                                    <div className="flex items-center justify-between w-full mt-auto">
                                                        <span className="text-xs">
                                                            {files[key].type === 'image' ? 'Image' : 'File'}
                                                        </span>
                                                        <button
                                                            className="p-1 ml-2 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
                                                            onClick={() => handleRemoveFile(key)}
                                                        >
                                                            <svg
                                                                className="w-4 h-4 pointer-events-none fill-current"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    className="pointer-events-none"
                                                                    d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </article>
                </main>

                <div className="w-full max-w-screen-lg mx-auto border rounded shadow h-min lg:p-4 lg:ml-4">
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            Tên sản phẩm
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formValues.productName}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                            disabled={mode === 2} // Disable for details mode
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                            Giá sản phẩm
                        </label>
                        <input
                            type="number"
                            id="productPrice"
                            name="productPrice"
                            value={formValues.productPrice}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                            disabled={mode === 2} // Disable for details mode
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                            Mô tả ngắn
                        </label>
                        <input
                            type="text"
                            id="shortDescription"
                            name="shortDescription"
                            value={formValues.shortDescription}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                            disabled={mode === 2} // Disable for details mode
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Mô tả
                        </label>
                        <AutoResizeTextarea
                            placeholder="Mô tả sản phẩm"
                            value={formValues.description}
                            onChange={handleChange}
                            mode={action}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Danh mục
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formValues.category}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                            disabled={mode === 2} // Disable for details mode
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map((category) => (
                                <option key={category.category.iD_NK} value={category.category.iD_NK}>
                                    {category.category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Thương hiệu
                        </label>
                        <select
                            id="brand"
                            name="brand"
                            value={formValues.brand}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                            disabled={mode === 2} // Disable for details mode
                        >
                            <option value="">Chọn Brand</option>
                            {brands.map((brand) => (
                                <option key={brand.brand.iD_NK} value={brand.brand.iD_NK}>
                                    {brand.brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productQuantitySold" className="block text-sm font-medium text-gray-700">
                            Số lượng bán
                        </label>
                        <input
                            type="number"
                            id="productQuantitySold"
                            name="productQuantitySold"
                            value={formValues.productQuantitySold}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                            disabled={mode === 2} // Disable for details mode
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleNextClick}
                className="flex items-center ml-auto text-white rounded-lg lg:mr-4 bg-primary/70 lg:px-4 lg:py-3"
            >
                Tiếp theo{' '}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5 font-semibold"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

const AutoResizeTextarea = ({ value, onChange, placeholder, mode }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const handleChange = (e) => {
        onChange(e); // Gọi hàm onChange từ props để cập nhật giá trị
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };



    return (
        <textarea
            ref={textareaRef}
            className="w-full p-2 border border-gray-300 rounded-md resize-none min-h-44 focus:ring-0 focus:ring-offset-0 focus:outline-none lg:p-2"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={mode === 2}
            name="description" // Đảm bảo có tên trường cho handleChange
        />
    );
};

export default FormProduct;
