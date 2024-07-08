import React, { useState, useEffect } from 'react';
import DefaultImage from '../../../../../assets/imageDefault.jpg';
import { cloudinaryConfig } from '../../../../../cloudinaryConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    addProductApi, addProductOptionsApi, addProductOptionChildrenApi
    , updateProductApi, updateProductOptionChildrenApi, deleteOptionChildApi
} from '../../../../../services/SellerApi/sellerApi'

const cartesianProduct = (formValues, arr1, arr2) => {
    let result = [];
    console.log('arr1: ', arr1);
    console.log('arr2: ', arr2);
    if (arr1 === undefined) {
        console.log('ar1 null')
        return result;
    }
    if (arr2 === undefined) {
        console.log('ar2 null')

        for (let i = 0; i < arr1.length; i++) {

            result.push({
                option1: arr1[i],
                option2: null,
                name: `${formValues.productName} - (${arr1[i].name})`,
                price: "",
                image: null,
                option1ValuesId: null,
                option2ValuesId: null,

            });
        }
        return result;
    }
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            result.push({
                option1: arr1[i],
                option2: arr2[j],
                name: `${formValues.productName} - (${arr1[i].name} - ${arr2[j].name})`,
                price: "",
                image: null,
                option1ValuesId: null,
                option2ValuesId: null,
            });
        }
    }
    return result;
};
const FormProductChildren = ({ action, product, useroption, open, formValues, files, options, optionValues, combinations, setCombinations }) => {
    const token = localStorage.getItem('token');
    const option1Values = options && options[0]?.values;
    const option2Values = options && options[1]?.values;
    const [deleteChildrenOption, setDeleteChildrenOption] = useState([]);
    console.log('option1Values: ', option1Values);
    console.log('option2Values: ', option2Values);
    console.log('optionValues: ', optionValues);
    console.log('options: ', options);

    useEffect(() => {
        if (action === 1 || action === 2) {
            if (product.productChildren && product.productChildren.length > 0) {
                const productChildrenCombinations = product.productChildren.map(product => ({
                    childId: product.id,
                    name: product.name,
                    option1: product.option1,
                    option2: product.option2,
                    price: product.price,
                    image: { preview: product.thumbnail_url },
                    option1ValuesId: product.optionValuesID1,
                    option2ValuesId: product.optionValuesID2
                }));
                setCombinations(productChildrenCombinations);

            }
        }
        else {
            if (!combinations) {
                const newCombinations = cartesianProduct(formValues, option1Values, option2Values);
                setCombinations(newCombinations);
            }
        }

    }, []);

    const handleOptionNameChange = (e, combinationIndex) => {
        const newCombinations = [...combinations];
        newCombinations[combinationIndex].name = e.target.value;
        setCombinations(newCombinations);
    };


    const handleOptionValueChange = (e, combinationIndex) => {
        const newCombinations = [...combinations];
        newCombinations[combinationIndex].price = e.target.value;
        setCombinations(newCombinations);
    };

    const handleRemoveOption = (index) => {
        // Sao chép mảng combinations hiện tại
        const newCombinations = [...combinations];
        // Lấy chilId của phần tử tại index
        const childIdToRemove = newCombinations[index].childId;
        // Thêm chilId vào mảng deleteChildrenOption
        const newDeleteChildrenOption = [...deleteChildrenOption]
        newDeleteChildrenOption.push(childIdToRemove)
        setDeleteChildrenOption(newDeleteChildrenOption);
        // Xóa phần tử theo index
        newCombinations.splice(index, 1);
        // Cập nhật combinations với mảng mới
        setCombinations(newCombinations);
    };


    const handleFileInputChange = (e, combinationIndex) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const newCombinations = [...combinations];
            newCombinations[combinationIndex].image = {
                file: file,
                preview: fileURL,
            };
            setCombinations(newCombinations);
        }
    };

    const handleClose = () => {
        open(false); // Đóng form bằng cách gọi hàm 'open' với giá trị 'false'
    };

    const handleOptionClick = (option) => {
        useroption(option);
    };


    const safeCombinations = Array.isArray(combinations) ? combinations : [];
    const uploadImages = async (files) => {
        if (action === 0) {
            const uploadPromises = Object.values(files).map((file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append('file', file.file); // Sử dụng file thực tế thay vì preview URL
                    formData.append('upload_preset', cloudinaryConfig.upload_preset);

                    fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`, {
                        method: 'POST',
                        body: formData
                    })
                        .then((response) => response.json())
                        .then((data) => resolve(data.secure_url))
                        .catch((error) => reject(error));
                });
            });

            return Promise.all(uploadPromises);
        }
        const imageUrls = product.images.map(product => product.image);
        return imageUrls

    };

    const uploadImageToCloudinary = async (image) => {
        try {

            if (action === 1 && image.file === null || action === 1 && image.file === undefined) {
                return image.preview;
            }
            if (action === 0 && image.file === null || action === 0 && image.file === undefined) {
                return;
            }
            const formData = new FormData();
            formData.append('file', image.file); // Sử dụng file thực tế thay vì preview URL
            formData.append('upload_preset', cloudinaryConfig.upload_preset);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            const data = await response.json();
            return data.secure_url;



        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    // const handleAddProduct = async () => {
    //     console.log('combinations: ', combinations);
    // }


    const handleAddProduct = async () => {
        const mergedOptions = [];
        try {
            const uploadedImages = await uploadImages(files); // Upload images to Cloudinary
            const updatedFormValues = {
                ...formValues,
                images: uploadedImages
            };
            const productData = await addProductApi(updatedFormValues, token);
            // const productData = 1;




            if (productData) {
                if (options) {
                    for (let i = 0; i < options.length; i++) {
                        const option = options[i];
                        const values = optionValues[i] || []; // Xử lý khi optionValues[i] không tồn tại hoặc có ít hơn số lượng values

                        const newOption = {
                            idProduct: productData.iD_NK,
                            // idProduct: 1,
                            name: option.name,
                            optionNumber: i + 1,
                            values: []
                        };

                        for (let j = 0; j < option.values.length; j++) {
                            const valueObj = values[j] || {}; // Xử lý khi không có đối tượng tương ứng trong optionValues

                            let imageUrl = ''; // Mặc định imageUrl là chuỗi rỗng nếu không có hình ảnh

                            if (valueObj.image) {
                                // Upload hình ảnh lên Cloudinary
                                imageUrl = await uploadImageToCloudinary(valueObj.image);
                            }

                            // Thêm vào đối tượng newOption
                            newOption.values.push({
                                value: option.values[j].name,
                                image: imageUrl
                            });
                        }

                        const productOptionsData = await addProductOptionsApi(newOption);
                        if (productOptionsData) {
                            combinations.forEach(combination => {
                                // Tìm và cập nhật option1ValuesId
                                const option1Value = productOptionsData.optionvalue.find(
                                    ov => ov.option.id === 1 && ov.name === combination.option1.name
                                );
                                if (option1Value) {
                                    combination.option1ValuesId = option1Value.id;
                                }

                                // Tìm và cập nhật option2ValuesId
                                const option2Value = productOptionsData.optionvalue.find(
                                    ov => ov.option.id === 2 && ov.name === combination.option2.name
                                );
                                if (option2Value) {
                                    combination.option2ValuesId = option2Value.id;
                                }
                            });

                            mergedOptions.push(newOption);
                        }
                    }

                    console.log('mergedOptions: ', mergedOptions);
                }

                if (combinations) {
                    for (let i = 0; i < combinations.length; i++) {

                        const valueObj = combinations[i];
                        const imageUrl = await uploadImageToCloudinary(valueObj.image);
                        const newOptionChildren = {
                            idProduct: productData.iD_NK,
                            price: valueObj.price,
                            optionValuesID1: valueObj.option1ValuesId,
                            optionValuesID2: valueObj.option2ValuesId,
                            thumbnail_url: imageUrl
                        };
                        const productChildren = await addProductOptionChildrenApi(newOptionChildren, token);
                        if (productChildren) {
                            console.log('thêm option children thành công phần tử: ', productChildren);
                        }
                        else {
                            console.log('lỗi khi thêm sản phẩm thứ : ', newOptionChildren);
                        }

                    }
                }
            }

            toast.success('Thêm sản phẩm thành công');
            setTimeout(() => {
                handleClose();
            }, 2000);


            // Proceed with form submission logic
        } catch (error) {
            console.error('Error add product:', error);
        }
    }


    // const handleUpdateProduct = async () => {
    //     console.log('combinations: ', combinations);

    // }

    const handleUpdateProduct = async () => {
        const mergedOptions = [];
        try {
            const uploadedImages = await uploadImages(files); // Upload images to Cloudinary
            const updatedFormValues = {
                ...formValues,
                images: uploadedImages
            };
            const productData = await updateProductApi(product.product.iD_NK, updatedFormValues, token);
            // const productData = 1;




            if (productData) {

                if (combinations) {
                    for (let i = 0; i < combinations.length; i++) {

                        const valueObj = combinations[i];
                        const imageUrl = await uploadImageToCloudinary(valueObj.image);
                        const updateOptionChildren = {
                            idProduct: product.product.iD_NK,
                            price: valueObj.price,
                            optionValuesID1: valueObj.option1ValuesId,
                            optionValuesID2: valueObj.option2ValuesId,
                            thumbnail_url: imageUrl
                        };
                        const productChildren = await updateProductOptionChildrenApi(updateOptionChildren, token);
                        if (productChildren) {
                            console.log('Sửa option children thành công phần tử: ', updateOptionChildren);
                        }
                        else {
                            console.log('lỗi khi sửa sản phẩm thứ : ', updateOptionChildren);
                        }

                    }
                }
            }
            if (deleteChildrenOption.length > 0) {
                for (let i = 0; i < deleteChildrenOption.length; i++) {
                    const deleteChildData = await deleteOptionChildApi(deleteChildrenOption[i], token);
                    if (deleteChildData) {
                        console.log('xóa thành công child,: ', deleteChildrenOption[i]);
                    }
                }
            }

            toast.success('Sửa sản phẩm thành công');
            setTimeout(() => {
                handleClose();
            }, 2000);


            // Proceed with form submission logic
        } catch (error) {
            console.error('Error update product:', error);
        }
    }

    return (
        <div className="relative h-full max-h-screen overflow-y-scroll placeholder:w-full lg:px-6 lg:pt-4 lg:pb-12">
            <div onClick={handleClose} className="absolute top-0 right-0 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-7"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </div>

            <div className="w-full h-[95%] max-w-5xl mx-auto overflow-y-scroll">
                {safeCombinations.length > 0 ? safeCombinations.map((combination, combinationIndex) => (
                    <div key={combinationIndex} className="mb-4 shadow lg:px-6 lg:py-6 rounded-r-md">
                        <div className="flex items-center justify-between lg:mb-4">
                            <div className="w-4/5">
                                <label
                                    htmlFor={`productName-${combinationIndex}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tên sản phẩm
                                </label>
                                <input
                                    type="text"
                                    id={`productName-${combinationIndex}`}
                                    name={`productName-${combinationIndex}`}
                                    value={combination.name}
                                    onChange={(e) => handleOptionNameChange(e, combinationIndex)}
                                    className="block w-full p-2 mt-1 border border-gray-300 rounded"
                                    required
                                    disabled={action === 2 || action === 1 || action === 0}
                                />
                            </div>
                            {action !== 2 && (
                                <button onClick={() => handleRemoveOption(combinationIndex)} className="text-red-500">
                                    Xóa sản phẩm
                                </button>
                            )}
                        </div>

                        <div className="flex justify-between gap-12 mb-4 ml-auto">
                            <div className="w-1/2">
                                <label
                                    htmlFor={`productPrice-${combinationIndex}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Giá sản phẩm
                                </label>
                                <input
                                    type="text"
                                    id={`productPrice-${combinationIndex}`}
                                    name={`productPrice-${combinationIndex}`}
                                    value={combination.price}
                                    onChange={(e) => handleOptionValueChange(e, combinationIndex)}
                                    className="block w-full p-2 mt-1 border border-gray-300 rounded"
                                    required
                                    disabled={action === 2}
                                />
                            </div>
                            <div className="flex items-center space-x-6">
                                {action !== 2 && (
                                    <label className="block">
                                        <input
                                            type="file"
                                            id={`file_input_${combinationIndex}`}
                                            onChange={(e) => handleFileInputChange(e, combinationIndex)}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        />
                                    </label>
                                )}
                                <div className="shrink-0">
                                    <img
                                        id="preview_img"
                                        className="object-cover h-[88px] w-[88px]"
                                        src={combination.image?.preview || DefaultImage}
                                        alt="Current profile photo"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (<p>
                    Sản phẩm không có lựa chọn
                </p>)}
            </div>

            <div className="flex lg:mt-4">
                <button
                    onClick={() => useroption('formproductoption')}
                    className="flex items-center underline lg:ml-4 lg:px-4 lg:py-3"
                >
                    Quay lại
                </button>
                {action === 0 && (
                    <>
                        <button className="flex items-center ml-auto text-white rounded-lg hover:bg-primary/85 lg:mr-4 bg-primary/70 lg:px-4 lg:py-3"
                            onClick={handleAddProduct}
                        >

                            Đăng kí
                        </button>
                        <ToastContainer />
                    </>

                )}
                {action === 1 && (
                    <>
                        <button className="flex items-center ml-auto text-white rounded-lg hover:bg-primary/85 lg:mr-4 bg-primary/70 lg:px-4 lg:py-3"
                            onClick={handleUpdateProduct}
                        >

                            Cập nhật
                        </button>
                        <ToastContainer />
                    </>

                )}
            </div>
        </div>
    );
};

export default FormProductChildren;
