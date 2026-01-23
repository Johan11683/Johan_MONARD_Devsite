"use client";

import { useMemo, useState } from "react";
import styles from "./projects.module.scss";
import type { LocaleKey, ProjectsContent, ProjectItem } from "./projects.types";

type ProjectsEditorProps = {
  value: ProjectsContent;
  onChange: (next: ProjectsContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
};

function uid() {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function isUrlOrPathLike(v: string) {
  const s = v.trim();
  if (!s) return false;
  return s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://");
}

function makeEmptyProject(): ProjectItem {
  return {
    id: uid(),
    enabled: false,
    title: { fr: "", en: "" },
    description: { fr: "", en: "" },
    image: { src: "", alt: { fr: "", en: "" } }, // publicId optionnel
    link: { href: "", label: { fr: "", en: "" }, newTab: true },
    tags: { fr: [], en: [] },
    github: undefined,
  };
}

async function deleteCloudinaryImage(publicId?: string) {
  const pid = publicId?.trim();
  if (!pid) return;

  try {
    const res = await fetch(
      `/api/admin/uploads?publicId=${encodeURIComponent(pid)}`,
      { method: "DELETE" }
    );

    // best effort
    if (!res.ok) console.error("DELETE upload failed:", res.status, await res.text());
  } catch (e) {
    console.error("DELETE upload error:", e);
  }
}

function swap<T>(arr: T[], i: number, j: number) {
  if (i === j) return arr;
  const next = arr.slice();
  const tmp = next[i];
  next[i] = next[j];
  next[j] = tmp;
  return next;
}

export default function ProjectsEditor({
  value,
  onChange,
  onSave,
  isSaving,
}: ProjectsEditorProps) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>("");

  function update(next: ProjectsContent) {
    onChange(next);
  }

  function updateLocalized(
    key: "kicker" | "title" | "subtitle",
    locale: LocaleKey,
    nextText: string
  ) {
    update({ ...value, [key]: { ...value[key], [locale]: nextText } });
  }

  function updateItem(id: string, patch: Partial<ProjectItem>) {
    update({
      ...value,
      items: value.items.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function updateItemLocalized(
    id: string,
    field: "title" | "description",
    locale: LocaleKey,
    nextText: string
  ) {
    update({
      ...value,
      items: value.items.map((p) =>
        p.id === id ? { ...p, [field]: { ...p[field], [locale]: nextText } } : p
      ),
    });
  }

  function updateItemAlt(id: string, locale: LocaleKey, nextText: string) {
    update({
      ...value,
      items: value.items.map((p) =>
        p.id === id
          ? { ...p, image: { ...p.image, alt: { ...p.image.alt, [locale]: nextText } } }
          : p
      ),
    });
  }

  function updateLinkHref(id: string, nextHref: string) {
    update({
      ...value,
      items: value.items.map((p) =>
        p.id === id ? { ...p, link: { ...p.link, href: nextHref } } : p
      ),
    });
  }

  function updateLinkLabel(id: string, locale: LocaleKey, nextText: string) {
    update({
      ...value,
      items: value.items.map((p) =>
        p.id === id ? { ...p, link: { ...p.link, label: { ...p.link.label, [locale]: nextText } } } : p
      ),
    });
  }

  function updateLinkNewTab(id: string, next: boolean) {
    update({
      ...value,
      items: value.items.map((p) =>
        p.id === id ? { ...p, link: { ...p.link, newTab: next } } : p
      ),
    });
  }

  function addProject() {
    update({ ...value, items: [...value.items, makeEmptyProject()] });
  }

  async function removeProject(id: string) {
    const item = value.items.find((p) => p.id === id);
    await deleteCloudinaryImage(item?.image?.publicId);

    update({ ...value, items: value.items.filter((p) => p.id !== id) });
  }

  function moveProject(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= value.items.length) return;

    update({
      ...value,
      items: swap(value.items, index, nextIndex),
    });
  }

  async function handleUpload(id: string, file: File) {
    setUploadError("");
    setUploadingId(id);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("projectId", id);

      const res = await fetch("/api/admin/uploads", { method: "POST", body: fd });

      const data = (await res.json()) as { url?: string; publicId?: string; error?: string };

      if (!res.ok || !data.url || !data.publicId) {
        setUploadError(data.error || "Upload impossible");
        return;
      }

      const url: string = data.url;
      const publicId: string = data.publicId;

      update({
        ...value,
        items: value.items.map((p) =>
          p.id === id
            ? { ...p, image: { ...p.image, src: url, publicId } }
            : p
        ),
      });
    } catch (e) {
      console.error("Upload error:", e);
      setUploadError("Erreur upload (réseau ou serveur)");
    } finally {
      setUploadingId(null);
    }
  }

  // ✅ validation minimale
  const introOk =
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
      !!p.description.en.trim();

    const altOk = !!p.image.alt.fr.trim() && !!p.image.alt.en.trim();
    const srcOk = !!p.image.src.trim();

    const hrefOk = isUrlOrPathLike(p.link.href);
    const labelOk = !!p.link.label.fr.trim() && !!p.link.label.en.trim();

    return baseOk && altOk && srcOk && hrefOk && labelOk;
  });

  const isValid = introOk && itemsOk;

  const enabledCount = useMemo(
    () => value.items.filter((x) => x.enabled).length,
    [value.items]
  );

  return (
    <div className={styles.editor}>
      <header className={styles.editorHeader}>
        <div>
          <h2 className={styles.editorTitle}>Projets</h2>
          <p className={styles.hint}>
            FR + EN obligatoires. Sur un projet activé : image + lien requis.
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

      {!!uploadError && <p className={styles.errorText}>{uploadError}</p>}

      {/* Intro */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Intro</h3>

        <div className={styles.fieldGrid}>
          <div className={styles.grid2}>
            <Field label="Kicker (FR)" value={value.kicker.fr} onChange={(v) => updateLocalized("kicker", "fr", v)} />
            <Field label="Kicker (EN)" value={value.kicker.en} onChange={(v) => updateLocalized("kicker", "en", v)} />
          </div>

          <div className={styles.grid2}>
            <Field label="Titre (FR)" value={value.title.fr} onChange={(v) => updateLocalized("title", "fr", v)} />
            <Field label="Title (EN)" value={value.title.en} onChange={(v) => updateLocalized("title", "en", v)} />
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
        </div>
      </section>

      {/* Items */}
      <section className={styles.block}>
        <div className={styles.listHeader}>
          <h3 className={styles.blockTitle}>Liste des projets</h3>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={addProject}
            disabled={isSaving}
          >
            + Ajouter un projet
          </button>
        </div>

        <p className={styles.smallHint}>
          Projets activés : {enabledCount} / {value.items.length}
        </p>

        <div className={styles.itemsEditor}>
          {value.items.map((p, index) => {
            const isUploading = uploadingId === p.id;

            const canEnable =
              !!p.title.fr.trim() &&
              !!p.title.en.trim() &&
              !!p.description.fr.trim() &&
              !!p.description.en.trim() &&
              !!p.image.src.trim() &&
              !!p.image.alt.fr.trim() &&
              !!p.image.alt.en.trim() &&
              isUrlOrPathLike(p.link.href) &&
              !!p.link.label.fr.trim() &&
              !!p.link.label.en.trim();

            const isFirst = index === 0;
            const isLast = index === value.items.length - 1;

            return (
              <div key={p.id} className={styles.itemEditor}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemTitleWrap}>
                    <p className={styles.itemTitle}>
                      Projet {index + 1} — {p.id}
                    </p>
                    <p className={styles.itemMeta}>
                      Upload image via Cloudinary{p.image.publicId ? ` • ${p.image.publicId}` : ""}
                    </p>
                  </div>

                  <div className={styles.itemActions}>
                    {/* Reorder */}
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => moveProject(index, -1)}
                      disabled={isSaving || isUploading || isFirst}
                      title="Monter"
                      aria-label="Monter"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={() => moveProject(index, 1)}
                      disabled={isSaving || isUploading || isLast}
                      title="Descendre"
                      aria-label="Descendre"
                    >
                      ↓
                    </button>

                    {/* Enable */}
                    <label className={styles.switch}>
                      <span className={styles.switchLabel}>Activé</span>
                      <input
                        type="checkbox"
                        checked={p.enabled}
                        onChange={(e) => {
                          const next = e.target.checked;
                          if (next && !canEnable) {
                            setUploadError(
                              "Impossible d’activer : il manque des champs (dont un lien valide)."
                            );
                            return;
                          }
                          updateItem(p.id, { enabled: next });
                        }}
                      />
                    </label>

                    {/* Delete */}
                    <button
                      type="button"
                      className={styles.dangerButton}
                      onClick={() => void removeProject(p.id)}
                      disabled={isSaving || isUploading}
                      title="Supprime le projet (et l’image Cloudinary si possible)"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                {p.enabled && !canEnable && (
                  <p className={styles.errorText}>
                    Ce projet est activé mais incomplet : lien requis (commence par / ou https://).
                  </p>
                )}

                <div className={styles.fieldGrid}>
                  <div className={styles.grid2}>
                    <Field label="Titre (FR)" value={p.title.fr} onChange={(v) => updateItemLocalized(p.id, "title", "fr", v)} />
                    <Field label="Title (EN)" value={p.title.en} onChange={(v) => updateItemLocalized(p.id, "title", "en", v)} />
                  </div>

                  <div className={styles.grid2}>
                    <TextAreaField label="Description (FR)" value={p.description.fr} rows={2} onChange={(v) => updateItemLocalized(p.id, "description", "fr", v)} />
                    <TextAreaField label="Description (EN)" value={p.description.en} rows={2} onChange={(v) => updateItemLocalized(p.id, "description", "en", v)} />
                  </div>

                  <div className={styles.grid2}>
                    <Field label="Image alt (FR)" value={p.image.alt.fr} onChange={(v) => updateItemAlt(p.id, "fr", v)} />
                    <Field label="Image alt (EN)" value={p.image.alt.en} onChange={(v) => updateItemAlt(p.id, "en", v)} />
                  </div>

                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Image (upload)</span>
                      <input
                        className={styles.input}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={isUploading || isSaving}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          void handleUpload(p.id, file);
                          e.currentTarget.value = "";
                        }}
                      />
                    </label>

                    <Field
                      label="Image URL (src)"
                      value={p.image.src}
                      onChange={(v) =>
                        update({
                          ...value,
                          items: value.items.map((x) =>
                            x.id === p.id
                              ? { ...x, image: { ...x.image, src: v, publicId: x.image.publicId } }
                              : x
                          ),
                        })
                      }
                    />

                    {!!p.image.src.trim() && (
                      <div className={styles.imagePreview}>
                        <div className={styles.imagePreviewInner}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className={styles.imagePreviewImg} src={p.image.src} alt="" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.fieldGrid}>
                    <Field
                      label="Lien (href) — commence par https:// ou /"
                      value={p.link.href}
                      onChange={(v) => updateLinkHref(p.id, v)}
                    />

                    <div className={styles.grid2}>
                      <Field label="Label lien (FR)" value={p.link.label.fr} onChange={(v) => updateLinkLabel(p.id, "fr", v)} />
                      <Field label="Label lien (EN)" value={p.link.label.en} onChange={(v) => updateLinkLabel(p.id, "en", v)} />
                    </div>

                    <label className={styles.switch}>
                      <span className={styles.switchLabel}>Ouvrir dans un nouvel onglet</span>
                      <input type="checkbox" checked={!!p.link.newTab} onChange={(e) => updateLinkNewTab(p.id, e.target.checked)} />
                    </label>
                  </div>
                </div>
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

function TextAreaField({ label, value, onChange, rows = 3 }: TextAreaFieldProps) {
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
