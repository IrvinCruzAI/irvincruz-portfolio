import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { NewsGenLogo } from '../ui/NewsGenLogo';
import { WebsiteProspectorLogo } from '../ui/WebsiteProspectorLogo';

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectsSection({ projects, onProjectClick }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) return null;

  const statusColors = {
    'Live': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Beta': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'In Development': 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-4 sm:mb-6">
            <Code className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-teal-300 font-medium">Current Projects:</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-teal-100 to-indigo-200 bg-clip-text text-transparent tracking-tight leading-tight">
            What I'm Building.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore the tools, systems, and frameworks I'm actively developing to push the boundaries of AI and automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onProjectClick(project)}
              className="group cursor-pointer"
            >
              <div className="h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:border-teal-500/30 hover:shadow-2xl">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  {(project.name.toLowerCase().includes('newsgen') || project.image?.includes('1b71531c-b168-4117-a091-b80fb99bef4c')) ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <NewsGenLogo className="w-full h-full" />
                    </div>
                  ) : (project.name.toLowerCase().includes('prospector') || project.image?.includes('c2d40bcf-f061-4907-9149-d33abe655dc7')) ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <WebsiteProspectorLogo className="w-full h-full" />
                    </div>
                  ) : project.image ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-white/5">
                      <img
                        src={project.image}
                        alt={`${project.name} logo`}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {project.name.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors leading-tight break-words">
                        {project.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3 text-sm sm:text-base">
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
