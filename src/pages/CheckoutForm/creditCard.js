import React, { useState, useEffect } from 'react';
const CreditCard = ({ onCheckFullFill }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [ccv, setCcv] = useState('');
    const [cardName, setCardName] = useState('');
    const [isRearVisible, setIsRearVisible] = useState(false);

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        let formattedInput = '';
        for (let i = 0; i < input.length; i++) {
            if (i % 4 === 0 && i > 0) {
                formattedInput += ' ';
            }
            formattedInput += input[i];
        }
        setCardNumber(formattedInput);
    };

    const handleExpDateChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        let formattedInput = '';
        for (let i = 0; i < input.length; i++) {
            if (i % 2 === 0 && i > 0) {
                formattedInput += '/';
            }
            formattedInput += input[i];
        }
        setExpDate(formattedInput);
    };

    const handleCcvChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        setCcv(input);
    };

    const handleFlip = (side) => {
        if (side === 'flipToRear') setIsRearVisible(true);
        else if (side === 'flipToFront') setIsRearVisible(false);
        else setIsRearVisible(!isRearVisible);
    };
    useEffect(() => {
        const isFull = cardNumber && expDate && ccv && cardName;
        onCheckFullFill(isFull);
    }, [cardNumber, expDate, ccv, cardName, onCheckFullFill]);

    return (
        <main class="flex h-auto w-full items-center justify-between lg:pb-8">
            <form className="bg-white w-full mx-auto px-6 py-8 shadow-md flex">
                <div className="w-1/2 pr-8 border-r-2 border-slate-300">
                    <label className="block mb-2 font-bold text-md text-neutral-800">Số thẻ:</label>
                    <input
                        type="text"
                        className="focus:ring-0 focus:ring-offset-0 focus:outline-none flex h-14 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                        id="cardNumber"
                        onClick={() => handleFlip('flipToFront')}
                        maxLength="19"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                    />
                    <div className="flex mb-4 gap-x-2">
                        <div className="flex-1">
                            <label className="block mb-2 font-bold text-md text-neutral-800">Ngày hết hạn:</label>
                            <input
                                type="text"
                                className="focus:ring-0 focus:ring-offset-0 focus:outline-none flex h-14 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                                id="expDate"
                                onClick={() => handleFlip('flipToFront')}
                                maxLength="5"
                                placeholder="MM/YY"
                                value={expDate}
                                onChange={handleExpDateChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 font-bold text-md text-neutral-800">CCV:</label>
                            <input
                                type="text"
                                className="flex h-14 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                                id="ccvNumber"
                                onClick={() => handleFlip('flipToRear')}
                                maxLength="3"
                                placeholder="123"
                                value={ccv}
                                onChange={handleCcvChange}
                            />
                        </div>
                    </div>

                    <label className="block mb-2 font-bold text-md text-neutral-800">Họ tên:</label>
                    <input
                        type="text"
                        className="flex h-14 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="cardName"
                        onClick={() => handleFlip('flipToFront')}
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                </div>
                <div className="w-1/2 pl-8">
                    <div className="w-full h-56" style={{ perspective: '1000px' }}>
                        <div
                            id="creditCard"
                            className={`crediCard relative cursor-pointer transition-transform duration-500 ${
                                isRearVisible ? 'rotate-y-180' : ''
                            }`}
                            style={{ transformStyle: 'preserve-3d' }}
                            onClick={() => handleFlip('flip')}
                        >
                            <div
                                className="absolute w-full m-auto shadow-2xl rounded-xl"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <img
                                    src="https://i.ibb.co/swnZ5b1/Front-Side-Card.jpg"
                                    className="relative object-cover w-full h-full rounded-xl"
                                    alt="Front Side Card"
                                />
                                <div className="absolute w-full px-8 text-white top-8">
                                    <div className="pt-1">
                                        <p className="font-light">Số thẻ</p>
                                        <p id="imageCardNumber" className="h-6 font-medium tracking-more-wider">
                                            {cardNumber}
                                        </p>
                                    </div>
                                    <div className="flex justify-between pt-6">
                                        <div>
                                            <p className="font-light">Họ tên</p>
                                            <p id="imageCardName" className="h-6 font-medium tracking-widest uppercase">
                                                {cardName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-light">Ngày hết hạn</p>
                                            <p id="imageExpDate" className="h-6 font-medium tracking-wider w-14">
                                                {expDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute w-full m-auto shadow-2xl rounded-xl"
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                <img
                                    src="https://i.ibb.co/Fn11jBc/Rear-Side-Card.jpg"
                                    className="relative object-cover w-full h-full rounded-xl"
                                    alt="Rear Side Card"
                                />
                                <div className="absolute w-full top-11">
                                    <div className="mt-14 px-11">
                                        <p
                                            id="imageCCVNumber"
                                            className="flex items-center pl-2 pr-2 ml-auto text-black lg:text-xl w-14"
                                        >
                                            {ccv}
                                        </p>
                                        <p className="flex justify-end pr-4 mt-3 font-normal text-white text-md">CCV</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default CreditCard;
