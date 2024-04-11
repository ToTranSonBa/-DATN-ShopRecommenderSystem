import React, { useState } from "react";
import './Navigation.scss'

import { BsJustify, BsSearch, BsFillPersonFill } from "react-icons/bs";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="navigation-content">
                <div className="left-option">
                    <BsJustify className="left-option-element" />
                    <p className="left-option-element">Constructor</p>
                </div>

                <div className="menu-option">
                    <p className="menu-option-element">Woman</p>
                    <p className="menu-option-element">Man</p>
                    <p className="menu-option-element">Children</p>
                </div>

                <div className="search-button">
                    < BsSearch className="search-element" />
                    <input className="search-element" type="text" placeholder="Search..." />
                </div>

                <div className="right-option">
                    <div className="right-element">
                        <BsFillPersonFill className="right-element-item right-icon" />
                        <p className="right-element-item">Account</p>
                    </div>
                    <div className="right-element">
                        <BsFillPersonFill className="right-element-item right-icon" />
                        <p className="right-element-item">Bag</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Navigation;