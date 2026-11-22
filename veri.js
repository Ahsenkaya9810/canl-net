/* =====================================================================
   VERİ DOSYASI — Bütün metinleri, takımları ve oranları BURADAN değiştirin.
   Marka, takımlar ve ligler tamamen kurgusaldır (telifsiz kullanım için).
   ---------------------------------------------------------------------
   secim: o maçta kupona eklenen bahis. Seçenekler: "1", "X", "2", "Alt", "Üst"
          Kupona girmeyen maçlarda secim: null bırakın.
   Oranlar nokta ile yazılır: 1.85  (ekranda 1,85 olarak görünür)
   ===================================================================== */

const AYARLAR = {
  marka: "Canlınet",           // Sitenin adı (logo yazısı)
  markaVurgu: 3,               // Logonun son kaç harfi yeşil olsun ("net")
  markaSlogan: "SPOR",         // Logonun yanındaki küçük etiket
  kullanici: "metin_34",       // Sağ üstteki kullanıcı adı
  paraBirimi: "TL",
  sahteDurumCubugu: false,     // true yaparsanız en üstte sahte telefon saati/şarj çubuğu çıkar
  durumCubuguSaat: "23:47",

  // ---- SALİH'İN ARAMASI ----
  arayanAd: "SALİH",           // Gelen aramada görünen isim
  arayanAlt: "Gelen arama",    // İsmin üstündeki küçük yazı
  // Sayfa açıldıktan kaç saniye sonra arama düşsün? (0 = otomatik düşmesin)
  aramaGelmeSuresi: 6,
  // Aramayı ANINDA düşürmek için: sol üstteki LOGOYA dokunun (gizli tetik).
  aramaCalmaSuresi: 20,        // Reddedilmezse kaç saniye sonra kendiliğinden kaybolsun
  aramaSesi: true,             // Zil sesi (ekrana bir kez dokunduktan sonra çalar)
};

/* Her kuponun kendi bakiyesi / tutarı / gün yazısı aşağıda, kupon içinde. */

const KUPONLAR = {
  /* ---------------- KUPON 1 (Sahne: oynarken Salih arar) ---------------- */
  1: {
    gunEtiketi: "Bugün", bakiye: 1250, yatirilan: 500,
    kuponKodu: "CN-48213",
    maclar: [

      { lig: "Türkiye Özel Lig", saat: "20:00", ev: "Selçuklu Gücü", dep: "Boğaziçi Dalgaspor",
        oran: { "1": 1.78, "X": 3.45, "2": 4.20, "Alt": 2.05, "Üst": 1.75 }, secim: "1" },
      { lig: "İspanya Lig A", saat: "20:00", ev: "Deportivo Almira", dep: "Sporting Calvera",
        oran: { "1": 2.40, "X": 3.10, "2": 2.85, "Alt": 1.95, "Üst": 1.82 }, secim: "Üst" },
      { lig: "İspanya Lig A", saat: "22:00", ev: "Real Montoro", dep: "CD Valdeña",
        oran: { "1": 3.90, "X": 3.50, "2": 1.92, "Alt": 1.70, "Üst": 2.10 }, secim: "2" },
      { lig: "İngiltere Lig A", saat: "22:45", ev: "Whitmore City", dep: "Ashbury Town",
        oran: { "1": 1.65, "X": 3.80, "2": 5.00, "Alt": 2.20, "Üst": 1.62 }, secim: "1" }
    ],
  },

  /* ---------------- KUPON 2 (Sahne: kupon yaparken Salih arar, meşgule atar) ---------------- */
  2: {
    gunEtiketi: "Bugün", bakiye: 2840, yatirilan: 1000,
    kuponKodu: "CN-48377",
    maclar: [

      { lig: "Türkiye Özel Lig", saat: "20:00", ev: "Boğaziçi Dalgaspor", dep: "Selçuklu Gücü",
        oran: { "1": 1.80, "X": 3.40, "2": 4.10, "Alt": 2.00, "Üst": 1.78 }, secim: "1" },
      { lig: "İspanya Lig A", saat: "20:00", ev: "UD Castañar", dep: "Deportivo Almira",
        oran: { "1": 2.35, "X": 3.20, "2": 2.90, "Alt": 1.92, "Üst": 1.85 }, secim: "Üst" },
      { lig: "İspanya Lig A", saat: "22:00", ev: "Sporting Calvera", dep: "Real Montoro",
        oran: { "1": 3.80, "X": 3.45, "2": 1.95, "Alt": 1.72, "Üst": 2.08 }, secim: "2" },
      { lig: "İngiltere Lig A", saat: "22:45", ev: "Ashbury Town", dep: "Whitmore City",
        oran: { "1": 1.62, "X": 3.90, "2": 5.25, "Alt": 2.25, "Üst": 1.60 }, secim: "1" }
    ],
  },

  /* ---------------- KUPON 3 (Sahne: kupon yaparken Salih arar, reddeder) ---------------- */
  3: {
    gunEtiketi: "Bugün", bakiye: 760, yatirilan: 500,
    kuponKodu: "CN-48502",
    maclar: [

      { lig: "Türkiye Özel Lig", saat: "20:00", ev: "Selçuklu Gücü", dep: "Boğaziçi Dalgaspor",
        oran: { "1": 1.75, "X": 3.50, "2": 4.30, "Alt": 2.02, "Üst": 1.76 }, secim: "1" },
      { lig: "İspanya Lig A", saat: "20:00", ev: "Deportivo Almira", dep: "CD Valdeña",
        oran: { "1": 2.45, "X": 3.05, "2": 2.80, "Alt": 1.98, "Üst": 1.80 }, secim: "Üst" },
      { lig: "İspanya Lig A", saat: "22:00", ev: "UD Castañar", dep: "Real Montoro",
        oran: { "1": 3.95, "X": 3.55, "2": 1.90, "Alt": 1.68, "Üst": 2.12 }, secim: "2" },
      { lig: "İngiltere Lig A", saat: "22:45", ev: "Whitmore City", dep: "Ashbury Town",
        oran: { "1": 1.68, "X": 3.75, "2": 4.90, "Alt": 2.18, "Üst": 1.64 }, secim: "1" }
    ],
  },
};
