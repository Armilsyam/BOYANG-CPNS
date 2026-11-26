export const STATIC_QRIS_MERCHANT = {
  merchantName: "PODCAST MANDAR, Service",
  nmid: "ID1025386863944",
  terminalLabel: "A01",
  imagePath: "/qris-boyang.jpg",
} as const;

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
