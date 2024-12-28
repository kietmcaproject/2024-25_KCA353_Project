import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 flex items-center justify-center min-h-screen">
            <div className="bg-white my-8 p-10 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="text-center mb-8 bg-cyan-100 p-4 rounded-lg">
                    <img
                        src="/logo/vector-lock-icon-removebg-preview.png"
                        alt="Lock Icon"
                        className="mx-auto h-24 bg-cyan-100 p-2 rounded-full"
                    />
                    <h2 className="text-3xl font-bold mt-4 text-cyan-900">Roomwala Policy</h2>
                </div>

                <div className="text-gray-700 text-justify space-y-8">
                    <p className="leading-relaxed">
                        At Roomwala PG, we are committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit or use our website and services. By using our platform, you agree to the terms outlined in this policy.
                    </p>

                    <h3 className="text-xl font-semibold">1. Information We Collect</h3>
                    <p className="leading-relaxed">
                        We collect various types of information to provide and improve our services for you:
                        <br /><br />
                        <strong>Personal Information:</strong> When you register or book accommodations through Roomwala PG, we may collect personal details such as your name, email address, phone number, gender, and college name.
                        <br /><br />
                        <strong>Payment Information:</strong> If you make payments through our platform, we may collect billing information, including payment method details. However, we do not store sensitive financial information; it is handled by secure third-party payment processors.
                        <br /><br />
                        <strong>Usage Data:</strong> We collect data on how you interact with our website, such as pages visited, search queries, IP address, device type, browser type, and referring URLs.
                        <br /><br />
                        <strong>Location Data:</strong> We may collect your location data to improve search results and suggest nearby accommodations if you enable location access.
                    </p>

                    <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
                    <p className="leading-relaxed">
                        Roomwala PG uses the collected information for various purposes, including:
                        <br /><br />
                        <strong>Providing Services:</strong> To facilitate finding and booking PG accommodations, including matching you with compatible roommates.
                        <br /><br />
                        <strong>Personalizing Experience:</strong> To provide you with relevant listings, offers, and recommendations based on your preferences and location.
                        <br /><br />
                        <strong>Communication:</strong> To send notifications, updates, and important information regarding your bookings, account status, or other services.
                        <br /><br />
                        <strong>Improving Platform:</strong> To analyze website usage, enhance features, and improve user experience through research and analytics.
                        <br /><br />
                        <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.
                    </p>

                    <h3 className="text-xl font-semibold">3. Sharing Your Information</h3>
                    <p className="leading-relaxed">
                        We may share your information in limited circumstances:
                        <br /><br />
                        <strong>Service Providers:</strong> We work with trusted third-party vendors for services like payment processing, hosting, customer support, and analytics. These providers access information only as necessary to perform their functions.
                        <br /><br />
                        <strong>PG Hosts:</strong> If you book a PG accommodation, your information may be shared with the PG host or manager to facilitate check-in and communication.
                        <br /><br />
                        <strong>Legal Obligations:</strong> We may disclose your information if required by law or in response to valid legal requests, such as a court order or government investigation.
                    </p>

                    <h3 className="text-xl font-semibold">4. Security of Your Information</h3>
                    <p className="leading-relaxed">
                        Roomwala PG implements industry-standard security measures to protect your personal information. While we strive to protect your data, please note that no method of transmission over the internet or electronic storage is completely secure.
                    </p>

                    <h3 className="text-xl font-semibold">5. Your Rights and Choices</h3>
                    <p className="leading-relaxed">
                        You have the right to access, update, or delete your personal information at any time by logging into your account. If you wish to stop receiving marketing communications, you can opt-out by following the instructions provided in each email or contacting our support team.
                    </p>

                    <h3 className="text-xl font-semibold">6. Third-Party Links</h3>
                    <p className="leading-relaxed">
                        Our website may contain links to external websites. Please note that we are not responsible for the privacy practices of those websites, and we encourage you to review their privacy policies separately.
                    </p>

                    <h3 className="text-xl font-semibold">7. Changes to This Privacy Policy</h3>
                    <p className="leading-relaxed">
                        We may update our Privacy Policy from time to time to reflect changes in our practices. Any modifications will be posted on this page with the updated date, and we encourage you to review this policy periodically.
                    </p>

                    <h3 className="text-xl font-semibold">8. Contact Us</h3>
                    <p className="leading-relaxed">
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us Or Request a call Back through our website.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
