import React, { useState, useEffect } from 'react';
import AddressForm from './AddressForm';

// Component chính để hiển thị danh sách địa chỉ và form
const AddressManager = ({ className, onCancel, onConfirm, isUserPage }) => {
    const [addresses, setAddresses] = useState([
        {
            name: 'Hoàng Cầu',
            phone: '0845718717',
            address: 'Xã Bình Hưng, Huyện Bình Chánh, TP. Hồ Chí Minh',
            email: 'example1@gmail.com',
            isDefault: true,
        },
        {
            name: 'Hoàng Cầu',
            phone: '0845718717',
            address: 'Xã Bình Hưng, Huyện Bình Chánh, TP. Hồ Chí Minh',
            email: 'example2@gmail.com',
            isDefault: false,
        },
        {
            name: 'Hoàng Cầu',
            phone: '0845718717',
            address: 'Xã Bình Hưng, Huyện Bình Chánh, TP. Hồ Chí Minh',
            email: 'example3@gmail.com',
            isDefault: false,
        },
    ]);
    const [editingAddress, setEditingAddress] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        // Thiết lập selectedAddress ban đầu dựa trên địa chỉ có isDefault là true
        const defaultAddress = addresses.find((address) => address.isDefault);
        setSelectedAddress(defaultAddress);
    }, [addresses]);

    const handleEdit = (address) => {
        setEditingAddress(address);
        setIsCreating(false);
    };

    const handleCreateNew = () => {
        setEditingAddress(null);
        setIsCreating(true);
    };

    const handleCancelEdit = () => {
        setEditingAddress(null);
        setIsCreating(false);
    };

    const handleSubmit = (newAddress) => {
        let updatedAddresses;
        if (newAddress.isDefault) {
            updatedAddresses = addresses.map((addr) => ({
                ...addr,
                isDefault: addr === newAddress,
            }));
        } else {
            updatedAddresses = addresses.map((addr) => (addr === editingAddress ? newAddress : addr));
        }

        if (!editingAddress) {
            updatedAddresses.push(newAddress);
        }

        setAddresses(updatedAddresses);
        handleCancelEdit();
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };

    return (
        <div className={`relative max-w-screen-lg ${className}`}>
            <div className="max-w-screen-md w-full mx-auto my-auto bg-white font-extralight lg:px-6 l:py-6">
                <p className="border-b-1 lg:py-3">Địa chỉ của tôi</p>
                {addresses.map((address, index) => (
                    <div key={index} className="lg:py-4">
                        <div className="flex items-center lg:gap-4">
                            <input
                                className="form-checkbox h-5 w-5 rounded-full focus:ring-0 focus:ring-offset-0 focus:outline-none checked:bg-red-600"
                                type="checkbox"
                                checked={selectedAddress === address}
                                onChange={() => handleAddressSelect(address)}
                            />
                            <div className="w-11/12">
                                <div className="flex items-center justify-between lg:pb-2">
                                    <div className="flex lg:gap-2">
                                        <span className="font-normal">{address.name}</span>
                                        <span className="font-extralight">|</span>
                                        <span>{address.phone}</span>
                                    </div>
                                    <button className="font-light text-primary" onClick={() => handleEdit(address)}>
                                        Cập nhật
                                    </button>
                                </div>
                                <p>{address.address}</p>
                                <p>{address.email}</p>
                                {address.isDefault && (
                                    <div className="w-24 text-center text-red-600 border-red-600 lg:mt-2 lg:px-2 border-1">
                                        Mặc định
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    className="flex items-center justify-center text-red-600 text-sm border-red-600 lg:mt-4 w-40 border-1 lg:px-1 lg:py-2 lg:gap-1"
                    onClick={handleCreateNew}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Thêm địa chỉ mới
                </button>
                {!isUserPage && (
                    <div className="flex justify-end border-t-1 lg:mt-4 lg:py-4 lg:gap-4">
                        <button className="h-10 text-red-600 border-red-600 border-1 w-44" onClick={onCancel}>
                            Huỷ
                        </button>
                        <button className="h-10 text-white bg-red-600 w-44" onClick={() => onConfirm(selectedAddress)}>
                            Xác nhận
                        </button>
                    </div>
                )}
            </div>
            {(isCreating || editingAddress) && (
                <AddressForm
                    className="absolute top-0 left-0 z-20"
                    initialData={editingAddress}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default AddressManager;
