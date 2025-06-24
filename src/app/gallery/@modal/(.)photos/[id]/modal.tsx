'use client';

import { X } from 'lucide-react';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('noscroll');

    return () => {
      document.body.classList.remove('noscroll');
    };
  }, []);

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onDismiss();
    }
  };

  const onDismiss = () => {
    router.back();
  };

  return createPortal(
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      role="dialog"
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center pt-16 px-4 overflow-auto"
      aria-modal="true"
    >
      <button
        onClick={onDismiss}
        aria-label="Cerrar"
        className="fixed top-4 right-4 z-50 text-white cursor-pointer"
      >
        <X size={28} />
      </button>
      <div className="relative bg-white min-w-sm max-w-4xl min-h-1/2 h-auto  rounded  shadow-xl overflow-y-auto">
        <div className="p-6">
          {children}
          <p className="text-gray-700">Lorem</p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}
