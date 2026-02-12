import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Info, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { getFaviconUrl } from '../../utils/favicon';
import { Business } from '../../types';

interface VentureGridProps {
  businesses: Business[];
}

export function VentureGrid({ businesses }: VentureGridProps) {
  return (
    <section id="ventures" className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(43,47,138,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,179,166,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 relative z-10 px-4 sm:px-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-teal-100 to-indigo-200 bg-clip-text text-transparent">
              How We Can Work Together
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Three ways to get clarity, build systems, and scale without the chaos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 relative z-10">
          {businesses.map((business, index) => (
            <motion.div
              key={business.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 h-full flex flex-col transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl">
                {/* Logo & Title */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="relative group/icon flex-shrink-0">
                    <img
                      src={getFaviconUrl(business.url)}
                      alt={business.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-lg group-hover:scale-110 transition-all duration-300 bg-white/10 p-2 border border-white/20"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23006BFF"><rect width="24" height="24" rx="4"/></svg>`;
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300 leading-tight">
                      {business.name}
                    </h3>
                    <div className="flex items-center gap-1 text-teal-200 text-xs sm:text-sm truncate">
                      <ExternalLink size={12} className="flex-shrink-0" />
                      <span className="truncate">{new URL(business.url).hostname}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-teal-100 leading-relaxed mb-6 sm:mb-8 flex-grow">
                  {business.description}
                </p>

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      const sectionId = business.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      const element = document.getElementById(sectionId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    variant="secondary"
                    className="w-full border-2 border-white/30 hover:border-teal-400/50 hover:bg-white/10 font-semibold backdrop-blur-sm"
                  >
                    <Info size={16} className="mr-2" />
                    Learn More
                  </Button>
                  <Button
                    href={business.ctaUrl}
                    className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 border-0 font-semibold shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300"
                  >
                    <Globe size={16} className="mr-2" />
                    Visit Site
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}