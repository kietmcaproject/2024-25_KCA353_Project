import React from 'react';
import { Users, MessageCircle, UserCheck} from 'lucide-react';

const teamMembers = [
  { name: "Harshit Shekhar", role: "Project Lead", bio: "Driving the vision and strategy of Project Jugaad.", image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"},
  { name: "Piyush Pratap Singh", role: "Frontend Dev", bio: "Building the core functionality of the platform.", image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"},
  { name: "Harsh Chaudhary", role: "Backend Dev", bio: "Creating the user interface and experience.", image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"},
];

const features = [
  { title: "Item Listings", description: "Browse and post items easily", icon: Users },
  { title: "Chat Interface", description: "Communicate securely with other users", icon: MessageCircle },
  { title: "User Profiles", description: "Build trust within the community", icon: UserCheck },
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D" alt="Campus Background" className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl font-bold text-center mb-6 text-gray-900">About Us</h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-gray-700">
              Project Jugaad aims to simplify the sharing of daily-use items within a trusted student and faculty community at KIET. We believe in reducing waste, fostering cooperation, and saving money by enabling easy and secure item exchanges.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Vision and Goals</h2>
            <ul className="list-none pl-6 max-w-2xl mx-auto space-y-4">
              {[
                "Promote sustainability by reducing consumption.",
                "Build a strong sense of community and trust among students and faculty.",
                "Provide a platform for easy, secure, and cost-effective sharing of goods."
              ].map((goal, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-lg text-gray-700">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-700">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-100 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <feature.icon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Join Project Jugaad?</h2>
            <button className="bg-white text-gray-900 hover:bg-gray-200 transition-colors px-8 py-3 rounded-lg font-semibold text-lg">
              Start Sharing Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;