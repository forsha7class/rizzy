export const landingContent = {
  hero: {
    eyebrow: 'Konsep kuliner · Chicken Katsu × Es Kelapa',
    headline: ['Praktis.', 'Segar.', 'Pas di kantong.'],
    description:
      'Chicken katsu yang renyah bertemu es kelapa yang menyegarkan. Dua hal sederhana, satu paket yang gampang dibawa ke mana saja.',
    primaryCta: 'Buy Now',
    secondaryCta: 'Kenali RIZZY',
    note: 'Demo presentasi. Tidak ada pesanan atau pembayaran nyata di situs ini.',
    seal: 'PRAKTIS • SEGAR • PAS DI KANTONG • ',
  },
  marquee: [
    'Chicken Katsu',
    'Es Kelapa',
    'Praktis',
    'Segar',
    'Pas di Kantong',
  ],
  story: {
    index: '01',
    eyebrow: 'Cerita',
    title: 'Makan enak nggak harus ribet.',
    paragraphs: [
      'RIZZY berangkat dari kebiasaan sehari-hari: waktu istirahat yang pendek, antrean yang panjang, dan keinginan makan sesuatu yang benar-benar mengenyangkan.',
      'Kami memilih dua hal yang sudah akrab: chicken katsu dan es kelapa. Satu hangat dan renyah, satu dingin dan segar. Dikemas sederhana supaya bisa dinikmati tanpa banyak ritual.',
      'RIZZY masih berupa konsep yang sedang dibangun. Situs ini adalah presentasi ide tersebut — bukan toko yang sudah beroperasi.',
    ],
    quote: 'Dua rasa yang saling menyeimbangkan, dalam satu paket yang nggak bikin repot.',
    teamCaption: 'Tim RIZZY',
    teamSubcaption: 'Di balik konsep yang sedang dibangun.',
    teamAlt: 'Anggota tim RIZZY berfoto bersama.',
  },
  need: {
    index: '02',
    eyebrow: 'Kebutuhan',
    title: 'Antara mepet waktu dan pengen makan bener.',
    intro:
      'Kami membayangkan tiga situasi yang paling sering terjadi. Bukan hasil riset pasar — ini titik awal yang ingin RIZZY jawab.',
    items: [
      {
        index: '01',
        title: 'Jam istirahat pendek',
        body: 'Pengen makan yang proper, tapi waktu cuma cukup untuk ambil dan langsung lanjut lagi.',
        tag: 'Waktu',
      },
      {
        index: '02',
        title: 'Pulang kerja, capek',
        body: 'Nggak ada tenaga untuk masak, tapi tetap pengen makanan yang terasa beneran.',
        tag: 'Tenaga',
      },
      {
        index: '03',
        title: 'Nongkrong budget-aware',
        body: 'Pengen duduk lama dan ngobrol, tanpa harus mikirin tagihan di akhir.',
        tag: 'Biaya',
      },
    ],
    note: 'Tiga skenario di atas adalah asumsi konsep, bukan data penelitian.',
  },
  showcase: {
    index: '03',
    eyebrow: 'Produk',
    title: 'Satu paket, dua suasana.',
    intro:
      'Hangat dari katsu, dingin dari es kelapa. Dua bagian yang dirancang untuk dimakan dalam satu waktu.',
    items: [
      {
        index: '01',
        name: 'Chicken Katsu',
        word: 'Hangat & renyah',
        body: 'Katsu goreng renyah dengan nasi. Bagian yang mengenyangkan dan bikin makan terasa utuh.',
      },
      {
        index: '02',
        name: 'Es Kelapa',
        word: 'Dingin & segar',
        body: 'Es kelapa sebagai penyeimbang setelah gigitan katsu. Memberi jeda segar di tengah suapan.',
      },
    ],
    photoCaption: 'Foto produk RIZZY — Chicken Katsu + Es Kelapa.',
    photoAlt:
      'Kotak makan RIZZY berisi chicken katsu, nasi, irisan timun, dan selada, dengan segelas es kelapa di sampingnya.',
    photoBadge: 'Foto asli',
    honestNote:
      'Kami hanya menampilkan foto dan informasi yang memang tersedia. Detail produk final masih dalam pengembangan.',
  },
  value: {
    index: '04',
    eyebrow: 'Nilai',
    title: 'Kenapa RIZZY?',
    intro:
      'Tiga hal yang ingin kami jaga konsisten, bahkan ketika konsepnya masih terus diuji.',
    items: [
      {
        index: '01',
        title: 'Praktis',
        body: 'Satu paket, satu keputusan. Nggak perlu menyusun menu panjang untuk makan siang.',
      },
      {
        index: '02',
        title: 'Segar',
        body: 'Es kelapa memberi jeda dingin di antara gigitan katsu yang renyah.',
      },
      {
        index: '03',
        title: 'Pas di kantong',
        body: 'Konsep harga dirancang untuk makan sehari-hari. Harga resmi belum ditetapkan, jadi angka di demo ini hanya contoh.',
      },
    ],
    footnote: 'Belum ada testimoni, penghargaan, atau angka penjualan yang diklaim di situs ini.',
  },
  closing: {
    index: '05',
    eyebrow: 'Mulai',
    title: 'Coba alur pesannya.',
    description:
      'Pilih paket contoh, lihat ringkasan, lalu jalankan simulasi pembayaran QRIS atau USDT. Semua status di demo ini scripted — tidak ada transaksi nyata.',
    cta: 'Buy Now',
    secondary: 'Kembali ke cerita',
  },
  footer: {
    note: 'Situs presentasi untuk memperkenalkan konsep RIZZY dan alur pemesanan yang diusulkan.',
    demoLabel: 'Mode demonstrasi',
    copyright: `© ${new Date().getFullYear()} RIZZY`,
  },
} as const
