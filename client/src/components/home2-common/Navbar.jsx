import React, { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  
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
            <Link to="home" spy={true} smooth={true} duration={500}>
              <h1 className="text-2xl font-semibold">{navbarData.title}</h1>
            </Link>
          </div>

          
          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-6">
            {navbarData.links.map((link, index) => (
              <Link
                key={index}
                to={link.target}
                spy={true}
                smooth={true}
                duration={500}
                className="text-opacity-60 text-black hover:text-opacity-100 transition"
              >
                {link.name}
              </Link>
            ))}
            
            <button className="py-2 px-4 bg-[#F59E00] text-black rounded-lg hover:bg-[#d78a00] transition">
              {navbarData.loginText}
            </button>
          </nav>

         
          <button className="lg:hidden text-black text-3xl" onClick={() => setMenu(!menu)}>☰</button>
        </div>

       
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden fixed top-0 left-0 w-[90%] h-screen bg-[#F8F7F3] text-black flex flex-col items-center justify-center text-2xl font-semibold gap-8 transition-transform duration-300`}
        >
          <button className="absolute top-5 right-5 text-3xl" onClick={closeMenu}>✖</button>

          {navbarData.links.map((link, index) => (
            <Link
              key={index}
              to={link.target}
              spy={true}
              smooth={true}
              duration={500}
              className="text-opacity-60 text-black hover:text-opacity-100 transition"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}

         
          <button onClick={closeMenu} className="py-2 px-4 bg-[#F59E00] text-black rounded-lg hover:bg-[#d78a00] transition">
            {navbarData.loginText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
