import { getLedgerEvents } from "@/narrative/queries/ledger";

/**
 * Builds RSS Feed XML dynamically from ledger milestones and logs.
 */
export async function GET() {
  const events = getLedgerEvents();
  
  const feedItems = events
    .slice(0, 20) // Top 20 chronological updates
    .map((event) => {
      const link = `https://experiment-zero.vercel.app/${event.route}/${event.slug}`;
      return `
    <item>
      <title><![CDATA[${event.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="false">${event.id}</guid>
      <pubDate>${new Date(event.date).toUTCString()}</pubDate>
      <description><![CDATA[${event.description}]]></description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Laboratory Ledger | Experiment Zero</title>
  <link>https://experiment-zero.vercel.app/ledger</link>
  <description>Chronological activity feeds, status updates, and research checkpoints for Experiment Zero projects.</description>
  <language>en-us</language>
  <atom:link href="https://experiment-zero.vercel.app/ledger/feed.xml" rel="self" type="application/rss+xml" />
  ${feedItems}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=18000",
    },
  });
}
export const dynamic = "force-static";
