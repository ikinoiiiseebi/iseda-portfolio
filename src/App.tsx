import { useEffect, useState } from 'react';
import { events, type ProjectEvent } from './data/events';
import StreamScreen from './components/StreamScreen';
import ChatTimeline from './components/ChatTimeline';
import ProfileBar from './components/ProfileBar';
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

export default function App() {
  const [selected, setSelected] = useState<ProjectEvent | null>(null);
  const { dark, toggle } = useTheme();

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* ===== 左カラム: 配信画面 + プロフィールバー ===== */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* 配信画面上部バー */}
        <div
          className="flex items-center gap-2 px-4 py-2 border-b"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <span className="live-blip inline-block w-1.5 h-1.5 bg-white rounded-full" />
            LIVE
          </div>
          <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>
            {selected ? selected.title : 'iseda のポートフォリオ'}
          </span>

          {/* テーマ切り替えボタン */}
          <button
            onClick={toggle}
            className="ml-auto flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1 rounded-full transition-colors"
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

        {/* 配信画面（詳細表示エリア） */}
        <div className="flex-1 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <StreamScreen selected={selected} />
        </div>

        {/* プロフィールバー */}
        <ProfileBar />
      </div>

      {/* ===== 右カラム: チャット欄（タイムライン） ===== */}
      <div
        className="w-80 flex-shrink-0 border-l flex flex-col"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <ChatTimeline
          events={events}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
      </div>

    </div>
  );
}
