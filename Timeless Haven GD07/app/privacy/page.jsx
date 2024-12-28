"use client";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-800">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Your privacy is important to us</p>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
            <p className="text-gray-600 mt-2">
              This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services. By using our site, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Information Collection</h2>
            <p className="text-gray-600 mt-2">
              We collect various types of information in order to provide and improve our services to you. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Personal identification information (name, email address, etc.)</li>
              <li>Non-personal identification information (browser type, IP address, etc.)</li>
              <li>Cookies and usage data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Data</h2>
            <p className="text-gray-600 mt-2">
              We use the collected data for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>To personalize and improve your experience</li>
              <li>To send updates, offers, and other relevant information</li>
              <li>To monitor and analyze the usage of our service</li>
              <li>To comply with legal obligations and resolve disputes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Cookies</h2>
            <p className="text-gray-600 mt-2">
              We use cookies to enhance your experience on our website. Cookies are small files stored on your device that help us remember your preferences, analyze web traffic, and improve the functionality of the site.
            </p>
            <p className="text-gray-600 mt-2">
              You can choose to disable cookies by adjusting your browser settings, but this may limit some functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Data Security</h2>
            <p className="text-gray-600 mt-2">
              We take the security of your personal data seriously and use reasonable measures to protect it. However, please note that no method of electronic transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
            <p className="text-gray-600 mt-2">
              You have the right to access, update, or delete your personal information. If you would like to exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mt-2">
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 text-gray-600">
              <p>Email: contact@timelessheaven.com</p>
              <p>Phone: +1 234 567 890</p>
              <p>Address: 123 Timeless Ave, Heaven City, HC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
