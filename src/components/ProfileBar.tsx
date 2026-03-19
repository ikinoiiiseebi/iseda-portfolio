import { useEffect, useState } from 'react';

// 訪問者数カウンター（CountAPI を使用）
// ネームスペースとキーを自分のものに変更してください
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
    // API が繋がらない場合はローカルストレージでフォールバック
    const stored = parseInt(localStorage.getItem('visit_count') || '0', 10);
    const next = stored + 1;
    localStorage.setItem('visit_count', String(next));
    return next;
  }
}

export default function ProfileBar() {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    fetchAndIncrementCount().then(setVisitCount);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#212121] border-t border-gray-800">
      {/* アバター */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-lg font-bold text-white select-none">
        IS
      </div>

      {/* 名前 + 自己紹介 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">iseda</span>
          <span className="text-gray-600 text-xs">•</span>
          <span className="text-gray-400 text-xs truncate">
            エンジニア / 制作物を配信中
          </span>
        </div>
        <p className="text-gray-500 text-[11px] truncate mt-0.5">
          ここに一言自己紹介を入れてください
        </p>
      </div>

      {/* 訪問者数 */}
      <div className="flex flex-col items-center flex-shrink-0">
        <span className="text-[10px] text-gray-500">合計訪問者数</span>
        <span className="text-sm font-bold text-white">
          {visitCount === null ? '---' : visitCount.toLocaleString()}
        </span>
      </div>

      {/* GitHub リンク */}
      <a
        href="https://github.com/iseda"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-full transition-colors border border-white/10"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        GitHub
      </a>
    </div>
  );
}
