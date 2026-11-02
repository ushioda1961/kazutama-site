# 数霊チャンネル 公式ご購入ページ（kazutama.you-planning.org）

YouTube「数霊チャンネル」から誘導する、数霊REIWA・数霊ZENWA・空の販売ページ。
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

## 公開の仕組み

- 公開用リポジトリ `ushioda1961/kazutama-site`（public）→ GitHub Pages（main ブランチの直下）→ 独自ドメイン `kazutama.you-planning.org`
- XServerのDNSに `kazutama` の CNAME レコード（向き先：`ushioda1961.github.io`）を1行追加（ほかの名前は今までどおり `*` の A レコードで XServer に向く）
- 以前の非公開リポジトリ `ushioda1961/kazutama-shop` は作業の記録として残してある（手元では `old-private` という名前）。公開用は、パスワード類のファイルを履歴から消してから作り直したもの
- **このフォルダはまるごと公開される。** パスワード・バックアップコード・2段階認証の画像・口座番号は、このフォルダに置かない（`D:\数霊プロジェクト\_非公開\` へ）
- 売上・分析の記録は別の非公開リポジトリ（PayPalのお客様情報を含むため、公開リポジトリには絶対に置かない）

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

YouTubeの概要欄のリンクには、どの動画から来たか分かるように印を付ける：
`https://kazutama.you-planning.org/?utm_source=youtube&utm_medium=video&utm_campaign=<動画の番号>`

## 決済（PayPal）

- PayPal JavaScript SDK のボタン。`config.js` の `paypalClientId` に**クライアントID（公開用）**を入れると表示される。空なら「準備中」表示
- **シークレット（Secret）は絶対にこのリポジトリに書かない**
- 価格が `null` の商品は「価格確認中」と表示し、購入ボタンを出さない
- テストは PayPal の Sandbox（テスト用）クライアントIDで行い、確認後に本番IDへ差し替える
- 2026-11-02 から本番（`paypalMode: "live"`）。本番アプリは PayPal Developer の Live「kazutama-shop」、売上はビジネスアカウント u-mail@ushioda-masaaki.com に入る
- Sandbox では購入完了まで確認済み。本番は注文の作成（支払い画面が開くところ）まで確認。最初の実際のお支払いで、PayPal の取引一覧と thanks.html の注文番号を確かめる

## 計測

- GA4：アカウント「ushioda」→ プロパティ「数霊チャンネル 公式ご購入ページ」（測定ID G-1M6DKR13NM）

## 未確定（要確認）

- 商品写真（現在は取扱説明書の写真を流用。撮り直し予定）

確定済み（2026-11-02）：価格、数霊ZENWA・空の読み（くう）とお届け品・保証（商品説明書より）、送料・振込期限・返品条件・電話・メール（特商法）、購入特典（両商品に同じ4つ）、ザ・フナイの掲載号（2027年1月号 vol.231 p.172〜185、最終ゲラより）
