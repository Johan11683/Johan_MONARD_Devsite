export const metadata = {
  title: "Mentions légales – Nectar Wine Merchant",
};

export default function LegalPage() {
  return (
    <main style={{ padding: "6rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>
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
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Éditeur du site</h2>
        <p>
          <strong>Nectar Wine Merchant</strong><br />
          16 Place des Quinconces<br />
          33000 Bordeaux – France<br />
          SIRET : 94165336200017<br />
          Email : contact@nectarwine.com<br />
          Téléphone : +33 6 81 61 42 57
        </p>
      </section>

      {/* --- RESPONSABLE PUBLICATION --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Responsable de la publication
        </h2>
        <p>
          MONARD Johan<br />
          230 avenue d&apos;Eysines<br />
          33200 Bordeaux<br />
          Tél. : +33 7 77 84 26 12<br />
          Email : contact.monard.johan@gmail.com<br />
          SIREN : 994179570
        </p>
      </section>

      {/* --- HÉBERGEMENT --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Hébergement du site
        </h2>
        <p>
          <strong>Vercel Inc.</strong><br />
          440 N Barranca Ave #4133<br />
          Covina, CA 91723<br />
          United States<br />
          Site :{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener">
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
          L’ensemble du contenu présent sur ce site (textes, images, logo, design)
          est la propriété exclusive de Nectar Wine Merchant ou de ses partenaires.
          Toute reproduction, même partielle, est interdite sans autorisation préalable.
        </p>
      </section>

      {/* --- DONNÉES PERSONNELLES --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Données personnelles
        </h2>
        <p>
          Aucune donnée personnelle n’est collectée automatiquement.
          Les informations transmises volontairement par email ou via le formulaire
          de contact sont utilisées uniquement pour répondre aux demandes.
          Elles ne sont ni revendues ni transmises à des tiers.
          <br /><br />
          Conformément au RGPD, vous pouvez demander l’accès, la modification ou
          la suppression de vos données en écrivant à :{" "}
          <a href="a.bellone@nectar-winemerchant.com">
            a.bellone@nectar-winemerchant.com
          </a>.
        </p>
      </section>

      {/* --- RESPONSABILITÉ --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Responsabilité
        </h2>
        <p>
          Nectar Wine Merchant s’efforce d’assurer l’exactitude et la mise à jour
          des informations publiées. Toutefois, l’entreprise ne saurait être tenue
          responsable d’erreurs, d’omissions ou de l’indisponibilité du service.
        </p>
      </section>

      {/* --- PHOTOS --- */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          Crédits photos
        </h2>
        <p>
          Les photographies utilisées sur ce site proviennent des collections
          privées de Nectar Wine Merchant ou ont été fournies avec autorisation.
        </p>
      </section>

      <p style={{ marginTop: "4rem", fontSize: "0.85rem", opacity: 0.6 }}>
        Dernière mise à jour : {new Date().getFullYear()}
      </p>
    </main>
  );
}
