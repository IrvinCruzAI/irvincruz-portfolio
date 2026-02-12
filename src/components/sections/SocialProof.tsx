import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getFaviconUrl } from '../../utils/favicon';
import { SocialProof as SocialProofType } from '../../types';

interface SocialProofProps {
  socialProof: SocialProofType[];
}

export function SocialProof({ socialProof }: SocialProofProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  const duplicatedProof = [...socialProof, ...socialProof];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-teal-100 to-indigo-200 bg-clip-text text-transparent">
            Technologies & Tools
          </span>
        </h2>
        <p className="text-lg text-teal-100 max-w-2xl mx-auto">
          Leveraging cutting-edge AI and automation platforms to build production-ready workflows that scale
        </p>
      </motion.div>

      <div className="relative z-10 w-full">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-hidden py-12 px-6 w-full"
        >
          {duplicatedProof.map((proof, index) => (
            <motion.div
              key={`${proof.name}-${index}`}
              className="flex-shrink-0 group relative min-w-[280px] mx-2"
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-36 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl">
                <div className="text-center flex items-center gap-4">
                  <img
                    src={getFaviconUrl(`https://${proof.name.toLowerCase().replace(' ', '')}.com`)}
                    alt={proof.name}
                    className="w-12 h-12 rounded-lg object-contain bg-white p-2 shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = proof.logo;
                    }}
                  />
                  <div className="text-left">
                    <h3 className="text-white font-bold text-xl group-hover:text-teal-300 transition-colors duration-300">
                      {proof.name}
                    </h3>
                    {proof.description && (
                      <p className="text-teal-200 text-sm mt-2 leading-tight">
                        {proof.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}