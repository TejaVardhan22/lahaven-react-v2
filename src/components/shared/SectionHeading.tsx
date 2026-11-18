import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: 'center' | 'left';
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function SectionHeading({
  title,
  subtitle,
  description,
  alignment = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClasses = alignment === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      className={`flex flex-col gap-4 ${alignClasses} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {subtitle && (
        <span className="section-kicker">
          {subtitle}
        </span>
      )}

      <h2 className="heading-section text-balance">{title}</h2>

      {description && (
        <p
          className={`text-body mt-1 max-w-2xl ${
            alignment === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;

