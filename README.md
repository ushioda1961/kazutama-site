# 数霊チャンネル 公式ご購入ページ（kazutama.you-planning.org）

YouTube「数霊チャンネル」から誘導する、数霊REIWA・数霊ZENWA・空と、一緒に使う NCキューブプラス（2026-11-02 追加、銀行振込はアスメル No.621818）の販売ページ。
販売者：株式会社ユープランニング（本物研究所 販売代理店）

## 構成

| ファイル | 内容 |
|---|---|
| `index.html` | 販売ページ本体（商品・PayPalボタン・銀行振込・特典・FAQ） |
| `tokushoho.html` | 特定商取引法に基づく表記 |
| `privacy.html` | プライバシーポリシー |
| `thanks.html` | PayPal決済完了後のお礼ページ（購入の計測もここへ遷移する前に送る） |
| `apply-thanks.html` | 銀行振込の申込完了ページ（ステップメール「アスメル」の購読完了ページに設定する。`?item=reiwa` / `?item=sora`） |
| `assets/js/config.js` | **価格・PayPalクライアントID・GA4測定ID・振込フォームURL・YouTube URL はここだけ書き換える** |
| `assets/js/main.js` | 価格表示、PayPalボタン、GA4のイベント送信 |
| `assets/css/style.css` | 見た目 |
| `CNAME` | GitHub Pagesの独自ドメイン（kazutama.you-planning.org） |
| `assets/img/nccube*.jpg` | NCキューブプラスの写真（元：F:\数霊REIWA\NCキューブプラス。数霊REIWAとつないだ所・コンソール・トレイパッド） |
| `assets/img/ogp.jpg` | SNS（Facebook・LINE・X など）にリンクを貼ったときに出る画像（1200×630、両商品＋販売者名）。`index.html` の og:image は必ず https から始まる完全なURLで書く |
| `v/<回><r|s>/index.html` | YouTube 概要欄用の短い入口（utm 付きの販売ページへ移る） |

## 公開の仕組み

- 公開用リポジトリ `ushioda1961/kazutama-site`（public）→ GitHub Pages（main ブランチの直下）→ 独自ドメイン `kazutama.you-planning.org`
- XServerのDNSに `kazutama` の CNAME レコード（向き先：`ushioda1961.github.io`）を1行追加（ほかの名前は今までどおり `*` の A レコードで XServer に向く）
- 以前の非公開リポジトリ `ushioda1961/kazutama-shop` は作業の記録として残してある（手元では `old-private` という名前）。公開用は、パスワード類のファイルを履歴から消してから作り直したもの
- **このフォルダはまるごと公開される。** パスワード・バックアップコード・2段階認証の画像・口座番号は、このフォルダに置かない（`D:\数霊プロジェクト\_非公開\` へ）
- お客様の情報（名前・住所・メール）は、このリポジトリには絶対に置かない。売上は PayPal と GA4、注文の記録は下の「注文の見張り」がこのPCの `D:\数霊プロジェクト\_非公開\注文の見張り\` に持つ（別の非公開リポジトリは作っていない）

## 計測（GA4）で取るイベント

| イベント | タイミング |
|---|---|
| `view_item_list` | 販売ページを開いた |
| `begin_checkout` | PayPalボタンを押した |
| `purchase` | PayPalの支払いが完了した（注文番号つき） |
| `generate_lead` | 銀行振込の申込フォームへ進んだ |
| `bank_apply_complete` | 銀行振込の申込フォームを送信し終えた（`apply-thanks.html`） |

## 銀行振込の申込（アスメル）

- 申込フォーム・自動返信・通知はステップメール「アスメル」（1lejend.com）を使う。通知先は kazutama@you-planning.org
- アスメルの「購読完了ページURL」は 2026-11-02 に次へ付け替え済み（旧WordPressの完了ページはもう使っていない）
  - 数霊REIWA：`https://kazutama.you-planning.org/apply-thanks.html?item=reiwa`
  - 数霊ZENWA・空：`https://kazutama.you-planning.org/apply-thanks.html?item=sora`
- 自動返信の文面の改訂案は `D:\数霊プロジェクト\申込フォーム_アスメル\` にある（口座番号を含むので、このリポジトリには入れない）

YouTubeの概要欄のリンクには、どの動画から来たか分かるように印を付ける。長いので、概要欄には**短い入口** `/v/<回の番号><r|s>` を書く（r＝数霊REIWA、s＝数霊ZENWA・空）：

- 例：`https://kazutama.you-planning.org/v/00r` → `/?utm_source=youtube&utm_medium=video&utm_campaign=aisatsu#reiwa` に自動で移る（`v/00r/index.html` の meta refresh）
- 今ある入口：00＝aisatsu（ご挨拶）、01＝morimoto01（森本くん 監修就任）、02＝reiwa01（使い方#1）、03＝morimoto02（やまと心転写）、04＝reiwa02（使い方#2 開封）、05＝morimoto03（森本くん ブルーシリカで遠隔ヒーリング）、06〜18＝reiwa03〜reiwa15（数霊REIWAの使い方 第3〜15回。r は全回、18 だけ s も）、34＝morimoto04（森本くん 数霊は人間の成長を促す）、35＝morimoto05（森本くん 潜在意識にあるネガティブ感情）、19・20＝zenwa01・zenwa02（数霊ZENWA・空の使い方 第1・2回。s だけ）
- 新しい回を出すときは、`v/00r/` をコピーして `v/<回><r|s>/` を作り、中の `utm_campaign` と `#reiwa`／`#sora`、商品名を書き換える

## チラシとご紹介（2026-11-18〜）

- 紙のチラシ（数霊REIWA・数霊ZENWA・空 兼用、A4）の QR は1つで、購入ページの `#products` に着く。チラシの作り方と置き場は `D:\数霊プロジェクト\紹介チラシ\`（★最初に読む_引継ぎメモ.md）
  - `v/g00` … 一般用チラシ（`utm_source=flyer&utm_medium=print&utm_campaign=flyer_ippan`）
  - `v/c01` … ご紹介者 C01 に渡したチラシ（`utm_campaign=shokai_c01&ref=C01`）
- **番号（C01 など）と人の対応は、このリポジトリに書かない。**`D:\数霊プロジェクト\_非公開\注文の見張り\紹介者台帳.json` にだけ置く
- `main.js` が `ref` を受け取り、このブラウザに 90 日覚えておく。PayPal ボタンの上に「ご紹介者のお名前」の欄を出す（どの商品の欄に書いても全部にそろう）
- PayPal の注文の「説明」が「数霊ZENWA・空（ご紹介 C01 お客さまが書いた名前）」になる。これが PayPal の「支払いの受領通知」メールに載り、注文の見張りが拾って報告に「★ご紹介：…」と出す（`--shokai` で一覧）。GA4 のイベントにも `ref_code` が付く
- 銀行振込はアスメルのフォームの「ご紹介者」の欄（数霊REIWA はフリー01。数霊ZENWA・空は牛さんの OK 後に足す）を見張りが拾う
- 新しいご紹介者を足すとき：`v/c01/` をコピーして `v/c02/`（中の c01→c02、C01→C02）→ 台帳に1行 → チラシの道具の VARIANTS に1行

## 決済（PayPal）

- PayPal JavaScript SDK のボタン。`config.js` の `paypalClientId` に**クライアントID（公開用）**を入れると表示される。空なら「準備中」表示
- **シークレット（Secret）は絶対にこのリポジトリに書かない**
- 価格が `null` の商品は「価格確認中」と表示し、購入ボタンを出さない
- テストは PayPal の Sandbox（テスト用）クライアントIDで行い、確認後に本番IDへ差し替える
- 2026-11-02 から本番（`paypalMode: "live"`）。本番アプリは PayPal Developer の Live「kazutama-shop」、売上はビジネスアカウント u-mail@ushioda-masaaki.com に入る
- Sandbox・本番とも購入完了まで確認済み（本番：2026-11-02、確認用の100円商品ページで実際に決済 → 注文番号 0UY06685LU287525T・PayPal に入金通知 → 返金。確認用ページは削除済み）
- 売り手と同じ PayPal アカウント（または売り手に登録済みのカード）では買えない（「売り手のアカウントにログインしようとしています」と出る）。テストは別の人のアカウントで
- このページの PayPal で払われると、PayPal から件名「支払いの受領通知」のメールが PayPal アカウントのメール（u-mail）に届く（本文に商品名・金額・取引ID）。「〜様から支払いを受け取りました」は別の型の知らせなので、件名で振り分けるときは両方を考える
- **注文の見張り**（2026-11-15〜）：くろの予約タスク「数霊の注文の見張り」が毎日 8時・20時に、ベッキー（このPCのメールソフト）のメールから PayPal の支払いとアスメルの申込を拾い、振込で申し込んだ人が PayPal で払っていないかを突き合わせて牛さんに知らせる。プログラムと記録は `D:\数霊プロジェクト\_非公開\注文の見張り\`（`kazutama_chuumon.py`、`orders.json`）
- CSP の script-src に PayPal SDK のインラインスクリプトのハッシュが2つ入っている（Sandbox 用 xiaD0X…、本番用 n8SeBQ…）。SDK が変わってボタンが出なくなったら、ブラウザのコンソールに出るハッシュを全ページに足す

## 計測

- GA4：アカウント「ushioda」→ プロパティ「数霊チャンネル 公式ご購入ページ」（測定ID G-1M6DKR13NM）

## 未確定（要確認）

- 商品写真（現在は取扱説明書の写真を流用。撮り直し予定）

確定済み（2026-11-02）：価格、数霊ZENWA・空の読み（くう）とお届け品・保証（商品説明書より）、送料・振込期限・返品条件・電話・メール（特商法）、購入特典（両商品に同じ3つ：イスラム柄のポーチ・ホワイトシリカ製品1点・吉野内先生の講演会動画。2026-11-04 に「愛用者グループと勉強会」は外した→ 数霊チャンネルに置き換え、勉強会は決まり次第チャンネルで告知）、ザ・フナイの掲載号（2027年1月号 vol.231 p.172〜185、最終ゲラより）
