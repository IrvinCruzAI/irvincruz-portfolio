import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import { Button } from './Button';
import { NewsGenLogo } from './NewsGenLogo';
import { WebsiteProspectorLogo } from './WebsiteProspectorLogo';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
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
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  const statusColors = {
    'Live': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Beta': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'In Development': 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  };

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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                {(project.name.toLowerCase().includes('newsgen') || project.image?.includes('1b71531c-b168-4117-a091-b80fb99bef4c')) ? (
                  <div className="w-12 h-12">
                    <NewsGenLogo className="w-full h-full" />
                  </div>
                ) : (project.name.toLowerCase().includes('prospector') || project.image?.includes('c2d40bcf-f061-4907-9149-d33abe655dc7')) ? (
                  <div className="w-12 h-12">
                    <WebsiteProspectorLogo className="w-full h-full" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                    {project.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-1 ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {project.image && (
              <div className="px-6 pt-6">
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
                  <img
                    src={project.image}
                    alt={`${project.name} preview`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {project.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-teal-500/20 rounded-full text-sm text-teal-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {project.hostedUrl && (
                  <Button
                    variant="primary"
                    onClick={() => window.open(project.hostedUrl, '_blank', 'noopener,noreferrer')}
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Visit Live Site
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                    className="flex items-center justify-center gap-2"
                  >
                    <Github size={18} />
                    View Code
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
