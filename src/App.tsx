import { useEffect, useState } from 'react';
import { events, type ProjectEvent } from './data/events';
import StreamScreen from './components/StreamScreen';
import ChatTimeline from './components/ChatTimeline';
import ProfileBar from './components/ProfileBar';
import LoadingScreen from './components/LoadingScreen';
import './index.css';

function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false; // デフォルトはライトモード
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

function useAvatarFavicon() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const layerNums = [1, 2, 3, 5, 6];
    let loaded = 0;
    const imgs: HTMLImageElement[] = layerNums.map(() => new Image());
    imgs.forEach((img, i) => {
      img.onload = () => {
        loaded++;
        if (loaded === layerNums.length) {
          imgs.forEach((image) => ctx.drawImage(image, 0, 0, 64, 64));
          const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/png';
          link.href = canvas.toDataURL('image/png');
          document.head.appendChild(link);
        }
      };
      img.src = `/images/avatar/layer${layerNums[i]}.png`;
    });
  }, []);
}

export default function App() {
  useAvatarFavicon();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ProjectEvent | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <>
    {loading && <LoadingScreen onDone={() => setLoading(false)} />}
    <div className="flex h-screen w-screen overflow-hidden p-3 gap-3" style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* ===== 左カラム: タイトルバー・配信画面・プロフィールバー ===== */}
      <div className="flex flex-col flex-1 min-w-0 gap-2">

        {/* YouTube風ナビバー（枠なし） */}
        <div
          className="flex items-center gap-3 px-3 h-14 flex-shrink-0"
        >
          {/* ハンバーガーメニュー */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="flex flex-col justify-center gap-[5px] w-10 h-10 rounded-full transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span className="block w-5 h-0.5 mx-auto" style={{ backgroundColor: 'currentColor' }} />
              <span className="block w-5 h-0.5 mx-auto" style={{ backgroundColor: 'currentColor' }} />
              <span className="block w-5 h-0.5 mx-auto" style={{ backgroundColor: 'currentColor' }} />
            </button>
            {menuOpen && (
              <div
                className="absolute top-full left-0 mt-1 rounded-xl shadow-lg z-50 overflow-hidden"
                style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', minWidth: '160px' }}
              >
                <button
                  onClick={() => { setSelected(null); setMenuOpen(false); }}
                  className="w-full text-left text-sm px-4 py-2.5 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--interactive-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  プロフィールに戻る
                </button>
              </div>
            )}
          </div>

          {/* ロゴ */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-xl leading-none">🦐</span>
            <span className="font-bold text-sm leading-none" style={{ color: 'var(--text-primary)' }}>
              iseda<sup className="text-[8px] ml-0.5" style={{ color: 'var(--text-muted)' }}>portfolio</sup>
            </span>
          </div>

          {/* 検索バー風タイトル */}
          <div className="flex items-center flex-1 min-w-0 mx-4 max-w-xl">
            <div
              className="flex items-center flex-1 min-w-0 px-4 h-10 rounded-l-full text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRight: 'none',
                color: 'var(--text-secondary)',
              }}
            >
              伊勢田然  ポートフォリオサイト
            </div>
            <div
              className="flex items-center justify-center w-16 h-10 rounded-r-full flex-shrink-0"
              style={{
                backgroundColor: 'var(--interactive-bg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ fill: 'var(--text-secondary)' }}>
                <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* テーマ切り替え */}
          <button
            onClick={toggle}
            className="ml-auto flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: 'var(--interactive-bg)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--interactive-border)',
            }}
            title={dark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          >
            {dark ? '☀️ ライト' : '🌙 ダーク'}
          </button>
        </div>

        {/* 配信画面（枠あり） */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <StreamScreen selected={selected} />
        </div>

        {/* 配信タイトル */}
        <div className="px-1 flex-shrink-0">
          <h1 className="font-bold text-lg leading-snug" style={{ color: 'var(--text-primary)' }}>
            【就活】伊勢田然のポートフォリオサイト
          </h1>
        </div>

        {/* プロフィールバー（枠なし） */}
        <ProfileBar />
      </div>

      {/* ===== 右カラム: チャット欄（タイムライン） ===== */}
      <div
        className="w-80 flex-shrink-0 flex flex-col overflow-hidden"
        style={{
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          backgroundColor: 'var(--bg-tertiary)',
        }}
      >
        <ChatTimeline
          events={events}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
      </div>

    </div>
    </>
  );
}
