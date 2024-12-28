"use client";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-800">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Please read our terms carefully</p>
        </div>

        {/* Terms of Service Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
            <p className="text-gray-600 mt-2">
              Welcome to Timeless Heaven! By accessing or using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">User Responsibilities</h2>
            <p className="text-gray-600 mt-2">
              As a user of our website, you agree to use our services in compliance with applicable laws and regulations. You also agree not to engage in:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Using the site for any unlawful purpose.</li>
              <li>Interfering with or disrupting the functioning of the website.</li>
              <li>Posting false or misleading information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Intellectual Property</h2>
            <p className="text-gray-600 mt-2">
              All content, including text, images, logos, and trademarks, on this website is the property of Timeless Heaven and is protected by intellectual property laws. You may not copy, modify, or distribute any of the content without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Limitation of Liability</h2>
            <p className="text-gray-600 mt-2">
              Timeless Heaven will not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services. We do not guarantee that our website will be error-free or uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Governing Law</h2>
            <p className="text-gray-600 mt-2">
              These Terms of Service are governed by the laws of the jurisdiction in which Timeless Heaven operates. Any disputes arising from these terms will be resolved in the competent courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Changes to Terms</h2>
            <p className="text-gray-600 mt-2">
              We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page, and the updated terms will be effective immediately upon posting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mt-2">
              If you have any questions regarding these Terms of Service, please contact us at:
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
