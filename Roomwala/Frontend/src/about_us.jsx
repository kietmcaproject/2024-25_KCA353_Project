const AboutUs = () => {
  return (
    <div className="bg-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <div className="flex flex-col items-center mb-8 bg-cyan-50 p-6 rounded-md">
          <img src="logo/logo.png" alt="Roomwala Logo" className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0" />
          <h2 className="text-3xl font-extrabold text-gray-900 mt-4 md:mt-0 text-center">About Us</h2>
        </div>
        <div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
            We are dedicated to helping college students find safe, affordable, and comfortable paying guest (PG) accommodations near their campuses. Understanding the unique needs of students and their families, we focus on providing verified listings that prioritize security, convenience, and essential amenities like Wi-Fi, meals, and study-friendly environments. Our platform offers features such as roommate matching, transparent reviews, flexible payment options, and easy location-based search to make the housing process as smooth as possible. We are committed to creating a trusted community where students can find not just a place to stay, but a space to thrive academically and socially.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why Roomwala.com?</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            People visit Roomwala PG because it offers a student-focused, trustworthy platform for finding safe, affordable PG accommodations near colleges. Designed to meet the unique needs of college students and their families, Roomwala PG provides verified listings with detailed safety information, roommate matching for compatible living arrangements, and convenient search options based on college proximity. With features like student reviews, flexible payment plans, and a user-friendly mobile interface, Roomwala PG simplifies the housing search process and fosters a supportive community, making it the preferred choice for students seeking comfortable and budget-friendly living spaces.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
