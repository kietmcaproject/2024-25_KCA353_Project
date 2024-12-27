import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg mt-2">Oops! The page you're looking for doesn't exist.</p>

            <div className="mt-5 mx-auto bg-transparent border border-black rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 mb-10 cursor-pointer w-60" onClick={() => {
                window.location.href = '/';
            }}>
                <div className="p-3">
                    <h3 className="text-lg font-semibold text-gray-800 text-center">go to home</h3>
                </div>
            </div>
        </div>
    );
}

export default NotFound;