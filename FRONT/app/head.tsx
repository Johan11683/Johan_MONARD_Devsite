export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta
        name="google-site-verification"
        content="D7cRf1xM3jguO-OXqil81PA_SyLe005TNVD0HY7WmBY"
      />
      <link rel="icon" type="image/webp" href="/images/logos/devhook.webp" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#0cbcd3" />
      <link rel="canonical" href="https://devhook.fr/" />

      <link
        rel="preload"
        href="/fonts/orbitron/Orbitron-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/inter/Inter-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Schema.org: Profil de personne */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Johan Monard",
            alternateName: "Devhook",
            url: "https://www.devhook.fr",
            jobTitle: "Développeur web fullstack",
            image: "https://www.devhook.fr/images/logos/devhook.webp",
            worksFor: {
              "@type": "Organization",
              name: "Freelance",
            },
            sameAs: [
              "https://www.linkedin.com/in/johan-monard-a94b251b6",
              "https://github.com/Johan11683",
            ],
          }),
        }}
      />

      {/* Schema.org: Site web */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "devhook",
            url: "https://www.devhook.fr",
          }),
        }}
      />
    </>
  );
}
