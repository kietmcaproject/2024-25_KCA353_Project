// import React, { useEffect } from "react";
// import Navbar from "../../Component/Navbar";
// import "./Home.css";
// import { Calendar } from "lucide-react";
import workshopImage from "./../../assets/Workshop.jpg";
import auditoriumImage from "./../../assets/auditorium-img2.jpg";
import kietEpoqueImage from "./../../assets/kietepoque.jpeg";
import college from "./../../assets/college.jpg";
import React, { useState, useEffect } from "react";
import Navbar from "../../Component/Navbar";
import "./Home.css";
import { Calendar, ChevronLeft, ChevronRight, GraduationCap, Users, Award } from "lucide-react";
import Footer from "../../Component/Footer"

const Home = () => {
  // Sample college events data
  const collegeEvents = [
    { id: 1, title: "Annual Tech Fest", date: "March 15-16, 2024", category: "Technical" },
    { id: 2, title: "Cultural Night", date: "April 5, 2024", category: "Cultural" },
    { id: 3, title: "Job Fair 2024", date: "March 20, 2024", category: "Career" },
    { id: 4, title: "Sports Week", date: "March 25-30, 2024", category: "Sports" }
  ];

  // Image slider state and logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
   "https://www.kiet.edu/uploads/media/club_gallery_image/8606102.jpg",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.metlifestadium.com%2Fimages%2Fdefault-source%2Fcorporate%2Fcorporate-event-page.jpg%3Fsfvrsn%3D38a29478_2&f=1&nofb=1&ipt=45740ec509932d0922f6dc8146b2dffc8481fa14f111e2480c269a8739d38482&ipo=images",
    "https://cache.careers360.mobi/media/article_images/2024/9/19/KIET-Awarded-Faculty-Members-and-Students-as-Part-of-Teachers-and-Engineers-Day-Celebration.jpg",
    "https://static.zollege.in/public/image/99_811343dd77b18d7e83b7e14848ee9288.jpeg?tr=w-1000,h-346,c-force"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
       {/* Image Slider Section */}
       <div className="relative w-full max-w-10xl mx-auto ">
        <div className="relative h-96 overflow-hidden rounded-xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="landing-page-container">
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
          <main className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6">
                  {" "}
                Creating magical
                  moments you'll treasure forever
                </h1>
                <p className="text-xl mb-8">
                  Beautiful layouts, customizable UI, great user experience, and
                  a customer-oriented approach.
                </p>
              
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src={college}
                    alt="Event preview"
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="text-purple-600 font-semibold">
                    Corporate Meetups
                  </h3>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg mt-8">
                  <img
                    src={workshopImage}
                    alt="Event preview"
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="text-purple-600 font-semibold">Workshops</h3>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src={auditoriumImage}
                    alt="Event preview"
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="text-purple-600 font-semibold">Conferences</h3>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg mt-8">
                  <img
                    src={kietEpoqueImage}
                    alt="Event preview"
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="text-purple-600 font-semibold">
                    Extra Curricular Activities
                  </h3>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* College Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Academic Excellence</h3>
              <p className="text-gray-600">
                Top-ranked programs with innovative curriculum and experienced faculty.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Research Opportunities</h3>
              <p className="text-gray-600">
                State-of-the-art facilities and collaboration with industry partners.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Campus Life</h3>
              <p className="text-gray-600">
                Vibrant community with diverse cultural and extracurricular activities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                <span className="text-pink-300">Welcome</span> to Our College
              </h1>
              <p className="text-xl mb-8">
                Empowering minds, shaping futures, and creating tomorrow's leaders
                through excellence in education.
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition duration-300">
                Explore Programs
              </button>
            </div>
            
            {/* College Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <GraduationCap className="w-8 h-8 mb-2" />
                <h3 className="text-2xl font-bold">15,000+</h3>
                <p>Students</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-8 h-8 mb-2" />
                <h3 className="text-2xl font-bold">500+</h3>
                <p>Faculty</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Award className="w-8 h-8 mb-2" />
                <h3 className="text-2xl font-bold">100+</h3>
                <p>Awards</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Calendar className="w-8 h-8 mb-2" />
                <h3 className="text-2xl font-bold">50+</h3>
                <p>Annual Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      {/* Upcoming Events Section */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collegeEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <Footer/>
    </div>
  );
};

export default Home;
