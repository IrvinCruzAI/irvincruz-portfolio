import { motion } from 'framer-motion';

export function PhilosophyBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,179,166,0.15)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug sm:leading-tight tracking-tight px-4 sm:px-0">
              <span className="bg-gradient-to-r from-teal-300 via-white to-indigo-200 bg-clip-text text-transparent">
                AI should automate the meaningless so humans can amplify the meaningful.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            That principle drives every system I build. The proof is below.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
