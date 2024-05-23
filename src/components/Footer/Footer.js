import React, { useState } from 'react';
import './Footer.scss';
import MaxWidthWrapper from '../MaxWidthWrapper';

const Footer = () => {
    return (
        <div className="bg-gray-100 lg:py-8">
            <MaxWidthWrapper>
                <div className="bg-gray-100 footer">
                    <div className="shop-address">
                        <p className="page-name">Constructor</p>
                        <p className="address">12 Water St.vacouver, BC V6B 132 United States</p>
                    </div>

                    <div className="footer-menu">
                        <p>Corporate sales</p>
                        <p>Feedback</p>
                        <p>Job</p>
                        <p>New</p>
                        <p>Sales Rules</p>
                        <p>For partners</p>
                    </div>

                    <div className="footer-menu">
                        <p>Bonus program</p>
                        <p>Gift Cards</p>
                        <p>Bill payment verifications</p>
                        <p>loans</p>
                        <p>Delivery</p>
                        <p>Service centers</p>
                    </div>

                    <div className="footer-menu">
                        <p>How to place an order</p>
                        <p>Ways of payment</p>
                        <p>Exchange and return of goods</p>
                        <p>Warranty Service</p>
                        <p>Order status</p>
                        <p>Knowledge base</p>
                    </div>

                    <div className="shop-policy">
                        <p>2030 Company. All Rights Reserved</p>
                        <p>Terms & Condition</p>
                        <p>privacy policy</p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default Footer;
