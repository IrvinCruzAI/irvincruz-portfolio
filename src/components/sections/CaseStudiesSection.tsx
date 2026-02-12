import { motion } from 'framer-motion';
import { Award, TrendingUp } from 'lucide-react';
import { CaseStudy } from '../../types';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  onCaseStudyClick: (caseStudy: CaseStudy) => void;
}

export function CaseStudiesSection({ caseStudies, onCaseStudyClick }: CaseStudiesSectionProps) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-gray-900 to-slate-800" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(43,47,138,0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,179,166,0.15)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-4 sm:mb-6">
            <Award className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-indigo-300 font-medium">Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-indigo-100 to-teal-200 bg-clip-text text-transparent tracking-tight leading-tight">
            Proven Results
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real-world impact from AI systems and automation workflows deployed for leading organizations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onCaseStudyClick(study)}
              className="group cursor-pointer"
            >
              <div className="h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/30 hover:shadow-2xl">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-1 leading-tight">
                      {study.title}
                    </h3>
                    <p className="text-indigo-300 font-medium text-xs sm:text-sm">
                      {study.company}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4 line-clamp-2 text-sm sm:text-base">
                  {study.description}
                </p>

                {study.outcomes && study.outcomes.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Key Results:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {study.outcomes.slice(0, 4).map((outcome, outcomeIndex) => (
                        <div
                          key={outcomeIndex}
                          className="px-3 py-2 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-lg border border-white/10"
                        >
                          <p className="text-xs text-teal-300 font-semibold line-clamp-1">
                            {outcome}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {study.technologies && study.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {study.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{study.technologies.length - 3} more
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
