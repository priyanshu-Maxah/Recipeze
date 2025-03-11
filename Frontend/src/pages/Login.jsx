import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../utility/api";
import { Eye, EyeOff } from 'lucide-react'; // Import the eye icons
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emailId || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await loginApi(formData.emailId, formData.password);
      
      if (res.status === 200) {
        toast.success('Login successful! Redirecting...'); // Show success toast
        setTimeout(() => navigate('/home'), 2000); // Redirect after 2 seconds
      } else {
        setError(res.data?.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-img">
      <div className="w-full max-w-md p-6 bg-transparent z-10">
        <h2 className="text-6xl font-bold text-[#e5bbaa] mb-10 text-center font-serif">Login</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Toaster component for displaying toast messages */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#e5bbaa', // Green background for success
              color: '#000', // White text
              fontWeight: 'bold',
            },
          }}
        />

        <form onSubmit={handleSubmit}>
          {['emailId', 'password'].map((field) => (
            <div className="mb-4 relative" key={field}>
              <label className="block text-[#e5bbaa] text-md font-semibold mb-2" htmlFor={field}>
                {field === 'emailId' ? 'Email' : 'Password'}
              </label>
              <input
                type={field === 'password' ? (showPassword ? 'text' : 'password') : 'email'}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 bg-transparent text-white border border-[#f7eae4] rounded-lg focus:outline-none focus:border-[#e5bbaa] focus:ring-1 focus:ring-[#e5bbaa]"
                required
              />
              {field === 'password' && (
                <button
                  type="button"
                  className="absolute right-3 top-10 text-[#e5bbaa]"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-[#ae7159] text-white font-semibold rounded-lg hover:bg-[#af7158da] transition duration-200 flex items-center justify-center"
            disabled={loading}
            aria-label={loading ? 'Logging in...' : 'Login'}
            aria-disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className='text-[#e5bbaa] mt-4 '>
          Create new Account? <Link to="/register" className='text-[#dbe3ff] underline'>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;