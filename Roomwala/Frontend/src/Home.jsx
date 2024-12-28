import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollTrigger from 'react-scroll-trigger';
import CountUp from 'react-countup';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  AOS.init();
  const [scrollTrig, setScrollTrig] = useState(false);

  const mainBanner = [
    // "/crouselImage/img (4).jpg",
    "/crouselImage/img (2).jpg",
    "/crouselImage/img (1).jpg",
    "/crouselImage/img (3).jpg",
  ];

  const stats = [
    { id: 4, value: 100, label: 'Happy Customers' },
    { id: 1, value: 3, label: 'PGs Listed' },
    { id: 3, value: 1, label: 'Hotels' },
    { id: 2, value: 500, label: 'Queries' },
    { id: 5, value: 4, label: 'Our Team' },
  ];
  return (
    <div className="min-h-screen  p-0">
      <div className="w-full mb-8">
        <img src="images/tagline.png" alt="Tagline" className="w-full h-full object-cover" />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Curated PG collection</h1>
        <p className="text-2xl text-blue-500">in Muradnagar</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full sm:w-1/2 lg:w-1/4">
          <NavLink to="/choice">
            <img src="images/boys.png" alt="Boys" className="w-full rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300" />
          </NavLink>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4">
          <NavLink to="/choice">
            <img src="images/girls.png" alt="Girls" className="w-full rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300" />
          </NavLink>
        </div>
      </div>
      <ScrollTrigger onEnter={() => setScrollTrig(true)} onExit={() => setScrollTrig(false)}>
        <div className="flex flex-wrap justify-around items-center p-6 mt-11 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4">
              {scrollTrig && <div className="bg-white p-6 rounded-lg shadow-lg shadow-cyan-700 drop-shadow-xl">
                <h2 className="text-4xl font-bold text-slate-500"><CountUp end={stat.value} />+</h2>
                <p className="text-gray-600">{stat.label}</p>
              </div>}
            </div>
          ))}
        </div>
      </ScrollTrigger>
      <Carousel className='w-full h-96'>
        {mainBanner?.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100 rounded h-96" src={image} alt={`Slide ${index}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <div data-aos="flip-left"
        // data-aos-easing="ease-out-cubic"
        data-aos-duration="2000" className="flex flex-wrap justify-center gap-8 mt-28">
        <img src="/images/rooms-nj.jpg" alt="Rooms" className="w-full sm:w-1/2 lg:w-1/4 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300" />
        <h3 className="w-full sm:w-1/2 lg:w-1/2 text-2xl text-slate-800 font-semibold">Currently We provide the best rooms in Muradnagar and nearby areas. Our rooms are fully furnished and have all the necessary amenities. We have a variety of rooms available
          <p className="mt-3 text-gray-600">
            This web application helps students and professionals find accommodation near the KIET Group of Institutions, offering real-time listings of rooms and PG. Users can search, filter, and browse based on location, price, and amenities, with added features like user reviews, ratings, and map integration for a seamless, efficient housing search experience.
          </p></h3>
      </div>
      <div data-aos="flip-left"
        // data-aos-easing="ease-out-cubic"
        data-aos-duration="2000" className="my-10 flex flex-wrap justify-center gap-8">
        <h3 className="w-full sm:w-1/3 lg:w-1/3 text-2xl text-slate-800 font-semibold">We provide the best rooms in Muradnagar and nearby areas.
          <p className="mt-3 w-1/2 text-gray-600">
            This web application helps students and professionals find accommodation near the KIET Group of Institutionse.
          </p></h3>
        <img src="/images/rooms-nj1.png" alt="Rooms" className=" w-full sm:w-1/2 rounded-xl transform hover:scale-105 transition-transform duration-300" />
      </div>
      <div>
        <NavLink to='./rooms'><img src="/images/error-nj.png" alt="Rooms" className="w-full h-96 object-contain rounded-3xl" /></NavLink>
      </div>

    </div>
  );
}

export default App;
