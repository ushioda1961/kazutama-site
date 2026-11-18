// チラシの QR から YouTube「数霊チャンネル」へ移る入口（v/c01y など）。
// 移る前に、ご紹介の番号（<html data-ref="C01">）を販売ページの main.js と同じ入れ物（kz_ref）に覚えておく。
// あとで概要欄のリンクから同じブラウザで販売ページに来たとき、番号が PayPal の注文に付く。
(function () {
  "use strict";
  var el = document.documentElement;
  var code = (el.getAttribute("data-ref") || "").toUpperCase();
  try {
    if (/^[A-Z][0-9]{2,3}$/.test(code)) {
      window.localStorage.setItem("kz_ref", JSON.stringify({ code: code, t: Date.now() }));
    }
  } catch (e) {}
  window.location.replace("https://www.youtube.com/@kazutama-CH");
})();
