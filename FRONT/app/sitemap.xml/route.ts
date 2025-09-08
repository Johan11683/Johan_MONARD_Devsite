export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://devhook.fr/</loc>
  </url>
  <url>
    <loc>https://devhook.fr/about</loc>
  </url>
  <url>
    <loc>https://devhook.fr/contact</loc>
  </url>
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
