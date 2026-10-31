// 販売ページの設定。価格・決済・計測の値はここだけを書き換える。
window.SHOP_CONFIG = {
  // PayPalの「クライアントID」（公開用の識別子。シークレットは絶対に書かない）。
  // 空のあいだは購入ボタンの代わりに「準備中」と表示する。
  paypalClientId: "",

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
