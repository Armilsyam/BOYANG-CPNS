export type QuestionCategory = "TWK" | "TIU" | "TKP";

export interface TryoutOption {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
  score: number; // TWK/TIU: 5 or 0; TKP: 1..5
}

export interface TryoutQuestion {
  id: string;
  number: number;
  category: QuestionCategory;
  subtopic: string;
  prompt: string;
  options: TryoutOption[];
  explanation: string;
}

export const TRYOUT_QUESTIONS: TryoutQuestion[] = [
  // ================= TWK (1-10) =================
  {
    id: "twk-1",
    number: 1,
    category: "TWK",
    subtopic: "Integritas",
    prompt:
      "Sebagai pejabat pembuat komitmen di instansi daerah, Anda ditawari bingkisan bernilai jutaan rupiah oleh vendor yang baru saja memenangkan tender proyek secara sah. Vendor menyebut bingkisan itu sekadar ucapan terima kasih adat daerah. Sikap paling berintegritas yang harus Anda lakukan adalah...",
    options: [
      { label: "A", text: "Menerimanya agar tidak menyinggung adat lalu membagikannya kepada seluruh staf kantor", score: 0 },
      { label: "B", text: "Menolak secara halus dan menjelaskan aturan larangan gratifikasi jabatan kepada vendor", score: 5 },
      { label: "C", text: "Menerimanya sementara lalu menyumbangkannya ke panti asuhan tanpa melapor", score: 0 },
      { label: "D", text: "Meminta vendor mengganti bingkisan dengan sumbangan dana kas kantor", score: 0 },
      { label: "E", text: "Menerima jika proses lelang sudah benar-benar selesai dan tidak memengaruhi penilaian", score: 0 },
    ],
    explanation:
      "Berdasarkan UU No. 20 Tahun 2001 tentang Pemberantasan Tipikor, pemberian kepada penyelenggara negara/ASN yang berhubungan dengan jabatan merupakan gratifikasi yang dilarang. Langkah paling tepat dan berintegritas adalah menolak sejak awal secara santun dan edukatif.",
  },
  {
    id: "twk-2",
    number: 2,
    category: "TWK",
    subtopic: "Pilar Negara — UUD 1945",
    prompt:
      "Lembaga negara yang memiliki kewenangan menguji undang-undang terhadap Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 serta memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh UUD adalah...",
    options: [
      { label: "A", text: "Mahkamah Agung (MA)", score: 0 },
      { label: "B", text: "Komisi Yudisial (KY)", score: 0 },
      { label: "C", text: "Mahkamah Konstitusi (MK)", score: 5 },
      { label: "D", text: "Majelis Permusyawaratan Rakyat (MPR)", score: 0 },
      { label: "E", text: "Dewan Perwakilan Rakyat (DPR)", score: 0 },
    ],
    explanation:
      "Sesuai Pasal 24C ayat (1) UUD 1945, Mahkamah Konstitusi berwenang mengadili pada tingkat pertama dan terakhir yang putusannya bersifat final untuk menguji undang-undang terhadap UUD, memutus sengketa kewenangan lembaga negara, pembubaran parpol, serta perselisihan hasil pemilu.",
  },
  {
    id: "twk-3",
    number: 3,
    category: "TWK",
    subtopic: "Bela Negara",
    prompt:
      "Di era digital, maraknya penyebaran berita bohong (hoaks) yang memecah belah persatuan warga merupakan ancaman nonmiliter. Wujud keikutsertaan ASN dalam upaya bela negara sesuai Pasal 27 ayat (3) UUD 1945 menghadapi situasi tersebut adalah...",
    options: [
      { label: "A", text: "Memblokir seluruh media sosial warga di lingkungan tempat tinggal", score: 0 },
      { label: "B", text: "Memilah informasi sebelum membagikan, meluruskan dengan data resmi, dan mengedukasi literasi digital", score: 5 },
      { label: "C", text: "Menyerahkan sepenuhnya urusan hoaks kepada aparat keamanan tanpa bertindak apa pun", score: 0 },
      { label: "D", text: "Ikut mengomentari unggahan provokatif dengan nada emosional agar pelaku jera", score: 0 },
      { label: "E", text: "Menghapus seluruh grup komunikasi masyarakat agar tidak muncul perdebatan", score: 0 },
    ],
    explanation:
      "Kemampuan awal bela negara di era modern mencakup ketahanan siber dan literasi informasi: verifikasi fakta (saring sebelum sharing), menyebarkan informasi resmi yang benar, serta menjaga kondusivitas ruang digital.",
  },
  {
    id: "twk-4",
    number: 4,
    category: "TWK",
    subtopic: "Nasionalisme",
    prompt:
      "Kongres Pemuda II tanggal 28 Oktober 1928 melahirkan ikrar Sumpah Pemuda yang memiliki makna strategis bagi terbentuknya identitas kebangsaan Indonesia modern, yaitu...",
    options: [
      { label: "A", text: "Menghapuskan seluruh kebudayaan dan bahasa daerah di Nusantara", score: 0 },
      { label: "B", text: "Menggeser perjuangan bersifat kedaerahan menjadi persatuan nasional lintas suku dan wilayah", score: 5 },
      { label: "C", text: "Membentuk organisasi militer pemuda untuk langsung merebut kekuasaan saat itu juga", score: 0 },
      { label: "D", text: "Menetapkan bentuk negara serikat berdasarkan pembagian provinsi kolonial", score: 0 },
      { label: "E", text: "Menggantikan peran organisasi Budi Utomo di bidang ekonomi", score: 0 },
    ],
    explanation:
      "Sumpah Pemuda menandai pergeseran penting pergerakan kemerdekaan dari perjuangan lokal/kedaerahan menjadi kesadaran kolektif satu tanah air, satu bangsa, dan menjunjung bahasa persatuan Bahasa Indonesia.",
  },
  {
    id: "twk-5",
    number: 5,
    category: "TWK",
    subtopic: "Pilar Negara — Pancasila",
    prompt:
      "Seorang kepala desa memprioritaskan pembangunan jalan tani secara merata berdasarkan musyawarah warga tanpa mengutamakan dusun tempat tinggal keluarganya sendiri. Perilaku tersebut mencerminkan pengamalan utama Pancasila sila...",
    options: [
      { label: "A", text: "Ketuhanan Yang Maha Esa", score: 0 },
      { label: "B", text: "Kemanusiaan yang Adil dan Beradab", score: 0 },
      { label: "C", text: "Persatuan Indonesia", score: 0 },
      { label: "D", text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan", score: 0 },
      { label: "E", text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", score: 5 },
    ],
    explanation:
      "Fokus utama soal terletak pada pemerataan akses pembangunan publik tanpa pilih kasih atau nepotisme keluarga, yang merupakan inti pengamalan Sila ke-5 (Keadilan Sosial bagi Seluruh Rakyat Indonesia).",
  },
  {
    id: "twk-6",
    number: 6,
    category: "TWK",
    subtopic: "Bahasa Indonesia",
    prompt:
      "Manakah kalimat berikut ini yang memenuhi kaidah kalimat efektif dan ejaan baku Bahasa Indonesia?",
    options: [
      { label: "A", text: "Bagi para pelamar CPNS diwajibkan membawa kartu ujian asli saat pelaksanaan tes.", score: 0 },
      { label: "B", text: "Rapat koordinasi itu membahas mengenai peningkatan kualitas pelayanan publik di daerah.", score: 0 },
      { label: "C", text: "Seluruh peserta seleksi wajib mematuhi tata tertib yang ditetapkan oleh panitia.", score: 5 },
      { label: "D", text: "Walaupun anggaran terbatas, namun program literasi desa tetap berjalan dengan lancar.", score: 0 },
      { label: "E", text: "Untuk mempersingkat waktu, kami persilahkan Bapak Kepala Dinas menyampaikan sambutan.", score: 0 },
    ],
    explanation:
      "Opsi A salah karena preposisi 'Bagi' di awal membuat subjek hilang. Opsi B mubazir ('membahas mengenai'). Opsi D memakai konjungsi ganda ('Walaupun ... namun'). Opsi E tidak efektif ('mempersingkat waktu') & kata tidak baku ('persilahkan' seharusnya 'persilakan'). Opsi C tepat, jelas S-P-O, dan baku.",
  },
  {
    id: "twk-7",
    number: 7,
    category: "TWK",
    subtopic: "Bhinneka Tunggal Ika",
    prompt:
      "Prinsip Bhinneka Tunggal Ika dalam tata kelola pemerintahan Indonesia mengandung konsekuensi bahwa kebijakan publik harus...",
    options: [
      { label: "A", text: "Menyeragamkan seluruh tradisi lokal agar administrasi negara lebih mudah", score: 0 },
      { label: "B", text: "Menghargai keragaman budaya dan agama dalam bingkai kesetaraan hukum serta persatuan nasional", score: 5 },
      { label: "C", text: "Memberikan hak istimewa hukum hanya kepada kelompok mayoritas di tiap daerah", score: 0 },
      { label: "D", text: "Memisahkan wilayah pelayanan berdasarkan latar belakang etnis penduduk", score: 0 },
      { label: "E", text: "Mengizinkan peraturan daerah bertentangan dengan UUD 1945 demi otonomi penuh", score: 0 },
    ],
    explanation:
      "Bhinneka Tunggal Ika bermakna berbeda-beda tetapi tetap satu jua — keberagaman dihormati dan dilindungi negara dalam kesetaraan di hadapan hukum serta keutuhan NKRI.",
  },
  {
    id: "twk-8",
    number: 8,
    category: "TWK",
    subtopic: "Pilar Negara — Tata Urutan Regulasi",
    prompt:
      "Menurut UU Nomor 12 Tahun 2011 beserta perubahannya tentang Pembentukan Peraturan Perundang-undangan, urutan hierarki yang tepat setelah Undang-Undang / Peraturan Pemerintah Pengganti Undang-Undang (UU/Perppu) adalah...",
    options: [
      { label: "A", text: "Ketetapan MPR, lalu Peraturan Presiden", score: 0 },
      { label: "B", text: "Peraturan Presiden, lalu Peraturan Pemerintah", score: 0 },
      { label: "C", text: "Peraturan Pemerintah, lalu Peraturan Presiden", score: 5 },
      { label: "D", text: "Peraturan Menteri, lalu Peraturan Daerah Provinsi", score: 0 },
      { label: "E", text: "Peraturan Daerah Provinsi, lalu Peraturan Presiden", score: 0 },
    ],
    explanation:
      "Hierarki Pasal 7 ayat (1) UU 12/2011: (1) UUD NRI 1945, (2) Ketetapan MPR, (3) UU/Perppu, (4) Peraturan Pemerintah (PP), (5) Peraturan Presiden (Perpres), (6) Perda Provinsi, (7) Perda Kabupaten/Kota.",
  },
  {
    id: "twk-9",
    number: 9,
    category: "TWK",
    subtopic: "Bahasa Indonesia — Penulisan Baku",
    prompt:
      "Kelompok kata berikut yang seluruhnya merupakan bentuk kata baku sesuai KBBI adalah...",
    options: [
      { label: "A", text: "analisa, praktik, risiko, jadwal", score: 0 },
      { label: "B", text: "analisis, praktik, risiko, jadwal", score: 5 },
      { label: "C", text: "analisis, praktek, resiko, jadual", score: 0 },
      { label: "D", text: "aktifitas, sistem, teknik, metode", score: 0 },
      { label: "E", text: "ijin, nasihat, kuitansi, apotik", score: 0 },
    ],
    explanation:
      "Bentuk baku KBBI adalah analisis (bukan analisa), praktik (bukan praktek), risiko (bukan resiko), dan jadwal (bukan jadual). Sedangkan pada D 'aktifitas' salah (seharusnya aktivitas) dan E 'ijin/apotik' salah (seharusnya izin/apotek).",
  },
  {
    id: "twk-10",
    number: 10,
    category: "TWK",
    subtopic: "Nasionalisme & Netralitas ASN",
    prompt:
      "Menjelang pemilihan kepala daerah, seorang ASN diminta atasannya untuk mengarahkan warga binaan desa agar memilih salah satu pasangan calon tertentu. Sikap yang mencerminkan kesetiaan pada konstitusi dan etika ASN adalah...",
    options: [
      { label: "A", text: "Menolak secara tegas dengan berpegang pada asas netralitas ASN dalam UU ASN", score: 5 },
      { label: "B", text: "Menjalankan perintah secara diam-diam di luar jam dinas agar tetap loyal pada atasan", score: 0 },
      { label: "C", text: "Membantu kampanye melalui akun media sosial anonim tanpa memakai seragam dinas", score: 0 },
      { label: "D", text: "Meminta imbalan kompensasi terlebih dahulu jika harus melaksanakan perintah", score: 0 },
      { label: "E", text: "Mengikuti arahan atasan karena loyalitas struktural lebih tinggi dari undang-undang", score: 0 },
    ],
    explanation:
      "ASN wajib menjaga netralitas politik dan bebas dari pengaruh/intervensi semua golongan dan partai politik agar pelayanan publik tetap objektif dan adil bagi seluruh warga.",
  },

  // ================= TIU (11-20) =================
  {
    id: "tiu-11",
    number: 11,
    category: "TIU",
    subtopic: "Verbal — Analogi",
    prompt: "ARSITEK : GAMBAR RANCANGAN = ... : ...",
    options: [
      { label: "A", text: "Hakim : Ruang Sidang", score: 0 },
      { label: "B", text: "Komponis : Partitur Lagu", score: 5 },
      { label: "C", text: "Dokter : Rumah Sakit", score: 0 },
      { label: "D", text: "Petani : Cangkul", score: 0 },
      { label: "E", text: "Pilot : Bandara", score: 0 },
    ],
    explanation:
      "Hubungan analoginya adalah 'profesi menghasilkan karya rancangan/cetak biru'. Arsitek menciptakan gambar rancangan bangunan, sebagaimana komponis menciptakan partitur lagu.",
  },
  {
    id: "tiu-12",
    number: 12,
    category: "TIU",
    subtopic: "Verbal — Silogisme",
    prompt:
      "Semua peserta ujian yang lulus SKD wajib mengikuti ujian SKB. Sebagian pelamar formasi teknis adalah peserta ujian yang lulus SKD. Kesimpulan yang paling tepat adalah...",
    options: [
      { label: "A", text: "Semua pelamar formasi teknis wajib mengikuti ujian SKB", score: 0 },
      { label: "B", text: "Semua yang mengikuti ujian SKB adalah pelamar formasi teknis", score: 0 },
      { label: "C", text: "Sebagian pelamar formasi teknis wajib mengikuti ujian SKB", score: 5 },
      { label: "D", text: "Tidak ada pelamar formasi teknis yang mengikuti ujian SKB", score: 0 },
      { label: "E", text: "Sebagian yang lulus SKD bukan peserta ujian SKB", score: 0 },
    ],
    explanation:
      "Premis 1: Semua A -> B (Lulus SKD -> wajib SKB). Premis 2: Sebagian C adalah A (Sebagian pelamar teknis -> lulus SKD). Maka simpulan sahnya adalah Sebagian C -> B: Sebagian pelamar formasi teknis wajib mengikuti ujian SKB.",
  },
  {
    id: "tiu-13",
    number: 13,
    category: "TIU",
    subtopic: "Verbal — Ekuivalensi Logika",
    prompt:
      "Pernyataan yang ekuivalen (bernilai sama) dengan kalimat 'Jika berkas administrasi lengkap, maka pelamar lolos verifikasi' adalah...",
    options: [
      { label: "A", text: "Jika pelamar lolos verifikasi, maka berkas administrasi lengkap", score: 0 },
      { label: "B", text: "Jika berkas administrasi tidak lengkap, maka pelamar tidak lolos verifikasi", score: 0 },
      { label: "C", text: "Jika pelamar tidak lolos verifikasi, maka berkas administrasi tidak lengkap", score: 5 },
      { label: "D", text: "Berkas administrasi tidak lengkap dan pelamar lolos verifikasi", score: 0 },
      { label: "E", text: "Berkas administrasi lengkap atau pelamar tidak lolos verifikasi", score: 0 },
    ],
    explanation:
      "Secara logika matematika, implikasi p → q ekuivalen dengan kontraposisinya ~q → ~p. Jadi 'Jika pelamar tidak lolos verifikasi (~q), maka berkas administrasi tidak lengkap (~p)'.",
  },
  {
    id: "tiu-14",
    number: 14,
    category: "TIU",
    subtopic: "Verbal — Analitis",
    prompt:
      "Lima peserta CPNS (Rani, Sinta, Tono, Umar, Vira) mengantre verifikasi berkas. Rani berada tepat di depan Tono. Umar berada di belakang Vira, tetapi di depan Sinta. Jika Vira berada di urutan pertama, siapa yang berada di urutan keempat?",
    options: [
      { label: "A", text: "Rani", score: 0 },
      { label: "B", text: "Sinta", score: 0 },
      { label: "C", text: "Tono", score: 0 },
      { label: "D", text: "Umar", score: 0 },
      { label: "E", text: "Tidak dapat dipastikan secara tunggal (bisa Tono atau Sinta)", score: 5 },
    ],
    explanation:
      "Urutan 1 = Vira. Diketahui Umar di belakang Vira dan di depan Sinta (Umar > Sinta), serta blok [Rani, Tono] berdekatan. Susunan yang memenuhi: (1) Vira-Umar-Sinta-Rani-Tono (ke-4: Rani), (2) Vira-Umar-Rani-Tono-Sinta (ke-4: Tono), (3) Vira-Rani-Tono-Umar-Sinta (ke-4: Umar). Karena tidak ada syarat pengunci posisi Sinta terhadap Rani/Tono, urutan keempat tidak tunggal.",
  },
  {
    id: "tiu-15",
    number: 15,
    category: "TIU",
    subtopic: "Numerik — Deret Angka",
    prompt: "Tentukan dua angka berikutnya pada deret: 4, 7, 12, 19, 28, ..., ...",
    options: [
      { label: "A", text: "37, 48", score: 0 },
      { label: "B", text: "39, 52", score: 5 },
      { label: "C", text: "38, 50", score: 0 },
      { label: "D", text: "39, 50", score: 0 },
      { label: "E", text: "41, 54", score: 0 },
    ],
    explanation:
      "Selisih antar suku membentuk pola bilangan ganjil berurutan: +3 (4→7), +5 (7→12), +7 (12→19), +9 (19→28). Berikutnya +11 → 28 + 11 = 39, lalu +13 → 39 + 13 = 52.",
  },
  {
    id: "tiu-16",
    number: 16,
    category: "TIU",
    subtopic: "Numerik — Deret Larik",
    prompt: "Lanjutkan pola deret berikut: 3, 6, 9, 12, 27, 18, 81, ...",
    options: [
      { label: "A", text: "24", score: 5 },
      { label: "B", text: "36", score: 0 },
      { label: "C", text: "54", score: 0 },
      { label: "D", text: "243", score: 0 },
      { label: "E", text: "27", score: 0 },
    ],
    explanation:
      "Deret terdiri dari 2 larik berselang-seling. Suku ganjil: 3, 9, 27, 81 (×3). Suku genap: 6, 12, 18, ... (+6). Maka suku ke-8 (posisi genap) adalah 18 + 6 = 24.",
  },
  {
    id: "tiu-17",
    number: 17,
    category: "TIU",
    subtopic: "Numerik — Berhitung Cepat",
    prompt: "Nilai dari 37,5% dari 640 + (2/3) × 150 adalah...",
    options: [
      { label: "A", text: "320", score: 0 },
      { label: "B", text: "340", score: 5 },
      { label: "C", text: "350", score: 0 },
      { label: "D", text: "360", score: 0 },
      { label: "E", text: "380", score: 0 },
    ],
    explanation:
      "Gunakan pecahan istimewa: 37,5% = 3/8. Jadi (3/8) × 640 = 3 × 80 = 240. Kemudian (2/3) × 150 = 100. Total = 240 + 100 = 340.",
  },
  {
    id: "tiu-18",
    number: 18,
    category: "TIU",
    subtopic: "Numerik — Perbandingan Berbalik Nilai",
    prompt:
      "Sebuah arsip digital instansi dapat diselesaikan oleh 12 orang staf dalam waktu 15 hari. Jika pekerjaan tersebut harus selesai dalam waktu 10 hari, berapa tambahan staf yang dibutuhkan dengan kecepatan kerja yang sama?",
    options: [
      { label: "A", text: "4 orang", score: 0 },
      { label: "B", text: "6 orang", score: 5 },
      { label: "C", text: "8 orang", score: 0 },
      { label: "D", text: "12 orang", score: 0 },
      { label: "E", text: "18 orang", score: 0 },
    ],
    explanation:
      "Perbandingan berbalik nilai: P1 × T1 = P2 × T2 -> 12 × 15 = P2 × 10 -> P2 = 180 / 10 = 18 orang. Karena ditanya TAMBAHAN staf: 18 - 12 = 6 orang.",
  },
  {
    id: "tiu-19",
    number: 19,
    category: "TIU",
    subtopic: "Numerik — Perbandingan Kuantitatif",
    prompt:
      "Diketahui x adalah bilangan bulat dengan -3 < x < -1. Jika P = x² + 3 dan Q = 8, maka hubungan yang benar antara P dan Q adalah...",
    options: [
      { label: "A", text: "P > Q", score: 0 },
      { label: "B", text: "P < Q", score: 5 },
      { label: "C", text: "P = Q", score: 0 },
      { label: "D", text: "P = 2Q", score: 0 },
      { label: "E", text: "Hubungan P dan Q tidak dapat ditentukan", score: 0 },
    ],
    explanation:
      "Satu-satunya bilangan bulat antara -3 dan -1 adalah x = -2. Substitusi ke P: (-2)² + 3 = 4 + 3 = 7. Karena Q = 8, maka P < Q (7 < 8).",
  },
  {
    id: "tiu-20",
    number: 20,
    category: "TIU",
    subtopic: "Logika Pola & Figural Analitis",
    prompt:
      "Sebuah jarum indikator berputar 90° searah jarum jam pada langkah ganjil, lalu berputar 45° berlawanan arah jarum jam pada langkah genap. Jika posisi awal menghadap tepat ke Utara (0°), ke arah manakah jarum menghadap setelah 4 langkah?",
    options: [
      { label: "A", text: "Timur (90°)", score: 5 },
      { label: "B", text: "Timur Laut (45°)", score: 0 },
      { label: "C", text: "Tenggara (135°)", score: 0 },
      { label: "D", text: "Selatan (180°)", score: 0 },
      { label: "E", text: "Barat Laut (315°)", score: 0 },
    ],
    explanation:
      "Awal: 0° (Utara). Langkah 1 (+90°): 90°. Langkah 2 (-45°): 45°. Langkah 3 (+90°): 135°. Langkah 4 (-45°): 90° (Timur).",
  },

  // ================= TKP (21-30) =================
  {
    id: "tkp-21",
    number: 21,
    category: "TKP",
    subtopic: "Pelayanan Publik",
    prompt:
      "Lima menit sebelum loket layanan administrasi tutup, datang seorang warga lanjut usia dari kecamatan terjauh yang berkasnya kurang satu fotokopi KTP sehingga belum bisa diproses. Tindakan terbaik yang Anda lakukan adalah...",
    options: [
      { label: "A", text: "Menutup loket tepat waktu karena jam layanan memang sudah berakhir dan memintanya datang besok", score: 1 },
      { label: "B", text: "Menjelaskan kekurangan berkasnya dengan sopan dan memintanya melengkapi terlebih dahulu di luar kantor", score: 3 },
      { label: "C", text: "Membantu mengarahkan atau memfasilitasi pemindaian/salinan KTP bila tersedia fasilitas kantor serta menyelesaikan layanannya dengan ramah", score: 5 },
      { label: "D", text: "Memproses permohonan tanpa fotokopi KTP meskipun melanggar daftar cek SOP instansi", score: 2 },
      { label: "E", text: "Meminta petugas keamanan menjelaskan aturan berkas kepada warga tersebut", score: 1 },
    ],
    explanation:
      "Nilai maksimal (5) pada Pelayanan Publik ditunjukkan oleh sikap solutif, empatik kepada warga rentan/jauh, namun tetap taat pada kelengkapan syarat prosedur.",
  },
  {
    id: "tkp-22",
    number: 22,
    category: "TKP",
    subtopic: "Jejaring Kerja",
    prompt:
      "Dalam proyek digitalisasi arsip lintas bidang, tim dari divisi lain terlambat mengirimkan data sehingga jadwal tim Anda ikut terhambat. Langkah paling konstruktif yang Anda ambil adalah...",
    options: [
      { label: "A", text: "Mengirim email laporan ke pimpinan bahwa keterlambatan sepenuhnya salah divisi tersebut", score: 2 },
      { label: "B", text: "Menghubungi koordinator divisi terkait untuk berdiskusi mencari kendala dan menyepakati jadwal bertahap agar pengerjaan tetap jalan", score: 5 },
      { label: "C", text: "Menunggu pasif sampai mereka mengirim seluruh data meski batas waktu semakin dekat", score: 1 },
      { label: "D", text: "Mengerjakan bagian lain saja tanpa menghubungi divisi tersebut", score: 3 },
      { label: "E", text: "Meminta tim Anda mengambil alih tugas divisi lain tanpa izin koordinator mereka", score: 2 },
    ],
    explanation:
      "Aspek Jejaring Kerja menilai kolaborasi lintas unit dan komunikasi asertif berorientasi solusi bersama (skor 5), bukan saling menyalahkan atau diam menunggu.",
  },
  {
    id: "tkp-23",
    number: 23,
    category: "TKP",
    subtopic: "Teknologi Informasi & Komunikasi (TIK)",
    prompt:
      "Instansi Anda baru meluncurkan sistem persuratan elektronik baru, namun beberapa pegawai senior kesulitan menggunakannya dan kembali memakai cara manual. Sebagai ASN yang melek digital, sikap Anda adalah...",
    options: [
      { label: "A", text: "Membiarkan saja karena pegawai senior wajar sulit mengikuti teknologi baru", score: 1 },
      { label: "B", text: "Menggunakan sistem baru untuk pekerjaan sendiri dan melaporkan pegawai lain yang masih manual", score: 2 },
      { label: "C", text: "Mengajak rekan muda lain membuat panduan ringkas bergambar dan mendampingi pegawai senior praktik langsung hingga terbiasa", score: 5 },
      { label: "D", text: "Meminta pimpinan mewajibkan sanksi bagi pegawai yang belum memakai sistem digital", score: 3 },
      { label: "E", text: "Membantu mengerjakan seluruh input data milik pegawai senior setiap hari", score: 4 },
    ],
    explanation:
      "Skor 5 pada TIK adalah mendorong adopsi teknologi secara kolaboratif melalui transfer pengetahuan dan panduan praktis sehingga seluruh tim berdaya mandiri.",
  },
  {
    id: "tkp-24",
    number: 24,
    category: "TKP",
    subtopic: "Sosial Budaya",
    prompt:
      "Anda ditempatkan di daerah dengan bahasa dan adat istiadat yang sangat berbeda dari kampung halaman Anda. Pada minggu pertama bekerja, rekan-rekan sering bercakap menggunakan bahasa daerah saat jam istirahat. Sikap Anda adalah...",
    options: [
      { label: "A", text: "Merasa terasing dan memilih menyendiri di ruang kerja saat jam istirahat", score: 1 },
      { label: "B", text: "Meminta mereka selalu berbicara bahasa Indonesia bahkan saat percakapan santai", score: 2 },
      { label: "C", text: "Menghargai kebiasaan lokal, bersikap terbuka berbaur, dan mulai mempelajari ungkapan dasar bahasa daerah setempat sambil tetap profesional", score: 5 },
      { label: "D", text: "Hanya bergaul dengan sesama perantau yang berasal dari daerah yang sama", score: 1 },
      { label: "E", text: "Tersenyum seperlunya dan hanya berinteraksi jika ada urusan pekerjaan", score: 3 },
    ],
    explanation:
      "Aspek Sosial Budaya menghargai kemampuan beradaptasi, keterbukaan, dan penghormatan terhadap keragaman budaya lokal di lingkungan penempatan tugas.",
  },
  {
    id: "tkp-25",
    number: 25,
    category: "TKP",
    subtopic: "Profesionalisme",
    prompt:
      "Di tengah tenggat waktu penyusunan laporan kinerja triwulan yang harus selesai hari ini, anggota keluarga menghubungi bahwa kendaraan rumah mengalami mogok ringan di bengkel dekat rumah. Sikap profesional Anda adalah...",
    options: [
      { label: "A", text: "Langsung pulang meninggalkan laporan tanpa izin karena urusan keluarga lebih utama", score: 1 },
      { label: "B", text: "Menuntaskan laporan kinerja terlebih dahulu sesuai target sambil berkoordinasi via telepon agar keluarga mendapat bantuan teknis atau transportasi pengganti", score: 5 },
      { label: "C", text: "Menyerahkan pekerjaan yang belum selesai kepada rekan meja sebelah agar bisa pulang cepat", score: 2 },
      { label: "D", text: "Menunda laporan hingga besok meskipun berisiko melewati batas waktu pimpinan", score: 2 },
      { label: "E", text: "Meminta izin atasan pulang 2 jam lebih awal dan berjanji menyelesaikan laporan dari rumah jika sempat", score: 3 },
    ],
    explanation:
      "Profesionalisme berarti mampu memprioritaskan tanggung jawab pekerjaan yang mendesak tanpa mengabaikan koordinasi solusi untuk masalah non-darurat keluarga.",
  },
  {
    id: "tkp-26",
    number: 26,
    category: "TKP",
    subtopic: "Anti-Radikalisme",
    prompt:
      "Dalam sebuah grup percakapan kerja, seorang rekan membagikan tautan artikel yang merendahkan kelompok agama tertentu dan mengajak menolak aturan seragam nasional. Tindakan paling tepat yang Anda lakukan adalah...",
    options: [
      { label: "A", text: "Keluar diam-diam dari grup agar tidak ikut terseret masalah", score: 2 },
      { label: "B", text: "Mengingatkan secara santun dan tegas tentang etika ASN serta nilai toleransi Pancasila, lalu melaporkan kepada atasan/pengelola pengawasan internal bila berlanjut", score: 5 },
      { label: "C", text: "Menyukai unggahan tersebut sebagai bentuk menghargai kebebasan berpendapat", score: 1 },
      { label: "D", text: "Menghujat rekan tersebut di grup dengan kata-kata keras", score: 2 },
      { label: "E", text: "Mengabaikannya karena menganggap hal itu sekadar candaan biasa", score: 1 },
    ],
    explanation:
      "Pada Anti-Radikalisme, ASN harus proaktif mencegah penyebaran intoleransi dan paham anti-Pancasila melalui pendekatan edukatif, tegas sesuai aturan, serta pelaporan berjenjang bila diperlukan.",
  },
  {
    id: "tkp-27",
    number: 27,
    category: "TKP",
    subtopic: "Pelayanan Publik — Antrean",
    prompt:
      "Seorang kerabat dekat atasan Anda datang membawa berkas layanan dan meminta didahulukan melewati puluhan warga yang sudah antre sejak pagi. Sikap Anda adalah...",
    options: [
      { label: "A", text: "Langsung melayaninya di urutan pertama demi menjaga hubungan baik dengan atasan", score: 1 },
      { label: "B", text: "Menjelaskan dengan ramah bahwa seluruh pemohon dilayani berdasar nomor antrean secara adil, kecuali kategori prioritas resmi (lansia/disabilitas/ibu hamil)", score: 5 },
      { label: "C", text: "Menghindari meja pelayanan dan menyuruh rekan lain yang menghadapinya", score: 2 },
      { label: "D", text: "Melayaninya secara diam-diam di ruang belakang agar warga tidak melihat", score: 1 },
      { label: "E", text: "Menolak dengan nada tinggi di depan umum agar warga memuji ketegasan Anda", score: 3 },
    ],
    explanation:
      "Pelayanan publik yang berkualitas wajib adil, transparan, bebas diskriminasi, sekaligus disampaikan secara santun dan komunikatif.",
  },
  {
    id: "tkp-28",
    number: 28,
    category: "TKP",
    subtopic: "TIK — Keamanan Data",
    prompt:
      "Anda diminta rekan dari instansi luar mengirimkan salinan database kependudukan internal melalui aplikasi pesan instan pribadi agar cepat diproses. Langkah yang paling tepat adalah...",
    options: [
      { label: "A", text: "Langsung mengirimkannya lewat WhatsApp demi kecepatan layanan", score: 1 },
      { label: "B", text: "Menolak pengiriman lewat jalur pribadi dan mengarahkan permintaan data melalui mekanisme surat resmi serta kanal pertukaran data terenkripsi sesuai SOP keamanan informasi", score: 5 },
      { label: "C", text: "Mengirimkan sebagian kecil data saja agar risiko kebocoran lebih kecil", score: 2 },
      { label: "D", text: "Menolak tanpa memberi penjelasan cara pengajuan data yang benar", score: 3 },
      { label: "E", text: "Mengirim lewat email pribadi yang diberi kata sandi sederhana", score: 2 },
    ],
    explanation:
      "Keamanan data dan privasi warga adalah bagian penting dari aspek TIK dan tata kelola SPBE. Akses data lintas instansi wajib mengikuti prosedur resmi dan kanal aman.",
  },
  {
    id: "tkp-29",
    number: 29,
    category: "TKP",
    subtopic: "Jejaring Kerja — Konflik Ide",
    prompt:
      "Usulan inovasi Anda untuk mempercepat alur kerja ditolak mayoritas anggota rapat karena dianggap menambah beban adaptasi awal. Respon terbaik Anda adalah...",
    options: [
      { label: "A", text: "Menarik diri dari tim dan menolak memberi saran pada rapat-rapat berikutnya", score: 1 },
      { label: "B", text: "Menerima keputusan rapat dengan lapang dada, menampung masukan kekhawatiran tim, dan menyempurnakan konsep agar lebih mudah diterapkan pada kesempatan mendatang", score: 5 },
      { label: "C", text: "Tetap memaksakan inovasi berjalan sendiri tanpa persetujuan rapat", score: 2 },
      { label: "D", text: "Mengeluhkan ketidakmajuan tim kepada bagian lain", score: 1 },
      { label: "E", text: "Menerima keputusan namun enggan membantu melaksanakan kesepakatan rapat", score: 2 },
    ],
    explanation:
      "Skor 5 mencerminkan kedewasaan kolaborasi: menerima hasil musyawarah secara objektif, mendengarkan umpan balik, dan terus memperbaiki gagasan secara konstruktif.",
  },
  {
    id: "tkp-30",
    number: 30,
    category: "TKP",
    subtopic: "Profesionalisme & Pengembangan Diri",
    prompt:
      "Peraturan teknis terbaru terkait jabatan fungsional Anda baru saja diterbitkan pemerintah pusat dan mengubah cara penyusunan angka kredit serta pelaporan kinerja. Yang Anda lakukan adalah...",
    options: [
      { label: "A", text: "Menunggu sampai bagian kepegawaian mengadakan sosialisasi tahun depan", score: 2 },
      { label: "B", text: "Segera mengunduh dan mempelajari salinan regulasi resmi, mengikuti bimbingan teknis, serta berdiskusi dengan rekan sejawat untuk menerapkannya lebih awal", score: 5 },
      { label: "C", text: "Tetap memakai format laporan lama selama belum ditegur atasan langsung", score: 1 },
      { label: "D", text: "Meminta rekan kerja membuatkan ringkasan untuk Anda baca nanti", score: 3 },
      { label: "E", text: "Membaca sekilas bagian kesimpulannya saja di media sosial", score: 2 },
    ],
    explanation:
      "ASN profesional bersikap proaktif memperbarui kompetensi, mempelajari regulasi resmi dari sumber primer, dan berbagi pemahaman bersama tim kerja.",
  },
];
