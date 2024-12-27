import React from 'react';
import { ArrowRight, Leaf, PiggyBank, Users, Lock, Shield, CheckCircle } from 'lucide-react';
import assets from '../../assets/assets';

export default function WhyUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        <img
          src={assets.why_us_bg}
          alt="Collaboration and Sharing"
          className="absolute inset-0 object-cover w-full h-full z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="z-20 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Why Choose Project Jugaad?</h1>
          <p className="text-xl md:text-2xl mb-8">Empowering Communities Through Resource Sharing</p>
          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex mx-auto">
            Join Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Leaf className="h-12 w-12 text-green-500 mx-auto" />}
              title="Sustainability First"
              description="Promote a Circular Economy"
            />
            <BenefitCard
              icon={<PiggyBank className="h-12 w-12 text-blue-500 mx-auto" />}
              title="Cost-Effective"
              description="Save Money, Rent Instead of Buying"
            />
            <BenefitCard
              icon={<Users className="h-12 w-12 text-yellow-500 mx-auto" />}
              title="Community Building"
              description="Connect and Collaborate Locally"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Project Jugaad Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureStep number={1} title="Request An Item" description="Easily add your item request" />
            <FeatureStep number={2} title="Connect with Lenders" description="Find people interested in your request" />
            <FeatureStep number={3} title="Complete the Transaction" description="Securely lend and return items" />
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4 justify-evenly">
            <TestimonialCard
              quote="I saved a lot on renting equipment for my projects!"
              author="John Doe"
              image="/placeholder.svg"
            />
            <TestimonialCard
              quote="Sharing my tools with fellow students has never been easier."
              author="Jane Smith"
              image="/placeholder.svg"
            />
            <TestimonialCard
              quote="Project Jugaad has transformed how our community shares resources."
              author="Alex Johnson"
              image="/placeholder.svg"
            />
          </div>
        </div>
      </section>

      {/* Security and Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trust and Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SecurityFeature icon={<Lock className="h-8 w-8 text-blue-500" />} title="Secure Transactions" description="User authentication for every transaction" />
            <SecurityFeature icon={<Shield className="h-8 w-8 text-green-500" />} title="User Verification" description="Verified profiles for added trust" />
            <SecurityFeature icon={<CheckCircle className="h-8 w-8 text-yellow-500" />} title="Privacy Protection" description="Your privacy is our top priority" />
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="mt-20 py-20 bg-gradient-to-r from-[#B993D6] to-[#8CA6DB] text-white rounded-lg">
        <div className="container mx-auto px-4 text-center items-center">
          <h2 className="text-4xl font-bold">Join Our Community Today!</h2>
          <button className="bg-white text-blue-500 py-3 px-6 rounded-lg mb-8 flex items-center justify-center mx-auto mt-7 hover:bg-black hover:text-white">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="text-center p-6 border rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FeatureStep({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, image }) {
  return (
    <div className="w-80 flex-shrink-0 p-6 border rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">"{quote}"</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={author}
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <span className="font-semibold">{author}</span>
      </div>
    </div>
  );
}

function SecurityFeature({ icon, title, description }) {
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
