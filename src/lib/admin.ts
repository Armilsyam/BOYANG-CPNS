export const STATIC_QRIS_MERCHANT = {
  merchantName: "PODCAST MANDAR, Service",
  nmid: "ID1025386863944",
  terminalLabel: "A01",
  imagePath: "/qris-boyang.jpg",
} as const;

export const DEFAULT_ADMIN_WHATSAPP = "6282291544262";
export const DEFAULT_ADMIN_WHATSAPP_DISPLAY = "082291544262";
export const DEFAULT_WA_CHANNEL_URL =
  "https://whatsapp.com/channel/0029VbEZ6tr6rsQx50YzfI0p";

export function normalizeWhatsappNumber(raw?: string | null): string {
  const digits = (raw || "").replace(/[^0-9]/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

export function getAdminWhatsapp(): string {
  const configured = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP?.trim();
  const normalized = normalizeWhatsappNumber(configured);
  return normalized.length >= 9 ? normalized : DEFAULT_ADMIN_WHATSAPP;
}

export function getAdminWhatsappDisplay(): string {
  const wa = getAdminWhatsapp();
  if (wa.startsWith("62")) return `0${wa.slice(2)}`;
  return wa;
}

export function getPaidWaChannelUrl(): string {
  const configured = process.env.NEXT_PUBLIC_COMMUNITY_WA_URL?.trim();
  return configured || DEFAULT_WA_CHANNEL_URL;
}

export function buildAdminWhatsappUrl(message: string): string {
  return `https://wa.me/${getAdminWhatsapp()}?text=${encodeURIComponent(message)}`;
}

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const admins = getAdminEmails();
  return admins.includes(email.trim().toLowerCase());
}
