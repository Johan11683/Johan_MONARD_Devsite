'use client';

import type { ReactNode } from 'react';
import '../i18n';

type Props = {
  children: ReactNode;
};

export default function I18nProvider({ children }: Props) {

  return <>{children}</>;
}
