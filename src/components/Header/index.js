import React, { useState, useEffect } from 'react';

import HeaderNotificationBar from './headerNotificatonBar';
import Navigation from './navigation';
import NavbarCustom from './navbar';

function Header() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [classNameBg, setClassNameBg] = useState('bg-transparent');
    const [classNameTextColor, setClassNameTextColor] = useState('text-white');
    const [classNameDropShadow, setClassNameDropShadow] = useState('');

    const handleHover = () => {
        setIsHovered(true);
        setClassNameBg('bg-white');
        setClassNameTextColor('text-black');
        setClassNameDropShadow('drop-shadow-md');
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setScrollPosition(currentScrollPos);

        if (currentScrollPos > 50 || isHovered) {
            setClassNameBg('bg-white');
            setClassNameTextColor('text-black');
            setClassNameDropShadow('drop-shadow-md');
        } else {
            setClassNameBg('bg-transparent');
            setClassNameTextColor('text-white');
            setClassNameDropShadow('');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHovered]);

    return (
        <div className="fixed z-50 w-screen bg-black">
            <HeaderNotificationBar
                className_bg={classNameBg}
                className_textcolor={classNameTextColor}
                content="30% off storewide"
            />
            <Navigation className_bg={classNameBg} className_textcolor={classNameTextColor} />
            <NavbarCustom
                className_bg={classNameBg}
                className_textcolor={classNameTextColor}
                className_dropshadow={classNameDropShadow}
                onHover={handleHover}
                onLeave={handleLeave}
            />
        </div>
    );
}

export default Header;
