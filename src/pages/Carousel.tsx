import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useUsers } from '../contexts/UserContext';
import Skill from '../components/Skill';
import '../styles/Carousel.css';

function Carousel() {
  const { users, error } = useUsers();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheelScroll = (event: WheelEvent) => {
      if (event.deltaY === 0) return; // Ignore vertical scrolling
      event.preventDefault(); // Prevent page scrolling
      carousel.scrollLeft += event.deltaY * 2; // Increase scroll speed

      const { scrollLeft } = carousel;
      const itemWidth = 500 + 96; // width + gap
      const centerIndex = Math.round(scrollLeft / itemWidth);

      if (centerIndex !== activeIndex && centerIndex >= 0) {
        setActiveIndex(centerIndex);
      }
    };

    carousel.addEventListener('wheel', handleWheelScroll);
    return () => {
      carousel.removeEventListener('wheel', handleWheelScroll);
    };
  }, [activeIndex, users]);

  if (error) return <p>{error}</p>;

  if (!users || users.length === 0) return <p>Loading users...</p>;

  return (
    <div className='carousel-wrapper'>
      <div className='carousel' ref={carouselRef}>
        {users.map((user, index) => (
          <div key={user.id} className='carousel-item'>
            <img
              src={
                user.image
                  ? `data:image/jpeg;base64,${user.image}`
                  : 'https://cdn.prod.website-files.com/641af6e69a21755fd696647c/641da8b0a1a638938db9eb49_logo.webp'
              }
              alt={`${user.first_name} ${user.last_name}`}
            />
            <h1>
              {user.first_name} {user.last_name}
            </h1>

            <AnimatePresence mode='wait'>
              {activeIndex === index && (
                <motion.div
                  className='carousel-item-stats'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>{`${user.stats.current_streak_in_days}-day Streak`}</p>
                  <p>{`${user.stats.total_sessions_played} Sessions`}</p>
                  <ul>
                    {Object.entries(user?.stats.skills || {}).map(
                      ([name, info]) => (
                        <Skill
                          key={name}
                          name={name}
                          info={info}
                          hideLabels={true}
                        />
                      )
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
