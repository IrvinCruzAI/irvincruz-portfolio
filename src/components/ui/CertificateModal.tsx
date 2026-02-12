import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader, Download, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
}

export function CertificateModal({ isOpen, onClose, certificateUrl }: CertificateModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const hasLoadedOnce = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);

      // Only show loading on first open
      if (!hasLoadedOnce.current) {
        setIsLoading(true);
        setHasError(false);

        // Single timeout to hide loading after 1.5 seconds
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
          hasLoadedOnce.current = true;
        }, 1500);
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      // Reset on close
      hasLoadedOnce.current = false;
      setIsLoading(true);
      setHasError(false);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-slate-700/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">
              <h2 className="text-lg font-semibold text-slate-100">
                Certified Chief AI Officer Certificate
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    try {
                      const newWindow = window.open(certificateUrl, '_blank', 'noopener,noreferrer');
                      if (!newWindow) {
                        console.error('Failed to open certificate in new tab. Please check your popup blocker settings.');
                      }
                    } catch (error) {
                      console.error('Error opening certificate:', error);
                      // Fallback: try direct navigation
                      window.location.href = certificateUrl;
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-700/50 transition-colors"
                  aria-label="Open certificate in new tab"
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-700/50 transition-colors"
                  aria-label="Close certificate modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content - PDF Viewer */}
            <div className="relative w-full h-[calc(90vh-80px)] bg-slate-950/50">
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-950/50">
                  <div className="flex flex-col items-center gap-3">
                    <Loader className="w-8 h-8 text-slate-400 animate-spin" />
                    <p className="text-slate-400 text-sm">Loading certificate...</p>
                  </div>
                </div>
              )}

              {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="flex flex-col items-center gap-4 max-w-md text-center">
                    <AlertCircle className="w-12 h-12 text-amber-400" />
                    <h3 className="text-lg font-semibold text-slate-200">
                      Unable to Display Certificate
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Your browser may not support embedded PDF viewing. Please use one of the options below to view the certificate.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <Button
                        variant="primary"
                        onClick={() => window.open(certificateUrl, '_blank')}
                      >
                        <ExternalLink size={16} />
                        Open in New Tab
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = certificateUrl;
                          link.download = 'CAIO-Certificate_IrvinCruz-Rodriguez.pdf';
                          link.click();
                        }}
                      >
                        <Download size={16} />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src={certificateUrl}
                  className="w-full h-full border-0"
                  title="Certified Chief AI Officer Certificate"
                  loading="eager"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
