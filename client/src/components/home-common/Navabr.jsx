import React, { useState, useContext } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);
  
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, userData, setUserData, isLoggedin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendVerificationOtp = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');

      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
        toast.success('Logged out successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const navbarData = {
    title: "WCareers",
    links: [
      { name: "About Us", target: "about" },
      { name: "Contact", target: "contact" },
    ],
    loginText: "Log In",
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#F8F7F3] text-black z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="flex flex-row justify-between py-5">
          {/* Logo */}
          <div className="flex flex-row items-center cursor-pointer">
            <ScrollLink to="home" spy={true} smooth={true} duration={500}>
              <h1 className="text-2xl font-semibold">{navbarData.title}</h1>
            </ScrollLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-6">
            {navbarData.links.map((link, index) => (
              <ScrollLink
                key={index}
                to={link.target}
                spy={true}
                smooth={true}
                duration={500}
                className="text-opacity-60 text-black hover:text-opacity-100 transition"
              >
                {link.name}
              </ScrollLink>
            ))}
            
            {(userData && isLoggedin) ? (
              <div className="flex items-center gap-4">
                {!userData.isAccountVerified && (
                  <button 
                    onClick={sendVerificationOtp}
                    disabled={isLoading}
                    className="py-2 px-4 text-black hover:text-opacity-70 transition disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Verify Email'}
                  </button>
                )}
                
                <button 
                  onClick={() => navigate('/dashboard')}
                  disabled={isLoading}
                  className="py-2 px-4 bg-[#F59E00] text-black rounded-lg hover:bg-[#d78a00] transition disabled:opacity-50"
                >
                  Dashboard
                </button>
                
                <button 
                  onClick={logout}
                  disabled={isLoading}
                  className="py-2 px-4 border border-[#F59E00] text-black rounded-lg hover:bg-[#fff3dc] transition disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Logout'}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                disabled={isLoading}
                className="py-2 px-4 bg-[#F59E00] text-black rounded-lg hover:bg-[#d78a00] transition disabled:opacity-50"
              >
                Log In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-black text-3xl" onClick={() => setMenu(!menu)}>☰</button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden fixed top-0 left-0 w-[90%] h-screen bg-[#F8F7F3] text-black flex flex-col items-center justify-center text-2xl font-semibold gap-8 transition-transform duration-300`}
        >
          <button className="absolute top-5 right-5 text-3xl" onClick={closeMenu}>✖</button>

          {navbarData.links.map((link, index) => (
            <ScrollLink
              key={index}
              to={link.target}
              spy={true}
              smooth={true}
              duration={500}
              className="text-opacity-60 text-black hover:text-opacity-100 transition"
              onClick={closeMenu}
            >
              {link.name}
            </ScrollLink>
          ))}

          {(userData && isLoggedin) ? (
            <>
              {!userData.isAccountVerified && (
                <button 
                  onClick={() => {
                    sendVerificationOtp();
                    closeMenu();
                  }}
                  disabled={isLoading}
                  className="py-2 px-4 text-black hover:text-opacity-70 transition disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Verify Email'}
                </button>
              )}
              
              <button 
                onClick={() => {
                  navigate('/dashboard');
                  closeMenu();
                }}
                className="py-2 px-4 bg-[#F59E00] text-black rounded-lg hover:bg-[#d78a00] transition"
              >
                Dashboard
              </button>
              
              <button 
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="py-2 px-4 border border-[#F59E00] text-black rounded-lg hover:bg-[#fff3dc] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                navigate('/login');
                closeMenu();
              }}
              disabled={isLoading}
              className="py-2 px-4 bg-[#F59E00] text-black rounded-lg hover:bg-[#d78a00] transition disabled:opacity-50"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;