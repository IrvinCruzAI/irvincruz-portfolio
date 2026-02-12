import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, Download, Sparkles, CheckCircle, Code } from 'lucide-react';
import { Button } from '../ui/Button';
import { CertificateModal } from '../ui/CertificateModal';
import { getFaviconUrl } from '../../utils/favicon';
import { Business, Project } from '../../types';

interface HeroProps {
  personal: {
    name: string;
    tagline: string;
    photo: string;
  };
  businesses: Business[];
  projects: Project[];
  onLeadMagnetOpen: () => void;
  onCalendlyOpen: () => void;
  onProjectClick: (project: Project) => void;
}

export function Hero({ personal, businesses, projects, onLeadMagnetOpen, onCalendlyOpen, onProjectClick }: HeroProps) {
  const [projectIndex, setProjectIndex] = useState(0);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const projectInterval = setInterval(() => {
        setProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 5000);

      return () => clearInterval(projectInterval);
    }
  }, [projects]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(43,47,138,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,179,166,0.2)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,179,166,0.2)_0%,transparent_70%)]" />
      </div>

      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse-slow" />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-teal-400/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 3, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute bottom-32 right-32 w-40 h-40 bg-gradient-to-r from-teal-400/20 to-indigo-400/20 rounded-full blur-2xl"
      />

      <div className="container mx-auto px-6 relative z-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Main heading with gradient text */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight mb-4 sm:mb-5 md:mb-6 whitespace-nowrap"
              >
                <span className="bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(20,184,166,0.15)]">
                  {personal.name}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-snug sm:leading-tight mb-6 sm:mb-8 md:mb-10 max-w-4xl"
              >
                <span className="bg-gradient-to-r from-teal-300 via-white to-indigo-200 bg-clip-text text-transparent">
                  I design human-centered intelligent systems that eliminate busywork and scale operations.
                </span>
              </motion.p>
            </div>

            {/* Projects Carousel */}
            {projects && projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-teal-400" />
                    <span className="text-sm sm:text-base text-teal-200 font-medium">Current Projects:</span>
                  </div>
                </div>

                <div className="relative min-h-[160px] sm:min-h-[140px] md:min-h-[120px]">
                  <div className="relative overflow-hidden">
                    <motion.div
                      key={`project-${projectIndex}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="w-full group cursor-pointer"
                      onClick={() => onProjectClick(projects[projectIndex])}
                    >
                      <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-5 transition-all duration-300 group-hover:bg-white/10 group-hover:border-teal-500/30 group-hover:shadow-2xl">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="relative flex-shrink-0">
                            <div className="absolute -inset-3 bg-gradient-to-r from-teal-400/30 to-indigo-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                              {projects[projectIndex].name.charAt(0)}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-white font-bold text-base sm:text-lg group-hover:text-teal-300 transition-colors duration-300 leading-tight">
                                {projects[projectIndex].name}
                              </h3>
                              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 text-xs rounded-full border border-teal-500/30 flex-shrink-0 whitespace-nowrap">
                                {projects[projectIndex].status}
                              </span>
                            </div>
                            <p className="text-teal-200 leading-relaxed text-xs sm:text-sm line-clamp-3">
                              {projects[projectIndex].description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Simplified CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3 mt-6 sm:mt-8"
            >
              <button
                onClick={onLeadMagnetOpen}
                className="group bg-gradient-to-r from-teal-500/90 to-indigo-600/90 backdrop-blur-sm border border-teal-400/30 text-white px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:from-teal-600/95 hover:to-indigo-700/95 hover:border-teal-300/50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Download size={16} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Get the AI Readiness Checklist</span>
              </button>
              <button
                onClick={() => document.getElementById('ventures')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white/5 backdrop-blur-sm border border-white/30 text-white px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles size={16} className="flex-shrink-0" />
                <span>See the Work</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Enhanced Photo Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Multiple layered backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-indigo-600/20 rounded-3xl blur-3xl transform rotate-6" />
              <div className="absolute inset-2 bg-gradient-to-r from-indigo-400/20 to-teal-400/20 rounded-3xl blur-2xl transform -rotate-3" />
              
              {/* Main photo container */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={personal.photo}
                  alt={personal.name}
                  className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] object-cover object-[center_20%] rounded-2xl shadow-2xl"
                />

                {/* "Who is Irvin?" pill button with info icon */}
                <motion.button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="group absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800/95 hover:border-gray-600/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Info size={14} className="group-hover:rotate-12 transition-transform" />
                    <span>Who is Irvin?</span>
                  </div>
                </motion.button>
              </div>

              {/* Certified Chief AI Officer Badge - World-Class Professional Credential */}
              <motion.button
                onClick={() => setIsCertificateModalOpen(true)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="group relative mx-auto flex items-center justify-center bg-slate-800/50 backdrop-blur-md border border-slate-600/60 hover:border-slate-500/80 rounded-full px-5 py-3 transition-all duration-300 max-w-fit mt-6 shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="View Certified Chief AI Officer Certificate"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-600/0 via-slate-500/0 to-slate-600/0 group-hover:from-slate-600/10 group-hover:via-slate-500/10 group-hover:to-slate-600/10 transition-all duration-300" />

                <div className="relative flex items-center gap-3">
                  {/* Verification checkmark with better visibility */}
                  <CheckCircle size={18} className="text-emerald-400/80 group-hover:text-emerald-400 transition-colors flex-shrink-0" strokeWidth={2.5} />

                  {/* Recognizable logo */}
                  <div className="w-8 h-8 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/chiefaiofficer-logo-rgb-02.svg"
                      alt="Chief AI Officer"
                      className="w-full h-full object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Professional text */}
                  <span className="text-slate-200 group-hover:text-white font-semibold text-sm tracking-wide whitespace-nowrap transition-colors">
                    Certified Chief AI Officer
                  </span>

                  {/* Refined info icon */}
                  <Info size={14} className="text-slate-400 group-hover:text-slate-300 transition-all duration-300 group-hover:scale-110 flex-shrink-0" strokeWidth={2} />
                </div>
              </motion.button>

              {/* Certificate Modal */}
              <CertificateModal
                isOpen={isCertificateModalOpen}
                onClose={() => setIsCertificateModalOpen(false)}
                certificateUrl="/CAIO-Certificate_IrvinCruz-Rodriguez.pdf"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}