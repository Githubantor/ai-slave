import { motion } from 'framer-motion';

export default function Card({ children, className = '', hoverable = true, onClick, glow = false }) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-card p-5 ${glow ? 'animate-glow' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
