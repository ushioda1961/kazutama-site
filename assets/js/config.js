// 販売ページの設定。価格・決済・計測の値はここだけを書き換える。
window.SHOP_CONFIG = {
  // PayPalの「クライアントID」（公開用の識別子。シークレットは絶対に書かない）。
  // paypalMode が "sandbox" のときはテスト用ID、"live" のときは本番用IDを使う。
  // 使うIDが空なら、購入ボタンの代わりに「準備中」と表示する。
  // 【公開の日】本番用IDを live に入れ、paypalMode を "live" に変える。
  paypalMode: "live", // 2026-11-02 本番に切り替え（テストに戻すときは "sandbox"）
  paypalClientIds: {
    sandbox: "BAAmNDaB-DthXnXWiRbgisz-p7smLHID5lZQZB6Nskx1ZL2n4N-B1e3xtVk7ImW0mCdUKkrQHB9etGAP1U", // PayPal Developer の Sandbox アプリ「kazutama-shop」
    live: "BAAhZwG6BFi-sX3gDEa6u8W1Zk59SKvoAoXRg4FncCVKZ13RV9Q5j5LsWepw814k5JdScT94bSqfm-p33o", // PayPal Developer の Live アプリ「kazutama-shop」（2026-11-02 作成）
  },

  // Googleアナリティクス4の測定ID（例: "G-XXXXXXXXXX"）。空なら計測しない。
  ga4Id: "G-1M6DKR13NM", // GA4 アカウント「ushioda」のプロパティ「数霊チャンネル 公式ご購入ページ」（2026-11-02 作成）

  // YouTube「数霊チャンネル」のURL
  youtubeChannelUrl: "https://www.youtube.com/@kazutama-CH",

  // 販売者名（PayPalの画面に表示される）
  brandName: "株式会社ユープランニング",

  products: {
    reiwa: {
      name: "数霊REIWA",
      // 税込価格（円）。180,000円＋税（現行のPayPal決済リンクと一致、2026-10-31 確認）
      price: 198000,
      // 銀行振込の申込先（現行のステップメール型フォーム）
      bankTransferUrl: "https://1lejend.com/stepmail/kd.php?no=cUzEvHSXz",
    },
    sora: {
      name: "数霊ZENWA・空",
      // 税込価格（円）。198,000円＋税（現行のPayPal決済リンクと一致、2026-10-31 確認）
      // 未確定にしたいときは null（「価格確認中」と表示し、購入ボタンを出さない）
      price: 217800,
      // 銀行振込の申込先（アスメル No.701508。自動返信は「数霊ZENWA・空」に更新済み）
      bankTransferUrl: "https://1lejend.com/stepmail/kd.php?no=ebeEvHSc",
    },
  },
};
