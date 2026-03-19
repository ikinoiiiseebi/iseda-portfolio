import { type ProjectEvent } from '../data/events';

interface Props {
  selected: ProjectEvent | null;
}

const superchatColor = {
  red: 'text-red-400 border-red-500',
  yellow: 'text-yellow-400 border-yellow-500',
  blue: 'text-cyan-400 border-cyan-500',
  none: 'text-gray-400 border-gray-700',
};

function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="inline-block bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full mr-1 mb-1">
      {tech}
    </span>
  );
}

function DefaultScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center select-none">
      {/* 静的ノイズ風の装飾 */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600/30 to-purple-600/30 flex items-center justify-center border border-white/10">
          <span className="text-4xl">📡</span>
        </div>
        <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          <span className="live-blip inline-block w-1.5 h-1.5 bg-white rounded-full" />
          LIVE
        </div>
      </div>
      <p className="text-gray-400 text-sm">チャット欄のイベントを選択してください</p>
      <p className="text-gray-600 text-xs mt-1">制作物の詳細がここに表示されます</p>
    </div>
  );
}

export default function StreamScreen({ selected }: Props) {
  if (!selected) return <DefaultScreen />;

  const colorCls = superchatColor[selected.superchat];

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin px-6 py-5">
      {/* タグ / 日付 */}
      <div className={`flex items-center gap-2 mb-3 text-xs font-semibold ${colorCls} border-b pb-3`}>
        <span>📦 制作物</span>
        <span className="ml-auto text-gray-500">{selected.date}</span>
      </div>

      {/* タイトル */}
      <h1 className="text-xl font-bold text-white mb-2 leading-tight">{selected.title}</h1>

      {/* 説明文 */}
      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-4">
        {selected.description}
      </p>

      {/* 技術スタック */}
      {selected.tech.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">使用技術</p>
          <div>
            {selected.tech.map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>
        </div>
      )}

      {/* リンク */}
      {selected.links && selected.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {selected.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors border border-white/10"
            >
              🔗 {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
