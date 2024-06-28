import React, { useState, useEffect } from 'react';

import HeaderNotificationBar from './headerNotificatonBar';
import Navigation from './navigation';
import NavbarCustom from './navbar';
import { useLocation } from 'react-router-dom';

function Header() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [classNameBg, setClassNameBg] = useState('');
    const [classNameTextColor, setClassNameTextColor] = useState('');
    const [classNameDropShadow, setClassNameDropShadow] = useState('');
    const location = useLocation();

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    const handleScroll = () => {
        if (location.pathname === '/') {
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
        } else {
            const currentScrollPos = window.scrollY;
            setScrollPosition(currentScrollPos);
            setClassNameBg('bg-white');
            setClassNameTextColor('text-black');
            setClassNameDropShadow('drop-shadow-md');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    useEffect(() => {
        if (isHovered) {
            setClassNameBg('bg-white');
            setClassNameTextColor('text-black');
            setClassNameDropShadow('drop-shadow-md');
        } else if (scrollPosition <= 50 && location.pathname === '/') {
            setClassNameBg('bg-transparent');
            setClassNameTextColor('text-white');
            setClassNameDropShadow('');
        } else {
            setClassNameBg('bg-white');
            setClassNameTextColor('text-black');
            setClassNameDropShadow('drop-shadow-md');
        }
    }, [isHovered, scrollPosition, location.pathname]);

    const getInitialStates = () => {
        if (location.pathname === '/') {
            console.log('pathname', location.pathname + ': ' + classNameBg + classNameTextColor + classNameDropShadow);
            return {
                classNameBg: 'bg-transparent',
                classNameTextColor: 'text-white',
                classNameDropShadow: '',
            };
        } else {
            console.log('pathname', location.pathname + ': ' + classNameBg + classNameTextColor + classNameDropShadow);
            return {
                classNameBg: 'bg-white',
                classNameTextColor: 'text-black',
                classNameDropShadow: 'drop-shadow-md',
            };
        }
    };

    useEffect(() => {
        const newStates = getInitialStates();
        setClassNameBg(newStates.classNameBg);
        setClassNameTextColor(newStates.classNameTextColor);
        setClassNameDropShadow(newStates.classNameDropShadow);
    }, [location.pathname]);

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
