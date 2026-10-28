import type { Config, Context } from "@netlify/edge-functions";

export default function rateLimitQuoteRequests(
  _request: Request,
  context: Context,
): Promise<Response> {
  return context.next();
}

export const config: Config = {
  path: "/api/orcamento",
  method: "POST",
  rateLimit: {
    action: "rate_limit",
    windowLimit: 2,
    windowSize: 180,
    aggregateBy: ["ip", "domain"],
  },
};
