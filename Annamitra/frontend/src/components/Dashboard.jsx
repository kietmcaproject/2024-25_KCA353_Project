import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "./Chart";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [cookedCount, setCookedCount] = useState(0);
  const [uncookedCount, setUncookedCount] = useState(0);
  const [packedCount, setPackedCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/dashboard`, {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }

        const data = await response.json();
        const donations = data.details.donations;
        setDonationCount(data.details.donationsCount);
        setRequestCount(data.details.requestsCount);

        // Count donation categories
        let cooked = 0,
          uncooked = 0,
          packed = 0;
        donations.forEach(({ category }) => {
          if (category === "Cooked Food") cooked++;
          else if (category === "UnCooked Food") uncooked++;
          else if (category === "Packed Food") packed++;
        });

        setCookedCount(cooked);
        setUncookedCount(uncooked);
        setPackedCount(packed);
      } catch (error) {
        console.error("Error fetching data: ", error);
        if (!localStorage.getItem("token")) {
          alert("Please Login or Sign Up");
          navigate("/Annamitra");
          window.location.reload();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-700">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Main Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Your Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donation Count */}
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center text-2xl font-bold text-blue-600">
              {donationCount}
            </div>
            <p className="text-gray-700 mt-4 text-center">
              Donations <br /> Till Now
            </p>
          </div>

          {/* Request Count */}
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center text-2xl font-bold text-green-600">
              {requestCount}
            </div>
            <p className="text-gray-700 mt-4 text-center">
              Requests <br /> Till Now
            </p>
          </div>
        </div>
      </div>

      {/* Doughnut Chart Section */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6 flex justify-center items-center">
        <div className="w-[200px] h-[200px] md:w-[400px] md:h-[400px]">
          <DoughnutChart data={[cookedCount, uncookedCount, packedCount]} />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-center gap-6">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500"
          onClick={() => navigate("/donations-list")}
        >
          Donate
        </button>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500"
          onClick={() => navigate("/recipients-list")}
        >
          Request
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
