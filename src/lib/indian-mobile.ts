/** 10-digit Indian mobile, optional +91 or leading 0. Returns national number or null. */
export function indianMobileNational(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  let national = digits;
  if (national.startsWith("91") && national.length === 12) national = national.slice(2);
  if (national.startsWith("0") && national.length === 11) national = national.slice(1);
  if (!/^[6-9]\d{9}$/.test(national)) return null;
  return national;
}
