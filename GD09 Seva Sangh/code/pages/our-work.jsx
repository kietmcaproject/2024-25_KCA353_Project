import styles from '../styles/OurWork.module.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OurWork() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      {/* Navbar */}
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        <h2 className="text-4xl font-semibold text-center mb-8 text-blue-700">Our Work</h2>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-6 text-blue-600">How We Help</h3>
          <p className="text-lg mb-6 text-gray-700">
            At Seva Sangh, we are committed to making a real difference in the lives of those who need it most.
            With the generous donations we receive, we ensure that the items are distributed to the most vulnerable
            communities, including those suffering from poverty, homelessness, and lack of basic necessities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Food Distribution Card */}
            <div className="card-container">
              <img src="../../public/ourWorkfood.jpg" alt="Food Donation" className="card-image" />
              <h4 className="card-title">Food Distribution</h4>
              <p className="card-description">
                We provide essential food items to communities in need, helping them get through tough times.
              </p>
            </div>

            {/* Clothes Donation Card */}
            <div className="card-container">
              <img src="/images/clothes.jpg" alt="Clothes Donation" className="card-image" />
              <h4 className="card-title">Clothes for the Homeless</h4>
              <p className="card-description">
                Warm clothes are distributed to the homeless, ensuring they have basic protection against harsh weather.
              </p>
            </div>

            {/* Toys Donation Card */}
            <div className="card-container">
              <img src="/images/toys.jpg" alt="Toys Donation" className="card-image" />
              <h4 className="card-title">Toys for Children</h4>
              <p className="card-description">
                We also provide toys and educational materials to children in need, helping brighten their lives and foster learning.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
