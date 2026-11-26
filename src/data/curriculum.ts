export interface StudyModule {
  id: string;
  category: "TWK" | "TIU" | "TKP";
  title: string;
  subtitle: string;
  readMinutes: number;
  keyPoints: string[];
  deepNotes: {
    heading: string;
    points: string[];
  }[];
  examTip: string;
}

export const SKD_STRUCTURE = [
  {
    code: "TWK",
    name: "Tes Wawasan Kebangsaan",
    questions: 30,
    passingGradeGeneral: 65,
    maxScore: 150,
    scoring: "Benar +5, Salah/Kosong 0",
    color: "amber",
    focus: "Nasionalisme, Integritas, Bela Negara, Pilar Negara, Bahasa Indonesia",
  },
  {
    code: "TIU",
    name: "Tes Intelegensia Umum",
    questions: 35,
    passingGradeGeneral: 80,
    maxScore: 175,
    scoring: "Benar +5, Salah/Kosong 0",
    color: "sky",
    focus: "Kemampuan Verbal, Numerik, dan Figural",
  },
  {
    code: "TKP",
    name: "Tes Karakteristik Pribadi",
    questions: 45,
    passingGradeGeneral: 166,
    maxScore: 225,
    scoring: "Skala 1 sampai 5 (Kosong = 0)",
    color: "emerald",
    focus: "Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK, Profesionalisme, Anti-Radikalisme",
  },
] as const;

export const STUDY_MODULES: StudyModule[] = [
  {
    id: "twk-nasionalisme",
    category: "TWK",
    title: "Nasionalisme & Wawasan Kebangsaan",
    subtitle: "Sejarah pergerakan, persatuan bangsa, dan sikap ASN menjaga keutuhan NKRI",
    readMinutes: 6,
    keyPoints: [
      "Nasionalisme sipil menempatkan kesetiaan warga negara pada konstitusi, kesetaraan hak, dan persatuan di atas sekat suku/agama/ras.",
      "Tonggak kebangkitan nasional: Budi Utomo (20 Mei 1908), Sumpah Pemuda (28 Oktober 1928), dan Proklamasi (17 Agustus 1945).",
      "Soal TWK terkini menekankan implementasi nyata sikap nasionalisme dalam kasus pelayanan publik, bukan sekadar hafalan tanggal.",
    ],
    deepNotes: [
      {
        heading: "Konsep Inti yang Sering Diuji",
        points: [
          "Perbedaan Nasionalisme (cinta tanah air berlandaskan persamaan cita-cita) vs Chauvinisme (mengagungkan bangsa sendiri sambil merendahkan bangsa lain).",
          "Patriotisme: rela berkorban membela bangsa; dapat diwujudkan ASN lewat pengabdian di daerah 3T dan produk dalam negeri.",
          "Wawasan Nusantara: memandang Indonesia sebagai satu kesatuan politik, ekonomi, sosial budaya, serta pertahanan dan keamanan.",
        ],
      },
      {
        heading: "Pola Soal Kasus TWK",
        points: [
          "Konflik antarwarga atau penolakan kebijakan publik: pilih solusi yang menjaga persatuan, musyawarah, dan berlandaskan hukum nasional.",
          "Penggunaan bahasa persatuan (Bahasa Indonesia) di ruang resmi instansi tanpa menghilangkan pelestarian bahasa daerah.",
        ],
      },
    ],
    examTip: "Cari opsi jawaban yang menyatukan kepentingan publik lintas golongan dan menghindari sikap eksklusif atau primordial.",
  },
  {
    id: "twk-integritas-bela",
    category: "TWK",
    title: "Integritas, Anti-Korupsi & Bela Negara",
    subtitle: "9 Nilai Integritas KPK, kode etik ASN, serta Pasal 27 ayat (3) & Pasal 30 UUD 1945",
    readMinutes: 7,
    keyPoints: [
      "9 Nilai Integritas (KPK): Jujur, Peduli, Mandiri, Disiplin, Tanggung Jawab, Kerja Keras, Sederhana, Berani, dan Adil.",
      "Bela Negara diatur pada Pasal 27 ayat (3) UUD 1945 ('Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara').",
      "ASN wajib menolak segala bentuk gratifikasi, suap, dan konflik kepentingan sesuai UU ASN & UU Pemberantasan Tipikor.",
    ],
    deepNotes: [
      {
        heading: "5 Nilai Dasar Bela Negara",
        points: [
          "Cinta tanah air (menjaga kelestarian lingkungan, bangga produk lokal).",
          "Sadar berbangsa dan bernegara (taat aturan, rukun bermasyarakat).",
          "Setia pada Pancasila sebagai ideologi negara (menolak ideologi transnasional yang bertentangan dengan Pancasila).",
          "Rela berkorban untuk bangsa dan negara (mendahulukan tugas pelayanan publik di atas kepentingan pribadi).",
          "Kemampuan awal bela negara (disiplin, sehat jasmani/rohani, cakap literasi digital melawan disinformasi).",
        ],
      },
      {
        heading: "Integritas dalam Pengawasan & Gratifikasi",
        points: [
          "Gratifikasi yang berhubungan dengan jabatan wajib dilaporkan ke KPK maksimal 30 hari kerja sejak diterima.",
          "Jika menemukan penyimpangan anggaran oleh rekan/atasan, ASN berintegritas melapor melalui jalur pengawasan resmi (whistleblowing / inspektorat).",
        ],
      },
    ],
    examTip: "Dalam soal Integritas, jawaban benar selalu konsisten dengan aturan hukum meskipun ada tekanan atasan atau teman dekat.",
  },
  {
    id: "twk-pilar-negara",
    category: "TWK",
    title: "Pilar Negara: Pancasila, UUD 1945, NKRI & Bhinneka",
    subtitle: "Pasal amandemen krusial, hierarki regulasi, dan pengamalan sila Pancasila",
    readMinutes: 8,
    keyPoints: [
      "Pancasila adalah sumber dari segala sumber hukum negara (UU No. 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-undangan).",
      "Hierarki regulasi: UUD 1945 > Tap MPR > UU/Perppu > PP > Perpres > Perda Provinsi > Perda Kabupaten/Kota.",
      "Pahami beda tugas lembaga tinggi: MK (uji UU terhadap UUD, sengketa pemilu/pilkada), MA (kasasi & uji peraturan di bawah UU terhadap UU), KY (awasi hakim).",
    ],
    deepNotes: [
      {
        heading: "Pemetaan Butir Pengamalan Sila Pancasila",
        points: [
          "Sila 1: Kebebasan beribadah, toleransi antarumat beragama, tidak memaksakan agama kepada orang lain.",
          "Sila 2: Pengakuan persamaan derajat, HAM, sikap tenggang rasa, menolong korban bencana tanpa pilih kasih.",
          "Sila 3: Persatuan, rela berkorban untuk kepentingan bangsa, memajukan pergaulan demi Bhinneka Tunggal Ika.",
          "Sila 4: Musyawarah mufakat, menghargai perbedaan pendapat, melaksanakan hasil keputusan bersama dengan iktikad baik.",
          "Sila 5: Keadilan sosial, keseimbangan hak & kewajiban, tidak bergaya hidup mewah, menjaga fasilitas umum.",
        ],
      },
      {
        heading: "Pasal UUD 1945 Langganan Ujian",
        points: [
          "Pasal 1 ayat (3): Negara Indonesia adalah negara hukum.",
          "Pasal 28A–28J: Hak Asasi Manusia & pembatasannya oleh undang-undang.",
          "Pasal 31: Pendidikan (minimal 20% anggaran APBN & APBD).",
          "Pasal 33: Perekonomian disusun sebagai usaha bersama berdasar asas kekeluargaan; bumi, air, kekayaan alam dikuasai negara.",
        ],
      },
    ],
    examTip: "Bedakan Sila ke-2 (kemanusiaan individu/HAM/empati) dengan Sila ke-5 (keadilan distribusi hak-kewajiban & kesejahteraan sosial).",
  },
  {
    id: "twk-bahasa-indonesia",
    category: "TWK",
    title: "Bahasa Indonesia Baku & Kalimat Efektif (EYD V)",
    subtitle: "Kalimat efektif, ide pokok paragraf, kata baku, dan kaidah penulisan resmi",
    readMinutes: 5,
    keyPoints: [
      "Kalimat efektif wajib memiliki minimal Subjek + Predikat yang jelas, hemat kata (tidak pleonasme), paralel, dan logis.",
      "Hindari kata depan di depan subjek (contoh salah: 'Bagi seluruh peserta harap berkumpul' -> seharusnya 'Seluruh peserta harap berkumpul').",
      "Pahami perbedaan kata baku: analisis (bukan analisa), sistem (bukan sistim), praktik (bukan praktek), risiko (bukan resiko), aktivitas (bukan aktifitas).",
    ],
    deepNotes: [
      {
        heading: "Ciri Kalimat Tidak Efektif yang Sering Jebak",
        points: [
          "Pleonasme: 'para tamu-tamu', 'saling bantu-membantu', 'agar supaya', 'naik ke atas'.",
          "Ketidaksejajaran bentuk imbuhan dalam perincian (misal: me-, me-, dan di- dalam satu daftar).",
          "Penggunaan tanda koma sebelum 'yang' atau antara subjek dan predikat yang tidak perlu.",
        ],
      },
    ],
    examTip: "Saat mencari gagasan utama, cek kalimat pertama (deduktif) atau kalimat terakhir yang diawali 'oleh karena itu/dengan demikian' (induktif).",
  },
  {
    id: "tiu-verbal",
    category: "TIU",
    title: "TIU Verbal: Analogi, Silogisme & Penalaran Analitis",
    subtitle: "Hukum logika proposisi, kuantor, dan teknik tabel cepat soal posisi/jadwal",
    readMinutes: 7,
    keyPoints: [
      "Analogi: buat kalimat penghubung yang tepat dan spesifik antara kata kiri dan kanan (misal: 'X adalah alat untuk Y').",
      "Silogisme Ekuivalensi: p → q ekuivalen dengan ~q → ~p (kontraposisi). Contoh: 'Jika hujan maka jalan basah' = 'Jika jalan tidak basah maka tidak hujan'.",
      "Negasi dari 'Semua A adalah B' bukan 'Semua A bukan B', melainkan 'Ada/Beberapa A bukan B'.",
    ],
    deepNotes: [
      {
        heading: "Rumus Wajib Silogisme",
        points: [
          "Modus Ponens: (p → q) dan p, simpulannya q.",
          "Modus Tollens: (p → q) dan ~q, simpulannya ~p.",
          "Silogisme Hipotetis: (p → q) dan (q → r), simpulannya p → r.",
          "Hati-hati sesat pikir (fallacy): dari (p → q) dan q TIDAK bisa disimpulkan p!",
        ],
      },
      {
        heading: "Trik Penalaran Analitis",
        points: [
          "Gambar garis urutan (< / >) atau diagram kursi/jadwal di kertas buram agar tidak mengulang membaca teks panjang.",
          "Mulai dari syarat yang posisinya paling pasti (terkunci) terlebih dahulu.",
        ],
      },
    ],
    examTip: "Pada silogisme, jika dua premis keduanya dimulai dengan kata 'Sebagian/Ada', umumnya tidak dapat ditarik kesimpulan pasti.",
  },
  {
    id: "tiu-numerik-figural",
    category: "TIU",
    title: "TIU Numerik & Figural: Deret, Perbandingan & Pola Gambar",
    subtitle: "Pecahan istimewa, deret bertingkat, perbandingan berbalik nilai, dan rotasi figural",
    readMinutes: 7,
    keyPoints: [
      "Hafalkan konversi cepat: 1/8 = 12,5%, 1/6 = 16,67%, 1/3 = 33,33%, 3/8 = 37,5%, 5/8 = 62,5%, 2/3 = 66,67%.",
      "Deret angka: selalu cek 3 pola utama — selisih tingkat 1/2, pola lompat 1–2 suku (larik), serta Fibonacci (jumlah 2 suku sebelumnya).",
      "Perbandingan berbalik nilai (misal jumlah pekerja vs waktu selesai): gunakan kali sejajar (P1 × T1 = P2 × T2).",
    ],
    deepNotes: [
      {
        heading: "Strategi Soal Cerita & Kuantitatif (P vs Q)",
        points: [
          "Jangan menghitung angka desimal sampai habis jika cukup dengan estimasi atau penyederhanaan rasio.",
          "Pada perbandingan P dan Q, uji apakah nilai variabel bisa positif, nol, atau negatif sebelum menyimpulkan hubungan.",
        ],
      },
      {
        heading: "Strategi Cepat Figural",
        points: [
          "Lacak satu elemen kecil terlebih dahulu (misal titik hitam atau arah panah) untuk mengeliminasi 3–4 opsi salah dalam 10 detik.",
          "Perhatikan perubahan jumlah sisi poligon, rotasi searah/berlawanan jarum jam (45° atau 90°), serta perubahan warna hitam-putih bergantian.",
        ],
      },
    ],
    examTip: "Targetkan rata-rata 45–50 detik per soal TIU; tandai soal hitungan panjang dan kerjakan di putaran kedua.",
  },
  {
    id: "tkp-strategi-skor-5",
    category: "TKP",
    title: "TKP: Pola Skor 5 di Semua 6 Aspek Penilaian",
    subtitle: "Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK, Profesionalisme & Anti-Radikalisme",
    readMinutes: 8,
    keyPoints: [
      "Tidak ada nilai 0 selama Anda menjawab; setiap pilihan bernilai 1–5 sehingga JANGAN pernah mengosongkan soal TKP.",
      "Pola skor 5 selalu menunjukkan inisiatif aktif, berorientasi solusi, menaati SOP/regulasi, serta mengutamakan kepentingan publik.",
      "Hindari pilihan pasif ('menunggu perintah saja', 'membiarkan', 'menyalahkan orang lain') maupun melanggar wewenang tanpa koordinasi.",
    ],
    deepNotes: [
      {
        heading: "Kata Kunci Skor Tertinggi Per Aspek",
        points: [
          "Pelayanan Publik: melayani dengan ramah, cepat, transparan, memberi solusi sesuai prosedur walau menjelang jam tutup.",
          "Jejaring Kerja: aktif berkoordinasi, terbuka berkolaborasi, membangun komunikasi konstruktif meski berbeda pendapat.",
          "Sosial Budaya: menghormati adat setempat, bersikap inklusif tanpa membedakan latar belakang budaya/agama.",
          "TIK: memaksimalkan sistem informasi digital resmi, menjaga kerahasiaan data instansi, mau belajar aplikasi baru.",
          "Profesionalisme: menjaga kualitas kinerja, memisahkan masalah pribadi/keluarga dari tanggung jawab dinas, tetap fokus di bawah tekanan.",
          "Anti-Radikalisme: menolak segala ajakan intoleran/ekstremis, melakukan klarifikasi fakta, melaporkan konten/indikasi radikalisme melalui prosedur resmi, dan meneguhkan nilai Pancasila.",
        ],
      },
    ],
    examTip: "Kerjakan TKP di awal atau pastikan sisa waktu cukup (minimal 35–40 menit untuk 45 soal) karena TKP berbobot total 225 poin dan tidak ada pengurangan nilai.",
  },
];
