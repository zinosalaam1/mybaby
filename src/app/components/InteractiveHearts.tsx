import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
}

export function InteractiveHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [nextId, setNextId] = useState(0);

  const createHeart = useCallback((x: number, y: number) => {
    const newHeart: HeartParticle = {
      id: nextId,
      x,
      y,
    };

    setHearts((prev) => [...prev, newHeart]);
    setNextId((prev) => prev + 1);

    // Remove heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  }, [nextId]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    createHeart(e.clientX, e.clientY);
  }, [createHeart]);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    // Prevent scrolling when tapping
    const touch = e.touches[0];
    if (touch) {
      createHeart(touch.clientX, touch.clientY);
    }
  }, [createHeart]);

  return (
    <div
      className="fixed inset-0 cursor-pointer touch-none"
      onClick={handleClick}
      onTouchStart={handleTouch}
      style={{ zIndex: 50 }}
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: heart.x - 15,
              y: heart.y - 15,
            }}
            animate={{ 
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0.8],
              y: heart.y - 80,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="fixed pointer-events-none"
          >
            <Heart 
              className="w-6 h-6 sm:w-8 sm:h-8 fill-rose-400 text-rose-400" 
              style={{
                filter: 'drop-shadow(0 0 8px rgba(251, 113, 133, 0.6))',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}