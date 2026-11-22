/* =====================================================================
   UYGULAMA MANTIĞI — Normalde burayı değiştirmenize gerek yok.
   Metin ve rakamlar için veri.js dosyasını düzenleyin.
   ===================================================================== */
(function () {
  const no = window.KUPON_NO || 1;
  const aramasiz = window.ARAMASIZ === true;
  const kupon = KUPONLAR[no];
  const SUTUNLAR = ["1", "X", "2", "Alt", "Üst"];
  const TUR_ADI = { "1": "Maç Sonucu: 1", "X": "Maç Sonucu: X", "2": "Maç Sonucu: 2",
                    "Alt": "2,5 Gol Alt", "Üst": "2,5 Gol Üst" };
  let bakiye = kupon.bakiye;

  const oranYaz = (n) => n.toFixed(2).replace(".", ",");
  const paraYaz = (n) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + AYARLAR.paraBirimi;
  const $ = (s) => document.querySelector(s);

  document.title = AYARLAR.marka;

  // Durum çubuğu
  if (AYARLAR.sahteDurumCubugu) {
    $("#durum").innerHTML = `<span>${AYARLAR.durumCubuguSaat}</span>
      <span class="sag">▂▄▆█ &nbsp;5G <span class="pil"></span></span>`;
  } else {
    $("#durum").remove();
  }

  // Üst bar
  const k = AYARLAR.markaVurgu || 2;
  $("#logo").innerHTML = `${AYARLAR.marka.slice(0, -k)}<b>${AYARLAR.marka.slice(-k)}</b><small>${AYARLAR.markaSlogan}</small>`;
  $("#kullanici").textContent = AYARLAR.kullanici;
  $("#bakiye").textContent = paraYaz(bakiye);
  $("#gun").innerHTML = `<span>${kupon.gunEtiketi}</span><span>${kupon.maclar.length} maç</span>`;

  // Maç listesi (lige göre gruplu)
  function listeyiCiz() {
    const gruplar = [];
    kupon.maclar.forEach((m, i) => {
      let g = gruplar.find((x) => x.lig === m.lig);
      if (!g) gruplar.push((g = { lig: m.lig, maclar: [] }));
      g.maclar.push({ ...m, i });
    });
    $("#liste").innerHTML = gruplar.map((g) => `
      <div class="lig-baslik"><span><span class="lig-simge">◇</span> ${g.lig}</span>${SUTUNLAR.map((s) => `<span>${s}</span>`).join("")}</div>
      ${g.maclar.map((m, k) => `
        <div class="mac ${k === g.maclar.length - 1 ? "son" : ""}">
          <div class="takimlar">
            <div class="saat">${m.saat}</div>
            <div><i class="arma ev"></i>${m.ev}</div>
            <div><i class="arma dep"></i>${m.dep}</div>
          </div>
          ${SUTUNLAR.map((s) => `<div class="oran ${m.secim === s ? "secili" : ""}" data-i="${m.i}" data-s="${s}">${oranYaz(m.oran[s])}</div>`).join("")}
        </div>`).join("")}
    `).join("");
  }

  // Kupon paneli
  function kuponuCiz() {
    const secili = kupon.maclar.filter((m) => m.secim);
    const toplam = secili.reduce((t, m) => t * m.oran[m.secim], 1);
    $("#adet").textContent = secili.length;
    $("#secimler").innerHTML = secili.map((m) => `
      <div class="secim">
        <div class="sol">
          <div class="tk">${m.ev} - ${m.dep}</div>
          <div class="tur">${m.saat} · <b>${TUR_ADI[m.secim]}</b></div>
        </div>
        <div class="sag">${oranYaz(m.oran[m.secim])}<span class="sil" data-i="${kupon.maclar.indexOf(m)}">×</span></div>
      </div>`).join("");
    $("#toplamOran").textContent = secili.length ? oranYaz(toplam) : "0,00";
    $("#yatirilan").textContent = paraYaz(kupon.yatirilan);
    $("#kazanc").textContent = secili.length ? paraYaz(toplam * kupon.yatirilan) : paraYaz(0);
    $("#oyna").disabled = secili.length === 0;
  }

  // Tıklamalar: oran seç / kaldır
  document.addEventListener("click", (e) => {
    sesHazirla();
    const o = e.target.closest(".oran");
    if (o) {
      const m = kupon.maclar[o.dataset.i];
      m.secim = m.secim === o.dataset.s ? null : o.dataset.s;
      listeyiCiz(); kuponuCiz();
    }
    const sil = e.target.closest(".sil");
    if (sil) {
      kupon.maclar[sil.dataset.i].secim = null;
      listeyiCiz(); kuponuCiz();
    }
  });

  $("#kuponBaslik").addEventListener("click", () => $("#kupon").classList.toggle("acik"));

  $("#oyna").addEventListener("click", () => {
    $("#onayKod").textContent = kupon.kuponKodu;
    $("#onay").classList.add("goster");
    bakiye = Math.max(0, kupon.bakiye - kupon.yatirilan);
    $("#bakiye").textContent = paraYaz(bakiye);
  });
  $("#kapat").addEventListener("click", () => $("#onay").classList.remove("goster"));

  /* ================= SALİH'İN ARAMASI ================= */
  let ses = null, zilId = null, kapanisId = null;
  function sesHazirla() {
    if (!aramasiz && !ses && AYARLAR.aramaSesi) { try { ses = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  }
  function zilCal() {
    if (navigator.vibrate) navigator.vibrate([600, 400, 600]);
    if (!ses) return;
    if (ses.state === "suspended") ses.resume().catch(() => {});
    [0, 0.22, 0.44, 0.66].forEach((t, i) => {
      const o = ses.createOscillator(), g = ses.createGain();
      o.type = "triangle"; o.frequency.value = [880, 1175, 988, 1319][i];
      g.gain.setValueAtTime(0.0001, ses.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.3, ses.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ses.currentTime + t + 0.2);
      o.connect(g).connect(ses.destination); o.start(ses.currentTime + t); o.stop(ses.currentTime + t + 0.22);
    });
  }
  const arama = $("#arama");
  $("#arayanAd").textContent = AYARLAR.arayanAd;
  $("#arayanAlt").textContent = AYARLAR.arayanAlt;
  $("#arayanHarf").textContent = AYARLAR.arayanAd[0];

  function aramaDusur() {
    if (aramasiz || arama.classList.contains("goster")) return;
    arama.classList.add("goster");
    zilCal(); zilId = setInterval(zilCal, 2000);
    kapanisId = setTimeout(aramaKapat, AYARLAR.aramaCalmaSuresi * 1000);
  }
  function aramaKapat() {
    arama.classList.remove("goster");
    clearInterval(zilId); clearTimeout(kapanisId);
    if (navigator.vibrate) navigator.vibrate(0);
  }
  $("#reddet").addEventListener("click", (e) => { e.stopPropagation(); aramaKapat(); });
  $("#cevapla").addEventListener("click", (e) => { e.stopPropagation(); aramaKapat(); });
  $("#logo").addEventListener("click", () => { sesHazirla(); aramaDusur(); });   // gizli tetik
  if (!aramasiz && AYARLAR.aramaGelmeSuresi > 0) setTimeout(aramaDusur, AYARLAR.aramaGelmeSuresi * 1000);

  listeyiCiz();
  kuponuCiz();
  $("#kupon").classList.add("acik"); // kupon açık başlar; başlığa dokununca kapanır
})();
