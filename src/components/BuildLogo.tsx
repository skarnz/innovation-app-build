import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface BuildLogoProps {
  small?: boolean;
  className?: string;
}

interface LetterProps {
  letter: string;
  word: string;
  index: number;
  mouseDistance: number;
  maxDistance: number;
}

const Letter = ({ letter, word, index, mouseDistance, maxDistance }: LetterProps) => {
  const getScale = () => {
    const scale = 1 + (1 - Math.min(mouseDistance / maxDistance, 1)) * 0.5;
    return scale;
  };

  const getSpacing = () => {
    const baseSpacing = index === 0 ? 0 : 1;
    const extraSpacing = (1 - Math.min(mouseDistance / maxDistance, 1)) * 30;
    return baseSpacing + extraSpacing;
  };

  return (
    <div
      className="inline-block transition-all duration-700 relative"
      style={{
        transform: `scale(${getScale()})`,
        marginLeft: `${getSpacing()}px`,
      }}
    >
      <span className="font-orbitron font-bold text-gradient">{letter}</span>
      {mouseDistance / maxDistance < 0.5 && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 opacity-0 whitespace-nowrap animate-fade-in"
          style={{
            opacity: Math.max(0, 1 - (mouseDistance / (maxDistance * 0.5))),
            top: '110%'
          }}
        >
          <span className="text-xs md:text-sm text-electric-blue font-medium">{word}</span>
        </div>
      )}
    </div>
  );
};

const BuildLogo: React.FC<BuildLogoProps> = ({ small = false, className }) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerCenter, setContainerCenter] = useState({ x: 0, y: 0 });
  const [mouseDistance, setMouseDistance] = useState(1000);
  
  const letters = [
    { char: 'B', word: 'Brainstorm' },
    { char: 'U', word: 'Uncover' },
    { char: 'I', word: 'Innovate' },
    { char: 'L', word: 'Launch' },
    { char: 'D', word: 'Disrupt' },
  ];
  
  const maxDistance = isMobile ? 100 : 200;
  
  useEffect(() => {
    const updateContainerCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };
    
    updateContainerCenter();
    window.addEventListener('resize', updateContainerCenter);
    window.addEventListener('scroll', updateContainerCenter);
    
    return () => {
      window.removeEventListener('resize', updateContainerCenter);
      window.removeEventListener('scroll', updateContainerCenter);
    };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const distanceX = e.clientX - containerCenter.x;
      const distanceY = e.clientY - containerCenter.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      setMouseDistance(distance);
    };
    
    const handleTouchCenter = () => {
      if (isMobile) {
        setMouseDistance(0);
        setTimeout(() => setMouseDistance(1000), 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    if (containerRef.current) {
      containerRef.current.addEventListener('click', handleTouchCenter);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleTouchCenter);
      }
    };
  }, [containerCenter, isMobile]);
  
  const textSizeClass = small
    ? "text-2xl sm:text-3xl md:text-4xl"
    : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl";
  
  return (
    <div 
      ref={containerRef} 
      className={cn(textSizeClass, "flex justify-center items-center select-none transition-all duration-300", className)}
    >
      {letters.map((item, index) => (
        <Letter
          key={index}
          letter={item.char}
          word={item.word}
          index={index}
          mouseDistance={mouseDistance}
          maxDistance={maxDistance}
        />
      ))}
    </div>
  );
};

export default BuildLogo;
