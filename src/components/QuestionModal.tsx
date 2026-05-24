import React, { useEffect } from 'react';

interface QuestionModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnBackdrop = true,
}) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => closeOnBackdrop && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(15, 61, 46, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 12,
          width: '100%',
          maxWidth: 640,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid var(--tl-card-border)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
        }}
      >
        {title && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderBottom: '2px solid var(--tl-card-border)',
              background: 'var(--tl-card-bg)',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--tl-title)',
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Fechar"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--tl-title)',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '0 0.25rem',
                fontFamily: 'inherit',
              }}
            >
              ×
            </button>
          </div>
        )}
        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid var(--tl-card-border)',
              background: 'var(--tl-bg-soft)',
              borderRadius: '0 0 12px 12px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;
