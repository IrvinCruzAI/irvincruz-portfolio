import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Zap } from 'lucide-react';

const proofPoints = [
  {
    icon: DollarSign,
    metric: '$2.1M',
    label: 'Revenue Influenced',
    company: 'Michaelis Events',
    description: 'Lead conversion workflows'
  },
  {
    icon: Zap,
    metric: '40%',
    label: 'Manual Work Eliminated',
    company: 'FutureCrafters',
    description: 'Document automation system'
  },
  {
    icon: TrendingUp,
    metric: '8x',
    label: 'Online Sales Growth',
    company: 'Disney',
    description: 'E-commerce operations'
  }
];

export function ProofSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,179,166,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(43,47,138,0.1)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-teal-100 to-indigo-200 bg-clip-text text-transparent">
              Real Impact From Thoughtful Systems
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
            AI Built for teams. Results Measured in outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 to-indigo-500/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 h-full flex flex-col transition-all duration-300 group-hover:bg-white/10 group-hover:border-teal-400/40">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                    </div>

                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent mb-2">
                      {point.metric}
                    </div>

                    <div className="text-lg sm:text-xl font-semibold text-white mb-1 leading-tight">
                      {point.label}
                    </div>
                  </div>

                  <div className="mt-auto space-y-1.5 sm:space-y-2">
                    <div className="text-sm font-medium text-teal-300">
                      {point.company}
                    </div>
                    <div className="text-sm text-gray-300 leading-relaxed">
                      {point.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
