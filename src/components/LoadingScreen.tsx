import { useEffect, useRef, useState } from 'react';

const LAYERS = [1, 2, 3, 5, 6];
const EYES = [
  { x: 126, y: 186 },
  { x: 190, y: 186 },
];
const ORBIT_RADIUS = 7;
const PUPIL_RADIUS = 4;
const LOADING_DURATION = 2400;

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [angle, setAngle] = useState(0);
  const [visible, setVisible] = useState(true);
  const animRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const animate = (time: number) => {
      if (!startRef.current) startRef.current = time;
      const elapsed = time - startRef.current;

      setAngle((elapsed / 600) * Math.PI * 2);

      if (elapsed >= LOADING_DURATION && !doneRef.current) {
        doneRef.current = true;
        setVisible(false);
        setTimeout(onDone, 400);
        return;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {/* アバター */}
      <div style={{ position: 'relative', width: 300, height: 300 }}>
        {LAYERS.map((n) => (
          <img
            key={n}
            src={`/images/avatar/layer${n}.png`}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              zIndex: n,
            }}
          />
        ))}
        {/* 黒目：ぐるぐる回転 */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 4 }}
          viewBox="0 0 370 370"
        >
          {EYES.map((eye, i) => (
            <circle
              key={i}
              cx={eye.x + Math.cos(angle) * ORBIT_RADIUS}
              cy={eye.y + Math.sin(angle) * ORBIT_RADIUS}
              r={PUPIL_RADIUS}
              fill="#2a1a0a"
            />
          ))}
        </svg>
      </div>

      {/* loading... テキスト */}
      <p
        style={{
          marginTop: 28,
          fontSize: 20,
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #facc15, #eab308, #3b82f6)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'loading-gradient 1.4s linear infinite',
        }}
      >
        loading...
      </p>
    </div>
  );
}
