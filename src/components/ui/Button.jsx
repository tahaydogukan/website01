import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg focus:ring-primary-500',
    secondary: 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white hover:shadow-lg focus:ring-primary-500',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 hover:shadow-lg focus:ring-accent-500',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    white: 'bg-white text-primary-500 hover:bg-primary-50 hover:shadow-lg focus:ring-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  const MotionComponent = motion.button;

  if (to) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <Link to={to} className={buttonClasses} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <a href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer" {...props}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <MotionComponent
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {content}
    </MotionComponent>
  );
};

export default Button;
