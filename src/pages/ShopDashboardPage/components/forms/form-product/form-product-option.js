import React, { useState, useEffect } from 'react';
import DefaultImage from '../../../../../assets/imageDefault.jpg';
const FormProductOption = ({ action, product, useroption, open, formValues, files, options, setOptions, optionValues, setOptionValues }) => {


    useEffect(() => {
        if (action === 2 || action === 1) {
            // Chế độ xem hoặc sửa
            const initialOptions = product.Option.Value
                ? product.Option.Value.map((option) => ({
                    name: option.namevalue,
                    values: option.optionvalue.map((value) => value.name),
                }))
                : [];
            const initialOptionValues = product.Option.Value.map((option) =>
                option.optionvalue.map((value) => ({ image: value.imagechild })),
            );
            setOptions(initialOptions);
            setOptionValues(initialOptionValues);
        } else {
            // Chế độ thêm
            if (!options) {
                setOptions([{ name: '', values: [''] }]);
                setOptionValues([[]]);
            }

        }
    }, []);

    const handleOptionNameChange = (e, index) => {
        const newOptions = [...options];
        newOptions[index].name = e.target.value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, { name: '', values: [''] }]);
        setOptionValues([...optionValues, []]);
    };

    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
        setOptionValues(optionValues.filter((_, i) => i !== index));
    };

    const handleOptionValueChange = (e, optionIndex, valueIndex) => {
        const newOptions = [...options];
        newOptions[optionIndex].values[valueIndex] = e.target.value;
        setOptions(newOptions);
    };

    const handleAddOptionValue = (index) => {
        const newOptions = [...options];
        newOptions[index].values.push('');
        setOptions(newOptions);

        const newOptionValues = [...optionValues];
        newOptionValues[index].push({ image: '' });
        setOptionValues(newOptionValues);
    };

    const handleRemoveOptionValue = (optionIndex, valueIndex) => {
        const newOptions = [...options];
        newOptions[optionIndex].values.splice(valueIndex, 1);
        setOptions(newOptions);

        const newOptionValues = [...optionValues];
        newOptionValues[optionIndex].splice(valueIndex, 1);
        setOptionValues(newOptionValues);
    };

    const handleFileInputChange = (e, optionIndex, valueIndex) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const newOptionValues = [...optionValues];
            // Ensure newOptionValues[optionIndex][valueIndex] exists
            if (!newOptionValues[optionIndex][valueIndex]) {
                newOptionValues[optionIndex][valueIndex] = {}; // Initialize as an object if not already
            }
            // Set image property
            newOptionValues[optionIndex][valueIndex].image = reader.result;
            setOptionValues(newOptionValues);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        open(false); // Đóng form bằng cách gọi hàm 'open' với giá trị 'false'
    };

    const handleOptionClick = (option) => {
        useroption(option);
    };

    const handleAddProduct = () => {
        console.log('formValues: ', formValues)
        console.log('files: ', files)
        console.log('options: ', options)
        console.log('optionValues: ', optionValues)
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
                {options.map((option, optionIndex) => (
                    <div key={optionIndex} className="mb-4 shadow lg:px-6 lg:py-6 rounded-r-md">
                        <div className="flex items-center justify-between lg:mb-4">
                            <div className="w-4/5">
                                <label
                                    htmlFor={`optionName-${optionIndex}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tên lựa chọn
                                </label>
                                <input
                                    type="text"
                                    id={`optionName-${optionIndex}`}
                                    name={`optionName-${optionIndex}`}
                                    value={option.name}
                                    onChange={(e) => handleOptionNameChange(e, optionIndex)}
                                    className="block w-full p-2 mt-1 border border-gray-300 rounded"
                                    required
                                    disabled={action === 2}
                                />
                            </div>
                            {action !== 2 && (
                                <button onClick={() => handleRemoveOption(optionIndex)} className="text-red-500">
                                    Xóa lựa chọn
                                </button>
                            )}
                        </div>

                        {option.values.map((value, valueIndex) => (
                            <div key={valueIndex} className="flex justify-between gap-12 mb-4 ml-auto">
                                <div className="w-1/2">
                                    <label
                                        htmlFor={`optionValue-${optionIndex}-${valueIndex}`}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Giá trị lựa chọn
                                    </label>
                                    <input
                                        type="text"
                                        id={`optionValue-${optionIndex}-${valueIndex}`}
                                        name={`optionValue-${optionIndex}-${valueIndex}`}
                                        value={value}
                                        onChange={(e) => handleOptionValueChange(e, optionIndex, valueIndex)}
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
                                                id={`file_input_${optionIndex}_${valueIndex}`}
                                                onChange={(e) => handleFileInputChange(e, optionIndex, valueIndex)}
                                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                            />
                                        </label>
                                    )}
                                    <div className="shrink-0">
                                        <img
                                            id="preview_img"
                                            className="object-cover h-[88px] w-[88px]"
                                            src={
                                                (optionValues[optionIndex] &&
                                                    optionValues[optionIndex][valueIndex]?.image) ||
                                                DefaultImage
                                            }
                                            alt="Current profile photo"
                                        />
                                    </div>
                                </div>

                                {action !== 2 && (
                                    <button
                                        onClick={() => handleRemoveOptionValue(optionIndex, valueIndex)}
                                        className="ml-4 text-red-500"
                                    >
                                        Xóa
                                    </button>
                                )}
                            </div>
                        ))}

                        {action !== 2 && (
                            <button
                                onClick={() => handleAddOptionValue(optionIndex)}
                                className="flex items-center mb-4 ml-auto text-sm font-light text-white border-1 bg-primary/80 lg:px-4 lg:py-2"
                            >
                                Thêm giá trị lựa chọn
                            </button>
                        )}
                    </div>
                ))}

                {action !== 2 && (
                    <button
                        onClick={handleAddOption}
                        className="flex items-center text-white bg-red-600 border-red-700 border-1 lg:px-4 lg:py-2"
                    >
                        Thêm lựa chọn
                    </button>
                )}
            </div>

            <div className="flex lg:mt-4">
                <button
                    onClick={() => useroption('formproduct')}
                    className="flex items-center underline lg:ml-4 lg:px-4 lg:py-3"
                >
                    Quay lại
                </button>
                {action !== 2 && (
                    <button className="flex items-center ml-auto text-white rounded-lg hover:bg-primary/85 lg:mr-4 bg-primary/70 lg:px-4 lg:py-3"
                        onClick={handleAddProduct}
                    >

                        Đăng kí
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormProductOption;
