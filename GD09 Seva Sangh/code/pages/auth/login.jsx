import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/auth.css';


export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!credentials.email || !credentials.password) {
      setError('Both fields are required.');
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result.ok) {
      router.push('/donate'); // Redirect to the donate page or a protected page
    } else {
      setError('Invalid email or password.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      {/* <Navbar /> */}

       {/* Main Login Form Content */}
      
      <div className="flex items-center justify-center flex-grow">
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded mt-4"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center mt-4">
            Don't have an account? <a href="/auth/signup" className="text-blue-500">Sign up here</a>
          </p>
        </form>
      </div>

      {/* Footer */}
      // <Footer />
    </div>
  );
}
