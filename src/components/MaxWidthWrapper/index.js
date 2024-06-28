import React from 'react';

const MaxWidthWrapper = ({ className, children }) => {
    return <div className={`h-full mx-auto w-full max-w-screen-2xl ${className}`}>{children}</div>;
};
export default MaxWidthWrapper;
