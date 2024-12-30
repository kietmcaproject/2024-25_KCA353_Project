import React from "react";

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-10 bg-gray-100">
      <p className="text-4xl font-bold text-center text-blue-500 underline mb-8">
        LiveBridgeDonor: A Platform for Connecting Organ Donors and Recipients
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">
            Comprehensive Platform
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            LiveBridgeDonor serves as a comprehensive platform where users can
            register to either donate or request organs, while hospitals and
            organ banks can efficiently manage their inventories and operations.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">
            Secure Access
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            The platform ensures secure access by authenticating users and
            hospitals via their username (mobile number) and password, allowing
            them to perform necessary actions seamlessly.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">
            Real-time Data Management
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            LiveBridgeDonor plays a critical role in managing and tracking organ
            donations, connecting donors with recipients, and providing
            real-time data on organ availability and shortages.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">
            User-Friendly Interfaces
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            It features both a user-friendly interface for donors and recipients
            and a dedicated interface for hospitals and organ banks to manage
            their processes efficiently.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg font-semibold text-blue-500">
          Together, we can make a difference in saving lives!
        </p>
      </div>
    </div>
  );
};

export default About;
