"use client";
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-cyan-400">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-800">About Us</h1>
          <p className="text-gray-600 mt-2">Learn more about our company</p>
        </div>

        {/* About Us Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
            <p className="text-gray-600 mt-2">
              Timeless Heaven was founded with the goal of providing high-quality, luxurious home products that bring comfort and style to every home. What started as a small local business has grown into a trusted name in the industry, offering a wide range of products that cater to all your home needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            <p className="text-gray-600 mt-2">
              Our mission is to create a lasting impact on the home decor industry by providing customers with premium products that enhance their lifestyle. We strive to offer superior quality, value, and service to ensure our customers' satisfaction with every purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Commitment to quality</li>
              <li>Customer-first approach</li>
              <li>Innovation and creativity</li>
              <li>Integrity in everything we do</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-red-600 transition">
                <img
                  src="/aamir.jpg"
                  alt="Team Member 1"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 hover:text-white">Mohammad Aamir</h3>
                <p className="text-gray-600">Frontend Developer</p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-red-600 transition">
                <img
                  src="/lakshay.png"
                  alt="Team Member 2"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">Lakshay Goel</h3>
                <p className="text-gray-600">Leader</p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-red-600 transition">
                <img
                  src="/rajat1.jpg"
                  alt="Team Member 3"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">Rajat Sinha</h3>
                <p className="text-gray-600">Backend Developer</p>
              </div>
              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-red-600 transition">
                <img
                  src="/preet.jpeg"
                  alt="Team Member 3"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">Preet Gupta</h3>
                <p className="text-gray-600">Database Administrator</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mt-2">
              We'd love to hear from you! If you have any questions or would like to get in touch, please reach out to us using the details below:
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

export default AboutUs;
