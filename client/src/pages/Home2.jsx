import React from 'react';
import Hero from '@/components/home2-common/Hero';
import Navbar from '@/components/home2-common/Navbar';
import Services from '@/components/home2-common/Services';
import Features from '@/components/home2-common/Features';
import Tools from '@/components/home2-common/Tools';
import Community from '../components/home2-common/Community';
import Footer from '@/components/home2-common/Footer';


function Home2() {
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