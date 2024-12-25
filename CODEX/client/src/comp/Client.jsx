import React from 'react';

const Client = ({ username }) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold mb-1">
                {username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm">{username}</span>
        </div>
    );
};

export default Client;