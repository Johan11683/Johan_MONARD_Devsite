export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta
        name="google-site-verification"
        content="D7cRf1xM3jguO-OXqil81PA_SyLe005TNVD0HY7WmBY"
      />
      <link rel="icon" href="/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#0cbcd3" />
      <link rel="canonical" href="https://johan-monard-devsite.vercel.app" />

      {/* Schema.org: Profil de personne */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Johan Monard",
            alternateName: "Punch.Dev",
            url: "https://johan-monard-devsite.vercel.app",
            jobTitle: "Développeur web fullstack",
            image:
              "https://johan-monard-devsite.vercel.app/images/logos/punch.dev.webp",
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
            name: "Punch.Dev",
            url: "https://johan-monard-devsite.vercel.app",
          }),
        }}
      />
    </>
  );
}
