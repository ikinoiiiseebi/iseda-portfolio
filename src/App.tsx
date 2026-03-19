import { useState } from 'react';
import { events, type ProjectEvent } from './data/events';
import StreamScreen from './components/StreamScreen';
import ChatTimeline from './components/ChatTimeline';
import ProfileBar from './components/ProfileBar';
import './index.css';

export default function App() {
  const [selected, setSelected] = useState<ProjectEvent | null>(null);

  return (
    <div className="flex h-screen w-screen bg-[#0f0f0f] overflow-hidden">

      {/* ===== 左カラム: 配信画面 + プロフィールバー ===== */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* 配信画面上部バー */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#212121] border-b border-gray-800">
          <div className="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <span className="live-blip inline-block w-1.5 h-1.5 bg-white rounded-full" />
            LIVE
          </div>
          <span className="text-xs text-gray-300 font-medium truncate">
            {selected ? selected.title : 'iseda のポートフォリオ'}
          </span>
          <span className="ml-auto text-xs text-gray-600 flex-shrink-0">配信中</span>
        </div>

        {/* 配信画面（詳細表示エリア） */}
        <div className="flex-1 overflow-hidden bg-[#181818]">
          <StreamScreen selected={selected} />
        </div>

        {/* プロフィールバー */}
        <ProfileBar />
      </div>

      {/* ===== 右カラム: チャット欄（タイムライン） ===== */}
      <div className="w-80 flex-shrink-0 border-l border-gray-800 flex flex-col">
        <ChatTimeline
          events={events}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
      </div>

    </div>
  );
}
