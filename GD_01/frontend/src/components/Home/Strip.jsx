import React from 'react';

const StatisticsSection = () => {
    return (
        <div className="bg-dark text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                    <div>
                        <p className="text-2xl font-bold">25,000+</p>
                        <p className="mt-2">Verified Cars</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">20,000+</p>
                        <p className="mt-2">Trusted Hosts</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">2 Billion+</p>
                        <p className="mt-2">KMs Driven</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">38+ Cities</p>
                        <p className="mt-2">And Counting...</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">20+ Airports</p>
                        <p className="mt-2">Live On Zoomcar platform</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsSection;
