import { useState, useRef, useEffect } from 'react';
import { type ProjectEvent } from '../data/events';

function getYouTubeId(url: string): string | null {
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return short[1];
  const watch = url.match(/[?&]v=([^?&]+)/);
  if (watch) return watch[1];
  return null;
}

interface Props {
  selected: ProjectEvent | null;
}

const superchatAccent = {
  red:    { text: '#f87171', border: '#ef4444' },
  yellow: { text: '#facc15', border: '#eab308' },
  blue:   { text: '#22d3ee', border: '#06b6d4' },
  none:   { text: 'var(--text-muted)', border: 'var(--border-color)' },
};

function TechBadge({ tech }: { tech: string }) {
  return (
    <span
      className="inline-block text-xs px-2 py-0.5 rounded-full mr-1 mb-1"
      style={{ backgroundColor: 'var(--card-header-bg)', color: 'var(--text-secondary)' }}
    >
      {tech}
    </span>
  );
}

function DefaultScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center select-none">
      <div className="relative mb-6">
        <div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600/30 to-purple-600/30 flex items-center justify-center"
          style={{ border: '1px solid var(--card-border)' }}
        >
          <span className="text-4xl">📡</span>
        </div>
        <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          <span className="live-blip inline-block w-1.5 h-1.5 bg-white rounded-full" />
          LIVE
        </div>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>チャット欄のイベントを選択してください</p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>制作物の詳細がここに表示されます</p>
    </div>
  );
}

// layer4（黒目）をSVGで置き換え、それ以外を重ねる
const BASE_LAYERS = [1, 2, 3, 5, 6];

// 264px表示空間上での目の中心座標・最大移動量（調整可）
const EYES = [
  { x: 90, y: 133 },
  { x: 136, y: 133 },
];
const MAX_PUPIL_MOVE = 5;
const PUPIL_RADIUS = 4;

function AvatarOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [breathY, setBreathY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.43;
      const cy = rect.top + rect.height * 0.26;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return;
      setDir({ x: dx / dist, y: dy / dist });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 呼吸アニメーション（約3秒周期、振幅4px）
  useEffect(() => {
    let animId: number;
    const animate = (time: number) => {
      setBreathY(Math.sin(time / 500) * 5);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 pointer-events-none select-none"
      style={{ width: '264px', height: '264px', right: '2rem', transform: `translateY(${breathY}px)` }}
    >
      {BASE_LAYERS.map((n) => (
        <img
          key={n}
          src={`/images/avatar/layer${n}.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ zIndex: n }}
        />
      ))}
      {/* 黒目：マウス方向に追従 */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 4 }}
        viewBox="0 0 264 264"
      >
        {EYES.map((eye, i) => (
          <circle
            key={i}
            cx={eye.x + dir.x * MAX_PUPIL_MOVE}
            cy={eye.y + dir.y * MAX_PUPIL_MOVE}
            r={PUPIL_RADIUS}
            fill="#2a1a0a"
          />
        ))}
      </svg>
    </div>
  );
}

export default function StreamScreen({ selected }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  if (!selected) return (
    <div className="relative h-full">
      <DefaultScreen />
      <AvatarOverlay />
    </div>
  );

  const accent = superchatAccent[selected.superchat];

  return (
    <div className="relative h-full">
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin px-6 py-5">
      {/* タグ / 日付 */}
      <div
        className="flex items-center gap-2 mb-3 text-xs font-semibold border-b pb-3"
        style={{ color: accent.text, borderColor: accent.border }}
      >
        <span>📦 制作物</span>
        <span className="ml-auto" style={{ color: 'var(--text-muted)' }}>{selected.date}</span>
      </div>

      {/* タイトル */}
      <h1 className="text-xl font-bold mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
        {selected.title}
      </h1>

      {/* 説明文 */}
      <p className="text-sm leading-relaxed whitespace-pre-line mb-4" style={{ color: 'var(--text-secondary)' }}>
        {selected.description}
      </p>

      {/* 画像ギャラリー */}
      {selected.images && selected.images.length > 0 && (
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>スクリーンショット</p>
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            {selected.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${selected.title} ${i + 1}`}
                className="w-full rounded-lg object-cover cursor-pointer transition-opacity hover:opacity-80"
                style={{ aspectRatio: '16/9', border: '1px solid var(--border-color)' }}
                onClick={() => setLightboxSrc(src)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 技術スタック */}
      {selected.tech.length > 0 && (
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>使用技術</p>
          <div>
            {selected.tech.map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>
        </div>
      )}

      {/* リンク */}
      {selected.links && selected.links.length > 0 && (
        <div className="mt-auto pt-4">
          {/* YouTubeサムネイル */}
          {selected.links.some((l) => getYouTubeId(l.url)) && (
            <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {selected.links.filter((l) => getYouTubeId(l.url)).map((link) => {
                const vid = getYouTubeId(link.url)!;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-lg overflow-hidden group"
                    style={{ border: '1px solid var(--border-color)' }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`}
                      alt={link.label}
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                      <span className="text-white text-2xl">▶</span>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white truncate"
                      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    >
                      {link.label}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
          {/* その他リンク */}
          <div className="flex flex-wrap gap-2">
            {selected.links.filter((l) => !getYouTubeId(l.url)).map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                style={{
                  backgroundColor: 'var(--interactive-bg)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--interactive-border)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--interactive-bg)')}
              >
                🔗 {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ライトボックス */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="拡大表示"
            className="max-w-full max-h-full rounded-lg object-contain"
            style={{ boxShadow: '0 0 40px rgba(0,0,0,0.6)' }}
          />
        </div>
      )}
    </div>
    <AvatarOverlay />
    </div>
  );
}
