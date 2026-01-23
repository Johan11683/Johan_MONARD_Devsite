// src/app/admin/login/LoginClient.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./admin-login.module.scss";

export default function LoginClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        if (res.status === 401) setError("Mot de passe incorrect.");
        else {
          const text = await res.text();
          console.error("Login failed:", res.status, text);
          setError("Erreur serveur.");
        }
        return;
      }

      window.location.href = next;
    } catch (err) {
      console.error("Login network error:", err);
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Connexion admin</h1>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="admin-password">
            Mot de passe
          </label>

          <input
            id="admin-password"
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoFocus
          />

          <button className={styles.button} type="submit" disabled={loading || !password.trim()}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </section>
    </main>
  );
}
