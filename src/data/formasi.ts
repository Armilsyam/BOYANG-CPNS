export type InstansiLevel = "P" | "V" | "B" | "T";

export interface FormasiInstansi {
  no: number;
  lv: InstansiLevel;
  name: string;
  id: string;
  alias: string;
  formasi: number | null;
  daftar: string;
}

export const LEVEL_META: Record<
  InstansiLevel,
  { label: string; prefix: string; searchWords: string }
> = {
  P: { label: "Pusat", prefix: "", searchWords: "pusat kementerian lembaga badan" },
  V: { label: "Provinsi", prefix: "Provinsi ", searchWords: "provinsi prov pemprov daerah pemda" },
  B: { label: "Kabupaten", prefix: "Kabupaten ", searchWords: "kabupaten kab pemkab daerah pemda" },
  T: { label: "Kota", prefix: "Kota ", searchWords: "kota pemkot daerah pemda" },
};

export function getDisplayName(item: Pick<FormasiInstansi, "lv" | "name">): string {
  return LEVEL_META[item.lv].prefix + item.name;
}

export function getPdfUrl(id: string): string {
  return `https://drive.google.com/file/d/${id}/view`;
}

export const FORMASI_INSTANSI: FormasiInstansi[] = [
  {
    "no": 1,
    "lv": "P",
    "name": "Arsip Nasional Republik Indonesia (ANRI)",
    "id": "1MRDRNf2QCosM1VP0_1tlnPB5s5G6XRSf",
    "alias": "arsip",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 2,
    "lv": "P",
    "name": "Badan Informasi Geospasial",
    "id": "1O-_vMOqG4Y8efCH4l1nS_zbaYsaadqXT",
    "alias": "big",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 3,
    "lv": "P",
    "name": "Badan Intelijen Negara (BIN)",
    "id": "1mgkkBK3VLt8h530g83ri57evOrd_eWh3",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 4,
    "lv": "P",
    "name": "Badan Karantina Indonesia",
    "id": "1UiNyOrNG2YgJjhN8q8lZz_nhc84liedL",
    "alias": "barantin karantina",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 5,
    "lv": "P",
    "name": "Badan Keamanan Laut (Bakamla)",
    "id": "1gGwgoQInpDg6ihb8ZUQYG7xtvv9Ytq7K",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 6,
    "lv": "P",
    "name": "Badan Kepegawaian Negara (BKN)",
    "id": "1jJ-in22fsTEH6PldpOYA3LkiDmgppdGL",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 7,
    "lv": "P",
    "name": "Badan Kependudukan dan Keluarga Berencana Nasional (BKKBN)",
    "id": "11EIqmWTrU6-uvHLpBjqcMtdyGhnUEhyT",
    "alias": "kb",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 8,
    "lv": "P",
    "name": "Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)",
    "id": "1gmDibBXuGbdexPeoxtUWpK2swhIaWuPx",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 9,
    "lv": "P",
    "name": "Badan Narkotika Nasional (BNN)",
    "id": "18Dkt5SQAO4wGAVskxUAEV7If6q4-pB8N",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 10,
    "lv": "P",
    "name": "Badan Nasional Penanggulangan Bencana (BNPB)",
    "id": "1jH876BmpoRq_lO5d74UuwgzvC_youJFM",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 11,
    "lv": "P",
    "name": "Badan Nasional Penanggulangan Terorisme (BNPT)",
    "id": "1EJgVnyr2Iw8f5EMHDoJW-TijVvPx2oHd",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 12,
    "lv": "P",
    "name": "Badan Nasional Pencarian dan Pertolongan (Basarnas)",
    "id": "1ZRijslrW01hXOfTv0dGhGYW2lDJt7xpk",
    "alias": "sar",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 13,
    "lv": "P",
    "name": "Badan Pangan Nasional",
    "id": "1AnJJ6tgsXPbl2QoD8QYWdI1CNHnpvOki",
    "alias": "bapanas",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 14,
    "lv": "P",
    "name": "Badan Pelindungan Pekerja Migran Indonesia (BP2MI)",
    "id": "1uzh_Lpx4H7O7YCFk2eQFUwuXhFDEPX1J",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 15,
    "lv": "P",
    "name": "Badan Pembinaan Ideologi Pancasila (BPIP)",
    "id": "1mdQsTXo2KkwNSwBTT8sU09AUTIeohUmj",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 16,
    "lv": "P",
    "name": "Badan Pemeriksa Keuangan (BPK)",
    "id": "1ksAqodLnxgBXTjsXaFi9_tSi-fzzZ1hh",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 17,
    "lv": "P",
    "name": "Badan Pengawas Obat dan Makanan (BPOM)",
    "id": "13fnWAh91nDeCHdgpn1Yol6RF_Pjolqb-",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 18,
    "lv": "P",
    "name": "Badan Pengawas Pemilihan Umum (Bawaslu)",
    "id": "1SYXcNtVCQ82nKUqegv184DoOodgJpVla",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 19,
    "lv": "P",
    "name": "Badan Pengawasan Keuangan dan Pembangunan (BPKP)",
    "id": "10yICdkjs0w2tLyrrKPAEaojpmBbJ482i",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 20,
    "lv": "P",
    "name": "Badan Pusat Statistik (BPS)",
    "id": "1veJ2IgewbbVexl_xUL6kb4KpjjJ-9kmo",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 21,
    "lv": "P",
    "name": "Badan Riset dan Inovasi Nasional (BRIN)",
    "id": "1f0STKnbXJJKWrOhtJEsfUKR72CfZp3xV",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 22,
    "lv": "P",
    "name": "Dewan Ketahanan Nasional (Wantannas)",
    "id": "1i31qM7hMVtPXaD8BEMus8d6XOp9k02hV",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 23,
    "lv": "P",
    "name": "Kejaksaan Agung Republik Indonesia",
    "id": "1MwrZLnRsS-zQg3QN7m7iTuOgkiQd_NPx",
    "alias": "kejagung kejaksaan",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 24,
    "lv": "P",
    "name": "Kementerian Agama",
    "id": "1OY4m37pman-5FHi_R0y-O2fgPHAUeDPo",
    "alias": "kemenag",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 25,
    "lv": "P",
    "name": "Kementerian Agraria dan Tata Ruang (ATR/BPN)",
    "id": "19Fi8zBqTbIWeEBAvhSpWR8k-lvrHw2b8",
    "alias": "atrbpn",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 26,
    "lv": "P",
    "name": "Kementerian Dalam Negeri",
    "id": "1WokXla8vE37g5tvt6vjKd-RU5wtrM1FB",
    "alias": "kemendagri",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 27,
    "lv": "P",
    "name": "Kementerian Energi dan Sumber Daya Mineral (ESDM)",
    "id": "1DxRAlwdquMeO2_KcGCaEUWllSHcF6miq",
    "alias": "kesdm",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 28,
    "lv": "P",
    "name": "Kementerian Hukum dan Hak Asasi Manusia (Kemenkumham)",
    "id": "1RNWIOd4R8gDLEypF3O_1UuTTPG-YagFf",
    "alias": "kumham ham",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 29,
    "lv": "P",
    "name": "Kementerian Investasi / BKPM",
    "id": "10VKv2WDZ56rBMALAjVxOn-_58vp8hTCj",
    "alias": "kementerian investasi",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 30,
    "lv": "P",
    "name": "Kementerian Kelautan dan Perikanan",
    "id": "1xqPyOaDVAuSDRioyusM77FTP2jorFCxc",
    "alias": "kkp",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 31,
    "lv": "P",
    "name": "Kementerian Kesehatan",
    "id": "16zJnOwmwt7YHYdkNVxZlwpDUyQz8ScvH",
    "alias": "kemenkes",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 32,
    "lv": "P",
    "name": "Kementerian Ketenagakerjaan",
    "id": "1b0ITHRZgcy-BOH-tAG2cmlMym5wn00cE",
    "alias": "kemnaker kemenaker",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 33,
    "lv": "P",
    "name": "Kementerian Keuangan",
    "id": "1L6JSss0bRtuc0ec1_rl6UZg9IEAGsczD",
    "alias": "kemenkeu",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 34,
    "lv": "P",
    "name": "Kementerian Komunikasi dan Informatika (Kominfo)",
    "id": "1EOso82cvGGmiUSM55LNEhQCShVtl35r5",
    "alias": "komdigi",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 35,
    "lv": "P",
    "name": "Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan",
    "id": "1MRBzqqQ-MG5JFcqtmScPdECOCsiSvZ0q",
    "alias": "kemenko pmk kemenkopmk",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 36,
    "lv": "P",
    "name": "Kementerian Koordinator Bidang Perekonomian",
    "id": "1yEBibhjpqERKwmxVom5bKQnM0jxUX_ax",
    "alias": "kemenko ekon kemenkoekon",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 37,
    "lv": "P",
    "name": "Kementerian Koordinator Bidang Politik, Hukum, dan Keamanan",
    "id": "1yfFlNWy7Te3fx5s2Ntg2RV4VUVIRfhnK",
    "alias": "kemenko polhukam kemenkopolhukam",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 38,
    "lv": "P",
    "name": "Kementerian Koperasi dan UKM",
    "id": "1s4kH7LXZw4VuGnscqqxlj3el4RM82Gd6",
    "alias": "kemenkop kemenkopukm umkm",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 39,
    "lv": "P",
    "name": "Kementerian Lingkungan Hidup dan Kehutanan (KLHK)",
    "id": "1e3oYVcSGGXew_xFFLxVieIMpvqT0wuPh",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 40,
    "lv": "P",
    "name": "Kementerian Luar Negeri",
    "id": "13VYAK0vLAJtcaXGpJ0yYiWzbnR95k53H",
    "alias": "kemenlu kemlu",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 41,
    "lv": "P",
    "name": "Kementerian Pariwisata dan Ekonomi Kreatif",
    "id": "1GCfgdBBDeGTPF294aLKVhR2BPY92dTtJ",
    "alias": "kemenparekraf kemenpar",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 42,
    "lv": "P",
    "name": "Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR)",
    "id": "1u0ZvP3ITNJWWxy33jgYgTsVQpKIYMiS8",
    "alias": "kemenpupr pu",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 43,
    "lv": "P",
    "name": "Kementerian Pemberdayaan Perempuan dan Perlindungan Anak",
    "id": "103lQBF4zIQ7A4WXnm6OFl36qCO8wn1ay",
    "alias": "kemenpppa kpppa",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 44,
    "lv": "P",
    "name": "Kementerian Pemuda dan Olahraga",
    "id": "14HIWC68sWHsUS2ZEBmj24wB7laFwrcmb",
    "alias": "kemenpora",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 45,
    "lv": "P",
    "name": "Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PANRB)",
    "id": "1049r0C3MTXYOglrqq7VX5Lc-5eVd-_9W",
    "alias": "kemenpan menpan",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 46,
    "lv": "P",
    "name": "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek)",
    "id": "1bDUWBdk-NH1QyS3VWlZttHCV6rjOWUHi",
    "alias": "kemendikbud dikbud",
    "formasi": null,
    "daftar": "31 Agu – 13 Sep 2024"
  },
  {
    "no": 47,
    "lv": "P",
    "name": "Kementerian Perdagangan",
    "id": "1krQJ3ainlqmwR_kjubeWYESC1kaf04wO",
    "alias": "kemendag",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 48,
    "lv": "P",
    "name": "Kementerian Perencanaan Pembangunan Nasional (Bappenas)",
    "id": "1QEtsSSyK6EAWa9DmSStKbeFJ3zSm0N3B",
    "alias": "ppn",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 49,
    "lv": "P",
    "name": "Kementerian Perhubungan",
    "id": "1gb7e0U3WCVPp4Xvht143N26u5-hDrqQn",
    "alias": "kemenhub",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 50,
    "lv": "P",
    "name": "Kementerian Perindustrian",
    "id": "13_WcCo57hk0TFswAZR9NNPZmrQCHX2kv",
    "alias": "kemenperin",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 51,
    "lv": "P",
    "name": "Kementerian Pertahanan",
    "id": "1CU2djmPZwWWMjF0e1tc5mXw_KnPC-6Ph",
    "alias": "kemhan kemenhan",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 52,
    "lv": "P",
    "name": "Kementerian Pertanian",
    "id": "1iGu1Ub8p5PwGvhbezpCVSx7LGLVQ9t9r",
    "alias": "kementan",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 53,
    "lv": "P",
    "name": "Kementerian Sosial",
    "id": "12oyYe3AnM87SC4psCt14aun14kfOxc1u",
    "alias": "kemensos",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 54,
    "lv": "P",
    "name": "Komisi Pemberantasan Korupsi (KPK)",
    "id": "1turaCb6wQOYCvr2rf5gkTfGyw7ni5DE6",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 55,
    "lv": "P",
    "name": "Komisi Pemilihan Umum (KPU)",
    "id": "1Eb5lO-DttIRvtFW4kCHT5oONSj66gWQr",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 56,
    "lv": "P",
    "name": "Komisi Yudisial (KY)",
    "id": "1RZQWsAKY5qGMz6jxRtG3MDTZGHVu8OWy",
    "alias": "",
    "formasi": 145,
    "daftar": "20 Agu – 10 Sep 2024"
  },
  {
    "no": 57,
    "lv": "P",
    "name": "Lembaga Administrasi Negara (LAN)",
    "id": "1i3c3hd_lM2OXlUKCkGQwtnWTzUKfaoOv",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 58,
    "lv": "P",
    "name": "Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah (LKPP)",
    "id": "1-IH_e-X8qAwbHRiHMVoFcBGrzbsgOOp5",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 59,
    "lv": "P",
    "name": "Lembaga Perlindungan Saksi dan Korban (LPSK)",
    "id": "1xv-O3a6BsY8KLzkCNSqEmP4eWYz-CVNV",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 60,
    "lv": "P",
    "name": "Mahkamah Agung (MA)",
    "id": "1RNoiU4z9qSjhfInhNHX40ZzlsivfI6rI",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 61,
    "lv": "P",
    "name": "Otorita Ibu Kota Nusantara (IKN)",
    "id": "1Mwc1G_g4aJ6TMvd95nQdZZ9Wum1p0Mx6",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 62,
    "lv": "P",
    "name": "Perpustakaan Nasional RI",
    "id": "1WpGqXhusLLQw4r9CL-KSjEsgISmkC3ht",
    "alias": "perpusnas",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 63,
    "lv": "P",
    "name": "Sekretariat Jenderal Dewan Nasional Kawasan Ekonomi Khusus (KEK)",
    "id": "1mjBKfyEowqTTstaTsuaIejKS_Vv57LCo",
    "alias": "setjen",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 64,
    "lv": "P",
    "name": "Sekretariat Jenderal DPD RI",
    "id": "1hYcPfOrIB-MfjI9EU-CI50F3x9HRjeT1",
    "alias": "setjen",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 65,
    "lv": "P",
    "name": "Sekretariat Jenderal DPR RI",
    "id": "1e9c39jTKUXdetLDJj0tPt4r0Q2CVbgVr",
    "alias": "setjen",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 66,
    "lv": "P",
    "name": "Sekretariat Jenderal Komnas HAM",
    "id": "1h72M7upzXQNNiLHs956aRvEStG0tAnU2",
    "alias": "setjen",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 67,
    "lv": "P",
    "name": "Sekretariat Jenderal MPR RI",
    "id": "11eKJXECXzC889AWLpGnOdZfcVuVq_IOO",
    "alias": "setjen",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 68,
    "lv": "V",
    "name": "Kalimantan Barat",
    "id": "1nX_iZ6VYFKBLhOOHXHYoAGTviUCfB_Nz",
    "alias": "kalbar",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 69,
    "lv": "B",
    "name": "Aceh Barat",
    "id": "1BErrK_5eoGiShCY_JjoGCtmEsX9aL53r",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 70,
    "lv": "B",
    "name": "Aceh Besar",
    "id": "1BXH-SXmICJ7jpYMIjgzC_IxYK_een9cO",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 71,
    "lv": "B",
    "name": "Aceh Singkil",
    "id": "1QEYU17lO_-58PrvzXuXOd9w9ge9zADfD",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 72,
    "lv": "B",
    "name": "Aceh Tenggara",
    "id": "1wVpINImBa-gxoSr65AcXM14HGua_EONS",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 73,
    "lv": "B",
    "name": "Asahan",
    "id": "1MRnHEvsD36mrzSidnQU3zrToCqn1Rsei",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 74,
    "lv": "B",
    "name": "Balangan",
    "id": "1_1__i6O_POUkhyah1dEQZViOQlPkQLcK",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 75,
    "lv": "B",
    "name": "Bandung",
    "id": "1OmR9MOUUM0yHrsG8igjdaiEXK_LaQyZ8",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 76,
    "lv": "B",
    "name": "Bangka",
    "id": "1dIKud-ev8bVYp54oia1bMnwKfo3A_d_x",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 77,
    "lv": "B",
    "name": "Bangka Barat",
    "id": "1woycm0APbrK8lXhUBlbVlt_i_LOZBCMP",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 78,
    "lv": "B",
    "name": "Bangka Selatan",
    "id": "1J7cxEm8qh5K6B5BMOLWXFnwjNFUR1db5",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 79,
    "lv": "B",
    "name": "Bangka Tengah",
    "id": "17fH2VlXFRp3zXKqmoAoI87PMxDnm8jFG",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 80,
    "lv": "B",
    "name": "Bangkalan",
    "id": "1Icn-o_0qQx_yLpWZV9xOz7VghkmzqKzi",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 81,
    "lv": "B",
    "name": "Banjar",
    "id": "1r4VKCFkM9X8DQWkc97ruRfyLtA62GG_L",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 82,
    "lv": "B",
    "name": "Banjarnegara",
    "id": "1c37oBtBIIwCFh3fyAAeheJS65JWxVkr7",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 83,
    "lv": "B",
    "name": "Bantul",
    "id": "1A5KxjLp5FYZ9S4KIkwS0V3MmNdu57HwG",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 84,
    "lv": "B",
    "name": "Banyuasin",
    "id": "1ECqT_5P3Sthtn3fdpfzW_R63pOVtvSrk",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 85,
    "lv": "B",
    "name": "Banyumas",
    "id": "1r2oKnQX_vSxpEFvqU6X-Tw0qE2p8SeEN",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 86,
    "lv": "B",
    "name": "Banyuwangi",
    "id": "1DTHf9gcRJV1Ih4LTQfot9vACBx2jARlz",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 87,
    "lv": "B",
    "name": "Batang",
    "id": "1KqNh7V-49AR847BRVnxdxGIYhn1xlDKw",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 88,
    "lv": "B",
    "name": "Belitung",
    "id": "1-GyDHdh7rLLm5IxIsXOIF9hj6chles4q",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 89,
    "lv": "B",
    "name": "Belitung Timur",
    "id": "1GcyHP5qv9R_OE7B9wcK3gNgFkfgwgq5d",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 90,
    "lv": "B",
    "name": "Belu",
    "id": "18ShlXAtG33CKvZa8LwnfZn46zvtNXJhz",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 91,
    "lv": "B",
    "name": "Bengkayang",
    "id": "1AxJFFGG0ScrzHbc17tMz52crId0x8NML",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 92,
    "lv": "B",
    "name": "Berau",
    "id": "1Z-BSqzs443CsPcZz3hnYEbXi4idDKjny",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 93,
    "lv": "B",
    "name": "Bintan",
    "id": "1Uejh0XR7CQwbsVAWbE7ZpOMKXp7vg_JB",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 94,
    "lv": "B",
    "name": "Bireuen",
    "id": "1EsKU3APubibgRQeonePgL5J8Dahr4CDx",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 95,
    "lv": "B",
    "name": "Blora",
    "id": "1vCsqiajpAIZVwC995_XR85Bq_5zCoWv3",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 96,
    "lv": "B",
    "name": "Bojonegoro",
    "id": "1kM6s5IogmEuAGTBZF48HwoVN0v2zjRfn",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 97,
    "lv": "B",
    "name": "Bolaang Mongondow Utara",
    "id": "1x6bwMOmnxsC6MM3-2KdwoZfpl4ZJGmqf",
    "alias": "bolmut",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 98,
    "lv": "B",
    "name": "Bombana",
    "id": "1fJWw9M0w_2gDLuwTL7oVTmA8TPkS4jNB",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 99,
    "lv": "B",
    "name": "Bondowoso",
    "id": "1-c2SQGMT5L2rFYp7HU6ac9ta2dD349Eq",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 100,
    "lv": "B",
    "name": "Bone",
    "id": "1Tpqf6Mzi2xcnTOeBVZpNG6As3rDR98im",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 101,
    "lv": "B",
    "name": "Boyolali",
    "id": "1bEYcPO6PcVkyHJj3Lpofyy8btVhsIUE3",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 102,
    "lv": "B",
    "name": "Brebes",
    "id": "1a1AQMKD8ynDQTiFNNHzeb_U6hLRhFfkF",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 103,
    "lv": "B",
    "name": "Buton",
    "id": "1-NE8LSFCS-DU64iaTwktgx-fB7nmY6xv",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 104,
    "lv": "B",
    "name": "Ciamis",
    "id": "1_yrIqSj2UacfxiQa3fk0nVPU-ZMksuWq",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 105,
    "lv": "B",
    "name": "Cianjur",
    "id": "12K2JSj2L-2774EnjJB15c4cdekAkVVBH",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 106,
    "lv": "B",
    "name": "Cilacap",
    "id": "1MfcoZNTApWsbfZMExzcJ7W6KrEMFTY4I",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 107,
    "lv": "B",
    "name": "Cirebon",
    "id": "1pYMaZ8Hb03c_UJyoDRhHAY2TAotOYEFG",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 108,
    "lv": "B",
    "name": "Demak",
    "id": "1Nm89GKNRaojHLe4oxe_040Ivnkt98Tn3",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 109,
    "lv": "B",
    "name": "Dharmasraya",
    "id": "1yuCcaxFOJdXA1NYe-VC29fv9puW-kVMV",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 110,
    "lv": "B",
    "name": "Donggala",
    "id": "1zdGvbEdTPnfgmk9lLNMRnTedbhvTxu-E",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 111,
    "lv": "B",
    "name": "Enrekang",
    "id": "1dpbUdpkuPqpz6g7RYqFle8hikJ9KgRkA",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 112,
    "lv": "B",
    "name": "Flores Timur",
    "id": "1R-4KMnGPZg2-0-pckRoocumsYc6R6JNC",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 113,
    "lv": "B",
    "name": "Garut",
    "id": "1vjpa3EJy9Le_1SyeSF_XuMLadGlnf6cV",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 114,
    "lv": "B",
    "name": "Gorontalo",
    "id": "13dCpf2DJ-VB_RN5LbfV-aTkqbJPefLN8",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 115,
    "lv": "B",
    "name": "Gresik",
    "id": "1fI4Vds_aB6fErVUvMLoVGTMiw440UK4C",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 116,
    "lv": "B",
    "name": "Grobogan",
    "id": "1a3jYFL5Xb60vilW09W4BqJZLikZdv2gk",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 117,
    "lv": "B",
    "name": "Gunung Kidul",
    "id": "16CxHrOlvlgiBbfRDC_tLCmxrWxvVKRIN",
    "alias": "gunungkidul",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 118,
    "lv": "B",
    "name": "Gunung Mas",
    "id": "1zp7-tsbrR06JNRlzjcl9kDI9Py50lc_d",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 119,
    "lv": "B",
    "name": "Hulu Sungai Selatan",
    "id": "1wa1a61Eag2J808qaU1n1Juy7Fcud93el",
    "alias": "hss",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 120,
    "lv": "B",
    "name": "Indramayu",
    "id": "1MI2LkFabzdCHW5J8FCM6n96xOle6ats0",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 121,
    "lv": "B",
    "name": "Jember",
    "id": "1xZKVQkwdJEgQRJcFdsMOfRkhm-tjGQKU",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 122,
    "lv": "B",
    "name": "Jepara",
    "id": "1pVUBgcMzn3m1rmUhYXnDw6A9t5ltuxKd",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 123,
    "lv": "B",
    "name": "Jombang",
    "id": "1ilJvZpkht8T-CBQBGWOdbjZou22KQq0L",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 124,
    "lv": "B",
    "name": "Kapuas",
    "id": "1mAFvn2IInOluJwXv_n0udSVX8quEc6vr",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 125,
    "lv": "B",
    "name": "Karanganyar",
    "id": "1-5dAvh1rnAd13SwLTFTXOYiZwExUD2-E",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 126,
    "lv": "B",
    "name": "Karawang",
    "id": "1CgXBvoVxnAmMUNXW6OApMeAm--6klxzr",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 127,
    "lv": "B",
    "name": "Karimun",
    "id": "1MUvcJKksKh1tfUa-PjmB8mLmIyIk9WQF",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 128,
    "lv": "B",
    "name": "Kaur",
    "id": "1S5DPEsTV5JJznouBeEqgOHhLpKIaE1td",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 129,
    "lv": "B",
    "name": "Kebumen",
    "id": "1L7dQhs8XP0yuZyfM0taH1NZ5LN98Mt92",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 130,
    "lv": "B",
    "name": "Kediri",
    "id": "1-odDkGNaHykr-In3E4-vCa6daMYPOO-o",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 131,
    "lv": "B",
    "name": "Kendal",
    "id": "15d-EfC5CS0qRMZeF3GnbTkmqXNorjF1y",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 132,
    "lv": "B",
    "name": "Kepulauan Anambas",
    "id": "1Tf7lSqBEF2jkwWFpb35AHyKbMGDy9-hq",
    "alias": "anambas",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 133,
    "lv": "B",
    "name": "Kepulauan Mentawai",
    "id": "1WyWnEV5tiEx0woZcToc_YbWRIT3RPQCm",
    "alias": "mentawai",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 134,
    "lv": "B",
    "name": "Kepulauan Siau Tagulandang Biaro",
    "id": "1zcrM3PC2UaRghiu_9M5wXb-TIboQdcaW",
    "alias": "sitaro",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 135,
    "lv": "B",
    "name": "Kerinci",
    "id": "18uYUpTJMXMS6FmxiLrqJUIPB0gzQXfHM",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 136,
    "lv": "B",
    "name": "Klaten",
    "id": "1wG78RTz5NH2XUJSw9WWiEvAVv3uj7MZ-",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 137,
    "lv": "B",
    "name": "Klungkung",
    "id": "1VT65OTyCaE0gIxPxsLGuAEREnyJnWJz0",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 138,
    "lv": "B",
    "name": "Kolaka",
    "id": "1YNNizjSTlnS4tPuVAaRW5jJmP31yU1xv",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 139,
    "lv": "B",
    "name": "Konawe",
    "id": "1vhM46fh2eyUK2HXGbO2rfsbb8AO1ro0H",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 140,
    "lv": "B",
    "name": "Kotawaringin Timur",
    "id": "1bYWsap_dAyxK8ufZD2rJmT1DHOZD8ikL",
    "alias": "kotim",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 141,
    "lv": "B",
    "name": "Kuantan Singingi",
    "id": "1_V4LOXXblqI2rNpYDR2M8G6BOlw_dq9B",
    "alias": "kuansing",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 142,
    "lv": "B",
    "name": "Kudus",
    "id": "1x0PfMdzTJJu1yeoDTZims0lqpt245Cz4",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 143,
    "lv": "B",
    "name": "Kulon Progo",
    "id": "1Ksj7-3wsJJUQ91cH2vrFVhVig1xi90j5",
    "alias": "kulonprogo",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 144,
    "lv": "B",
    "name": "Kutai Timur",
    "id": "1__Yp19ck7Wno56DLye7BcBPSHfjmDyCr",
    "alias": "kutim",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 145,
    "lv": "B",
    "name": "Labuhanbatu",
    "id": "1oZ8HWOnV2qIeSQ7ihL37AQ0Jcdz-3c3p",
    "alias": "labuhan batu",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 146,
    "lv": "B",
    "name": "Lahat",
    "id": "1xcmmX8NTQ50ZigfYHS1Oy0fFA9ak-leO",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 147,
    "lv": "B",
    "name": "Lamongan",
    "id": "1G7_lJarBfzGe_V0GWW6CxTZdwsuhP6QY",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 148,
    "lv": "B",
    "name": "Lampung Selatan",
    "id": "103258tbboezGCnLiEClWZKVy-o-96BE6",
    "alias": "lamsel",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 149,
    "lv": "B",
    "name": "Lampung Utara",
    "id": "1ovZM2-dUMolrQVrWu10Bo923cKo4VuNA",
    "alias": "lampura",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 150,
    "lv": "B",
    "name": "Landak",
    "id": "1b53kW_QYhd1HDxscxeczzFa9qDDqQvB0",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 151,
    "lv": "B",
    "name": "Lebak",
    "id": "1J3ePQSVK_68JpCjPTnXPy36pJ7pSEYZw",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 152,
    "lv": "B",
    "name": "Lebong",
    "id": "1SzkQhi1vu3p1AF1aGzvK14g-JiTJhcco",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 153,
    "lv": "B",
    "name": "Lima Puluh Kota",
    "id": "1QPu-elkTs1W5Wtj7_AFWgIMbWBqIKrKr",
    "alias": "limapuluh 50 kota",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 154,
    "lv": "B",
    "name": "Lingga",
    "id": "1N09N0fZ6Sumr9YbiswOE9nUCoqP1QbHl",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 155,
    "lv": "B",
    "name": "Lombok Utara",
    "id": "1Syy72RvaLd9UUTGcgY_3QIcGCZLoBw-j",
    "alias": "klu",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 156,
    "lv": "B",
    "name": "Lumajang",
    "id": "1x2S4qTAgxPCj2B1VKTZJXYOpruVRmxQI",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 157,
    "lv": "B",
    "name": "Luwu Timur",
    "id": "1puj5TEiad-zqQ2UvpP0cbHNn6Rnj4OpW",
    "alias": "lutim",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 158,
    "lv": "B",
    "name": "Magelang",
    "id": "1l_FupI-tyI3mjJ9q05ej69Yd1-Xj6-HS",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 159,
    "lv": "B",
    "name": "Magetan",
    "id": "1YxLbdfBHrZ0PgmRH1rNKHBcwoiMXuAVv",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 160,
    "lv": "B",
    "name": "Majalengka",
    "id": "1_Wesnpf0tg_fBQBkzWqymh-G0GOKqJBz",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 161,
    "lv": "B",
    "name": "Maluku Tengah",
    "id": "1CVxloKEjbmHggd7Jt8TfCMmT0SQ4Ux57",
    "alias": "malteng",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 162,
    "lv": "B",
    "name": "Mamasa",
    "id": "17nmz5pZpW0sIhUd4H09bGRGlaRHxz5Mt",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 163,
    "lv": "B",
    "name": "Mamuju Tengah",
    "id": "1iU18RfFjpd1vmcoA7j-HlUGj96nmHjQ8",
    "alias": "mateng",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 164,
    "lv": "B",
    "name": "Melawi",
    "id": "1JJ1sZdArw02rhiW06yvC3iinHMkDdj1o",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 165,
    "lv": "B",
    "name": "Minahasa Utara",
    "id": "10D_QJ6zFMEKku0XPQV4IEz8p2AXZbUwJ",
    "alias": "minut",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 166,
    "lv": "B",
    "name": "Morowali",
    "id": "1EyLTyeZW97OgvBdKjKJwQVOb0EHweJkw",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 167,
    "lv": "B",
    "name": "Morowali Utara",
    "id": "1fIQ8GPVBhcqCqMlkwNTr1Np2iA48YKVh",
    "alias": "morut",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 168,
    "lv": "B",
    "name": "Mukomuko",
    "id": "1Ay6ZGtRtp4dyIb33_Hs4NOO44PIB4Iaj",
    "alias": "muko muko",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 169,
    "lv": "B",
    "name": "Muna",
    "id": "1KGAr7UsWGvh3VuVHkbOp4ZtkXugEi4Pg",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 170,
    "lv": "B",
    "name": "Muna Barat",
    "id": "10Jxw3xsJzLGBwWfLr60RyEz-wiJ-WV38",
    "alias": "mubar",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 171,
    "lv": "B",
    "name": "Musi Rawas Utara",
    "id": "1lMnDJvcHKu_TUYQ5MtpxUpl2p0-nKD60",
    "alias": "muratara",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 172,
    "lv": "B",
    "name": "Nagan Raya",
    "id": "1527P3wLs9WuHvi4nZ-knrav2_lF0yZKr",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 173,
    "lv": "B",
    "name": "Natuna",
    "id": "1hmns3twgQTmx6r52tlKLtFMtOLrKTrme",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 174,
    "lv": "B",
    "name": "Ngada",
    "id": "1Ieh-c8xchtIyvqoNvSjShDGXaDxcqJTF",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 175,
    "lv": "B",
    "name": "Nganjuk",
    "id": "1KYNhGqhwqBNcc28af4rRCXB4On0K6NLG",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 176,
    "lv": "B",
    "name": "Ngawi",
    "id": "1N5_OtborsSZsK4WEV8qNPxOniG-ntFIk",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 177,
    "lv": "B",
    "name": "Ogan Ilir",
    "id": "16simncFEMj5ZqGD5vFADoDp8xWe_Ojif",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 178,
    "lv": "B",
    "name": "Pacitan",
    "id": "1KDfSgcFl4ALgAcsDEU4uyLNEMecN4B3v",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 179,
    "lv": "B",
    "name": "Padang Pariaman",
    "id": "1UXSENvSpqLAHD7FhGCqDsP57nM9QaXoo",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 180,
    "lv": "B",
    "name": "Pamekasan",
    "id": "1V5xPWd_4gk1SumQJXfyPQirhhZkFzkph",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 181,
    "lv": "B",
    "name": "Paser",
    "id": "1usnc6q5wNvsSr9xu_eqeLnS3MXBDJ4iM",
    "alias": "pasir",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 182,
    "lv": "B",
    "name": "Pasuruan",
    "id": "11gWx4BtLsPoA8VvnuYWCPZECl9xia1Ik",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 183,
    "lv": "B",
    "name": "Pati",
    "id": "1yZh9sRi4IREn-Udsy4dp03Ra7By0Hd-A",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 184,
    "lv": "B",
    "name": "Pelalawan",
    "id": "1FATJ-o82YmmLScu2tEouPIJh2G5bckHb",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 185,
    "lv": "B",
    "name": "Pemalang",
    "id": "1-BG59SNtW0JConh3HausFrb-khfnG6Ka",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 186,
    "lv": "B",
    "name": "Pesisir Barat",
    "id": "1O7Gz6d8o_egBxYBTk91A6nHADorNZogZ",
    "alias": "pesibar",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 187,
    "lv": "B",
    "name": "Pesisir Selatan",
    "id": "1tQJc9S1QRsLyFAZvX-lo-lnQmULnQ5LG",
    "alias": "pessel",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 188,
    "lv": "B",
    "name": "Pohuwato",
    "id": "1sEehWi7AFrBMM8L88SKRXOtrFy9OZ9ZY",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 189,
    "lv": "B",
    "name": "Polewali Mandar",
    "id": "1IueGW1q2CVKl_73fTUkKYiHdqD0zh9zk",
    "alias": "polman",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 190,
    "lv": "B",
    "name": "Ponorogo",
    "id": "1UROuvjucU7H9Isloo1-m96PWWlGxHlyV",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 191,
    "lv": "B",
    "name": "Pulang Pisau",
    "id": "1cQ-8VjFdNuRWYfbQU_BckWl-VXbj4aNN",
    "alias": "pulpis",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 192,
    "lv": "B",
    "name": "Pulau Morotai",
    "id": "1FLPOAkOTPuH_68LlOyncXXcrcKAD0IaL",
    "alias": "morotai",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 193,
    "lv": "B",
    "name": "Purbalingga",
    "id": "1LjJvGD1e44WaboZveDf3e_qD3hQC8NlM",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 194,
    "lv": "B",
    "name": "Purwakarta",
    "id": "1VpuWgfUvJBbboyJK8KVKexaRhRC5JiXe",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 195,
    "lv": "B",
    "name": "Rembang",
    "id": "1vAE03BhGl9YQWIh0YA5O8p3FokS89j5T",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 196,
    "lv": "B",
    "name": "Rokan Hulu",
    "id": "192zh-GIEJsJHAXzmLkQhezT17Epo1maD",
    "alias": "rohul",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 197,
    "lv": "B",
    "name": "Sambas",
    "id": "1QE-flR_Et6bZw5CROBfpAMqnTBxBYpYS",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 198,
    "lv": "B",
    "name": "Sampang",
    "id": "1zKIFvdDqxInIVMnRgGlzaS--aiqtSZMx",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 199,
    "lv": "B",
    "name": "Sanggau",
    "id": "1dUnTBqictzl49PS5bsSZXpKuUfa041h6",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 200,
    "lv": "B",
    "name": "Sekadau",
    "id": "16e1bO1nko1XNmz-BO3y-ZQb-RWonAhNA",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 201,
    "lv": "B",
    "name": "Semarang",
    "id": "1UzdS4oJoGcv5FNSCICKY5NwxToCXPDa0",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 202,
    "lv": "B",
    "name": "Serang",
    "id": "1sTab1X5WcBIdnBOxzyaRNSzd2mr6NThL",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 203,
    "lv": "B",
    "name": "Seruyan",
    "id": "1Au8rp1T3K6P7lcQEYpUQpW7TUPy3F-Zn",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 204,
    "lv": "B",
    "name": "Sidenreng Rappang",
    "id": "1GoGWMuPbmQrDoYRhkMwLkh6CC-ukV4S1",
    "alias": "sidrap",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 205,
    "lv": "B",
    "name": "Sijunjung",
    "id": "1FV6xuPqw_DpQAVDSMtuTdN1rVKN8JAyM",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 206,
    "lv": "B",
    "name": "Simeulue",
    "id": "1WCHxj0VUR1dPlzQCwIL5nXVAOcN5CAzw",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 207,
    "lv": "B",
    "name": "Sleman",
    "id": "1SR91m9lr2XoAiqbCQzvpNW_tGorMJ1jZ",
    "alias": "jogja",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 208,
    "lv": "B",
    "name": "Solok",
    "id": "1ZFRSAwXKxTKBIyHKK5YinYylW20jXIsW",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 209,
    "lv": "B",
    "name": "Solok Selatan",
    "id": "1RQdFLsl7drZRyXylopeh1NXLQ5JsB46N",
    "alias": "solsel",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 210,
    "lv": "B",
    "name": "Sragen",
    "id": "19AP6IumMux_0LXFeUewdf0TGFJVA4MLG",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 211,
    "lv": "B",
    "name": "Subang",
    "id": "1Xlw1iKgUGPEAqYs07KHbNdgPXRVW3mkJ",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 212,
    "lv": "B",
    "name": "Sukoharjo",
    "id": "189bQPnKJhrXRnRANks3St1Y2eu_SRO2a",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 213,
    "lv": "B",
    "name": "Sumba Barat",
    "id": "1pNTer7cO9oDbMH_8fkkjWytomTGQd6NX",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 214,
    "lv": "B",
    "name": "Sumedang",
    "id": "1gHn23vi0Q5VYtQTh9jIa4LsZ0aMv5E1a",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 215,
    "lv": "B",
    "name": "Sumenep",
    "id": "1GFesn5OFtpEruh7dcSMOgyvxMfH5Cnxu",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 216,
    "lv": "B",
    "name": "Tana Toraja",
    "id": "1-4iRtBRB6CXYI5_Q0xGPaBdN1RcBtewz",
    "alias": "toraja",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 217,
    "lv": "B",
    "name": "Tanah Datar",
    "id": "1p6bLW8GG48Qddh3aScMg9tvYwQ4sYzGX",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 218,
    "lv": "B",
    "name": "Tanah Laut",
    "id": "1rnVPypl9bRNL3ptMVHYm66PQyn98Dxz9",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 219,
    "lv": "B",
    "name": "Tangerang",
    "id": "14PHW5Nc_eOEBZdybtfG1vh8OeJZtiMMS",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 220,
    "lv": "B",
    "name": "Tanggamus",
    "id": "1NOoyV_lyyGmuW8fO6J7FGwYYq71nmZfY",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 221,
    "lv": "B",
    "name": "Tanjung Jabung Timur",
    "id": "1Yznc0fnAKU1BpBx6R5YoVFaXJRDb6b1a",
    "alias": "tanjabtim",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 222,
    "lv": "B",
    "name": "Tapanuli Selatan",
    "id": "1FAIoZV3qRZrBwY9c84JWl2Zk44Sqnntg",
    "alias": "tapsel",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 223,
    "lv": "B",
    "name": "Tapin",
    "id": "1IPlA0GxiWyZmdk2aXmco8G5B5QLW5vCL",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 224,
    "lv": "B",
    "name": "Tasikmalaya",
    "id": "16GrXLsOFzlSbjxH2sa1mGfpPA-__R1PG",
    "alias": "tasik",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 225,
    "lv": "B",
    "name": "Temanggung",
    "id": "1XpDjlYPEcQeWdqgUMwWmBqZwPlMx-jeC",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 226,
    "lv": "B",
    "name": "Timor Tengah Selatan",
    "id": "1CY_sQd3VtALZFmA9pce_Us0QYY5hxA0v",
    "alias": "tts",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 227,
    "lv": "B",
    "name": "Trenggalek",
    "id": "13hp07GfZATssan94FoHDLaKSc3yLsplJ",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 228,
    "lv": "B",
    "name": "Tuban",
    "id": "1m07RzbsDdMURkhmLqsfCEhltat_8V7WB",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 229,
    "lv": "B",
    "name": "Tulang Bawang",
    "id": "1-kNG7AXsHK1ltQW9n7-pPT5798yVAd7j",
    "alias": "tuba",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 230,
    "lv": "B",
    "name": "Tulungagung",
    "id": "1xwbjqPAJ3xF1oDJs8OQx4JhB-mAT67cm",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 231,
    "lv": "B",
    "name": "Wajo",
    "id": "1BxgHQmvAkuFXL7SsK8atIhxeBFcFkLC6",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 232,
    "lv": "B",
    "name": "Way Kanan",
    "id": "17OE5GUrcqHMLXWV67SAOjTgt_hy6MHsl",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 233,
    "lv": "B",
    "name": "Wonogiri",
    "id": "1KnZqMkyWsF6rjqaZcufPnUCQtcmeJ7sj",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 234,
    "lv": "B",
    "name": "Wonosobo",
    "id": "17PDSPPHkQMi8ywE7SY7Jc66sv6jpIcyr",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 235,
    "lv": "T",
    "name": "Ambon",
    "id": "1dJUiExa9VU00nP8a2owC766WBiuYzHlL",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 236,
    "lv": "T",
    "name": "Balikpapan",
    "id": "17v2c4kbS7J-XHwayb4wpezKUO4IyRLXH",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 237,
    "lv": "T",
    "name": "Bandung",
    "id": "1Lsytenq9yahXzTyUtQVqht69nOeJUfbx",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 238,
    "lv": "T",
    "name": "Banjarbaru",
    "id": "1BiwayCSllLTMNi3ie-SwGKD4vklAdxMe",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 239,
    "lv": "T",
    "name": "Batam",
    "id": "1smXZXoENm70T_WQ4MG5BhDeNa-2APqFH",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 240,
    "lv": "T",
    "name": "Batu",
    "id": "1DygNtcszbJLtBacOWlVK1vkKXLyswJjm",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 241,
    "lv": "T",
    "name": "Bima",
    "id": "1GKc3347A2q-veqA5kmLoWqB3Jh30_Nyb",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 242,
    "lv": "T",
    "name": "Bitung",
    "id": "1S_tMo9qeA7WKxaDs-su1QxyA2ISbkT1M",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 243,
    "lv": "T",
    "name": "Blitar",
    "id": "1RKYtVoPQRBKaKKKwL4xSiH9ygulPVrKW",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 244,
    "lv": "T",
    "name": "Bogor",
    "id": "1YWxBzDDvUGOQXzV1hTdKFOV0GT3d3FRZ",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 245,
    "lv": "T",
    "name": "Bontang",
    "id": "17vZL0_64ZUU8YWOHQm5w2sNolMunRx5X",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 246,
    "lv": "T",
    "name": "Bukittinggi",
    "id": "1VJUxAjBvwrTKuxHfBHt1vOK10Yr9gaf3",
    "alias": "bukit tinggi",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 247,
    "lv": "T",
    "name": "Cimahi",
    "id": "1fevCdTUYWhCFNm4mQmE8CyUON6gUt_ZH",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 248,
    "lv": "T",
    "name": "Depok",
    "id": "1T5HUBRRcYWvgBii3e4ZnRtOs6BWivLsc",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 249,
    "lv": "T",
    "name": "Jambi",
    "id": "1ErtiNXfirSV9NCJz56oS_AlMbPlXaZm8",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 250,
    "lv": "T",
    "name": "Kediri",
    "id": "18-qNL_NGNbVNQtGy8DvLizzsaHcGjcxE",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 251,
    "lv": "T",
    "name": "Kendari",
    "id": "1um9uR6HFUnVOBNbyLgXlYaiJd2ZyHcJm",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 252,
    "lv": "T",
    "name": "Lhokseumawe",
    "id": "1iJUrE_bZPoE7UWf3_r7gWdwRU4MPugQ_",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 253,
    "lv": "T",
    "name": "Madiun",
    "id": "1jeU6W_AKK1AW8igxp6Ww5daeiZMgeYXR",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 254,
    "lv": "T",
    "name": "Magelang",
    "id": "1AxhXKnWm5Wm-xGinsTfhHQxFiiYnWHZR",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 255,
    "lv": "T",
    "name": "Makassar",
    "id": "10xzEkgtEjyjF7jozDl5DMjXkU8859gpY",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 256,
    "lv": "T",
    "name": "Malang",
    "id": "1B9DN0KfnsM4b8mvfu9VkYKEj52qzHWPv",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 257,
    "lv": "T",
    "name": "Manado",
    "id": "1Pr43ZxeZilUSVxl1U7SESHZYzmohsvS1",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 258,
    "lv": "T",
    "name": "Medan",
    "id": "1b7c9J0yxIQEDEZPDouYoQhKOrsHKtD8w",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 259,
    "lv": "T",
    "name": "Mojokerto",
    "id": "1wRUAc4NAxqXSEwj3tMrNLlv3-buH2vYs",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 260,
    "lv": "T",
    "name": "Padang",
    "id": "1E1HKQBRcJuKTbkVfleoLNvDrqSaUh2Nz",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 261,
    "lv": "T",
    "name": "Palembang",
    "id": "1bT9Dlcb-gzKKfZWYR7OVZ-wel5Jyd-_b",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 262,
    "lv": "T",
    "name": "Pangkal Pinang",
    "id": "1g1eglZg2q-WcQTcV1HfkQXXrruNiIDi5",
    "alias": "pangkalpinang",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 263,
    "lv": "T",
    "name": "Pasuruan",
    "id": "1YXuRbAk_KDMIkR4-cjBFWhJi0czw53Re",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 264,
    "lv": "T",
    "name": "Pekalongan",
    "id": "1xJJO3m0UOllyguMJ22qhPgMFzPJS2xaT",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 265,
    "lv": "T",
    "name": "Pekanbaru",
    "id": "195eQ69_L806mtiBjSQqrArcj2wfnJSLQ",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 266,
    "lv": "T",
    "name": "Pontianak",
    "id": "1WUYVJuUecoGa7AHuLR9TmVGnJ657EWm_",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 267,
    "lv": "T",
    "name": "Prabumulih",
    "id": "1VQCEcKXY1sTGLiOi8V0BLd1leRtPch54",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 268,
    "lv": "T",
    "name": "Probolinggo",
    "id": "1qPK04WIc__zIAGp4BVXlEqm-9_0_1NZV",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 269,
    "lv": "T",
    "name": "Semarang",
    "id": "1UkR4o9O9l3tKT1nB8LjY3m_K7wKckcYa",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 270,
    "lv": "T",
    "name": "Serang",
    "id": "1QHaVlvEinAsJDOhhRf8-BBlrg6rnv6hM",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 271,
    "lv": "T",
    "name": "Singkawang",
    "id": "1bOPdwXMTaBV0YaaEtcPO8lpSvwi9r9xZ",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 272,
    "lv": "T",
    "name": "Subulussalam",
    "id": "13u5fR6x9nUJXrrlrqp9UH7M7dUplB5sl",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 273,
    "lv": "T",
    "name": "Sungai Penuh",
    "id": "1fKbo34p9VVKP0kwriYvq2VIk6k4eQVjY",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 274,
    "lv": "T",
    "name": "Surabaya",
    "id": "12y8ELHPkPhthe71hooEkn8csBfanP8or",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 275,
    "lv": "T",
    "name": "Surakarta",
    "id": "1n2F0TnwcFXtYzQ3JZ3W2X8VUDW3CrYOP",
    "alias": "solo",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 276,
    "lv": "T",
    "name": "Tarakan",
    "id": "1olbgpBV3xANzk9XAzwQiv8RoO0O9JiLt",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 277,
    "lv": "T",
    "name": "Tasikmalaya",
    "id": "1saiosMSmrL2bWgQFyvkS_1A2vgIvV-xr",
    "alias": "tasik",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 278,
    "lv": "T",
    "name": "Tegal",
    "id": "1TjXWZaFXJpUlHC7zAoYix9wGbS94gS-r",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 279,
    "lv": "T",
    "name": "Yogyakarta",
    "id": "1aaDKEujUVtOt_dAC0zv2-ut9Uo_RvMgh",
    "alias": "jogja jogjakarta",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 280,
    "lv": "V",
    "name": "Aceh",
    "id": "1AqiGZtV5JK8_yLDf_730q9wQrOtNqrnV",
    "alias": "nad",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 281,
    "lv": "V",
    "name": "Bali",
    "id": "1-U4YaDh69kccqHYMa-hIBG9ewvj359sG",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 282,
    "lv": "V",
    "name": "Bengkulu",
    "id": "1uY8YJ2iAFE_CMVOeVF5jwYi7BaSyseWi",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 283,
    "lv": "V",
    "name": "DI Yogyakarta",
    "id": "18zPYbVMTh3FCgL65qQq1-f7QgmWO7pe7",
    "alias": "diy jogja jogjakarta",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 284,
    "lv": "V",
    "name": "DKI Jakarta",
    "id": "1dywnF79LG8xshFGMfGOscQcEI3WD1XXa",
    "alias": "jakarta",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 285,
    "lv": "V",
    "name": "Jawa Barat",
    "id": "1v6jc-LvGavQ45srxHLX3R90OvieLT-6h",
    "alias": "jabar",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 286,
    "lv": "V",
    "name": "Jawa Tengah",
    "id": "1VInU0urXgjLVdnNr9sWRDiKYpRpVPJpB",
    "alias": "jateng",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 287,
    "lv": "V",
    "name": "Jawa Timur",
    "id": "1MJqCPRlrEj7X7HQCk6QyNV1tLNFbqm7j",
    "alias": "jatim",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 288,
    "lv": "V",
    "name": "Kalimantan Selatan",
    "id": "1pdgA6vtVRuVQgd_eGw3M5TWfzkFqPnNx",
    "alias": "kalsel",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 289,
    "lv": "V",
    "name": "Kalimantan Tengah",
    "id": "1eFoIrfHxr2gy7I-fvzQ69sVj_FrIWIcj",
    "alias": "kalteng",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 290,
    "lv": "V",
    "name": "Kalimantan Utara",
    "id": "1gGpuDovm2oupnV07hGB-icZhbUSH3ilQ",
    "alias": "kaltara",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 291,
    "lv": "V",
    "name": "Kepulauan Bangka Belitung",
    "id": "11nBlBh0rvkboETZdb95f71oKPNkP0Kvx",
    "alias": "babel",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 292,
    "lv": "V",
    "name": "Kepulauan Riau",
    "id": "1auSJBmIRhq1XmkQGUZJybIVXn8JUEed8",
    "alias": "kepri",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 293,
    "lv": "V",
    "name": "Lampung",
    "id": "1xcuuXaGfSQiwLkpacho4ipo5ol2HG7kJ",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 294,
    "lv": "V",
    "name": "Maluku",
    "id": "1ezoOGvLP0od9RmUKSOn-ElGgdm9VlNMp",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 295,
    "lv": "V",
    "name": "Maluku Utara",
    "id": "1NFEp-SwVkqxoxjrpiFlMI6sLU4Au5DtD",
    "alias": "malut",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 296,
    "lv": "V",
    "name": "Nusa Tenggara Barat",
    "id": "1tDpoQORm7zZJD-nmL-ELMcq2vwPxyk0F",
    "alias": "ntb",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 297,
    "lv": "V",
    "name": "Nusa Tenggara Timur",
    "id": "1rwx1rR0RqJyQH8pqPm4WG_MA3lM2SLWn",
    "alias": "ntt",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 298,
    "lv": "V",
    "name": "Papua Barat Daya",
    "id": "1BPsPZkcpwxHbloFJI4TTkEU3C1Ha89ud",
    "alias": "pbd",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 299,
    "lv": "V",
    "name": "Papua Selatan",
    "id": "1NQUMjl_BnXPoq-LeIQGd5-7O8nBySxrY",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 300,
    "lv": "V",
    "name": "Papua Tengah",
    "id": "1a84KS1y6wXk0NbfCf8K2f0K3x6ZqV2ZR",
    "alias": "",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 301,
    "lv": "V",
    "name": "Sulawesi Tenggara",
    "id": "1qKuJIMZ7ywffF8fpakKOoxXLjxix5-fH",
    "alias": "sultra",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 302,
    "lv": "V",
    "name": "Sumatera Barat",
    "id": "19cb9inB-oW70ol6es-I5o6SDluxambOe",
    "alias": "sumbar",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 303,
    "lv": "V",
    "name": "Sumatera Selatan",
    "id": "1gYa2e1pC4Vzqo673W3G8rnMgpTPY6SSH",
    "alias": "sumsel",
    "formasi": null,
    "daftar": ""
  },
  {
    "no": 304,
    "lv": "V",
    "name": "Sumatera Utara",
    "id": "1Hr3ewIkWMxW9Vjn507z0fpZsp3PMpxC1",
    "alias": "sumut",
    "formasi": null,
    "daftar": ""
  }
];
