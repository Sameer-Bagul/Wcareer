import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/home-common/Hero';
import Navbar from '@/components/home-common/Navbar';
import Services from '@/components/home-common/Services';
import Features from '@/components/home-common/Features';
import Tools from '@/components/home-common/Tools';
import Community from '../components/home-common/Community';
import Footer from '@/components/home-common/Footer';
import { AppContext } from '@/context/AppContext';

function Home2() {
  const { isLoggedin, userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate('/dashboard');
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Tools />
      <Community />
      <Footer />
    </div>
  )
}

export default Home2