import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Sparkles } from 'lucide-react';
import { Business } from '../../types';

interface FooterProps {
  personal: {
    name: string;
    tagline: string;
    email: string;
    location: string;
  };
  businesses: Business[];
}

export function Footer({ personal, businesses }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white py-20">

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="text-teal-400" size={28} />
                  <div className="absolute inset-0 bg-teal-400 rounded-full blur-lg opacity-30" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                  {personal.name}
                </span>
              </div>
              
              <p className="text-teal-100 max-w-md text-lg leading-relaxed">
                {personal.tagline}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-teal-200 group">
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Mail size={16} />
                  </div>
                  <a href={`mailto:${personal.email}`} className="hover:text-white transition-colors font-medium">
                    {personal.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-teal-200">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin size={16} />
                  </div>
                  <span className="font-medium">{personal.location}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Ventures */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-indigo-500 rounded-full" />
                Services
              </h3>
              <div className="space-y-3">
                {businesses.map((business) => (
                  <a
                    key={business.name}
                    href={business.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-teal-200 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 group"
                  >
                    <span className="group-hover:text-teal-300 transition-colors">
                      {business.name}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-indigo-500 rounded-full" />
                Free Resources
              </h3>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h4 className="font-bold text-white mb-3 text-base">AI Readiness Checklist</h4>
                <p className="text-teal-200 text-sm mb-4 leading-relaxed">
                  Discover your organization's AI readiness in under 5 minutes with this jargon-free assessment.
                </p>
              
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email for instant access"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-teal-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
                  >
                    Download Checklist
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-teal-200 text-sm font-medium">
            © {currentYear} {personal.name}. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-teal-200 hover:text-white transition-colors font-medium hover:text-teal-300">
              Privacy Policy
            </a>
            <a href="#" className="text-teal-200 hover:text-white transition-colors font-medium hover:text-teal-300">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}