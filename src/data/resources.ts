export interface PublicResource {
  id: string;
  category: "dokumen" | "portal" | "komunitas";
  title: string;
  description: string;
  url: string;
  badge: string;
  actionLabel: string;
  sourceNote: string;
}

export interface CpnsNewsItem {
  id: string;
  date: string;
  tag: string;
  title: string;
  summary: string;
  highlights: string[];
  officialSourceLabel: string;
  officialSourceUrl: string;
}

export interface ChecklistStep {
  id: string;
  order: number;
  title: string;
  description: string;
  tip: string;
}

export const ACCESS_PRICE_IDR = 10000;

export const OFFICIAL_RESOURCES: PublicResource[] = [
  {
    id: "portal-formasi-2024",
    category: "dokumen",
    title: "Portal Resmi Pencarian PDF Formasi CPNS (304 Instansi)",
    description:
      "Akses langsung halaman pencarian cepat dokumen PDF pengumuman formasi dan persyaratan 304 instansi pusat & daerah.",
    url: "https://formasi-cpns-2024-jadiasn.vercel.app/",
    badge: "Portal Formasi PDF",
    actionLabel: "Buka Portal Formasi",
    sourceNote: "Akses Member Terverifikasi",
  },
  {
    id: "pdf-instansi-2026",
    category: "dokumen",
    title: "Folder PDF Persyaratan & Formasi Instansi CPNS 2026",
    description:
      "Kumpulan dokumen pengumuman persyaratan, kualifikasi pendidikan, dan rincian formasi instansi pusat maupun daerah untuk persiapan seleksi CPNS 2026.",
    url: "https://drive.google.com/drive/folders/1Y8Mq2R4TVQQMIrvTRXPWOWGOyGHutpZh?usp=drive_link",
    badge: "Google Drive Folder",
    actionLabel: "Buka Folder PDF 2026",
    sourceNote: "Kompilasi Dokumen Instansi Publik",
  },
  {
    id: "pdf-panduan-sscasn",
    category: "dokumen",
    title: "Panduan PDF Cara Daftar & Buat Akun SSCASN",
    description:
      "Langkah lengkap registrasi akun SSCASN BKN, verifikasi NIK & nomor KK Dukcapil, unggah swafoto, hingga pemilihan formasi dan cetak kartu pendaftaran.",
    url: "https://drive.google.com/file/d/156wRufkM4XDAKKPSOOIl1kaeVbAAlv3B/view?usp=drivesdk",
    badge: "Panduan PDF",
    actionLabel: "Baca Panduan SSCASN",
    sourceNote: "Alur Pendaftaran Portal SSCASN BKN",
  },
  {
    id: "pdf-fgd-kemendikdasmen",
    category: "dokumen",
    title: "Materi FGD Kemendikdasmen: Pemenuhan Guru ASN 2026",
    description:
      "Dokumen paparan kebijakan pemenuhan kebutuhan, penataan distribusi, serta proyeksi formasi Guru ASN tahun anggaran 2026.",
    url: "https://drive.google.com/file/d/1_k7fS_1obUJOKH4D5QX-nd_Rwz1n03x_/view?usp=sharing",
    badge: "Dokumen FGD",
    actionLabel: "Lihat Materi PDF",
    sourceNote: "Referensi Kebijakan Guru ASN 2026",
  },
  {
    id: "portal-sscasn",
    category: "portal",
    title: "Portal Resmi SSCASN Badan Kepegawaian Negara (BKN)",
    description:
      "Situs resmi pemerintah untuk pembuatan akun pelamar, cek lowongan formasi nasional, unggah dokumen pemberkasan, dan pengumuman hasil SKD/SKB.",
    url: "https://sscasn.bkn.go.id",
    badge: "Portal Resmi Pemerintah",
    actionLabel: "Kunjungi sscasn.bkn.go.id",
    sourceNote: "Badan Kepegawaian Negara RI",
  },
  {
    id: "portal-menpan",
    category: "portal",
    title: "Portal Resmi KemenPAN-RB (Regulasi & Nilai Ambang Batas)",
    description:
      "Sumber resmi Keputusan Menteri PANRB mengenai pengadaan CPNS, standar passing grade SKD (TWK, TIU, TKP), dan kebijakan penataan ASN.",
    url: "https://www.menpan.go.id",
    badge: "Regulasi Resmi",
    actionLabel: "Buka menpan.go.id",
    sourceNote: "Kementerian PANRB RI",
  },
  {
    id: "portal-banpt",
    category: "portal",
    title: "Cek Status Akreditasi Kampus & Prodi (BAN-PT)",
    description:
      "Verifikasi sertifikat akreditasi perguruan tinggi dan program studi sesuai tahun kelulusan untuk syarat unggah dokumen pendaftaran CPNS.",
    url: "https://www.banpt.or.id",
    badge: "Verifikasi Berkas",
    actionLabel: "Cek Akreditasi BAN-PT",
    sourceNote: "Badan Akreditasi Nasional PT",
  },
];

export const CPNS_NEWS_UPDATES: CpnsNewsItem[] = [
  {
    id: "rekrutmen-cpns-2026-menpan",
    date: "Update Kebijakan 2026",
    tag: "Kebijakan Nasional",
    title: "Arah Kebijakan Rekrutmen CPNS 2026 & Penataan ASN Nasional",
    summary:
      "Kementerian PANRB memfokuskan pengadaan ASN 2026 pada talenta digital, pelayanan dasar (pendidikan & kesehatan), serta penyelesaian penataan tenaga non-ASN melalui skema PPPK penuh waktu maupun paruh waktu.",
    highlights: [
      "Prioritas formasi CPNS bagi fresh graduate bertalenta digital dan jabatan fungsional strategis.",
      "Pelamar wajib memantau surat keputusan resmi formasi pada masing-masing instansi pusat dan daerah.",
      "Referensi formasi 304 instansi tahun sebelumnya dapat dipakai memetakan peluang & syarat kualifikasi prodi.",
    ],
    officialSourceLabel: "Cek Siaran Pers Resmi KemenPAN-RB",
    officialSourceUrl: "https://www.menpan.go.id",
  },
  {
    id: "persiapan-november-2026",
    date: "Agenda Seleksi",
    tag: "Persiapan Pelamar",
    title: "Persiapan Awal Menghadapi Pembukaan Seleksi CPNS",
    summary:
      "Sebelum portal SSCASN dibuka resmi, calon pelamar disarankan menuntaskan sinkronisasi data kependudukan (NIK & KK), pengecekan akreditasi prodi saat tahun lulus, serta latihan rutin CAT SKD agar melampaui passing grade.",
    highlights: [
      "Pastikan nama pada KTP, KK, Ijazah, dan Transkrip Nilai konsisten tanpa perbedaan ejaan.",
      "Siapkan scan dokumen berwarna dalam format & ukuran file sesuai ketentuan BKN (umumnya PDF/JPG di bawah batas KB).",
      "Targetkan skor aman di atas nilai ambang batas (TWK ≥ 65, TIU ≥ 80, TKP ≥ 166) agar kompetitif di pemeringkatan 3x formasi.",
    ],
    officialSourceLabel: "Pantau Pengumuman Resmi di SSCASN BKN",
    officialSourceUrl: "https://sscasn.bkn.go.id",
  },
];

export const SSCASN_CHECKLIST: ChecklistStep[] = [
  {
    id: "step-dukcapil",
    order: 1,
    title: "Sinkronisasi NIK & Nomor KK di Dukcapil",
    description:
      "Pastikan NIK, Nomor KK, nama lengkap, serta tempat/tanggal lahir pada KTP elektronik dan KK sesuai dengan data ijazah.",
    tip: "Jika muncul galat data saat buat akun SSCASN, hubungi Dinas Dukcapil kabupaten/kota atau layanan Halo Dukcapil.",
  },
  {
    id: "step-ijazah-akreditasi",
    order: 2,
    title: "Siapkan Scan Ijazah Asli, Transkrip Nilai & Bukti Akreditasi",
    description:
      "Scan ijazah dan transkrip nilai asli berwarna (bukan fotokopi legalisir kecuali diminta instansi). Unduh tangkapan layar/sertifikat akreditasi kampus & prodi sesuai tahun kelulusan.",
    tip: "Simpan versi PDF jernih berukuran sekitar 300–700 KB agar mudah terbaca verifikator dan lolos batas unggah.",
  },
  {
    id: "step-foto",
    order: 3,
    title: "Pas Foto Latar Belakang Merah & Swafoto (Selfie)",
    description:
      "Siapkan pas foto formal berpakaian rapi (kemeja putih/rapi sesuai ketentuan) berlatar belakang merah format JPG, serta siapkan kamera depan jernih untuk swafoto langsung saat registrasi.",
    tip: "Pastikan pencahayaan wajah terang, tidak memakai kacamata hitam/topi, dan wajah terlihat jelas.",
  },
  {
    id: "step-cek-formasi",
    order: 4,
    title: "Riset Syarat Khusus pada PDF Pengumuman Instansi",
    description:
      "Buka PDF pengumuman instansi incaran melalui Explorer Formasi BOYANG-CPNS. Perhatikan syarat sertifikat bahasa Inggris (TOEFL/IELTS), batas usia, tinggi badan, atau surat keterangan sehat.",
    tip: "Banyak peserta gugur administrasi bukan karena nilai SKD, melainkan melewatkan 1 syarat khusus di PDF instansi.",
  },
  {
    id: "step-surat-emeterai",
    order: 5,
    title: "Unduh Format Surat Lamaran/Pernyataan & Bubuhkan e-Meterai",
    description:
      "Gunakan format surat resmi milik instansi yang dilamar (jangan pakai template instansi lain), ketik/tulis sesuai aturan, tanda tangani, dan bubuhkan e-Meterai Rp10.000 resmi Peruri.",
    tip: "Hindari menumpuk tanda tangan dan stempel QR e-Meterai agar verifikasi e-Meterai di sistem SSCASN terbaca sah.",
  },
  {
    id: "step-akun-sscasn",
    order: 6,
    title: "Buat Akun & Kunci Resume di Portal SSCASN BKN",
    description:
      "Daftar akun memakai email aktif yang mudah diakses, pilih jenis seleksi, instansi, dan formasi yang sesuai kualifikasi ijazah, lalu cek ulang seluruh unggahan sebelum klik Akhiri Pendaftaran.",
    tip: "Data tidak dapat diubah setelah Anda menekan tombol Akhiri Pendaftaran / Resume.",
  },
  {
    id: "step-kartu-ujian",
    order: 7,
    title: "Cetak Kartu Pendaftaran & Pantau Verifikasi Administrasi",
    description:
      "Unduh Kartu Informasi Akun dan Kartu Pendaftaran SSCASN, lalu pantau status Memenuhi Syarat (MS) serta jadwal masa sanggah dan cetak Kartu Ujian SKD.",
    tip: "Simpan salinan PDF kartu ujian di cloud/HP sebagai cadangan sebelum hari pelaksanaan CAT BKN.",
  },
];
