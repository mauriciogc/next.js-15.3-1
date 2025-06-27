//src/components/modal.tsx
'use client';

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('noscroll');
    return () => {
      document.body.classList.remove('noscroll');
    };
  }, []);

  const onDismiss = () => {
    router.back();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onDismiss();
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-(--color-overlay) flex items-center justify-center px-16 py-8 overflow-auto"
    >
      <button
        onClick={onDismiss}
        aria-label="Cerrar"
        className="fixed top-4 right-4 z-50 text-white hover:text-(--color-primary) transition cursor-pointer"
      >
        <X size={28} />
      </button>

      <div className="relative bg-(--color-background) text-(--color-foreground) min-w-sm max-h-full max-w-5xl min-h-1/2   h-auto rounded shadow-xl overflow-y-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}
