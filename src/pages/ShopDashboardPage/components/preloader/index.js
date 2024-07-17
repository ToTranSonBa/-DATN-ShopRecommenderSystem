import React from 'react';

const Preloader = ({ loading }) => {
    return (
        loading && (
            <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white bg-opacity-70">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent mb-4"></div>
                <p className="text-lg font-semibold">Đang xử lý</p>
            </div>
        )
    );
};

export default Preloader;