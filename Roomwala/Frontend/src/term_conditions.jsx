import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="bg-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <div className="flex flex-col items-center bg-cyan-50 p-6 rounded-md">
                    <img src="/logo/th.jpeg" alt="Logo" className="w-24 h-24" />
                    <h2 className="text-3xl font-semibold mt-4">Terms & Conditions</h2>
                </div>
                <div className="mt-6">
                    <p className="text-lg leading-relaxed">
                        Welcome to Roomwala PG. By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully. If you do not agree with these terms, please do not use our platform.
                    </p>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mt-4">1. Acceptance of Terms</h3>
                        <p className="text-lg leading-relaxed mt-2">
                            By using Roomwala PG, you acknowledge that you have read, understood, and agree to these Terms and Conditions, as well as our Privacy Policy. Roomwala PG reserves the right to update or modify these terms at any time without prior notice. Your continued use of our services constitutes acceptance of any changes.
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">2. Eligibility</h3>
                        <p className="text-lg leading-relaxed mt-2">
                            To use Roomwala PG, you must be at least 18 years old or have permission from a parent or guardian if you are a minor. By using this platform, you represent that you have the legal capacity to agree to these terms.
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">3. User Accounts</h3>
                        <p className="text-lg leading-relaxed mt-2">
                            When you create an account with Roomwala PG, you must provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect any unauthorized use of your account, you must notify us immediately.
                        </p>
                    </div>

                    {/* Additional sections follow the same format as above */}
                    
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">4. Use of Services</h3>
                        <p className="text-lg leading-relaxed mt-2">
                            You agree to use Roomwala PG solely for personal and non-commercial purposes, specifically to search for and book paying guest accommodations. You must not use our platform to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-lg leading-relaxed">
                            <li>Violate any local, national, or international laws.</li>
                            <li>Post false, misleading, or fraudulent information.</li>
                            <li>Harass, threaten, or harm other users or PG hosts.</li>
                            <li>Engage in any activity that interferes with or disrupts the operation of our website or services.</li>
                        </ul>
                    </div>

                    {/* Repeat for other sections similarly */}

                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">14. Governing Law</h3>
                        <p className="text-lg leading-relaxed mt-2">
                            These Terms and Conditions are governed by and construed in accordance with the laws of Delhi-NCR, without regard to its conflict of law principles. Any legal action or dispute arising out of or related to these terms shall be resolved in the courts of Delhi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
