type ApiHero = {
  title?: string;
  subtitle?: string;
  image_path?: string;
  cta_text?: string;
  cta_link?: string;
} | null | undefined;

type ApiBranding = {
  pernyataan?: string;
  jawaban?: string[] | string;
  cta_text?: string | null;
  cta_link?: string | null;
} | null | undefined;

export function mapHeroFromApi(hero: ApiHero) {
  return {
    title: hero?.title ?? "GasKode Aja",
    subtitle: hero?.subtitle ?? "",
    imagePath: hero?.image_path ?? "",
    ctaText: hero?.cta_text ?? "Hubungi Kami",
    ctaLink: hero?.cta_link ?? "/contact",
  };
}

export function mapBrandingFromApi(branding: ApiBranding) {
  let jawaban: string[] = [];
  if (Array.isArray(branding?.jawaban)) {
    jawaban = branding.jawaban;
  } else if (typeof branding?.jawaban === "string") {
    try {
      const parsed = JSON.parse(branding.jawaban);
      jawaban = Array.isArray(parsed) ? parsed : [branding.jawaban];
    } catch {
      jawaban = branding.jawaban ? [branding.jawaban] : [];
    }
  }

  return {
    pernyataan: branding?.pernyataan ?? "",
    jawaban,
    ctaText: branding?.cta_text ?? null,
    ctaLink: branding?.cta_link ?? null,
  };
}

export function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [value];
    } catch {
      return value ? [value] : [];
    }
  }
  return [];
}
