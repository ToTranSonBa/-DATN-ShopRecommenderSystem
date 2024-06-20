import React, { useState } from 'react';

const FormProductOption = ({ useroption }) => {
    const handleOptionClick = (option) => {
        // Update useroption in SellerDashboard component
        useroption(option);
    };

    //form
    const [formValues, setFormValues] = useState({
        optionName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const [options, setOptions] = useState([{ name: '', values: [] }]);
    const [optionValues, setOptionValues] = useState({ 0: [''] });

    const handleAddOption = () => {
        const newOptionIndex = options.length;
        setOptions([...options, { name: '', values: [] }]);
        setOptionValues({ ...optionValues, [newOptionIndex]: [''] });
    };

    const handleAddOptionValue = (index) => {
        const newOptionValues = { ...optionValues };
        if (!newOptionValues[index]) {
            newOptionValues[index] = [''];
        } else {
            newOptionValues[index].push('');
        }
        setOptionValues(newOptionValues);
    };

    const handleOptionNameChange = (e, index) => {
        const newOptions = [...options];
        newOptions[index].name = e.target.value;
        setOptions(newOptions);
    };

    const handleOptionValueChange = (e, optionIndex, valueIndex) => {
        const newOptionValues = { ...optionValues };
        newOptionValues[optionIndex][valueIndex] = e.target.value;
        setOptionValues(newOptionValues);
    };

    const handleRemoveOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        const newOptionValues = { ...optionValues };
        delete newOptionValues[index];

        setOptions(newOptions);
        setOptionValues(newOptionValues);
    };

    const handleRemoveOptionValue = (optionIndex, valueIndex) => {
        const newOptionValues = { ...optionValues };
        newOptionValues[optionIndex] = newOptionValues[optionIndex].filter((_, i) => i !== valueIndex);

        setOptionValues(newOptionValues);
    };

    return (
        <div className="w-full h-full max-h-screen overflow-y-scroll lg:px-6 lg:pt-4 lg:pb-12">
            <div className="w-full h-full max-w-5xl ">
                {/* Hiển thị các product option */}
                {options.map((option, optionIndex) => (
                    <div key={optionIndex} className="mb-4 bg-white shadow lg:px-6 lg:py-6 rounded-r-md">
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
                                />
                            </div>
                            <button onClick={() => handleRemoveOption(optionIndex)} className="text-red-500">
                                Xóa lựa chọn
                            </button>
                        </div>

                        {/* Hiển thị các giá trị lựa chọn */}
                        {optionValues[optionIndex] &&
                            optionValues[optionIndex].map((value, valueIndex) => (
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
                                        />
                                    </div>
                                    <div className="flex-col items-center w-1/2">
                                        <label
                                            className="text-sm font-medium text-gray-900  dark:text-white"
                                            htmlFor="file_input"
                                        >
                                            Chọn ảnh
                                        </label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="file_input"
                                            type="file"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleRemoveOptionValue(optionIndex, valueIndex)}
                                        className="ml-4 text-red-500"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}

                        {/* Nút thêm giá trị lựa chọn */}
                        <button
                            onClick={() => handleAddOptionValue(optionIndex)}
                            className="flex items-center mb-4 ml-auto text-sm font-light text-white border-1 bg-primary/80 lg:px-4 lg:py-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="mr-1 size-3"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            {''}Thêm giá trị lựa chọn
                        </button>
                    </div>
                ))}

                {/* Nút thêm lựa chọn */}
                <button
                    onClick={handleAddOption}
                    className="flex items-center text-white bg-red-600 border-red-700 border-1 lg:px-4 lg:py-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {''}Thêm lựa chọn
                </button>
            </div>
            <div className="flex lg:mt-4">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleOptionClick('formproduct');
                    }}
                    className="flex items-center underline lg:ml-4 lg:px-4 lg:py-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4 font-semibold rotate-180"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    Quay lại{' '}
                </button>
                <button className="flex items-center ml-auto text-white rounded-lg hover:bg-primary/85 lg:mr-4 bg-primary/70 lg:px-4 lg:py-3">
                    Đăng kí{' '}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4 font-semibold"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
export default FormProductOption;
