import React from "react";
import { Navigate } from "react-router-dom";
import "../styles/AboutUs.css";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grid items-center justify-center w-full flex-1 py-8">
        <div className="container grid items-center justify-center gap-6 px-4 text-center max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold sm:text-4xl text-[#354e41]">
              About Us
            </h1>
            <p className="text-base text-gray-700 sm:text-lg leading-relaxed">
              At Annamitra, we are on a mission to combat hunger and food
              insecurity in our communities. Founded with a deep-rooted
              commitment to making a meaningful difference, Annamitra strives to
              be the bridge between surplus food resources and those in need.
            </p>
          </div>
        </div>
      </main>
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold sm:text-3xl text-[#354e41]">
            Meet the Team
          </h2>
          <p className="text-sm text-gray-600 sm:text-base mt-2 max-w-2xl mx-auto">
            Our team is made up of passionate individuals who are dedicated to
            our mission.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {[
              {
                name: "Sumit Singh Rawat",
                role: "Web Developer",
                image: "/assets/images/Aafaque.jpg",
                linkedin: "https://www.linkedin.com/",
              },
              {
                name: "Pratham Dhingra",
                role: "Web Developer",
                image: "/assets/images/Aniket.jpeg",
                linkedin: "https://www.linkedin.com/",
              },
            ].map(({ name, role, image, linkedin }) => (
              <div key={name} className="flex flex-col items-center space-y-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-[#354e41] font-medium">
                  {role}
                  <a
                    href={linkedin}
                    className="ml-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../public/assets/images/linkedin_svg.svg"
                      alt="LinkedIn Profile"
                      className="w-5 h-5 inline-block border border-[#354e41] rounded"
                    />
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8 md:py-16 text-center">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold sm:text-3xl text-[#354e41]">
            Our Vision
          </h2>
          <p className="text-sm text-gray-700 sm:text-base mt-4 leading-relaxed">
            Our vision is simple yet profound: to create a world where no one
            goes to bed hungry. We envision a future where access to nutritious
            meals is a fundamental human right, allowing individuals to thrive
            without the burden of hunger.
          </p>
        </div>
      </section>
      <section className="py-8 md:py-16 bg-gray-50 text-center">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold sm:text-3xl text-[#354e41]">
            Our Mission
          </h2>
          <p className="text-sm text-gray-700 sm:text-base mt-4 leading-relaxed">
            Our mission is to connect surplus food resources with communities
            facing food insecurity. Through our platform, we facilitate
            donations from individuals and businesses to local food banks,
            shelters, and community centers, ensuring that nutritious meals
            reach those in need.
          </p>
        </div>
      </section>
      <section className="py-8 md:py-16 text-center">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold sm:text-3xl text-[#354e41]">
            Our Values
          </h2>
          <ul className="mt-4 text-sm text-gray-700 sm:text-base leading-relaxed space-y-2">
            <li>
              <b>Compassion:</b> Empathy and understanding guide our actions.
            </li>
            <li>
              <b>Collaboration:</b> Partnerships maximize our impact.
            </li>
            <li>
              <b>Sustainability:</b> Environmentally sustainable practices.
            </li>
            <li>
              <b>Accountability:</b> Trust from donors and stakeholders.
            </li>
          </ul>
        </div>
      </section>
      <section className="py-8 md:py-16 bg-gray-50 text-center">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold sm:text-3xl text-[#354e41]">
            Join Us
          </h2>
          <p className="text-sm text-gray-700 sm:text-base mt-4 leading-relaxed">
            Join us in our mission to combat hunger. Whether you're a donor or
            recipient, Annamitra welcomes you. Together, we can build a brighter
            future for all.
          </p>
        </div>
      </section>
    </div>
  );
}
