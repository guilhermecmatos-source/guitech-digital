import type { MetadataRoute } from "next";
import { getPublicSiteOrigin } from "@/lib/site-origin";

const publicPaths = [
  "/",
  "/servicos",
  "/empresas",
  "/cursos",
  "/portfolio",
  "/orcamento",
  "/privacidade",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteOrigin = getPublicSiteOrigin();

  return publicPaths.map((path) => ({
    url: new URL(path, siteOrigin).toString(),
  }));
}
