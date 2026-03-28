import { motion, AnimatePresence } from 'framer-motion';

interface ContextFractureProps {
  children: React.ReactNode;
  isPublic: boolean;
}

export function ContextFracture({ children, isPublic }: ContextFractureProps) {
  return (
    <div className="fracture-wrapper" style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      width: '100%',
      flex: 1,
      minHeight: 0, /* FLEXBOX HARDENING */
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isPublic ? 'public' : 'resident'}
          initial={{ 
            filter: 'blur(20px) contrast(200%) brightness(200%)',
            scale: 0.95,
            opacity: 0 
          }}
          animate={{ 
            filter: 'blur(0px) contrast(100%) brightness(100%)',
            scale: 1,
            opacity: 1 
          }}
          transition={{ duration: 0.8, ease: "circOut" }}
          style={{ height: '100%', minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* GLITCH OVERLAYS */}
      <AnimatePresence>
        {isPublic === false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="fracture-glitch"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(rgba(139, 92, 246, 0.1), transparent)',
              pointerEvents: 'none',
              zIndex: 50
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
