'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Contact.module.scss';

export default function Contact() {
  const { t } = useTranslation('contact');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      setStatus('loading');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Erreur serveur');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        {/* Colonne infos */}
        <div className={styles.infoColumn}>
          <p className={styles.kicker}>{t('kicker')}</p>
          <h2 id="contact-title" className={styles.title}>
            {t('title')}
          </h2>

          <p className={styles.lead}>
            {t('lead')}
          </p>

          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('labels.phone')}</span>
              <a href="tel:+33777842612" className={styles.contactLink}>
                07&nbsp;77&nbsp;84&nbsp;26&nbsp;12
              </a>
            </li>

            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('labels.email')}</span>
              <a
                href="mailto:contact.monard.johan@gmail.com"
                className={styles.contactLink}
              >
                contact.monard.johan@gmail.com
              </a>
            </li>

            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('labels.address')}</span>
              <p className={styles.contactText}>
                230 avenue d&apos;Eysines
                <br />
                33200 Bordeaux
              </p>
            </li>
          </ul>
        </div>

        {/* Colonne formulaire */}
        <div className={styles.formColumn}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName" className={styles.label}>
                {t('form.fullName')}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className={styles.input}
                autoComplete="name"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                {t('form.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={styles.input}
                autoComplete="email"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>
                {t('form.phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={styles.input}
                autoComplete="tel"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message" className={styles.label}>
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                className={`${styles.input} ${styles.textarea}`}
                rows={6}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === 'loading'}
            >
              {status === 'loading'
                ? t('button.loading')
                : t('button.idle')}
            </button>

            {status === 'success' && (
              <p className={styles.statusSuccess}>
                {t('status.success')}
              </p>
            )}
            {status === 'error' && (
              <p className={styles.statusError}>
                {t('status.errorPart1')}{' '}
                <a
                  href="mailto:contact.monard.johan@gmail.com"
                  className={styles.inlineLink}
                >
                  contact.monard.johan@gmail.com
                </a>
                {t('status.errorPart2')}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className={styles.separator} />
    </section>
  );
}
