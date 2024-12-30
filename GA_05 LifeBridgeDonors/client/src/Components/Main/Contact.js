import React from "react";
import contactImg from "../../assets/contactImg.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8 md:w-2/3 lg:w-1/2">
        {/* Header Section */}
        <h1 className="text-4xl text-blue-600 dark:text-blue-400 font-bold mb-4 text-center transition duration-300 hover:text-blue-500 dark:hover:text-blue-300">
          Contact Us - LifeBridgeDonor
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6 text-lg">
          We're here to help you connect with donors and recipients. Reach out
          to us for any inquiries, and let's make a difference together.
        </p>

        {/* Image Placeholder */}
        <div className="w-full h-40 md:h-60 flex items-center justify-center mb-6">
          <img
            className="rounded-md"
            src={contactImg}
            alt="Contact Us"
            width="30%" // Ensure the image is responsive
          />
        </div>

        {/* Contact Details */}
        <div className="space-y-6 ">
          {/* Name and Details Row */}
          <div className="flex-auto">
            <div className="text-center">
              <h3 className="font-semibold text-lg text-blue-500 dark:text-blue-300">
                SatyamBaranwal
              </h3>
              <p className="text-gray-600 dark:text-gray-400">+91 885885668</p>
              <p className="text-gray-500 dark:text-gray-500">
                satyambaranwal0786@gmail.com
              </p>
            </div>
          </div>

          <div className="flex-auto">
            <div className="text-center">
              <h3 className="font-semibold text-lg text-blue-500 dark:text-blue-300">
                Sakshi Bajpai
              </h3>
              <p className="text-gray-600 dark:text-gray-400">+91 00000000</p>
              <p className="text-gray-500 dark:text-gray-500">
                shakshibajpai1411@gmail.com
              </p>
            </div>
          </div>

          <div className="flex-auto">
            <div className="text-center">
              <h3 className="font-semibold text-lg text-blue-500 dark:text-blue-300">
                Riya Kansal
              </h3>
              <p className="text-gray-600 dark:text-gray-400">+91 0000000000</p>
              <p className="text-gray-500 dark:text-gray-500">
                 riyakansal666@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © 2024 LiveBridgeDonor. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
