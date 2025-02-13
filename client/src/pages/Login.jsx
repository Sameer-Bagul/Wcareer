import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();
  const {backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true; // to store the cookie in the browser for the session to persist after login or refresh the page 

      if (state === 'Sign Up') {
        
        const {data} = await axios.post( backendUrl + '/api/auth/register', {name, email, password});
        
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/'); // yaha pe redirect karna hai home page pe but bad me ham sidha dashboard ko navigate kr denge
        } else {
          toast.error(data.message);
        }

      } else {
        const {data} = await axios.post( backendUrl + '/api/auth/login', {email, password});
        
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/'); // yaha pe redirect karna hai home page pe but bad me ham sidha dashboard ko navigate kr denge
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'Sign Up' ? 'Create Account' : 'Login to Account'}
        </h2>

        <p className="text-center text-sm mb-6 text-white">
          {state === 'Sign Up' ? 'Create Your Account' : 'Login to your Account'}
        </p>

        <form onSubmit={onSubmitHandler} >
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <p 
            onClick={() => navigate('/reset-password')}
            className="mb-4 text-indigo-500 cursor-pointer">
            Forgot Password
          </p>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full font-medium cursor-pointer"
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{' '}
            <span 
              onClick={() => setState('Login')}
              className='text-blue-400 cursor-pointer hover:underline'>
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{' '}
            <span 
              onClick={() => setState('Sign Up')}
              className='text-blue-400 cursor-pointer hover:underline'>
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
