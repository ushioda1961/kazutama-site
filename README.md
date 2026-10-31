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
| `assets/js/config.js` | **価格・PayPalクライアントID・GA4測定ID・振込フォームURL・YouTube URL はここだけ書き換える** |
| `assets/js/main.js` | 価格表示、PayPalボタン、GA4のイベント送信 |
| `assets/css/style.css` | 見た目 |
| `CNAME` | GitHub Pagesの独自ドメイン（kazutama.you-planning.org） |

## 公開の仕組み（予定）

- 公開用リポジトリ（public）→ GitHub Pages → 独自ドメイン `kazutama.you-planning.org`
- XServerのDNSに `kazutama` の CNAME レコード（向き先：`<GitHubユーザー名>.github.io`）を1行追加
- 売上・分析の記録は別の非公開リポジトリ（PayPalのお客様情報を含むため、公開リポジトリには絶対に置かない）

## 計測（GA4）で取るイベント

| イベント | タイミング |
|---|---|
| `view_item_list` | 販売ページを開いた |
| `begin_checkout` | PayPalボタンを押した |
| `purchase` | PayPalの支払いが完了した（注文番号つき） |
| `generate_lead` | 銀行振込の申込フォームへ進んだ |

YouTubeの概要欄のリンクには、どの動画から来たか分かるように印を付ける：
`https://kazutama.you-planning.org/?utm_source=youtube&utm_medium=video&utm_campaign=<動画の番号>`

## 決済（PayPal）

- PayPal JavaScript SDK のボタン。`config.js` の `paypalClientId` に**クライアントID（公開用）**を入れると表示される。空なら「準備中」表示
- **シークレット（Secret）は絶対にこのリポジトリに書かない**
- 価格が `null` の商品は「価格確認中」と表示し、購入ボタンを出さない
- テストは PayPal の Sandbox（テスト用）クライアントIDで行い、確認後に本番IDへ差し替える

## 未確定（要確認）

- 数霊REIWAの税込価格（仮：198,000円＝現行180,000円税別）、数霊ZENWA・空の価格・読み・お届け品・説明文
- 送料、振込期限、返品・交換の条件、電話番号・メールアドレス（特商法）
- 購入特典の内容（現行ページの4つを仮置き）
- 商品写真（現在は取扱説明書の写真を流用。撮り直し予定）
- YouTubeチャンネルURL、GA4測定ID、PayPalクライアントID
