import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { SocialLink } from '../../types';

interface SocialStripProps {
  socialLinks: SocialLink[];
}

const getIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'twitter': return Twitter;
    case 'linkedin': return Linkedin;
    case 'github': return Github;
    case 'instagram': return Instagram;
    case 'facebook': return Facebook;
    default: return ExternalLink;
  }
};

const getHoverColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'twitter': return 'group-hover:bg-blue-400';
    case 'linkedin': return 'group-hover:bg-blue-600';
    case 'github': return 'group-hover:bg-gray-800';
    case 'instagram': return 'group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500';
    case 'facebook': return 'group-hover:bg-blue-700';
    default: return 'group-hover:bg-gray-600';
  }
};

export function SocialStrip({ socialLinks }: SocialStripProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1)_0%,transparent_50%)]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Connect with Irvin
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Follow my entrepreneurial journey and get exclusive insights on AI innovation, business strategy, and the future of technology
          </p>
        </motion.div>

        <div className="flex justify-center gap-8 flex-wrap relative z-10">
          {socialLinks.map((social, index) => {
            const Icon = getIcon(social.platform);
            const hoverColor = getHoverColor(social.platform);

            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-300 group-hover:shadow-xl group-hover:bg-white/10">
                  <div className={`w-16 h-16 bg-white/10 ${hoverColor} rounded-2xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 shadow-md`}>
                    <Icon size={24} className="text-white transition-colors group-hover:text-white" />
                  </div>
                  
                  <div>
                    <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {social.platform}
                    </div>
                    <div className="text-sm text-blue-200">
                      {social.username}
                    </div>
                    {social.followers && (
                      <div className="text-xs text-blue-300 mt-1">
                        {social.followers} followers
                      </div>
                    )}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}