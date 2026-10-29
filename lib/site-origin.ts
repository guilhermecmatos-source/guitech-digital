const DEFAULT_SITE_ORIGIN = "https://guitech.netlify.app";

function normalizeOrigin(value: string | undefined): string | null {
  const configuredOrigin = value?.trim();
  if (!configuredOrigin) return null;

  try {
    const url = new URL(configuredOrigin);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username ||
      url.password
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

export function getCanonicalSiteOrigin(): string | null {
  const siteOrigin = process.env.SITE_ORIGIN?.trim();
  return siteOrigin ? normalizeOrigin(siteOrigin) : normalizeOrigin(process.env.URL);
}

export function getPublicSiteOrigin(): string {
  return (
    normalizeOrigin(process.env.SITE_ORIGIN) ??
    normalizeOrigin(process.env.URL) ??
    DEFAULT_SITE_ORIGIN
  );
}
