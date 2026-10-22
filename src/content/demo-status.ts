import type { DemoEvent, DemoStatus } from '../lib/demo-machine'

export type StatusTone = 'neutral' | 'wait' | 'progress' | 'warning' | 'danger' | 'success'

export const demoStatusCopy: Record<
  DemoStatus,
  { label: string; title: string; body: string; tone: StatusTone }
> = {
  idle: {
    label: 'Siap didemokan',
    title: 'Demo pembayaran siap dijalankan.',
    body: 'Pilih metode, lihat QR ilustrasi, lalu jalankan status simulasi dari panel kontrol. Tidak ada transaksi nyata yang terjadi.',
    tone: 'neutral',
  },
  awaiting: {
    label: 'Menunggu pembayaran',
    title: 'Menunggu pembayaran simulasi.',
    body: 'Dalam alur nyata, QR akan dipindai dan pembayaran masuk. Di demo ini, gunakan tombol simulasi untuk melanjutkan.',
    tone: 'wait',
  },
  submitted: {
    label: 'Pembayaran dikirim',
    title: 'Pembayaran simulasi dikirim.',
    body: 'Status ini mensimulasikan pembayaran yang dikirim untuk ditinjau. Belum ada dana yang benar-benar diterima.',
    tone: 'progress',
  },
  underpaid: {
    label: 'Kurang bayar',
    title: 'Simulasi kurang bayar — pesanan ditahan.',
    body: 'Jumlah simulasi lebih kecil dari total. Dalam sistem nyata, admin akan meninjau kekurangan sebelum pesanan dapat diproses.',
    tone: 'warning',
  },
  overpaid: {
    label: 'Kelebihan bayar',
    title: 'Simulasi kelebihan bayar — pesanan ditahan.',
    body: 'Jumlah simulasi melebihi total. Dalam sistem nyata, kelebihan dana perlu diselesaikan sebelum pesanan diproses.',
    tone: 'danger',
  },
  verified: {
    label: 'Terverifikasi',
    title: 'Pembayaran terverifikasi (simulasi).',
    body: 'Ini status demo, bukan konfirmasi dana nyata. Dalam sistem nyata, admin berwenang memverifikasi transaksi yang benar-benar masuk sebelum pesanan diproses.',
    tone: 'success',
  },
  processing: {
    label: 'Pesanan diproses',
    title: 'Pesanan simulasi sedang diproses.',
    body: 'Demo memperlihatkan tahap setelah verifikasi. Tidak ada dapur, kurir, atau pesanan nyata yang terlibat.',
    tone: 'progress',
  },
  completed: {
    label: 'Selesai',
    title: 'Simulasi selesai.',
    body: 'Alur demo sudah lengkap. Tidak ada pesanan yang dibuat, dibayar, atau dikirim dalam proses ini.',
    tone: 'success',
  },
}

export const demoActionCopy: Record<DemoEvent, { label: string; description: string }> = {
  begin: {
    label: 'Mulai simulasi',
    description: 'Masuk ke status menunggu pembayaran simulasi.',
  },
  mark_paid: {
    label: 'Simulasikan sudah membayar',
    description: 'Mengirim pembayaran simulasi untuk ditinjau.',
  },
  underpay: {
    label: 'Simulasikan kurang bayar',
    description: 'Menampilkan contoh dana yang lebih kecil dari total.',
  },
  overpay: {
    label: 'Simulasikan kelebihan bayar',
    description: 'Menampilkan contoh dana yang melebihi total.',
  },
  verify: {
    label: 'Simulasikan pembayaran terverifikasi',
    description: 'Hanya status demo. Bukan keputusan admin nyata.',
  },
  process: {
    label: 'Simulasikan pesanan diproses',
    description: 'Melanjutkan demo ke tahap pemrosesan.',
  },
  complete: {
    label: 'Simulasikan pesanan selesai',
    description: 'Mengakhiri alur simulasi.',
  },
  reset: {
    label: 'Reset demo',
    description: 'Menghapus pilihan dan kembali ke awal.',
  },
}

export const presenterNotice =
  'Panel kontrol presenter — bukan keputusan admin nyata dan tidak terhubung ke sistem pembayaran.'
