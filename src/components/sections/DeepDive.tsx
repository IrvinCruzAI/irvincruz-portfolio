import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Business } from '../../types';

interface DeepDiveProps {
  businesses: Business[];
}

const features = {
  'Reinventing.AI Accelerator': [
    'Strategic AI Implementation Roadmaps',
    'Fortune 500 Partnership Network',
    'ROI-Focused Transformation Programs',
    'Executive AI Leadership Training'
  ],
  'SmartGPT Prompt Enhancement': [
    'Advanced Prompt Engineering Templates',
    'Quality Consistency Algorithms',
    'Multi-Model Optimization',
    'Performance Analytics Dashboard'
  ],
  'Dydas AI Agent for Marketing': [
    'Autonomous Campaign Creation',
    'Real-time Performance Optimization',
    'Cross-channel Integration',
    'Predictive Budget Allocation'
  ],
  'AI Feedback Simulation': [
    'Pre-launch Market Testing',
    'Customer Response Modeling',
    'Risk Assessment Analytics',
    'Competitive Analysis Simulation'
  ]
};

const stats = {
  'Reinventing.AI Accelerator': [
    { label: 'Companies Transformed', value: '50+' },
    { label: 'Average ROI Increase', value: '340%' },
    { label: 'Implementation Success Rate', value: '94%' }
  ],
  'SmartGPT Prompt Enhancement': [
    { label: 'Active Users', value: '10K+' },
    { label: 'Quality Improvement', value: '85%' },
    { label: 'Time Saved', value: '60%' }
  ],
  'Dydas AI Agent for Marketing': [
    { label: 'Marketing Campaigns', value: '5K+' },
    { label: 'Performance Lift', value: '245%' },
    { label: 'Cost Reduction', value: '40%' }
  ],
  'AI Feedback Simulation': [
    { label: 'Products Tested', value: '200+' },
    { label: 'Accuracy Rate', value: '92%' },
    { label: 'Launch Success Rate', value: '89%' }
  ]
};

export function DeepDive({ businesses }: DeepDiveProps) {
  return (
    <section className="relative">
      {businesses.map((business, index) => (
        <div
          key={business.name}
          id={business.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          className={`py-24 relative overflow-hidden ${
            index % 2 === 0 
              ? 'bg-gray-900' 
              : 'bg-slate-800'
          }`}
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl font-bold mb-4 text-white">
                      {business.name}
                    </h3>
                    <p className="text-xl leading-relaxed text-blue-100">
                      {business.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {features[business.name as keyof typeof features]?.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle 
                          size={20} 
                          className="text-cyan-400" 
                        />
                        <span className="text-blue-200">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      href={business.ctaUrl}
                      variant="secondary"
                      className="border-2 border-white/30 hover:border-cyan-400/50 hover:bg-white/10 font-semibold backdrop-blur-sm"
                    >
                      {business.cta}
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {stats[business.name as keyof typeof stats]?.map((stat, statIndex) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: statIndex * 0.1 + 0.3 }}
                      className="p-6 rounded-2xl border bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white/10">
                          {statIndex === 0 && <Users size={24} className="text-cyan-400" />}
                          {statIndex === 1 && <TrendingUp size={24} className="text-cyan-400" />}
                          {statIndex === 2 && <Zap size={24} className="text-cyan-400" />}
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white">
                            {stat.value}
                          </div>
                          <div className="text-sm font-medium text-blue-200">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}