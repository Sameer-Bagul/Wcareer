import { motion } from 'framer-motion';
import { useState } from 'react';
import LandingNavbar from "../components/LandingNavbar";
import ImageSlider from "../components/ImageSlider";
import HeroSection from "../components/HeroSection";
import FooterSection from "../components/FooterSection";
import { FaUserCircle, FaBrain, FaBriefcase, FaMapSigns, FaBook, FaMicrophone, FaFileAlt, FaUsers, FaChalkboardTeacher, FaCertificate } from 'react-icons/fa';

// Features Section
const FeaturesSection = () => {
  const features = [
    { title: "Personalised Dashboard", description: "Tailored insights and recommendations for you.", icon: <FaUserCircle className="text-blue-800 text-4xl mr-4" /> },
    { title: "Technical & Cognitive Tests", description: "Evaluate your technical and cognitive skills with ease.", icon: <FaBrain className="text-blue-800 text-4xl mr-4" /> },
    { title: "Job Recommendation", description: "Get job suggestions based on your skills and performance.", icon: <FaBriefcase className="text-blue-800 text-4xl mr-4" /> },
    { title: "Skill Roadmaps", description: "Structured learning paths to achieve your career goals.", icon: <FaMapSigns className="text-blue-800 text-4xl mr-4" /> },
    { title: "Self-Learning Section", description: "Learn at your own pace with curated resources.", icon: <FaBook className="text-blue-800 text-4xl mr-4" /> },
    { title: "Mock Interviews + AI Analysis", description: "Practice with AI-powered voice analysis and feedback.", icon: <FaMicrophone className="text-blue-800 text-4xl mr-4" /> },
    { title: "Resume Builder", description: "Create professional resumes effortlessly.", icon: <FaFileAlt className="text-blue-800 text-4xl mr-4" /> },
    { title: "Community Support", description: "Connect with peers and grow together.", icon: <FaUsers className="text-blue-800 text-4xl mr-4" /> },
    { title: "Virtual Workshops", description: "Attend workshops, seminars, and virtual events.", icon: <FaChalkboardTeacher className="text-blue-800 text-4xl mr-4" /> },
    { title: "Skill Verification & Certification", description: "Get recognized with verified certifications.", icon: <FaCertificate className="text-blue-800 text-4xl mr-4" /> },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="text-2xl font-semibold text-blue-800">{feature.title}</h3>
            </div>
            <p className="text-blue-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    { name: "John Doe", quote: "This platform transformed my career!", role: "Software Engineer" },
    { name: "Jane Smith", quote: "The skill roadmaps are so helpful!", role: "Data Analyst" },
    { name: "Sam Wilson", quote: "I landed my dream job through their recommendations.", role: "DevOps Specialist" },
  ];

  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900">What Our Users Say</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="p-8 bg-blue-50 rounded-xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-blue-700 italic mb-6">&quot;{testimonial.quote}&quot;</p>
            <h3 className="text-2xl font-semibold text-blue-900">{testimonial.name}</h3>
            <p className="text-blue-600">{testimonial.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {
  const reasons = [
    "Personalized Learning Paths",
    "AI-Driven Job Recommendations",
    "Community Support & Mentorship",
    "Verified Certifications",
    "Gamified Learning Experience",
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900">Why Choose Us?</h2>
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 px-6">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-blue-800 font-medium">{reason}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Call-To-Action Section
const CTASection = () => {
  return (
    <motion.section
      className="py-16 bg-blue-900 text-white text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-extrabold mb-6">Start Your Journey Today!</h2>
      <p className="text-xl mb-8">Join thousands of learners and professionals to upskill and achieve your goals.</p>
      <motion.button
        className="bg-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        Get Started Now
      </motion.button>
    </motion.section>
  );
};

// Bento Layout Section

const BentoLayout = () => {
  const bentoItems = [
    { name: "Personalised Dashboard", img: "https://via.placeholder.com/300" },
    { name: "Technical Tests", img: "https://via.placeholder.com/300" },
    { name: "Cognitive Tests", img: "https://via.placeholder.com/300" },
    { name: "Job Recommendation", img: "https://via.placeholder.com/300" },
    { name: "Self Learning", img: "https://via.placeholder.com/300" },
    { name: "Mock Interviews", img: "https://via.placeholder.com/300" },
    { name: "Mock Interviews", img: "https://via.placeholder.com/300" },
    { name: "Mock Interviews", img: "https://via.placeholder.com/300" },
    { name: "Mock Interviews", img: "https://via.placeholder.com/300" },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900">Explore Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        {bentoItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.1 }}
          >
            <img src={item.img} alt={item.name} className="w-full h-56 object-cover transition-opacity duration-300 group-hover:opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <h3 className="text-white text-2xl font-bold">{item.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "What is the platform about?", answer: "Our platform provides personalized learning paths, job recommendations, and community support to help you achieve your career goals." },
    { question: "How can I get started?", answer: "You can get started by signing up on our platform and exploring the various features we offer." },
    { question: "Are there any subscription fees?", answer: "We offer both free and premium subscription plans. You can choose the one that best suits your needs." },
    { question: "How can I contact support?", answer: "You can contact our support team through the 'Contact Us' section on our website." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto px-6">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
              onClick={() => toggleFAQ(index)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-blue-800">{faq.question}</h3>
            </motion.div>
            {activeIndex === index && (
              <motion.div
                className="mt-4 p-6 bg-blue-50 rounded-xl shadow-inner"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-blue-700">{faq.answer}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Main Home Page Component
const Home = () => {
  return (
    <div>
      <LandingNavbar />
      <ImageSlider />
      <HeroSection />
      <FeaturesSection />
      <BentoLayout />
      <TestimonialsSection />
      <FAQSection />
      <WhyChooseUs />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Home;
