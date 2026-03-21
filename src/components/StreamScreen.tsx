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
    <div className="h-full overflow-y-auto scrollbar-thin">
      {/* グラデーションヘッダー */}
      <div
        className="px-8 py-5 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 45%, #facc15 80%, #eab308 100%)' }}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">Profile</p>
        <h1 className="text-xl font-bold text-white">伊勢田然</h1>
        <p className="text-sm text-white/80 mt-0.5">福岡工業大学 情報工学部 情報工学科</p>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* 基本情報 */}
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span>🎓 情報技術研究部</span>
          <span>✉️ ikinoiiiseebi@gmail.com</span>
        </div>

        {/* エンジニア活動 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-1 h-4 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #3b82f6, #facc15)' }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>エンジニア活動</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            ハッカソンへの参加やハッカソンの開催を主な活動としている情報技術研究部に所属し、個人・チーム合わせて7回以上ハッカソンに参加しました。
          </p>
        </div>

        {/* エンジニア活動以外の創作 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-1 h-4 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #3b82f6, #facc15)' }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>創作活動</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            動画編集・投稿、Live2Dを用いたアバターの作成、アニメーションの作成、コスプレ、デッサン、油絵、高校生の時に軽音部に所属していたため、作詞・作曲など幅広い創作の経験があります。
          </p>
        </div>

        {/* 将来像 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-1 h-4 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #3b82f6, #facc15)' }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>将来像</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            幅広い創作の経験をしてきたからこそ「表現したい」「共感したい」という思いから生まれた『個人の表現を、他者との共感によって意味あるものに変え、人と人をつなぐ』というエンタメコンテンツの価値を理解しており、「エンタメ文化を造る一員になりたい」と考えるようになりました。
          </p>
        </div>

        {/* ヒント */}
        <p className="text-xs pt-2 border-t" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
          右のチャット欄から活動内容を選択すると詳細が表示されます
        </p>
      </div>
    </div>
  );
}

// layer4（黒目）をSVGで置き換え、それ以外を重ねる
const BASE_LAYERS = [1, 2, 3, 5, 6];

// 264px表示空間上での目の中心座標・最大移動量（調整可）
const EYES = [
  { x: 126, y: 186 },
  { x: 190, y: 186 },
];
const MAX_PUPIL_MOVE = 7;
const PUPIL_RADIUS = 4;

function AvatarOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [breathY, setBreathY] = useState(0);
  const [swayAngle, setSwayAngle] = useState(0);
  const swayRef = useRef({ current: 0, target: 0, speed: 0.01 });

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

  // 呼吸アニメーション
  useEffect(() => {
    let animId: number;
    const animate = (time: number) => {
      setBreathY(Math.sin(time / 500) * 4);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ランダム左右揺れ（下部を軸に回転）
  useEffect(() => {
    let animId: number;
    const animate = () => {
      const s = swayRef.current;
      s.current += (s.target - s.current) * s.speed;
      if (Math.abs(s.target - s.current) < 0.05) {
        s.target = (Math.random() - 0.5) * 12; // -3〜+3度
        s.speed = 0.01 + Math.random() * 0.015;
      }
      setSwayAngle(s.current);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        bottom: '-30px',
        width: '370px',
        height: '370px',
        right: '-2rem',
        transform: `translateY(${breathY}px) rotate(${swayAngle}deg)`,
        transformOrigin: 'bottom center',
        opacity: hovered ? 0.15 : 1,
        transition: 'opacity 0.3s ease',
        cursor: 'default',
      }}
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
        viewBox="0 0 370 370"
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

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="inline-block w-1 h-4 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #3b82f6, #facc15)' }} />
      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</span>
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
        <span>活動内容</span>
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
          <SectionLabel label="スクリーンショット" />
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
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
          <SectionLabel label="使用技術" />
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
            <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
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
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full transition-colors"
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
