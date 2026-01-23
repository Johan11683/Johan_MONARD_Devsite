// src/app/components/Admin/Sections/Projects/ProjectsEditor.tsx
"use client";

import styles from "./projects.module.scss";
import type { LocaleKey, ProjectsContent, ProjectItem } from "./projects.types";

type ProjectsEditorProps = {
  value: ProjectsContent;
  onChange: (next: ProjectsContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

export default function ProjectsEditor({
  value,
  onChange,
  onSave,
  isSaving,
}: ProjectsEditorProps) {
  function update(next: ProjectsContent) {
    onChange(next);
  }

  function updateLocalized(
    key: "kicker" | "title" | "subtitle",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      [key]: { ...value[key], [locale]: nextText },
    });
  }

  function makeId() {
    return `p_${Math.random().toString(16).slice(2, 8)}_${Date.now().toString(16)}`;
  }

  function makeEmptyItem(): ProjectItem {
    const id = makeId();
    return {
      id,
      enabled: true,
      title: { fr: "", en: "" },
      description: { fr: "", en: "" },
      image: { src: "", alt: { fr: "", en: "" } },
      link: { href: "", label: { fr: "Voir le site", en: "Open website" }, newTab: true },
      tags: { fr: [], en: [] },
    };
  }

  function addProject() {
    update({
      ...value,
      items: [...value.items, makeEmptyItem()],
    });
  }

  function removeProject(id: string) {
    update({
      ...value,
      items: value.items.filter((p) => p.id !== id),
    });
  }

  function moveProject(fromIndex: number, direction: -1 | 1) {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= value.items.length) return;

    const next = [...value.items];
    [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];

    update({ ...value, items: next });
  }

  function updateProject(id: string, patch: Partial<ProjectItem>) {
    update({
      ...value,
      items: value.items.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function updateProjectLocalized(
    id: string,
    field: "title" | "description",
    locale: LocaleKey,
    nextText: string
  ) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;
    updateProject(id, {
      [field]: { ...p[field], [locale]: nextText },
    } as Partial<ProjectItem>);
  }

  function updateImageSrc(id: string, nextSrc: string) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;
    updateProject(id, {
      image: { ...p.image, src: nextSrc },
    });
  }

  function updateImageAlt(id: string, locale: LocaleKey, nextText: string) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;
    updateProject(id, {
      image: { ...p.image, alt: { ...p.image.alt, [locale]: nextText } },
    });
  }

  function updateLinkHref(id: string, nextHref: string) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;
    updateProject(id, {
      link: { ...p.link, href: nextHref },
    });
  }

  function updateLinkLabel(id: string, locale: LocaleKey, nextText: string) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;
    updateProject(id, {
      link: { ...p.link, label: { ...p.link.label, [locale]: nextText } },
    });
  }

  function updateLinkNewTab(id: string, newTab: boolean) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;
    updateProject(id, {
      link: { ...p.link, newTab },
    });
  }

  function parseTags(raw: string): string[] {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function updateTags(id: string, locale: LocaleKey, raw: string) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;

    updateProject(id, {
      tags: {
        ...p.tags,
        [locale]: parseTags(raw),
      },
    });
  }

  function updateGithubHref(id: string, nextHref: string) {
    const p = value.items.find((x) => x.id === id);
    if (!p) return;

    const cleaned = nextHref.trim();
    updateProject(id, {
      github: cleaned ? { href: cleaned } : undefined,
    });
  }

  // ✅ validation: header FR/EN + items enabled complets
  const headerOk =
    !!value.kicker.fr.trim() &&
    !!value.kicker.en.trim() &&
    !!value.title.fr.trim() &&
    !!value.title.en.trim() &&
    !!value.subtitle.fr.trim() &&
    !!value.subtitle.en.trim();

  const itemsOk = value.items.every((p) => {
    if (!p.enabled) return true;

    const baseOk =
      !!p.title.fr.trim() &&
      !!p.title.en.trim() &&
      !!p.description.fr.trim() &&
      !!p.description.en.trim() &&
      !!p.image.src.trim() &&
      !!p.image.alt.fr.trim() &&
      !!p.image.alt.en.trim() &&
      !!p.link.href.trim() &&
      !!p.link.label.fr.trim() &&
      !!p.link.label.en.trim();

    return baseOk;
  });

  const isValid = headerOk && itemsOk;

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <div>
          <h2 className={styles.editorTitle}>Projets</h2>
          <p className={styles.hint}>
            FR + EN obligatoires (projets activés uniquement). Ajout / suppression / ordre.
          </p>
        </div>

        <button
          type="button"
          className={styles.saveButton}
          onClick={() => void onSave()}
          disabled={!isValid || isSaving}
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </header>

      {!isSaving && !isValid && (
        <p className={styles.errorText}>
          Il manque des champs (FR/EN + projets activés + image + lien).
        </p>
      )}

      {/* Intro */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Intro</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
            <Field
              label="Kicker (FR)"
              value={value.kicker.fr}
              onChange={(v) => updateLocalized("kicker", "fr", v)}
            />
            <Field
              label="Kicker (EN)"
              value={value.kicker.en}
              onChange={(v) => updateLocalized("kicker", "en", v)}
            />
          </div>

          <div className={styles.grid2}>
            <Field
              label="Titre (FR)"
              value={value.title.fr}
              onChange={(v) => updateLocalized("title", "fr", v)}
            />
            <Field
              label="Title (EN)"
              value={value.title.en}
              onChange={(v) => updateLocalized("title", "en", v)}
            />
          </div>

          <div className={styles.grid2}>
            <TextAreaField
              label="Sous-titre (FR)"
              value={value.subtitle.fr}
              rows={3}
              onChange={(v) => updateLocalized("subtitle", "fr", v)}
            />
            <TextAreaField
              label="Subtitle (EN)"
              value={value.subtitle.en}
              rows={3}
              onChange={(v) => updateLocalized("subtitle", "en", v)}
            />
          </div>

          <p className={styles.smallHint}>
            Astuce : tu peux garder tes 2 lignes avec un retour à la ligne (\\n).
          </p>
        </div>
      </section>

      {/* Items */}
      <section className={styles.block}>
        <div className={styles.listHeader}>
          <h3 className={styles.blockTitle}>Liste des projets</h3>

          <button type="button" className={styles.secondaryButton} onClick={addProject}>
            + Ajouter un projet
          </button>
        </div>

        <div className={styles.itemsEditor}>
          {value.items.map((p, idx) => {
            const titleLabel =
              (p.title.fr || p.title.en || `Projet ${idx + 1}`).trim();

            return (
              <div key={p.id} className={styles.itemEditor}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemTitleWrap}>
                    <p className={styles.itemTitle}>{titleLabel}</p>
                    <p className={styles.itemMeta}>ID: {p.id}</p>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => moveProject(idx, -1)}
                      disabled={idx === 0}
                      aria-label={`Monter le projet ${idx + 1}`}
                      title="Monter"
                    >
                      ▲
                    </button>

                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => moveProject(idx, +1)}
                      disabled={idx === value.items.length - 1}
                      aria-label={`Descendre le projet ${idx + 1}`}
                      title="Descendre"
                    >
                      ▼
                    </button>

                    <label className={styles.switch} title="Activer/désactiver">
                      <span className={styles.switchLabel}>Activé</span>
                      <input
                        type="checkbox"
                        checked={p.enabled}
                        onChange={(e) => updateProject(p.id, { enabled: e.target.checked })}
                      />
                    </label>

                    <button
                      type="button"
                      className={styles.dangerButton}
                      onClick={() => removeProject(p.id)}
                      aria-label={`Supprimer le projet ${idx + 1}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                {p.enabled && (
                  <div className={styles.fieldGrid}>
                    <div className={styles.grid2}>
                      <Field
                        label="Titre (FR)"
                        value={p.title.fr}
                        onChange={(v) => updateProjectLocalized(p.id, "title", "fr", v)}
                      />
                      <Field
                        label="Title (EN)"
                        value={p.title.en}
                        onChange={(v) => updateProjectLocalized(p.id, "title", "en", v)}
                      />
                    </div>

                    <div className={styles.grid2}>
                      <Field
                        label="Sous-titre / description (FR)"
                        value={p.description.fr}
                        onChange={(v) => updateProjectLocalized(p.id, "description", "fr", v)}
                      />
                      <Field
                        label="Subtitle / description (EN)"
                        value={p.description.en}
                        onChange={(v) => updateProjectLocalized(p.id, "description", "en", v)}
                      />
                    </div>

                    <div className={styles.fieldGrid}>
                      <Field
                        label="Image URL (src)"
                        value={p.image.src}
                        onChange={(v) => updateImageSrc(p.id, v)}
                      />

                      <div className={styles.imagePreview}>
                        <div className={styles.imagePreviewInner}>
                          {p.image.src.trim() ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              className={styles.imagePreviewImg}
                              src={p.image.src}
                              alt=""
                            />
                          ) : (
                            <span className={styles.imageEmpty}>Aucune image</span>
                          )}
                        </div>
                      </div>

                      <div className={styles.grid2}>
                        <Field
                          label="Alt image (FR)"
                          value={p.image.alt.fr}
                          onChange={(v) => updateImageAlt(p.id, "fr", v)}
                        />
                        <Field
                          label="Alt image (EN)"
                          value={p.image.alt.en}
                          onChange={(v) => updateImageAlt(p.id, "en", v)}
                        />
                      </div>
                    </div>

                    <div className={styles.fieldGrid}>
                      <div className={styles.grid2}>
                        <Field
                          label="Lien projet (href)"
                          value={p.link.href}
                          onChange={(v) => updateLinkHref(p.id, v)}
                        />

                        <label className={styles.switch}>
                          <span className={styles.switchLabel}>Ouvrir dans un nouvel onglet</span>
                          <input
                            type="checkbox"
                            checked={p.link.newTab}
                            onChange={(e) => updateLinkNewTab(p.id, e.target.checked)}
                          />
                        </label>
                      </div>

                      <div className={styles.grid2}>
                        <Field
                          label="Label bouton (FR)"
                          value={p.link.label.fr}
                          onChange={(v) => updateLinkLabel(p.id, "fr", v)}
                        />
                        <Field
                          label="Button label (EN)"
                          value={p.link.label.en}
                          onChange={(v) => updateLinkLabel(p.id, "en", v)}
                        />
                      </div>
                    </div>

                    <div className={styles.grid2}>
                      <Field
                        label="Tags (FR) — séparés par des virgules"
                        value={p.tags.fr.join(", ")}
                        onChange={(v) => updateTags(p.id, "fr", v)}
                      />
                      <Field
                        label="Tags (EN) — comma separated"
                        value={p.tags.en.join(", ")}
                        onChange={(v) => updateTags(p.id, "en", v)}
                      />
                    </div>

                    <div className={styles.fieldGrid}>
                      <Field
                        label="GitHub (optionnel)"
                        value={p.github?.href ?? ""}
                        onChange={(v) => updateGithubHref(p.id, v)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  rows?: number;
};

function TextAreaField({ label, value, onChange, rows = 4 }: TextAreaFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <textarea
        className={styles.textarea}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
