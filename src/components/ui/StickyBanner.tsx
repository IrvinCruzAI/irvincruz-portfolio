import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Download, ArrowRight } from 'lucide-react';

interface StickyBannerProps {
  onOpenLeadMagnet: () => void;
}

export function StickyBanner({ onOpenLeadMagnet }: StickyBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white shadow-2xl border-b border-white/10"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse-slow" />
        </div>
        
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Left side - Icon and text */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 sm:flex-initial min-w-0">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-white/20 p-1.5 sm:p-2 rounded-lg sm:rounded-xl backdrop-blur-sm flex-shrink-0"
              >
                <Download size={16} className="sm:w-5 sm:h-5 text-white" />
              </motion.div>
              
              <div className="hidden sm:flex sm:flex-col gap-0.5 sm:gap-1 min-w-0">
                <span className="font-bold text-sm sm:text-base">
                  AI Readiness Checklist
                </span>
                <span className="text-xs text-teal-100 font-medium">
                  Find where AI can help in under 5 minutes
                </span>
              </div>
            </div>

            {/* Right side - CTA and close */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial">
              <motion.button
                onClick={onOpenLeadMagnet}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-teal-500/90 to-indigo-600/90 backdrop-blur-sm border border-teal-400/30 text-white px-3 py-2 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:from-teal-600/95 hover:to-indigo-700/95 hover:border-teal-300/50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap flex-1 sm:flex-initial"
              >
                <span className="sm:hidden">AI Readiness Checklist</span>
                <span className="hidden sm:inline">Get Free Access</span>
                <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <X size={16} className="sm:w-4.5 sm:h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}