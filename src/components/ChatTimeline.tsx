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
    amountColor: 'text-red-100',
  },
  yellow: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-300',
    headerBg: 'bg-yellow-600',
    glow: 'glow-yellow',
    badge: '黄スパ',
    amountColor: 'text-yellow-100',
  },
  blue: {
    bg: 'bg-cyan-600',
    border: 'border-cyan-400',
    headerBg: 'bg-cyan-700',
    glow: 'glow-blue',
    badge: '青スパ',
    amountColor: 'text-cyan-100',
  },
  none: null,
};

function ChatMessage({
  event,
  delay,
  isSelected,
  onClick,
}: {
  event: ProjectEvent;
  delay: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const styles = superchatStyles[event.superchat];

  if (styles) {
    // スパチャ風カード
    return (
      <div
        className={`chat-message-enter ${styles.glow} cursor-pointer rounded-lg border ${styles.border} overflow-hidden mb-2 transition-opacity ${isSelected ? 'opacity-100 ring-2 ring-white/40' : 'opacity-90 hover:opacity-100'}`}
        style={{ animationDelay: `${delay}ms` }}
        onClick={onClick}
      >
        <div className={`${styles.headerBg} px-3 py-1.5 flex items-center justify-between`}>
          <span className="text-xs font-bold text-white">📦 {event.date}</span>
          <span className={`text-xs font-semibold ${styles.amountColor}`}>{styles.badge}</span>
        </div>
        <div className={`${styles.bg} px-3 py-2`}>
          <p className="text-sm font-bold text-white leading-snug">{event.title}</p>
          <p className="text-xs text-white/80 mt-0.5">{event.shortDesc}</p>
        </div>
      </div>
    );
  }

  // 通常チャット風
  return (
    <div
      className={`chat-message-enter cursor-pointer px-3 py-1.5 rounded hover:bg-white/5 transition-colors mb-0.5 ${isSelected ? 'bg-white/10' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <span className="text-xs text-gray-400 mr-2">{event.date}</span>
      <span className="text-sm text-gray-200">{event.title}</span>
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
      () => {
        setVisibleCount((c) => c + 1);
      },
      visibleCount === 0 ? 300 : 600
    );
    return () => clearTimeout(timer);
  }, [visibleCount, events.length]);

  // 新メッセージ追加時に一番下へスクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount]);

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f]">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 bg-[#212121]">
        <span className="text-sm font-semibold text-white">チャット</span>
        <span className="ml-auto text-xs text-gray-500">制作物タイムライン</span>
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
              delay={0}
              isSelected={selectedId === event.id}
              onClick={() => onSelect(event)}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* チャット入力欄（ダミー） */}
      <div className="border-t border-gray-800 p-2">
        <div className="bg-[#1a1a1a] rounded-full px-4 py-2 text-xs text-gray-600 cursor-default">
          イベントをクリックして詳細を表示...
        </div>
      </div>
    </div>
  );
}
