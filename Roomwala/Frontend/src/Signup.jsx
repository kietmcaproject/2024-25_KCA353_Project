import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MutatingDots } from 'react-loader-spinner'

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (password === cpassword) {
            await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                } else {
                    if (data.success) {
                        setShowOtpPopup(true);  // Show OTP popup on successful signup
                        toast.success(data.message);
                    } else{
                    toast.success(data.message);
                    if (data.message === 'User already exists') {
                        navigate(`/login?email=${email}`);  // Redirect to login page if user already exists
                    };
                    }
                }
            });
        } else {
            toast.error('Password and Confirm Password should be the same');
        }
        setLoading(false);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Send OTP to backend for verification
        fetch(`${import.meta.env.VITE_HOST}/api/v1/user/otpverification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                toast.success('OTP verified successfully!');
                navigate('/login');  // Navigate to login on successful OTP verification
            } else {
                toast.error(data.message || 'OTP verification failed');
            }
        });
        setLoading(false);
    };

    return (
        
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
            <div className="mb-4">
                <img className="w-32 h-32 object-contain" src="./logo/logo-removebg-preview.png" alt="Roomwala Logo" />
            </div>
            <div className="signup mb-4">
                <p className="text-4xl font-bold">Sign Up</p>
            </div>
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        name="name" 
                        onChange={(e) => { setName(e.target.value) }} 
                        placeholder="Full Name" 
                        className="p-3 border border-gray-300 rounded-md"
                    />
                    <input 
                        type="email" 
                        name="email" 
                        onChange={(e) => { setEmail(e.target.value) }} 
                        placeholder="Email" 
                        className="p-3 border border-gray-300 rounded-md"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        onChange={(e) => { setPassword(e.target.value) }} 
                        placeholder="Password" 
                        className="p-3 border border-gray-300 rounded-md"
                    />
                    <input 
                        type="password" 
                        name="cpassword" 
                        onChange={(e) => { setCpassword(e.target.value) }} 
                        placeholder="Confirm Password" 
                        className="p-3 border border-gray-300 rounded-md"
                    />
                    <button
                        disabled={loading} 
                        type="submit" 
                        className={` text-white p-3 rounded-md ${loading ? `bg-blue-300` : `bg-blue-500 hover:bg-blue-600`} transition duration-300`}
                    >
                       { loading ? `Creating Account...` : `Create Account`}
                    </button>
                </form>
            </div>

            {showOtpPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Enter OTP</h2>
                        <p className="text-gray-500 text-center mb-4">An OTP has been sent to your email. Please enter the OTP to verify your account. <span className='bg-orange-300'>Note:Don't forget to check spam folder</span></p>
                        <form onSubmit={handleOtpSubmit} className="flex flex-col space-y-4">
                            <input 
                                type="text" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                placeholder="Enter OTP sent to Email (Also Check Spam)" 
                                className="p-3 border border-gray-300 rounded-md"
                            />
                            <button 
                                type="submit" 
                                className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Verify OTP
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
