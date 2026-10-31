// 販売ページの設定。価格・決済・計測の値はここだけを書き換える。
window.SHOP_CONFIG = {
  // PayPalの「クライアントID」（公開用の識別子。シークレットは絶対に書かない）。
  // paypalMode が "sandbox" のときはテスト用ID、"live" のときは本番用IDを使う。
  // 使うIDが空なら、購入ボタンの代わりに「準備中」と表示する。
  // 【公開の日】本番用IDを live に入れ、paypalMode を "live" に変える。
  paypalMode: "sandbox",
  paypalClientIds: {
    sandbox: "BAAmNDaB-DthXnXWiRbgisz-p7smLHID5lZQZB6Nskx1ZL2n4N-B1e3xtVk7ImW0mCdUKkrQHB9etGAP1U", // PayPal Developer の Sandbox アプリ「kazutama-shop」
    live: "",
  },

  // Googleアナリティクス4の測定ID（例: "G-XXXXXXXXXX"）。空なら計測しない。
  ga4Id: "",

  // YouTube「数霊チャンネル」のURL（決まったら差し替え）
  youtubeChannelUrl: "",

  // 販売者名（PayPalの画面に表示される）
  brandName: "株式会社ユープランニング",

  products: {
    reiwa: {
      name: "数霊REIWA",
      // 税込価格（円）。現行ページは「180,000円（税別）」→ 税込198,000円で仮置き【要確認】
      price: 198000,
      // 銀行振込の申込先（現行のステップメール型フォーム）
      bankTransferUrl: "https://1lejend.com/stepmail/kd.php?no=cUzEvHSXz",
    },
    sora: {
      name: "数霊ZENWA・空",
      // 税込価格（円）。吉野内先生の解説動画のスライド「217,800円(税込)」より【販売価格として要確認】
      // 未確定にしたいときは null（「価格確認中」と表示し、購入ボタンを出さない）
      price: 217800,
      // 振込の申込先。現行は旧ZENWA用フォーム【要確認】
      bankTransferUrl: "https://1lejend.com/stepmail/kd.php?no=ebeEvHSc",
    },
  },
};
