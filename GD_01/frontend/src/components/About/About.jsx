import React from "react";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-dark p-4 md:p-8 lg:p-12">
      <div className="header text-white p-4 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">About Us</h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-400">Welcome to our website!</p>
      </div>

      <div className="image-section mb-8">
        <img
          src="about-us.jpg"
          alt="About Us"
          className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
        />
      </div>

      <div className="content-section mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-200">Our Story</h2>
        <p className="text-base md:text-lg text-gray-400 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
        <p className="text-base md:text-lg text-gray-400 mb-4">
          Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
          Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        </p>
      </div>

      <div className="team-section mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-200">Meet Our Team</h2>
        <ul className="flex flex-wrap justify-center">
          <li className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <img
              src="team-member-1.jpg"
              alt="Team Member 1"
              className="w-full h-48 md:h-56 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg md:text-xl font-bold text-gray-200">John Doe</h3>
            <p className="text-base md:text-lg text-gray-400">Founder & CEO</p>
          </li>
          <li className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <img
              src="team-member-2.jpg"
              alt="Team Member 2"
              className="w-full h-48 md:h-56 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg md:text-xl font-bold text-gray-200">Jane Smith</h3>
            <p className="text-base md:text-lg text-gray-400">CTO</p>
          </li>
          <li className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <img
              src="team-member-3.jpg"
              alt="Team Member 3"
              className="w-full h-48 md:h-56 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg md:text-xl font-bold text-gray-200">Bob Johnson</h3>
            <p className="text-base md:text-lg text-gray-400">Designer</p>
          </li>
        </ul>
      </div>
    </div>
  );

};

export default About;
