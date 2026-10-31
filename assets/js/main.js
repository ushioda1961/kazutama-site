// 価格表示・PayPalボタン・アクセス計測（GA4）をまとめて扱う。
(function () {
  "use strict";
  var cfg = window.SHOP_CONFIG || {};
  var products = cfg.products || {};

  function yen(n) {
    return n.toLocaleString("ja-JP") + "円";
  }

  // ---- 計測（GA4） ----
  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }

  function itemParams(key) {
    var p = products[key];
    if (!p) return {};
    return {
      currency: "JPY",
      value: p.price || 0,
      items: [{ item_id: key, item_name: p.name, price: p.price || 0, quantity: 1 }],
    };
  }

  function loadGa4() {
    if (!cfg.ga4Id) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga4Id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", cfg.ga4Id);
  }

  // ---- 価格と振込リンク ----
  function fillProducts() {
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var p = products[el.getAttribute("data-price")];
      el.textContent = p && p.price ? yen(p.price) : "価格確認中";
    });
    document.querySelectorAll("[data-bank]").forEach(function (el) {
      var key = el.getAttribute("data-bank");
      var p = products[key];
      if (p && p.bankTransferUrl) {
        el.href = p.bankTransferUrl;
        el.addEventListener("click", function () { track("generate_lead", itemParams(key)); });
      } else {
        el.hidden = true;
      }
    });
    document.querySelectorAll("[data-youtube]").forEach(function (el) {
      if (cfg.youtubeChannelUrl) el.href = cfg.youtubeChannelUrl;
      else el.classList.add("is-pending");
    });
  }

  // ---- PayPal ----
  function showPending(container, text) {
    container.innerHTML = "";
    var note = document.createElement("p");
    note.className = "pay-pending";
    note.textContent = text;
    container.appendChild(note);
  }

  function paypalClientId() {
    var ids = cfg.paypalClientIds || {};
    return ids[cfg.paypalMode === "live" ? "live" : "sandbox"] || "";
  }

  function renderButtons() {
    var holders = document.querySelectorAll("[data-paypal]");
    if (!holders.length) return;
    var clientId = paypalClientId();
    if (!clientId) {
      holders.forEach(function (h) { showPending(h, "オンライン決済は準備中です。お急ぎの方は銀行振込でお申し込みください。"); });
      return;
    }
    var s = document.createElement("script");
    s.src = "https://www.paypal.com/sdk/js?client-id=" + encodeURIComponent(clientId) +
      "&currency=JPY&locale=ja_JP&components=buttons";
    s.onload = function () {
      holders.forEach(function (h) {
        var key = h.getAttribute("data-paypal");
        var p = products[key];
        if (!p || !p.price) {
          showPending(h, "価格の確定後にお申し込みいただけます。");
          return;
        }
        window.paypal.Buttons({
          style: { layout: "vertical", color: "gold", shape: "rect", label: "pay" },
          onClick: function () { track("begin_checkout", itemParams(key)); },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                reference_id: key,
                description: p.name,
                amount: { currency_code: "JPY", value: String(p.price) },
              }],
              application_context: { brand_name: cfg.brandName, shipping_preference: "GET_FROM_FILE" },
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              var params = itemParams(key);
              params.transaction_id = details.id;
              track("purchase", params);
              window.location.href = "thanks.html?item=" + encodeURIComponent(key) + "&order=" + encodeURIComponent(details.id);
            });
          },
          onError: function () {
            showPending(h, "決済でエラーが起きました。時間をおいてもう一度お試しいただくか、銀行振込でお申し込みください。");
          },
        }).render(h);
      });
    };
    s.onerror = function () {
      holders.forEach(function (h) { showPending(h, "決済ボタンを読み込めませんでした。銀行振込でお申し込みください。"); });
    };
    document.head.appendChild(s);
  }

  // ---- お礼ページ：注文番号の表示（文字としてだけ入れる） ----
  function showOrderId() {
    var el = document.getElementById("order-id");
    if (!el) return;
    var id = new URLSearchParams(window.location.search).get("order");
    if (id && /^[A-Za-z0-9-]{5,40}$/.test(id)) {
      el.textContent = id;
      document.getElementById("order-line").hidden = false;
    }
  }

  // テスト決済のあいだは、本番と取り違えないよう帯を出す
  function showSandboxBanner() {
    if (cfg.paypalMode === "live" || !document.querySelector("[data-paypal]")) return;
    var bar = document.createElement("div");
    bar.className = "sandbox-banner";
    bar.textContent = "テスト決済モードです（本物のお金は動きません）";
    document.body.insertBefore(bar, document.body.firstChild);
  }

  document.addEventListener("DOMContentLoaded", function () {
    showSandboxBanner();
    loadGa4();
    fillProducts();
    renderButtons();
    showOrderId();
    if (document.querySelector("[data-paypal]")) {
      track("view_item_list", { items: Object.keys(products).map(function (k) { return { item_id: k, item_name: products[k].name }; }) });
    }
  });
})();
