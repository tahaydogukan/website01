import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  bordered = false,
  padding = 'md',
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 40px -10px rgba(30, 58, 95, 0.15)' } : {}}
      className={`bg-white rounded-2xl shadow-card ${bordered ? 'border border-secondary-200' : ''} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
