import { Alert } from 'antd';
import React, { useState, useEffect } from 'react';

// Component AddressForm để sử dụng chung
const AddressForm = ({ className, initialData, onSubmit, onCancel }) => {
    const [fullName, setName] = useState(initialData?.fullName || '');
    const [phoneNumber, setPhone] = useState(initialData?.phoneNumber || '');
    const [address, setAddress] = useState(initialData?.address || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [shippingAddress, setShippingAddress] = useState(initialData?.user?.shippingAddress || '');
    const [addressID, setAddressID] = useState(initialData?.id || '');
    const [checkedState, setCheckedState] = useState(false);
    console.log('initialData', initialData);
    const handleSubmit = () => {
        const newAddress = {
            addressID,
            fullName,
            phoneNumber,
            address,
            email,
            shippingAddress,
            checkedState
        };

        if (newAddress.fullName === '' || newAddress.phoneNumber === '' || newAddress.address === ''
            || newAddress.email === '') {
            alert('Hãy nhập đủ thông tin');
            return;
        }
        else {
            onSubmit(newAddress);
        }
    };



    // Hàm xử lý khi có initialData
    const handleCheckboxChangeWithInitialData = (addressID) => {
        if (shippingAddress === addressID) {
            return; // Không cho thay đổi nếu shippingAddress === addressID
        }
        setShippingAddress(prevAddress => (prevAddress === addressID ? '' : addressID));
    };

    // Hàm xử lý khi không có initialData
    const handleCheckboxChangeWithoutInitialData = () => {
        setCheckedState(prevChecked => !prevChecked);
    };

    // Chọn hàm xử lý dựa trên sự tồn tại của initialData
    const handleCheckboxChange = initialData ? handleCheckboxChangeWithInitialData : handleCheckboxChangeWithoutInitialData;

    return (
        <div
            className={`${className} max-w-screen-md min-w-full h-full mx-auto my-auto bg-white font-extralight lg:px-6 l:py-6`}
        >
            <p className="border-b-1 lg:py-3 ">{initialData ? 'Cập nhật địa chỉ' : 'Địa chỉ mới'}</p>
            <div className="lg:py-4">
                <div className="flex justify-between lg:gap-4">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={fullName}
                        required
                        className="w-full lg:leading-10 border-1 lg:px-3"
                        placeholder="Họ và tên"
                    />
                    <input
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        value={phoneNumber}
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
                        checked={initialData ? (shippingAddress === addressID) : checkedState}
                        onChange={() => handleCheckboxChange(addressID)}
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
