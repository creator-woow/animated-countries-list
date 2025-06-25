'use client';

import dynamic from 'next/dynamic';

export const ModalContainer = dynamic(() => import('./modal'), {
  ssr: false,
});
