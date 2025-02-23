import Hero from '@/components/home-common/Hero';
import Navbar from '@/components/home-common/Navbar';
import Services from '@/components/home-common/Services';
import Features from '@/components/home-common/Features';
import Tools from '@/components/home-common/Tools';
import Community from '../components/home-common/Community';
import Footer from '@/components/home-common/Footer';


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