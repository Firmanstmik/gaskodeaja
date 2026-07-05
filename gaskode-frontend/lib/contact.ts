/**
 * Single source of truth for the studio's contact details — every WhatsApp
 * CTA and email link across the public site should go through these so a
 * future number/address change only has to happen in one place.
 */
export const WHATSAPP_NUMBER = "6281236893055";
export const WHATSAPP_DISPLAY = "0812-3689-3055";
export const CONTACT_EMAIL = "gaskodeajastudio@gmail.com";

/** Builds a wa.me link, optionally pre-filling the chat with a message. */
export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mailtoLink = `mailto:${CONTACT_EMAIL}`;
