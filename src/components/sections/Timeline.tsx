import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';
import { getTimelineIcon, getTimelineIconStyle } from '../../utils/timeline-helpers';
import { TimelineItem } from '../../types';

interface TimelineProps {
  personal: {
    name: string;
    bio: string;
  };
  timeline: TimelineItem[];
  onLeadMagnetOpen: () => void;
  onCalendlyOpen: () => void;
}

export function Timeline({ personal, timeline, onLeadMagnetOpen, onCalendlyOpen }: TimelineProps) {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:items-start">

          {/* Sticky "About" Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 tracking-tight leading-tight">
              About {personal.name.split(" ")[0]}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-teal-300 font-medium mb-6 sm:mb-8 leading-snug">
              AI Systems Architect & Certified Chief AI Officer
            </p>
            <div className="prose prose-base sm:prose-lg">
              <p className="text-sm sm:text-base text-teal-100 leading-relaxed mb-6 sm:mb-8">
                {personal.bio}
              </p>
            </div>

            {/* Strategy Call CTA */}
            <div className="bg-white/5 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-lg border border-white/10 hover:bg-white/10 hover:shadow-xl transition-all duration-300 group mb-4 sm:mb-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Calendar size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white mb-2 text-base sm:text-lg leading-tight">Book a Strategy Call</h3>
                  <p className="text-teal-200 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    Let's map where AI can eliminate bottlenecks in your operations and free your team to focus on work that matters.
                  </p>
                  <button
                    onClick={onCalendlyOpen}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
                  >
                    <span className="whitespace-nowrap">Book Strategy Call</span>
                    <Calendar size={16} className="flex-shrink-0" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Strategy Guide - Slim Version */}
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-xs sm:text-sm mb-1 leading-tight">AI Readiness Checklist</h3>
                  <p className="text-teal-200 text-xs leading-snug">
                    Discover your organization's AI readiness in under 5 minutes.
                  </p>
                </div>
                <button
                  onClick={onLeadMagnetOpen}
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-teal-500/20 to-indigo-600/20 hover:from-teal-500/30 hover:to-indigo-600/30 text-teal-300 hover:text-teal-200 px-2.5 sm:px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 border border-teal-500/30 hover:border-teal-400/50 flex-shrink-0 whitespace-nowrap"
                >
                  <Download size={14} className="flex-shrink-0" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Scrolling Timeline Column */}
          <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 tracking-tight"
            >
              Career Timeline
            </motion.h3>

            <div className="relative">
              {/* The vertical line for the timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20"></div>

              {timeline.map((item, index) => {
                const Icon = getTimelineIcon(item.type);
                const iconStyle = getTimelineIconStyle(item.type);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-6 pb-12"
                  >
                    <div className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full ${iconStyle} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 pt-1 sm:pt-2 min-w-0">
                      <div className="bg-white/5 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-lg border border-white/10 hover:bg-white/10 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <span className="text-teal-600 font-bold text-base sm:text-lg">{item.year}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-teal-200 text-xs sm:text-sm capitalize">{item.type}</span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-semibold text-white mb-1.5 sm:mb-2 leading-tight">{item.title}</h4>
                        {item.company && <p className="text-teal-300 font-medium mb-2 text-sm sm:text-base">{item.company}</p>}
                        <p className="text-teal-100 leading-relaxed text-sm sm:text-base">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}