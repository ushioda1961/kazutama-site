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
    var out = {
      currency: "JPY",
      value: p.price || 0,
      items: [{ item_id: key, item_name: p.name, price: p.price || 0, quantity: 1 }],
    };
    if (refCode) out.ref_code = refCode;
    return out;
  }

  // ---- ご紹介（チラシの QR の番号と、お客様が書くご紹介者のお名前） ----
  // チラシの QR は v/c01r などの短い入口 → /?…&ref=C01 に来る。番号は名前ではなく記号（対応表は公開しない _非公開 にだけある）。
  // 番号はこのブラウザに 90 日だけ覚えておき、PayPal の注文の「説明」に「（ご紹介 C01 お名前）」として載せる。
  // PayPal の「支払いの受領通知」メールにこの説明が載り、注文の見張りが拾う。
  var REF_KEY = "kz_ref";
  var REF_DAYS = 90;
  var REF_PAT = /^[A-Z][0-9]{2,3}$/;
  var refCode = readRef();
  var refName = "";

  function readRef() {
    var code = "";
    try {
      var q = (new URLSearchParams(window.location.search).get("ref") || "").toUpperCase();
      if (REF_PAT.test(q)) code = q;
    } catch (e) {}
    try {
      var ls = window.localStorage;
      if (code) {
        ls.setItem(REF_KEY, JSON.stringify({ code: code, t: Date.now() }));
      } else {
        var v = JSON.parse(ls.getItem(REF_KEY) || "null");
        if (v && REF_PAT.test(v.code) && Date.now() - v.t < REF_DAYS * 864e5) code = v.code;
      }
    } catch (e) {}
    return code;
  }

  function cleanName(s) {
    return String(s || "").replace(/[\u0000-\u001f\u007f<>"'`\\]/g, "").replace(/\s+/g, " ").trim().slice(0, 30);
  }

  function orderDescription(key) {
    var p = products[key];
    var parts = [];
    if (refCode) parts.push(refCode);
    var n = cleanName(refName);
    if (n) parts.push(n);
    return parts.length ? (p.name + "（ご紹介 " + parts.join(" ") + "）").slice(0, 127) : p.name;
  }

  // PayPal ボタンの上に「ご紹介者のお名前」の欄を出す（どの商品の欄に書いても全部にそろえる）
  function addRefBoxes() {
    try { refName = cleanName(window.sessionStorage.getItem("kz_ref_name")); } catch (e) {}
    var inputs = [];
    document.querySelectorAll("[data-paypal]").forEach(function (h) {
      var pay = h.parentNode;
      var box = document.createElement("div");
      box.className = "ref-box";
      var label = document.createElement("label");
      var title = document.createElement("span");
      title.className = "ref-title";
      title.textContent = "ご紹介者のお名前";
      var sub = document.createElement("span");
      sub.className = "ref-sub";
      sub.textContent = "（ご紹介を受けた方だけ）";
      var input = document.createElement("input");
      input.type = "text";
      input.maxLength = 30;
      input.autocomplete = "off";
      input.placeholder = "例）山田 花子";
      input.value = refName;
      input.setAttribute("data-ref-name", h.getAttribute("data-paypal"));
      label.appendChild(title);
      label.appendChild(sub);
      label.appendChild(input);
      var note = document.createElement("p");
      note.className = "ref-note";
      note.textContent = "銀行振込でお申し込みの方は、申込フォームにご紹介者のお名前をお書きください。";
      box.appendChild(label);
      box.appendChild(note);
      pay.insertBefore(box, pay.firstChild);
      inputs.push(input);
      input.addEventListener("input", function () {
        refName = input.value;
        inputs.forEach(function (o) { if (o !== input) o.value = input.value; });
        try { window.sessionStorage.setItem("kz_ref_name", cleanName(refName)); } catch (e) {}
      });
    });
  }

  // 確かめ用（画面には何も出さない）
  window.KZ_REF = { code: function () { return refCode; }, describe: orderDescription };

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
          // お届けは日本国内のみ。日本以外の住所を選んだら先に進めない
          onShippingAddressChange: function (data, actions) {
            var cc = data.shippingAddress && data.shippingAddress.countryCode;
            if (cc && cc !== "JP") return actions.reject(data.errors && data.errors.COUNTRY_ERROR);
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                reference_id: key,
                description: orderDescription(key),
                custom_id: refCode || undefined,
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

  // ---- 振込申込の完了ページ（アスメルの購読完了ページ）：商品名を出して、申込完了を計測する ----
  function showApplied() {
    var el = document.getElementById("applied-item");
    if (!el) return;
    var key = new URLSearchParams(window.location.search).get("item");
    if (!key || !Object.prototype.hasOwnProperty.call(products, key)) return;
    el.textContent = products[key].name + "の";
    track("bank_apply_complete", itemParams(key));
  }

  // ---- メールアドレス：HTMLにそのまま書かず、表示のときに組み立てる（アドレス収集対策） ----
  function showMailAddresses() {
    document.querySelectorAll("[data-mail-user]").forEach(function (el) {
      var addr = el.getAttribute("data-mail-user") + "@" + el.getAttribute("data-mail-domain");
      var a = document.createElement("a");
      a.href = "mailto:" + addr;
      a.textContent = addr;
      el.textContent = "";
      el.appendChild(a);
    });
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
    showMailAddresses();
    loadGa4();
    fillProducts();
    addRefBoxes();
    renderButtons();
    showOrderId();
    showApplied();
    if (document.querySelector("[data-paypal]")) {
      track("view_item_list", { items: Object.keys(products).map(function (k) { return { item_id: k, item_name: products[k].name }; }) });
    }
  });
})();
