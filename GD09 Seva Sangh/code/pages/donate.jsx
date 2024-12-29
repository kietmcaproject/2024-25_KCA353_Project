import { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';
import styles from '../styles/DonationPage.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  { title: 'Stationary', img: 'stationary.jpg' },
  { title: 'Clothes', img: 'clothes.jpg' },
  { title: 'Food', img: 'food.jpg' },
  { title: 'Footwear', img: 'footwears.jpg' },
  { title: 'Toys', img: 'toys.jpg' },
  { title: 'Blankets', img: 'blankets.jpg' },
];

export default function DonationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [donationData, setDonationData] = useState({ item: '', quantity: 0 });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError('Failed to fetch your location.');
          console.error(error);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  // Handle change in donation item quantity or other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  // Handle donation form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (donationData.quantity <= 0 || !name || !location) {
      setError('Please fill all the fields properly.');
      return;
    }

    // Prepare donation payload
    const donationPayload = {
      ...donationData,
      name,
      message,
      location,
    };

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationPayload),
      });

      if (response.ok) {
        alert('Donation Successful!');
        setModalOpen(false);
        setDonationData({ item: '', quantity: 0 });
        setName('');
        setMessage('');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to Donate');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <Navbar />
      </header>

      <main className={styles.main}>
        <h2 className={styles.heading}>Donate Items</h2>
        <div className={styles.grid}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => {
                setModalOpen(true);
                setDonationData({ ...donationData, item: category.title });
              }}
            >
              <CategoryCard title={category.title} img={category.img} />
            </div>
          ))}
        </div>

        {/* Donation Modal */}
        {modalOpen && (
          <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
              <h3 className="text-2xl mb-4">Donate {donationData.item}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="number"
                  name="quantity"
                  value={donationData.quantity}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message (optional)"
                  className="w-full p-2 border rounded"
                />
                {location ? (
                  <p>Your Location: Latitude: {location.latitude}, Longitude: {location.longitude}</p>
                ) : (
                  <p>Loading your location...</p>
                )}
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded">
                    Donate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
