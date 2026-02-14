import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingParticles } from './components/FloatingParticles';
import { TypewriterText } from './components/TypewriterText';
import { InteractiveHearts } from './components/InteractiveHearts';
import { MusicToggle } from './components/MusicToggle';

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showInteractiveHearts, setShowInteractiveHearts] = useState(false);

  // Sections state for typewriter completion tracking
  const [section1Complete, setSection1Complete] = useState(false);
  const [section2Complete, setSection2Complete] = useState(false);

  const startExperience = () => {
    setCurrentSection(1);
  };

  useEffect(() => {
    if (currentSection > 0) {
      // Auto-advance sections with delays
      const timers: NodeJS.Timeout[] = [];

      // Section 1 → 2
      if (currentSection === 1 && section1Complete) {
        timers.push(setTimeout(() => setCurrentSection(2), 2000));
      }

      // Section 2 → 3
      if (currentSection === 2 && section2Complete) {
        timers.push(setTimeout(() => setCurrentSection(3), 2000));
      }

      // Section 3 → Final
      if (currentSection === 3) {
        timers.push(setTimeout(() => {
          setCurrentSection(4);
          setShowInteractiveHearts(true);
        }, 15000)); // After promise section completes
      }

      return () => timers.forEach(clearTimeout);
    }
  }, [currentSection, section1Complete, section2Complete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-rose-950 to-black" />
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Music Toggle */}
      <MusicToggle />

      {/* Interactive Hearts (Final Section Only) */}
      {showInteractiveHearts && <InteractiveHearts />}

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Opening Screen */}
          {currentSection === 0 && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center max-w-3xl w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="space-y-8"
              >
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-100 leading-relaxed px-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  If the world paused tonight…
                  <br />
                  and it was just us…
                  <br />
                  <span className="text-rose-200">
                    there are a few things I'd need you to know.
                  </span>
                </h1>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startExperience}
                  className="mt-12 px-6 sm:px-8 py-3 sm:py-4 bg-rose-900/40 backdrop-blur-sm border border-rose-400/30 rounded-full text-rose-100 text-lg sm:text-xl hover:bg-rose-900/60 transition-all"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                >
                  Listen to My Heart
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Section 1 - Gratitude */}
          {currentSection === 1 && (
            <motion.div
              key="gratitude"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center max-w-4xl w-full space-y-10 px-4"
            >
              <TypewriterText
                text="Thank you for loving me in ways I didn't even know I needed."
                speed={60}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-100 mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
              />

              <div className="space-y-6 mt-16">
                <TypewriterText
                  text="Thank you for your softness."
                  delay={4000}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="Thank you for your strength."
                  delay={6500}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="Thank you for choosing me — not just once, but every day."
                  delay={9000}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                  onComplete={() => setSection1Complete(true)}
                />
              </div>
            </motion.div>
          )}

          {/* Section 2 - The Truth */}
          {currentSection === 2 && (
            <motion.div
              key="truth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center max-w-4xl w-full space-y-10 px-4"
            >
              <TypewriterText
                text="You are not just my Valentine."
                speed={60}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-100 mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
              />

              <div className="space-y-6 mt-16">
                <TypewriterText
                  text="You are my peace on loud days."
                  delay={3500}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="My calm in chaos."
                  delay={6000}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="My favorite notification."
                  delay={7800}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="My safest place."
                  delay={10000}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                  onComplete={() => setSection2Complete(true)}
                />
              </div>

              {/* Subtle heartbeat effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ 
                  delay: 3,
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: 'loop' 
                }}
                className="absolute inset-0 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"
              />
            </motion.div>
          )}

          {/* Section 3 - The Promise */}
          {currentSection === 3 && (
            <motion.div
              key="promise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center max-w-4xl w-full space-y-10 px-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-100 mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                I Promise
              </motion.h2>

              <div className="space-y-6 mt-16">
                <TypewriterText
                  text="I promise to protect your heart."
                  delay={1500}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="To grow with you."
                  delay={4500}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="To never make you question where you stand with me."
                  delay={6500}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
                <TypewriterText
                  text="To love you loudly when needed… and quietly when that's what you need most."
                  delay={10500}
                  speed={50}
                  className="text-xl sm:text-2xl md:text-3xl text-rose-200/90"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                />
              </div>
            </motion.div>
          )}

          {/* Final Scene */}
          {currentSection === 4 && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-center max-w-4xl w-full space-y-12 relative px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="space-y-8"
              >
                <p 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-100 leading-relaxed"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  If the world never paused again…
                  <br />
                  I would still choose you.
                </p>

                <p 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-rose-200/80 leading-relaxed mt-8"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                >
                  In every lifetime.
                  <br />
                  On every Valentine's Day.
                  <br />
                  And on all the ordinary Saturdays in between.
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-300 mt-16"
                  style={{ fontFamily: 'Dancing Script, cursive' }}
                >
                  — Yours, Always.
                  <br />
                  Bola
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 5, duration: 1 }}
                  className="text-xs sm:text-sm text-rose-300/50 mt-8"
                  style={{ fontFamily: 'Crimson Text, serif' }}
                >
                  (Click anywhere to create hearts)
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}