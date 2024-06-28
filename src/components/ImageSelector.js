import React, { useState } from 'react';

const ImageSelector = (images) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    console.log(images.images);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <div className="flex flex-col-reverse">
            <div className="hidden sm:block w-full max-w-2xl mx-auto mt-6 lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                    {Array.from(images).map((image, index) => (
                        <button
                            key={image.id}
                            className="relative flex items-center justify-center h-16 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            {/* <span className="sr-only">{image.name}</span> */}
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img
                                    src={image.image}
                                    alt={image.id}
                                    className="object-cover object-center w-full h-full"
                                />
                            </span>
                            <span
                                className={classNames(
                                    selectedImageIndex === index
                                        ? 'ring-indigo-500'
                                        : 'ring-transparent',
                                    'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none',
                                )}
                                aria-hidden="true"
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full aspect-w-1 aspect-h-1">
                <img
                    src={images[selectedImageIndex].images?.image}
                    alt={images[selectedImageIndex].images?.id}
                    className="object-cover object-center w-full h-full sm:rounded-lg"
                />
            </div>
        </div>
    )
}

export default ImageSelector