import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollTrigger from 'react-scroll-trigger';
import CountUp from 'react-countup';

const Temp = () => {
  AOS.init();
  const stats = [
    { id: 1, value: '100+', label: 'PGs Listed' },
    { id: 2, value: '200+', label: 'Queries' },
    { id: 3, value: '11+', label: 'Hotels' },
    { id: 4, value: '1100+', label: 'Customers' },
    { id: 5, value: '5', label: 'Columns' },
  ];
  return (
    <div>
      <div data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
        className='h-60 text-center self-center items-center bg-gray-300'>hiihihii
        hiihihii
      </div>

      <div data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        className="h-60 text-center self-center items-center bg-gray-300">rtrtrtr
      </div>

      <div data-aos="fade-right"
        data-aos-offset="200"
        className="h-60 text-center self-center items-center bg-gray-300">rtrtrtr
      </div>

      <div >
        <ScrollTrigger onEnter={() => console.log('enter')} onExit={() => console.log('exit')}>
          <div className="h-60 text-center self-center items-center bg-gray-300">rtrtrtr
          </div>
        </ScrollTrigger>
        <CountUp end={100} />
        <div className="flex flex-wrap justify-around items-center p-6 bg-gray-100 text-center">
      {stats.map((stat) => (
        <div key={stat.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg shadow-cyan-200">
            <h2 className="text-4xl font-bold text-green-500">{stat.value}</h2>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  )
}

export default Temp