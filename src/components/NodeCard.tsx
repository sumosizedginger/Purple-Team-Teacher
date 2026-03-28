import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { useNexusContext } from '../context/NexusContext';
import type { NexusNode } from '../types';

interface NodeCardProps {
  node: NexusNode;
  angle: number;
  radius?: number;
  active: boolean;
  onClick: () => void;
}

export function NodeCard({
  node,
  angle,
  radius = 240,
  active,
  onClick,
}: NodeCardProps) {
  const { nodeVisits, logHover } = useNexusContext();
  const visits = nodeVisits[node.id] || 0;
  const bloomFactor = Math.min(visits / 10, 1); // Cap at 1.0

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 300 };
  const sx = useSpring(rotateX, springConfig);
  const sy = useSpring(rotateY, springConfig);

  const initialX = Math.cos(angle) * radius;
  const initialY = Math.sin(angle) * radius;

  return (
    <motion.div
      className={`node-disk-3d ${active ? 'active' : ''}`}
      style={{
        position: 'absolute',
        x: initialX,
        y: initialY,
        translateX: '-50%',
        translateY: '-50%',
        rotateX: sx,
        rotateY: sy,
        perspective: 1000,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.1, zIndex: 100 }}
      onMouseEnter={() => logHover(node.id)}
      onClick={onClick}
    >
      <div 
        className="disk-inner"
        style={{
          filter: bloomFactor > 0 
            ? `drop-shadow(0 0 ${10 + bloomFactor * 20}px var(--accent-${node.id === 'N11' ? 'gold' : 'purple'}))` 
            : 'none',
          borderColor: `rgba(var(--accent-rgb), ${0.3 + bloomFactor * 0.7})`
        }}
      >
        <div className="disk-content">
          {node.icon} <span>{node.name}</span>
        </div>
        {active && <motion.div className="disk-pulse" layoutId="pulse" />}
      </div>
    </motion.div>
  );
}
