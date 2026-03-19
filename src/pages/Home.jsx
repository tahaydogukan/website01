import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import FeaturedAnnouncements from '../components/sections/FeaturedAnnouncements';
import UpcomingEvents from '../components/sections/UpcomingEvents';
import CultureHighlight from '../components/sections/CultureHighlight';
import GalleryPreview from '../components/sections/GalleryPreview';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Stats />
      <FeaturedAnnouncements />
      <UpcomingEvents />
      <CultureHighlight />
      <GalleryPreview />
      <Testimonials />
      <CTA />
    </motion.div>
  );
};

export default Home;
