import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { PhilosophyBanner } from './components/sections/PhilosophyBanner';
import { ProofSection } from './components/sections/ProofSection';
import { VentureGrid } from './components/sections/VentureGrid';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CaseStudiesSection } from './components/sections/CaseStudiesSection';
import { SocialProof } from './components/sections/SocialProof';
import { Timeline } from './components/sections/Timeline';
import { SocialStrip } from './components/sections/SocialStrip';
import { Footer } from './components/sections/Footer';
import { LeadMagnet } from './components/sections/LeadMagnet';
import { StickyBanner } from './components/ui/StickyBanner';
import { CalendlyModal } from './components/ui/CalendlyModal';
import { ProjectModal } from './components/ui/ProjectModal';
import { CaseStudyModal } from './components/ui/CaseStudyModal';
import { updateMetaTags, generateStructuredData } from './utils/seo';
import { preloadFavicons } from './utils/favicon';
import { Config, Project, CaseStudy } from './types';
import siteConfig from './config/site-config.json';
import { Button } from './components/ui/Button';

function App() {
  const [config] = useState<Config>(siteConfig as Config);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);

  useEffect(() => {
    // Update SEO meta tags
    updateMetaTags(config);
    
    // Add structured data
    const structuredData = generateStructuredData(config);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Preload favicons for better performance
    const domains = config.businesses.map(business => business.url);
    preloadFavicons(domains);
    
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.head.removeChild(script);
    };
  }, [config]);

  const openLeadMagnet = () => setIsLeadMagnetOpen(true);
  const closeLeadMagnet = () => setIsLeadMagnetOpen(false);
  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsCaseStudyModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <Header blogUrl={config.blogUrl} onCalendlyOpen={openCalendly} />

      {/* Sticky Lead Magnet Banner */}
      <StickyBanner onOpenLeadMagnet={openLeadMagnet} />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero
          personal={config.personal}
          businesses={config.businesses}
          projects={config.projects || []}
          onLeadMagnetOpen={openLeadMagnet}
          onCalendlyOpen={openCalendly}
          onProjectClick={handleProjectClick}
        />

        <PhilosophyBanner />

        <ProofSection />

        {config.projects && config.projects.length > 0 && (
          <ProjectsSection
            projects={config.projects}
            onProjectClick={handleProjectClick}
          />
        )}

        <VentureGrid businesses={config.businesses} />

        {config.caseStudies && config.caseStudies.length > 0 && (
          <CaseStudiesSection
            caseStudies={config.caseStudies}
            onCaseStudyClick={handleCaseStudyClick}
          />
        )}

        {/* Strategy Consultation Section */}
        <section className="py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
          {/* Dynamic gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(43,47,138,0.2)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,179,166,0.2)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,179,166,0.2)_0%,transparent_70%)]" />
          </div>

          {/* Animated mesh background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse-slow" />
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-teal-400/20 to-indigo-400/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -2, 2, 0],
              scale: [1, 0.95, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-teal-400/20 rounded-full blur-2xl"
          />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-snug sm:leading-tight tracking-tight"
                >
                  <span className="bg-gradient-to-r from-white via-teal-100 to-indigo-200 bg-clip-text text-transparent">
                    Your team wastes hours on work that software should handle.
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-100 leading-relaxed max-w-4xl mx-auto"
                >
                  Every week you wait, competitors move faster. AI adoption is accelerating. The organizations that act now gain clarity, momentum, and time back.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6 sm:pt-8"
                >
                  <Button
                    onClick={openCalendly}
                    size="lg"
                    className="group bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white shadow-2xl hover:shadow-teal-500/25 font-bold border-0 relative overflow-hidden w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Calendar size={18} className="flex-shrink-0" />
                      <span className="text-center leading-snug">Book a Strategy Call with Irvin</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button
                    onClick={openLeadMagnet}
                    variant="secondary"
                    size="lg"
                    className="border-2 border-white/30 hover:border-teal-400/50 hover:bg-white/10 font-semibold backdrop-blur-sm w-full sm:w-auto"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download size={18} className="flex-shrink-0" />
                      <span>Get the AI Readiness Checklist</span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Timeline 
          personal={config.personal} 
          timeline={config.timeline} 
          onLeadMagnetOpen={openLeadMagnet}
          onCalendlyOpen={openCalendly}
        />
        
        <SocialProof socialProof={config.socialProof} />
        
        <SocialStrip socialLinks={config.socialLinks} />
        
        <Footer 
          personal={config.personal} 
          businesses={config.businesses} 
        />
      </motion.main>

      {/* Lead Magnet Modal */}
      <LeadMagnet
        leadMagnet={config.leadMagnet}
        isOpen={isLeadMagnetOpen}
        onClose={closeLeadMagnet}
      />

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={closeCalendly}
      />

      {/* Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyModalOpen}
        onClose={() => setIsCaseStudyModalOpen(false)}
        caseStudy={selectedCaseStudy}
      />
    </div>
  );
}

export default App;