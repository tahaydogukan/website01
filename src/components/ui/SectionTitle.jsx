import { motion } from 'framer-motion';

const SectionTitle = ({
  title,
  subtitle,
  centered = true,
  light = false,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-primary-500'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-secondary-600'}`}>
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-1 w-24 mt-6 rounded-full ${centered ? 'mx-auto' : ''} ${light ? 'bg-white/50' : 'bg-accent-500'}`}
      />
    </motion.div>
  );
};

export default SectionTitle;
