import {
  getAdminWhatsapp,
  getAdminWhatsappDisplay,
  getPaidWaChannelUrl,
  normalizeWhatsappNumber,
} from "@/lib/admin";

async function sendViaGateway(targetPhone: string, message: string): Promise<void> {
  const target = normalizeWhatsappNumber(targetPhone);
  if (!target) return;

  const fonnteToken = process.env.FONNTE_TOKEN?.trim();
  if (fonnteToken) {
    try {
      await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: fonnteToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target,
          message,
          countryCode: "62",
        }),
      });
    } catch {
      // Do not block auth/order flow if external WA gateway is unreachable
    }
    return;
  }

  const webhookUrl = process.env.WA_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, message }),
      });
    } catch {
      // Ignore external webhook errors
    }
  }
}

export async function sendRegistrationNotifications(params: {
  name: string;
  email: string;
  whatsapp?: string | null;
  accessCode?: string | null;
}): Promise<void> {
  const adminWa = getAdminWhatsapp();
  const adminDisplay = getAdminWhatsappDisplay();
  const code = params.accessCode || "-";

  const adminMsg =
    `[PENDAFTARAN BARU BOYANG-CPNS]\n` +
    `Nama: ${params.name}\n` +
    `Email: ${params.email}\n` +
    `No. WA: ${params.whatsapp || "-"}\n` +
    `Kode Login Sistem: ${code}\n` +
    `Status: Menunggu pembayaran QRIS Rp 10.000.`;

  const jobs: Array<Promise<void>> = [sendViaGateway(adminWa, adminMsg)];

  if (params.whatsapp) {
    const customerMsg =
      `Halo ${params.name}, selamat datang di *BOYANG-CPNS*!\n\n` +
      `Akun Anda berhasil didaftarkan oleh sistem.\n` +
      `Kode Login Pribadi Anda: *${code}*\n` +
      `(Simpan kode ini untuk masuk bersama kata sandi Anda).\n\n` +
      `Langkah selanjutnya:\n` +
      `1. Lakukan pembayaran QRIS tepat *Rp 10.000*\n` +
      `2. Konfirmasi pembayaran / konsultasi ke Admin WhatsApp: *${adminDisplay}*\n` +
      `3. Setelah disetujui, dashboard & link Saluran WhatsApp resmi BOYANG-CPNS akan terbuka otomatis.`;
    jobs.push(sendViaGateway(params.whatsapp, customerMsg));
  }

  await Promise.allSettled(jobs);
}

export async function sendPaymentApprovedNotification(params: {
  name: string;
  email: string;
  whatsapp?: string | null;
  accessCode?: string | null;
}): Promise<void> {
  if (!params.whatsapp) return;

  const channelUrl = getPaidWaChannelUrl();
  const customerMsg =
    `Halo ${params.name}, pembayaran QRIS *Rp 10.000* untuk *BOYANG-CPNS* telah *DISETUJUI*!\n\n` +
    `Kode Login Anda: *${params.accessCode || "-"}*\n` +
    `Email: ${params.email}\n\n` +
    `Sekarang Anda sudah bisa masuk ke Dashboard Lengkap & mengikuti Saluran Resmi BOYANG-CPNS di WhatsApp:\n` +
    `${channelUrl}`;

  await sendViaGateway(params.whatsapp, customerMsg);
}
