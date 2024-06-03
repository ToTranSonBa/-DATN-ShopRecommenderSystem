import React, { useState, useEffect } from 'react';

// Component AddressForm để sử dụng chung
const AddressForm = ({ className, initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [address, setAddress] = useState(initialData?.address || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [isDefault, setIsDefault] = useState(initialData?.isDefault || false);

    const handleSubmit = () => {
        const newAddress = {
            name,
            phone,
            address,
            email,
            isDefault,
        };
        onSubmit(newAddress);
    };

    return (
        <div
            className={`${className} max-w-screen-md min-w-full h-full mx-auto my-auto bg-white font-extralight lg:px-6 l:py-6`}
        >
            <p className="border-b-1 lg:py-3 ">{initialData ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'}</p>
            <div className="lg:py-4">
                <div className="flex justify-between lg:gap-4">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        className="w-full lg:leading-10 border-1 lg:px-3"
                        placeholder="Họ và tên"
                    />
                    <input
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        className="w-full lg:leading-10 border-1 lg:px-3"
                        placeholder="Số điện thoại"
                    />
                </div>
                <input
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="w-full lg:leading-10 border-1 lg:px-3 lg:my-4"
                    placeholder="Địa chỉ "
                />
                <input
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full lg:leading-10 border-1 lg:px-3 lg:my-4"
                    placeholder="Gmail"
                />
                <div className="flex items-center lg:gap-2">
                    <input
                        type="checkbox"
                        checked={isDefault}
                        onChange={(e) => setIsDefault(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-red-600 focus:ring-0 focus:ring-offset-0 focus:outline-none checked:bg-red-600"
                    />
                    <span>Đặt làm địa chỉ mặc định</span>
                </div>
            </div>
            <div className="flex justify-end border-t-1 lg:py-4 lg:gap-12">
                <button onClick={onCancel} className="h-10 text-red-600 border-red-600 border-1 w-44">
                    Huỷ
                </button>
                <button onClick={handleSubmit} className="h-10 text-white bg-red-600 w-44">
                    {initialData ? 'Cập nhật' : 'Hoàn thành'}
                </button>
            </div>
        </div>
    );
};
export default AddressForm;
