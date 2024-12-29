import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/CurrentStockPage.module.css'; // Assuming you have styles

export default function CurrentStock() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for better user experience
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the donations when the page loads
    const fetchDonations = async () => {
      try {
        const response = await fetch('/api/donations');
        
        if (response.ok) {
          const data = await response.json();
          setDonations(data); // Set donations to state
        } else {
          setError('Failed to fetch donations');
        }
      } catch (err) {
        setError('An error occurred while fetching donations');
        console.error(err);
      } finally {
        setLoading(false); // Done loading, whether success or error
      }
    };

    fetchDonations();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  if (loading) return <p>Loading donations...</p>; // Display loading text

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <Navbar />
      </header>

      <main className={styles.main}>
        <h2 className={styles.heading}>Current Stock</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div className={styles.grid}>
          {donations.length === 0 ? (
            <p>No donations available at the moment.</p>
          ) : (
            donations.map((donation) => (
              <div key={donation.id} className={styles.card}>
                <h3>{donation.item}</h3>
                <p>Quantity: {donation.quantity}</p>
                <p>Donor: {donation.name}</p>
                <p>Message/Contact detail: {donation.message || 'No message'}</p>
                <p>
                  Location: Latitude {donation.location.latitude}, Longitude {donation.location.longitude}
                </p>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
