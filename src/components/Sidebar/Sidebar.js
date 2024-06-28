import React, { useState } from "react";

import './Sidebar.scss'

import {
    BsSpeakerFill, BsChevronRight,
    BsCameraReelsFill, BsFillMouse2Fill, BsPostageFill, BsMusicNote, BsFillCalendarFill,
    BsTv, BsSmartwatch
} from "react-icons/bs";

import { FaGamepad } from "react-icons/fa";


const Sidebar = () => {
    return (
        <div className="category-option">
            <div className="category-navbar">
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsSpeakerFill />
                        <p >Speaker</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsCameraReelsFill />
                        <p >Equipment</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsFillMouse2Fill />
                        <p >Control</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsPostageFill />
                        <p >Accessorios</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsMusicNote />
                        <p >Audio</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsFillCalendarFill />
                        <p >Appliances</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsTv />
                        <p >Television Set</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <BsSmartwatch />
                        <p >Digital Watch</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
                <div className="navbar-element">
                    <div className="left-navbar-element">
                        <FaGamepad />
                        <p >Video Games</p>
                    </div>
                    <BsChevronRight className="right-icon" />

                </div>
            </div>
        </div>

    );
}

export default Sidebar;