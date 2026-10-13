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
  const baseStyles = 'inline-flex min-h-11 items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg focus:ring-primary-500',
    secondary: 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white hover:shadow-lg focus:ring-primary-500',
    accent: 'bg-accent-700 text-white hover:bg-accent-800 hover:shadow-lg focus:ring-accent-700',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    white: 'bg-white text-primary-500 hover:bg-primary-50 hover:shadow-lg focus:ring-white',
    outlineWhite: 'border border-white/50 text-white hover:bg-white/10 hover:border-white focus:ring-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0" aria-hidden="true">{icon}</span>}
    </>
  );

  const MotionComponent = motion.button;

  if (to) {
    return (
        <Link to={to} onClick={onClick} className={buttonClasses} {...props}>
          {content}
        </Link>
    );
  }

  if (href) {
    return (
        <a href={href} onClick={onClick} className={buttonClasses} target="_blank" rel="noopener noreferrer" {...props}>
          {content}
        </a>
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
