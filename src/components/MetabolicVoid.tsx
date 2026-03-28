import { motion, AnimatePresence } from 'framer-motion';

interface MetabolicVoidProps {
  intensity: number;
  isPublic: boolean;
}

export function MetabolicVoid({ intensity, isPublic }: MetabolicVoidProps) {
  const blobs = isPublic ? [
    { id: 1, color: 'rgba(251, 191, 36, 0.1)', size: 600, x: '20%', y: '30%' },
    { id: 2, color: 'rgba(255, 255, 255, 0.05)', size: 800, x: '70%', y: '60%' },
  ] : [
    { id: 1, color: 'rgba(139, 92, 246, 0.15)', size: 700, x: '10%', y: '20%' },
    { id: 2, color: 'rgba(167, 139, 250, 0.1)', size: 900, x: '80%', y: '70%' },
    { id: 3, color: 'rgba(0, 0, 0, 0.4)', size: 500, x: '50%', y: '50%' },
  ];

  return (
    <div className="metabolic-void-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={isPublic ? 'public' : 'resident'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="void-layer"
        >
          {blobs.map((blob) => (
            <motion.div
              key={blob.id}
              className="void-blob"
              style={{
                width: blob.size,
                height: blob.size,
                background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
                left: blob.x,
                top: blob.y,
                filter: 'blur(80px)',
              }}
              animate={{
                scale: [1, 1.2 * intensity, 1],
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 10 + Math.random() * 10,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="grain-filter" />
    </div>
  );
}
