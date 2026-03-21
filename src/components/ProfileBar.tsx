import { useEffect, useRef, useState } from 'react';
import { events } from '../data/events';

const ALL_TECHS = [...new Set(events.flatMap((e) => e.tech))].sort();

const COUNTER_NAMESPACE = 'iseda-portfolio';
const COUNTER_KEY = 'visitors';

async function fetchAndIncrementCount(): Promise<number> {
  try {
    const res = await fetch(
      `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}/up`
    );
    if (!res.ok) throw new Error('Counter API error');
    const data = await res.json();
    return data.count ?? 0;
  } catch {
    const stored = parseInt(localStorage.getItem('visit_count') || '0', 10);
    const next = stored + 1;
    localStorage.setItem('visit_count', String(next));
    return next;
  }
}

async function fetchLikeCount(): Promise<number> {
  try {
    const res = await fetch(
      `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/likes/get`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.count ?? 0;
  } catch {
    return parseInt(localStorage.getItem('like_count') || '0', 10);
  }
}

async function incrementLikeCount(): Promise<number> {
  try {
    const res = await fetch(
      `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/likes/up`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.count ?? 0;
  } catch {
    const next = parseInt(localStorage.getItem('like_count') || '0', 10) + 1;
    localStorage.setItem('like_count', String(next));
    return next;
  }
}

export default function ProfileBar() {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(() => localStorage.getItem('liked') === 'true');
  const [bookmarked, setBookmarked] = useState(() => localStorage.getItem('bookmarked') === 'true');
  const [showTech, setShowTech] = useState(false);
  const techBtnRef = useRef<HTMLButtonElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;
    fetchAndIncrementCount().then(setVisitCount);
    fetchLikeCount().then(setLikeCount);
  }, []);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    localStorage.setItem('liked', 'true');
    const count = await incrementLikeCount();
    setLikeCount(count);
  };

  const handleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem('bookmarked', String(next));
  };

  // 外側クリックで閉じる
  useEffect(() => {
    if (!showTech) return;
    const handler = (e: MouseEvent) => {
      if (techBtnRef.current && !techBtnRef.current.closest('[data-tech-popup]')?.contains(e.target as Node)) {
        setShowTech(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [showTech]);

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-t"
      style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
    >
      {/* アバター */}
      <div
        className="flex-shrink-0 rounded-full p-[2px]"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa, #facc15, #eab308)' }}
      >
        <img
          src="/images/avatar-icon.jpg"
          alt="アバター"
          className="w-10 h-10 rounded-full object-cover block"
          style={{ background: 'var(--bg-tertiary)' }}
        />
      </div>

      {/* 名前 + ブックマーク + 自己紹介 */}
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>伊勢田然</span>
          </div>
          <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
            本サイト表示回数: {visitCount === null ? '---' : visitCount.toLocaleString()} 回
          </p>
        </div>

        {/* ブックマーク登録ボタン */}
        <button
          onClick={handleBookmark}
          className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold transition-colors flex-shrink-0"
          style={{
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-primary)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {bookmarked ? '登録済み' : 'ブックマーク登録'}
        </button>
      </div>

      {/* 高評価ボタン */}
      <button
        onClick={handleLike}
        className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{
          backgroundColor: liked ? 'var(--interactive-hover)' : 'var(--interactive-bg)',
          color: 'var(--text-primary)',
          border: '1px solid var(--interactive-border)',
        }}
        onMouseEnter={(e) => { if (!liked) e.currentTarget.style.backgroundColor = 'var(--interactive-hover)'; }}
        onMouseLeave={(e) => { if (!liked) e.currentTarget.style.backgroundColor = 'var(--interactive-bg)'; }}
        title={liked ? '高評価済み' : '高評価する'}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
        {likeCount === null ? '---' : likeCount.toLocaleString()}
      </button>

      {/* 技術スタックボタン + ポップアップ */}
      <div className="relative flex-shrink-0" data-tech-popup>
        <button
          ref={techBtnRef}
          onClick={() => setShowTech((v) => !v)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors"
          style={{
            backgroundColor: showTech ? 'var(--interactive-hover)' : 'var(--interactive-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--interactive-border)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = showTech ? 'var(--interactive-hover)' : 'var(--interactive-bg)')}
        >
          🛠 技術スタック
        </button>

        {showTech && (
          <div
            className="absolute bottom-full mb-2 right-0 p-3 rounded-xl shadow-lg z-50 w-72"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>技術スタック / 開発経験あり</p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TECHS.map((tech) => (
                <span
                  key={tech}
                  className="inline-block text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--card-header-bg)', color: 'var(--text-secondary)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GitHub リンク */}
      <a
        href="https://github.com/ikinoiiiseebi"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{
          backgroundColor: 'var(--interactive-bg)',
          color: 'var(--text-primary)',
          border: '1px solid var(--interactive-border)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--interactive-bg)')}
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        GitHub
      </a>

      {/* Topaz リンク */}
      <a
        href="https://topaz.dev/ikinoiiiseebi"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{
          backgroundColor: 'var(--interactive-bg)',
          color: 'var(--text-primary)',
          border: '1px solid var(--interactive-border)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--interactive-bg)')}
      >
        💎 Topaz
      </a>
    </div>
  );
}
