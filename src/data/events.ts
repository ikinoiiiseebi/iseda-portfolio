export type SuperchatLevel = 'red' | 'yellow' | 'blue' | 'none';

export interface ProjectEvent {
  id: string;
  date: string;
  title: string;
  shortDesc: string;
  superchat: SuperchatLevel;
  tech: string[];
  description: string;
  images?: string[];
  links?: { label: string; url: string }[];
}

export const events: ProjectEvent[] = [
  {
    id: 'v-avatar-2022',
    date: '2022年2月（高校2年）',
    title: 'Vアバター作成・動画編集・動画投稿',
    shortDesc: 'Vtuber活動スタート。アバター・編集・投稿まで一人で',
    superchat: 'blue',
    tech: ['Live2D', 'Adobe Premiere Pro'],
    description:
      '高校2年生のときにVアバターをLive2D Cubismで自作し、動画編集・投稿までを一人でこなしました。\nここからクリエイティブな制作活動が始まります。',
    images: [
      '/images/v-avatar-2022-channel.png',
      '/images/v-avatar-2022-live2d.png',
    ],
    links: [
      { label: 'YouTubeチャンネル', url: 'https://youtube.com/@sika_v4084?si=nVI8bqBDgpvDRSSe' },
      { label: '動画を見る', url: 'https://youtu.be/dZQJZmHSyzY?si=Ce8TuK-pNO0Co0X-' },
    ],
  },
  {
    id: 'v-avatar-2024',
    date: '2024年3月（短大1年）',
    title: 'Vアバター作成し、文化祭で公開',
    shortDesc: '短大入学後に新たなVアバターを試作',
    superchat: 'none',
    tech: ['Live2D', 'OpenSeeFace'],
    description:
      '短大1年生のタイミングで新しいVアバターの試作を行いました。\n輪郭のないキャラクターデザインで作成しました。',
    images: [
      '/images/v-avatar-2024-tracking.JPG',
    ],
    links: [
      { label: '動画を見る', url: 'https://youtu.be/cEnmhuKg3ls' },
    ],
  },
  {
    id: 'unreal-game-2024',
    date: '2024年10月（短大2年）',
    title: 'Unreal Engineで3Dジャンプアクションゲーム制作',
    shortDesc: 'ステージの建築物やギミックを駆使して上を目指す3Dアクション。文化祭で展示',
    superchat: 'yellow',
    tech: ['Unreal Engine', 'Blueprint'],
    description:
      '短大2年生でUnreal Engineを使った3Dジャンプアクションゲームを制作しました。\n\nステージの建築物やギミックを駆使しながら上へ登っていくゲームです。\n\n文化祭で展示し、様々な方にプレイしていただきました。',
    images: [
      '/images/unreal-game-2024-play.jpg',
      '/images/unreal-game-2024-screen.png',
    ],
    links: [
      { label: '動画を見る', url: 'https://youtu.be/y9qlUHBFtg8?si=R3eVeC8COuUGcZeK' },
    ],
  },
  {
    id: 'digitkitaq-2024',
    date: '2024年12月〜2025年2月（短大2年）',
    title: 'DIGITKITAQ（北九州市主催長期ハッカソン）',
    shortDesc: '選挙情報をゲームUI風にしたアプリ。Flutter × レーダーチャート',
    superchat: 'none',
    tech: ['Flutter', 'Dart'],
    description:
      '北九州市主催の長期ハッカソン「DIGITKITAQ」に参加。\n他校の初対面メンバー3人とチームを組みました。\n\n相手の話を傾聴することでコミュニケーションを円滑にし、自分の得意・未経験を明確に伝えることで適切な役割分担を実現。作品を完成させることができました。\nハッカソン終了後、チームメンバーとご飯に行くほどの関係になれました。\n\n【制作物】\n投票率向上を目的に、選挙情報をゲームUI風に見やすくしたアプリ。\nFlutterでフロントエンドを担当し、6角形のレーダーチャートで立候補者の情報を可視化しました。',
    links: [],
  },
  {
    id: 'video-2025-03',
    date: '2025年3月（短大2年）',
    title: '動画編集・動画投稿',
    shortDesc: 'どんな動画が最後まで見てもらえるか真剣に分析し、ショート動画を制作・投稿',
    superchat: 'yellow',
    tech: ['Adobe Premiere Pro', 'Adobe After Effects'],
    description:
      '少し公にしづらい内容を扱っていますが、どんなジャンルであれば動画が再生されるか、どんな形式であれば最後まで見てもらえるかを真剣に考えました。\n\nショート動画で継続的に再生数を伸ばしていた「琴葉ggr姉妹」様の動画構成を参考にし、運営者の「もっさん」様から直接許可をいただいて制作しました。\n\n1分程度の動画でも台本作成・イラスト制作・素材収集・機械音声の出力・字幕生成・効果音設定・素材配置など多くの工程があり、私の能力では1本あたり約10時間かかってしまい、動画を投稿し続けることは時間的に難しく、2本の投稿のみとなりました。\n\nこの「動画作りの大変さを知る」という経験から、クリエイターを支えたいという思いが強くなりました。',
    images: [
      '/images/video-2025-03-channel.png',
      '/images/video-2025-03-short.png',
      '/images/video-2025-03-reference.png',
      '/images/video-2025-03-permission.png',
    ],
    links: [
      { label: 'YouTubeチャンネル', url: 'https://youtube.com/@ikinoiiiwakan?si=9hgWSXIGNpAYPWNB' },
      { label: '琴乃葉ggr姉妹様のYouTubeチャンネル', url: 'https://www.youtube.com/@KOTONOHAggrSISTERS' },
    ],
  },
  {
    id: 'unity-hackathon-2025',
    date: '2025年5月（大学3年）',
    title: 'ハッカソン参加・企業賞獲得 🏆',
    shortDesc: '「トイレを我慢する」緊張感のあるUnityタイミングゲームで企業賞',
    superchat: 'blue',
    tech: ['Unity', 'C#'],
    description:
      'ハッカソン運営企業と所属する情報技術研究部の共同主催ハッカソンに参加。\n部内メンバー1人とチームを組みました。\n\n「飲み会」という普遍的なイベントから「トイレを我慢する」という緊張感と面白味を持ったストーリーに昇華。\n残り膀胱容量ピッタリになるようにお酒の量を決めるタイミングゲームをUnityで制作しました。\nゲーム内の素材も自作しました。\n\nアイデアの独自性と再現度が高く評価され、企業賞を獲得しました。',
    images: [
      '/images/unity-hackathon-2025-team.jpg',
      '/images/unity-hackathon-2025-game.png',
    ],
    links: [],
  },
  {
    id: 'chara-2025',
    date: '2025年6月〜12月（大学3年）',
    title: 'チャレキャラ（福岡県後援・長期ハッカソン）',
    shortDesc: '目覚まし×ニュース音声化アプリ。Flutter + GeminiAPI + TTS',
    superchat: 'yellow',
    tech: ['Flutter', 'Supabase', 'RSS', 'Gemini API', 'TTS'],
    description:
      '福岡県などの後援を受けて開催される長期ハッカソン「チャレキャラ」に個人参加。\n\n【テーマ】「目覚まし時計を情報伝達ツールにする」\nユーザーの興味のあるニュース記事を音声化し、目覚まし時計のアラームの代わりに流すアプリを開発。\n\n冬の朝に布団からなかなか出られない自分の経験から着想。\nこの時間を有効活用したいという課題意識が起点でした。\n\nプレゼンでは聴衆の共感を呼び、メンターの方から「このアプリがリリースされたら使いたい」とコメントをいただきました。\n\n【技術構成】\nフロントエンド: Flutter / バックエンド: Supabase\nニュース取得: RSS / 台本化: Gemini API / 音声化: TTS',
    images: [
      '/images/chara-2025-1.jpg',
      '/images/chara-2025-2.jpg',
      '/images/chara-2025-3.jpg',
      '/images/chara-2025-4.jpg',
      '/images/chara-2025-5.jpg',
    ],
    links: [],
  },
  {
    id: 'startup-part-time-2025',
    date: '2025年8月〜10月（大学3年）',
    title: 'IT×建築スタートアップ企業でアルバイト',
    shortDesc: 'AI教育データ作成・アノテーション従事。スライド作成・サーバー取得も担当',
    superchat: 'yellow',
    tech: ['Slack'],
    description:
      'アルバイトを含め7人規模のIT×建築スタートアップ企業に勤務。\n\nAI教育用データの作成を行うアノテーション作業に2ヶ月半従事し業務満了後、AIがタスクを代替する時代に価値を示すことができるのは「仕事を奪える人間」であるとCTOから説明を受け、「仕事を奪う」か「アルバイトを辞める」かの選択肢を提示されました。\n\nここで言う「仕事を奪う」とは、現在他のメンバーが行っているタスクや、これから発生するであろうタクスの中で、新人が代替可能な業務を発見し、取り組むということです。\n\n自分の力になると判断し「仕事を奪う」ことを選択。\nSlack上のコミュニケーションからメンバーのニーズを観察し、必要とされているタスクを見つけ取り組みました。\n\n【実際に担当したタスク】\n・ピッチコンテスト用スライドの作成\n・サーバー・ドメインの取得\n\n「現在のタスクや、今後発生するであろうタスクの中で自分が代替可能なものを探す」という習慣は、日常生活の中でプログラミングで解決できる課題を見つける力に繋がっています。\n\n※その後、人件費見直しによりアルバイト契約を解除。',
    links: [
      { label: '会社サイト', url: 'https://u-dake.com/' },
      { label: 'Qiita記事', url: 'https://qiita.com/ikinoiiiseebi/items/fb5e4bdf84bf6e73fe0c' },
    ],
  },
  {
    id: 'project-exercise-2025',
    date: '2025年9月〜2026年1月（大学3年）',
    title: 'プロジェクト型演習・チーム開発',
    shortDesc: '6人チームで日記×AI状態数値化アプリを開発。React担当',
    superchat: 'blue',
    tech: ['React', 'TypeScript', 'Backlog'],
    images: [
      '/images/project-exercise-2025-poster.png',
    ],
    description:
      '大学の「プロジェクト型演習」という講義でチーム開発を行いました。\n\n【制作物】\n日記型のアプリで、投稿した内容に沿ってAIが現在の自分の状態を数値化して記録するアプリです。\n\n6人でチームを組み、私はフロントエンドを担当。\nReactでホーム画面のステータス表示機能・グラフ機能・ステータスの値をバックエンドに送る部分を実装しました。\n\nまた、発表用ポスターは構成からデザインまで私が作成しました。\n\nこの講義ではタスクをBacklogで管理しており、実際の業務に近い形でタスクの進捗管理・報告を行いました。',
    links: [],
  },
  {
    id: 'giikuten-2025',
    date: '2025年11月（大学3年）',
    title: '技育展2025・技育CAMPキャラバン参加',
    shortDesc: 'Slack上の5W1Hチェッカー「whchecker」で全国90名の枠に選出',
    superchat: 'red',
    tech: ['TypeScript', 'Node.js', 'Slack API', 'Gemini API'],
    images: [
      '/images/giikuten-2025-1.png',
      '/images/giikuten-2025-2.png',
      '/images/giikuten-2025-3.png',
      '/images/giikuten-2025-4.png',
      '/images/giikuten-2025-5.png',
      '/images/giikuten-2025-6.png',
      '/images/giikuten-2025-7.png',
    ],
    description:
      'IT×建築スタートアップでのアルバイト中、CEOとCTOのコミュニケーションエラーから会社内で悶着が発生した経験から、この問題の解決なは需要があると感じ着想。\n\n原因を分析した結果、「自分の中で勝手に文章を補完してしまう」という問題を発見し、これを予防するためSlack上で動作するAI分析ボット「whchecker」を開発。\nユーザーのメッセージを5W1Hで分析し、不足があれば通知・改善案を提示、ボタン一つで元のメッセージを編集できる機能を実装しました。\n\n【評価されたポイント】\n・指摘するスレッドをユーザーが選択可能（雑談スレッドには不要なため）\n・文脈から指摘の必要性を自動判断（過剰な指摘を防止）\n・改善案をボタン一つで反映（ユーザー負担の軽減）\n\nサポーターズ主催の技育展2025に応募。\nオンライン予選は敗退したものの、書類審査で全国90名の枠に選出されました。\n\n技育CAMPキャラバンにも参加し、企業の方からフィードバックを獲得。',
    links: [
      { label: '技育展2025 デモ動画', url: 'https://youtu.be/Bk_5HbtDK_w' },
    ],
  },
  {
    id: 'tri-hackathon-2026',
    date: '2026年2月（大学3年）',
    title: 'TRIハッカソン — 17チーム中2位 🥈',
    shortDesc: '呪術廻戦「投射呪法」×カメラ操作のランゲーム。React + MediaPipe',
    superchat: 'red',
    tech: ['TypeScript', 'React', 'HTML', 'CSS', 'MediaPipe'],
    images: [
      '/images/tri-hackathon-2026-1.png',
      '/images/tri-hackathon-2026-2.png',
      '/images/tri-hackathon-2026-3.png',
    ],
    description:
      '情報技術研究部を含む3団体共同主催の「TRIハッカソン」に個人参加。\n\n人気漫画『呪術廻戦』に登場する「投射呪法」をテーマに、カメラ入力で操作するランゲームを制作。\n\nMediaPipeでカメラ入力を取得し、左右移動・ジャンプ・しゃがみ・伏せを認識して障害物を避けながら進む体を動かすランゲームです。\n\n17チーム中2番目の評価を獲得しました。',
    links: [
      { label: '詳細（Topaz）', url: 'https://topaz.dev/projects/b787787997b2d42f268f' },
      { label: 'GitHub', url: 'https://github.com/ikinoiiiseebi/TRI_ebifinal' },
      { label: 'デモをプレイ', url: 'https://ikinoiiiseebi.github.io/TRI_ebifinal/' },
    ],
  },
    {
    id: 'cosplay-2026',
    date: '2026年3月（大学3年）',
    title: 'コスプレイベント参加',
    shortDesc: 'ローレン・イロアスさんのコスプレ',
    superchat: 'none',
    tech: [],
    images: [
      '/images/cosplay-2026-1.jpg',
    ],
    description:
      '佐賀市鹿嶋市で行われたコスプレイベントに参加しローレン・イロアスさんのコスプレを行いました。\n\nコスプレに向けてメイクの勉強や筋トレ・食事管理によるボディメイクを行いました。\nコスプレの完成度を高めるために筋トレを始め、学校のジムに平均週3回1年半以上通い続けています。また、糖質・脂質を避け、1日に摂取するタンパク質の量を管理して100g以上摂るようにしています。',
    links: [],
  },
  {
    id: 'hackutz-2026',
    date: '2026年3月（大学3年）',
    title: 'ハックツハッカソン参加',
    shortDesc: 'Wiibordでwifiの波に乗るゲーム。React + MediaPipe + 背景透過',
    superchat: 'yellow',
    tech: ['React', 'JavaScript', 'MediaPipe'],
    images: [
      '/images/hackutz-2026-1.png',
      '/images/hackutz-2026-2.png',
    ],
    description:
      '株式会社ハックツが運営するハックツハッカソンに参加。\n3人でチームを組みました。\n\n【制作物】\nサーフィンのようにWiibord（サーフボード型コントローラー）でWifiの波を乗りこなしてポイントを稼ぐゲームを制作。\n\nReact・JavaScriptを使用し、MediaPipeによるポーズ認識・背景透過部分・ゲーム画面のUIを担当。\nゲーム内で指定されるポーズの管理や認識・ポーズをとった際のエフェクトやSEも作成しました。\n\n【工夫した点】\nMediaPipeの処理と背景透過の処理を同時に行うと処理が重くなるという問題がありました。\nポーズ用フックと背景透過用フックが同じ映像ストリームを共有する設計にすることで、Web APIを2回呼ばずに済み、軽量化に成功しました。',
    links: [
      { label: '詳細（Topaz）', url: 'https://topaz.dev/projects/86ad42c1abbda4327aa4' },
      { label: 'GitHub', url: 'https://github.com/wasijyayo/Megaro_wave' },
    ],
  },
  {
    id: 'nijifes-2026',
    date: '2026年5月（大学4年）',
    title: 'にじさんじフェス2026（参加予定）',
    shortDesc: '5月17日（日）参加予定',
    superchat: 'none',
    tech: [],
    images: [
      '/images/nijifes-2026-1.png',
    ],
    description:
      'にじさんじフェス2026に参加予定です。\n5月17日（日）に参加します。',
    links: [],
  },
];
