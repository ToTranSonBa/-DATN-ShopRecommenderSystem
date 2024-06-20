import React, { useState } from 'react';

const FormProduct = ({ useroption }) => {
    const [files, setFiles] = useState({});
    const [isDraggedOver, setIsDraggedOver] = useState(false);

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
        for (const file of e.target.files) {
            addFile(file);
        }
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

    //form
    const [formValues, setFormValues] = useState({
        productName: '',
        productPrice: '',
        shortDescription: '',
        description: '',
        category: '',
        productQuantitySold: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleOptionClick = (option) => {
        // Update useroption in SellerDashboard component
        useroption(option);
    };

    return (
        <div className="max-w-screen-2xl ">
            <div className="flex h-auto max-h-screen overflow-y-scroll sm:px-8 md:px-8 sm:py-8">
                <main className="w-full h-auto max-w-sm">
                    <article
                        aria-label="File Upload Modal"
                        className={`relative h-full flex flex-col bg-white shadow rounded-md ${
                            isDraggedOver ? 'draggedover' : ''
                        }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDragEnter={handleDragOver}
                    >
                        <section className="flex flex-col w-full h-full max-w-sm p-8 overflow-auto">
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
                                    accept="image/*"
                                />
                                <button
                                    id="button"
                                    className="px-3 py-1 mt-2 text-sm bg-gray-200 rounded-sm hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                    onClick={() => document.getElementById('hidden-input').click()}
                                >
                                    Chọn ảnh
                                </button>
                            </header>

                            <h1 className="pt-8 pb-3 font-semibold text-gray-900 sm:text-lg">Ảnh đã chọn</h1>

                            <ul id="gallery" className="flex flex-1 -m-1 overflow-auto flex-nowrap">
                                {Object.keys(files).length === 0 && (
                                    <li
                                        id="empty"
                                        className="flex flex-col items-center justify-center w-full h-full text-center"
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
                                    <li key={key} className="block w-1/2 h-24 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8">
                                        <article className="relative w-full h-full bg-gray-100 rounded-md cursor-pointer group focus:outline-none focus:shadow-outline">
                                            {files[key].type.startsWith('image') ? (
                                                <img
                                                    src={key}
                                                    alt={files[key].name}
                                                    className="object-cover w-full h-full bg-fixed rounded-md img-preview"
                                                />
                                            ) : (
                                                <h1 className="flex-1">{files[key].name}</h1>
                                            )}
                                            <div className="flex">
                                                <span className="p-1 text-blue-800">
                                                    <i>
                                                        <svg
                                                            className="w-4 h-4 pt-1 ml-auto fill-current"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                                        </svg>
                                                    </i>
                                                </span>
                                                <p className="p-1 text-xs text-gray-700 size">
                                                    {files[key].size > 1024
                                                        ? files[key].size > 1048576
                                                            ? Math.round(files[key].size / 1048576) + 'mb'
                                                            : Math.round(files[key].size / 1024) + 'kb'
                                                        : files[key].size + 'b'}
                                                </p>
                                                <button
                                                    className="p-1 ml-auto text-gray-800 rounded-md delete focus:outline-none hover:bg-gray-300"
                                                    onClick={() => {
                                                        const newFiles = { ...files };
                                                        URL.revokeObjectURL(key); // Cleanup object URL
                                                        delete newFiles[key];
                                                        setFiles(newFiles);
                                                    }}
                                                >
                                                    <svg
                                                        className="w-4 h-4 ml-auto pointer-events-none fill-current"
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
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </article>
                </main>
                <div className="w-full max-w-screen-lg p-5 mx-auto mt-10 border rounded shadow">
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
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                            Short Description
                        </label>
                        <input
                            type="text"
                            id="shortDescription"
                            name="shortDescription"
                            value={formValues.shortDescription}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded min-h-44"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formValues.category}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home</option>
                            <option value="beauty">Beauty</option>
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
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleOptionClick('formproductoption');
                }}
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
export default FormProduct;
