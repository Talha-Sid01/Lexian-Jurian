import { useState, useCallback, ReactNode } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
}

interface ClickSparkProps {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

const ClickSpark = ({
  children,
  sparkColor = '#00BFFF',
  sparkSize = 60,
  sparkRadius = 100,
  sparkCount = 8,
  duration = 500
}: ClickSparkProps) => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      id: Date.now() + i,
      x,
      y
    }));

    setSparks(prev => [...prev, ...newSparks]);

    setTimeout(() => {
      setSparks(prev => prev.filter(spark => !newSparks.some(ns => ns.id === spark.id)));
    }, duration);
  }, [sparkCount, duration]);

  return (
    <div 
      className="relative cursor-pointer"
      onClick={handleClick}
    >
      {children}
      
      {sparks.map((spark, sparkIndex) => (
        <div key={spark.id} className="absolute pointer-events-none" style={{ left: spark.x, top: spark.y }}>
          {Array.from({ length: sparkCount }, (_, i) => {
            const angle = (360 / sparkCount) * i;
            const radian = (angle * Math.PI) / 180;
            const endX = Math.cos(radian) * sparkRadius;
            const endY = Math.sin(radian) * sparkRadius;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: sparkSize / 4,
                  height: sparkSize / 4,
                  backgroundColor: sparkColor,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `spark-fly ${duration}ms ease-out forwards`,
                  '--end-x': `${endX}px`,
                  '--end-y': `${endY}px`,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      ))}

      <style>{`
        @keyframes spark-fly {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ClickSpark;
