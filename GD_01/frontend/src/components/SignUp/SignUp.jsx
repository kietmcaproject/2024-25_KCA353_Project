import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
    password: '',
    licenseNo: '',
    licenseExpiryDate: '',
    address: '',
    city: '',
    district: '',
    pincode: '',
    state: '',
  });

  const [profilePic, setProfilePic] = useState(null); // For storing the profile picture
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formDataToSend = new FormData();
    // Append form data
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    // Append profile picture if exists
    if (profilePic) {
      formDataToSend.append('avatar', profilePic);
    }

    try {
      const response = await axios.post('http://localhost:8787/api/v1/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/login'); // Redirect to login page upon successful registration
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-12">
      
      <div className="bg-white p-8 shadow-md w-full max-w-3xl h-screen lg:h-auto overflow-y-auto lg:overflow-visible rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        

          <div>
            <label className="block text-gray-600 my-2 font-semibold">FULL NAME</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

            {/* Profile Picture Field */}
            <div>
            <label className="block text-gray-600 my-2 font-semibold">PROFILE PICTURE</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">GENDER</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">LICENSE NUMBER</label>
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleChange}
              placeholder="Enter license number"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">LICENSE EXPIRY DATE</label>
            <input
              type="date"
              name="licenseExpiryDate"
              value={formData.licenseExpiryDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">ADDRESS</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">CITY</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">DISTRICT</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Enter district"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">PINCODE</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 my-2 font-semibold">STATE</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full px-4 py-2 rounded-3xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>


          {/* Submit button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center mt-4 text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
