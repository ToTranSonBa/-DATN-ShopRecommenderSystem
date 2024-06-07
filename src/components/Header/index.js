import React, { useState, useEffect } from 'react';

import HeaderNotificationBar from './headerNotificatonBar';
import Navigation from './navigation';
import NavbarCustom from './navbar';

function Header() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [classNameBg, setClassNameBg] = useState('');
    const [classNameTextColor, setClassNameTextColor] = useState('');
    const [classNameDropShadow, setClassNameDropShadow] = useState('');

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setScrollPosition(currentScrollPos);

        if (currentScrollPos > 50) {
            setClassNameBg('bg-white');
            setClassNameTextColor('text-black');
            setClassNameDropShadow('drop-shadow-md');
        } else if (!isHovered) {
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
    }, []);

    useEffect(() => {
        if (window.location.pathname !== '/') {
            setClassNameBg('bg-white');
            setClassNameTextColor('text-black');
            setClassNameDropShadow('drop-shadow-md');
        } else {
            setClassNameBg('bg-transparent');
            setClassNameTextColor('text-white');
            setClassNameDropShadow('');
        }
    }, [window.location.pathname]);

    useEffect(() => {
        if (isHovered) {
            setClassNameBg('bg-white');
            setClassNameTextColor('text-black');
            setClassNameDropShadow('drop-shadow-md');
        } else if (scrollPosition <= 50) {
            setClassNameBg('bg-transparent');
            setClassNameTextColor('text-white');
            setClassNameDropShadow('');
        }
    }, [isHovered, scrollPosition]);

    return (
        <div className="fixed z-50 w-screen bg-black">
            <HeaderNotificationBar
                className_bg={classNameBg}
                className_textcolor={classNameTextColor}
                content="Giảm 30% toàn cửa hàng"
            />

            <Navigation
                className_bg={classNameBg}
                className_textcolor={classNameTextColor}
                onHover={handleHover}
                onLeave={handleLeave}
            />
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
