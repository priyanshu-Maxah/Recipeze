import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from '../utility/api';
import { Eye, EyeOff } from 'lucide-react'; // Import the eye icons
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    phoneNo: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'phoneNo') {
      const numericValue = value.replace(/\D/g, ''); 
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [id]: numericValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.phoneNo.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      setLoading(false);
      return;
    }

    try {
      const res = await registerApi(
        formData.userName,
        formData.emailId,
        formData.password,
        formData.confirmPassword,
        formData.phoneNo,
        formData.address
      );

      if (res.data && res.status === 200) {
        toast.success('Registration successful! Redirecting to login...'); // Show success toast
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      } else {
        setError(res.message || 'Registration failed'); // Keep error as inline text
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.'); // Keep error as inline text
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-img">
      <div className="w-full max-w-md p-6 bg-transparent z-10">
        <h2 className="text-6xl font-bold text-[#e5bbaa] mb-10 text-center font-serif">Register</h2>

        {/* Display error message as inline text */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Toaster component for displaying success toast messages */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#e5bbaa', // Green background for success
              color: '#000', // White text
              fontWeight: 'bold',
            },iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
              },
          }}
        />

        <form onSubmit={handleSubmit}>
          {['userName', 'emailId', 'password', 'confirmPassword', 'phoneNo', 'address'].map((field) => (
            <div className="mb-4 relative" key={field}>
              <label className="block text-[#e5bbaa] text-md font-semibold mb-2" htmlFor={field}>
                {field === 'userName' ? 'Full Name' 
                 : field === 'emailId' ? 'Email' 
                 : field === 'password' ? 'Password' 
                 : field === 'confirmPassword' ? 'Confirm Password'
                 : field === 'phoneNo' ? 'Phone Number'
                 : 'Address'}
              </label>
              <input
                type={
                  field === 'password' 
                    ? showPassword ? 'text' : 'password' 
                    : field === 'confirmPassword' 
                    ? showConfirmPassword ? 'text' : 'password' 
                    : field === 'emailId' ? 'email' : 'text'
                }
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 bg-transparent text-white border border-[#f7eae4] rounded-lg"
                required
                maxLength={field === 'phoneNo' ? 10 : undefined}
              />
              {(field === 'password' || field === 'confirmPassword') && (
                <button
                  type="button"
                  className="absolute right-3 top-10 text-[#f7eae4]"
                  onClick={field === 'password' ? togglePasswordVisibility : toggleConfirmPasswordVisibility}
                >
                  {field === 'password' 
                    ? showPassword ? <EyeOff size={20} /> : <Eye size={20} /> 
                    : showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-[#ae7159] text-white font-semibold rounded-lg hover:bg-[#af7158da] transition duration-200"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className='text-[#e5bbaa] mt-4 '>
          Already have an Account? <Link to="/login" className='text-[#dbe3ff] underline'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;