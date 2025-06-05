export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://johan-monard-devsite.vercel.app/</loc>
  </url>
  <url>
    <loc>https://johan-monard-devsite.vercel.app/about</loc>
  </url>
  <url>
    <loc>https://johan-monard-devsite.vercel.app/contact</loc>
  </url>
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
