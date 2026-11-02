// 本番決済の確認用（test-100.html だけで読み込む）。確認が終わったら test-100.html ごと消す。
// GA4 の売上に入れないよう、このページでは計測しない。
window.SHOP_CONFIG.ga4Id = "";
window.SHOP_CONFIG.products.test = { name: "テスト商品（本番決済の確認用）", price: 100 };
