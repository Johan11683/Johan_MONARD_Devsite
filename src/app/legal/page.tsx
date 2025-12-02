export const metadata = {
  title: "Mentions légales – Johan Monard",
};

export default function LegalPage() {
  return (
    <main
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.4rem",
          marginBottom: "2rem",
        }}
      >
        Mentions légales
      </h1>

      {/* --- ÉDITEUR --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Éditeur du site
        </h2>
        <p>
          <strong>Johan Monard – Développeur web indépendant</strong>
          <br />
          Micro-entreprise enregistrée au Registre National des Entreprises
          <br />
          SIREN : 994179570
          <br />
          Adresse : 230 avenue d&apos;eysines, 33200 Bordeaux, France
          <br />
          Email : contact.monard.johan@gmail.com
          <br />
          Téléphone : 07 77 84 26 12 (du lundi au vendredi, 9h–18h)
        </p>
      </section>

      {/* --- RESPONSABLE DE PUBLICATION --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Responsable de la publication
        </h2>
        <p>
          MONARD Johan, en qualité d&apos;entrepreneur individuel.
          <br />
          Contact : contact.monard.johan@gmail.com
        </p>
      </section>

      {/* --- HÉBERGEMENT --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Hébergement du site
        </h2>
        <p>
          <strong>Vercel Inc.</strong>
          <br />
          440 N Barranca Ave #4133
          <br />
          Covina, CA 91723
          <br />
          United States
          <br />
          Site :{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            https://vercel.com
          </a>
        </p>
      </section>

      {/* --- PROPRIÉTÉ INTELLECTUELLE --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Propriété intellectuelle
        </h2>
        <p>
          L’ensemble du contenu présent sur ce site (textes, images, visuels,
          code, design) est la propriété exclusive de Johan Monard.
          <br />
          Toute reproduction ou diffusion, même partielle, sans autorisation
          préalable est strictement interdite.
        </p>
      </section>

      {/* --- DONNÉES PERSONNELLES --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Données personnelles
        </h2>
        <p>
          Les données transmises via le formulaire de contact (nom, email,
          message) sont utilisées uniquement pour répondre aux demandes reçues.
          <br />
          Elles ne sont ni revendues, ni transmises à des tiers, ni utilisées à
          des fins commerciales.
          <br />
          <br />
          Conformément au RGPD, vous pouvez demander l’accès, la modification ou
          la suppression de vos données en écrivant à :{" "}
          <a href="mailto:contact.monard.johan@gmail.com">
            contact.monard.johan@gmail.com
          </a>
          .
        </p>
      </section>

      {/* --- RESPONSABILITÉ --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Responsabilité
        </h2>
        <p>
          Johan Monard s’efforce d’assurer l’exactitude et la mise à jour des
          informations présentes sur le site. Toutefois, certaines erreurs ou
          omissions peuvent survenir.
          <br />
          Le site peut être momentanément indisponible pour maintenance ou mise
          à jour.
        </p>
      </section>

      {/* --- PHOTOS --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Crédits photos
        </h2>
        <p>
          Les photographies utilisées sur ce site proviennent de la collection
          personnelle de Johan Monard, ou son libres de droit, ou ont été générées/retouchées
          spécifiquement pour ce site.
        </p>
      </section>

      <p style={{ marginTop: "4rem", fontSize: "0.85rem", opacity: 0.6 }}>
        Dernière mise à jour : {new Date().getFullYear()}
      </p>
    </main>
  );
}
