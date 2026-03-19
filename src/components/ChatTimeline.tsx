import { useEffect, useRef, useState } from 'react';
import { type ProjectEvent } from '../data/events';

interface Props {
  events: ProjectEvent[];
  selectedId: string | null;
  onSelect: (event: ProjectEvent) => void;
}

const superchatStyles = {
  red: {
    bg: 'bg-red-600',
    border: 'border-red-400',
    headerBg: 'bg-red-700',
    glow: 'glow-red',
    badge: '赤スパ',
    textSub: 'text-red-100',
  },
  yellow: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-300',
    headerBg: 'bg-yellow-600',
    glow: 'glow-yellow',
    badge: '黄スパ',
    textSub: 'text-yellow-100',
  },
  blue: {
    bg: 'bg-cyan-600',
    border: 'border-cyan-400',
    headerBg: 'bg-cyan-700',
    glow: 'glow-blue',
    badge: '青スパ',
    textSub: 'text-cyan-100',
  },
  none: null,
};

function ChatMessage({
  event,
  isSelected,
  onClick,
}: {
  event: ProjectEvent;
  isSelected: boolean;
  onClick: () => void;
}) {
  const styles = superchatStyles[event.superchat];

  if (styles) {
    // スパチャ風カード（色付き・テーマ非依存）
    return (
      <div
        className={`chat-message-enter ${styles.glow} cursor-pointer rounded-lg border ${styles.border} overflow-hidden mb-2 transition-opacity ${isSelected ? 'opacity-100 ring-2 ring-white/40' : 'opacity-90 hover:opacity-100'}`}
        onClick={onClick}
      >
        <div className={`${styles.headerBg} px-3 py-1.5 flex items-center justify-between`}>
          <span className="text-xs font-bold text-white">📦 {event.date}</span>
          <span className={`text-xs font-semibold ${styles.textSub}`}>{styles.badge}</span>
        </div>
        <div className={`${styles.bg} px-3 py-2`}>
          <p className="text-sm font-bold text-white leading-snug">{event.title}</p>
          <p className="text-xs text-white/80 mt-0.5">{event.shortDesc}</p>
        </div>
      </div>
    );
  }

  // 通常カード（テーマ対応）
  return (
    <div
      className={`chat-message-enter cursor-pointer rounded-lg overflow-hidden mb-2 transition-opacity ${isSelected ? 'opacity-100 ring-2 ring-black/20' : 'opacity-90 hover:opacity-100'}`}
      style={{
        border: '1px solid var(--card-border)',
        outline: isSelected ? '2px solid var(--text-muted)' : undefined,
      }}
      onClick={onClick}
    >
      <div className="px-3 py-1.5 flex items-center justify-between" style={{ backgroundColor: 'var(--card-header-bg)' }}>
        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>📦 {event.date}</span>
      </div>
      <div className="px-3 py-2" style={{ backgroundColor: 'var(--card-bg)' }}>
        <p className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>{event.title}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{event.shortDesc}</p>
      </div>
    </div>
  );
}

export default function ChatTimeline({ events, selectedId, onSelect }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= events.length) return;
    const timer = setTimeout(
      () => setVisibleCount((c) => c + 1),
      visibleCount === 0 ? 300 : 600
    );
    return () => clearTimeout(timer);
  }, [visibleCount, events.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount]);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* ヘッダー */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>チャット</span>
        <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>制作物タイムライン</span>
      </div>

      {/* メッセージリスト */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2"
      >
        <div className="flex flex-col">
          {events.slice(0, visibleCount).map((event) => (
            <ChatMessage
              key={event.id}
              event={event}
              isSelected={selectedId === event.id}
              onClick={() => onSelect(event)}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* チャット入力欄（ダミー） */}
      <div className="border-t p-2" style={{ borderColor: 'var(--border-color)' }}>
        <div
          className="rounded-full px-4 py-2 text-xs cursor-default"
          style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-muted)' }}
        >
          イベントをクリックして詳細を表示...
        </div>
      </div>
    </div>
  );
}
