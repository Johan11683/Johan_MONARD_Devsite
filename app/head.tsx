export default function Head() {
  return (
    <>
      <title>Punch.Dev – Portfolio de Johan Monard</title>
      <meta name="description" content="Développeur web fullstack à Bordeaux. Sites modernes, React, Node.js, MongoDB, SEO, APIs sécurisées." />
      <link rel="icon" href="/favicon.png" />

      {/* JSON-LD - schema.org */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Johan Monard",
            alternateName: "Punch.Dev",
            url: "https://www.punch.dev",
            jobTitle: "Développeur web fullstack",
            image: "https://www.punch.dev/images/opengraph-cover.png",
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Punch.Dev",
            url: "https://www.punch.dev",
          }),
        }}
      />
    </>
  );
}
