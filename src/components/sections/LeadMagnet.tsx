import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, CheckCircle, Sparkles, Users, TrendingUp, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface LeadMagnetProps {
  leadMagnet: {
    title: string;
    description: string;
    cta: string;
    type: 'newsletter' | 'checklist' | 'call';
  };
  isOpen: boolean;
  onClose: () => void;
}

export function LeadMagnet({ leadMagnet, isOpen, onClose }: LeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setEmailError('');

    // Validate email before submitting
    if (!email) {
      setEmailError('Email address is required');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('lead_submissions')
        .insert({
          email: email,
          source: 'AI Readiness Checklist',
          ip_address: null,
          user_agent: navigator.userAgent
        });

      if (dbError) {
        throw new Error('Failed to save lead submission');
      }

      // Also send to Make webhook for existing automation
      try {
        await fetch('https://hook.us1.make.com/zxr0yeq7eyj5o7i2v7o29831a4euf1lq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            source: 'AI Readiness Checklist',
            timestamp: new Date().toISOString()
          })
        });
      } catch (webhookErr) {
        console.warn('Webhook notification failed, but lead was saved:', webhookErr);
      }

      setSubmitted(true);
      // Auto-close after 5 seconds to give user time to read
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail('');
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative overflow-hidden">
        {!submitted ? (
          <>
            {/* Dark gradient background matching header */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(43,47,138,0.2)_0%,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,179,166,0.2)_0%,transparent_50%)]" />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 3, -3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-4 right-8 w-16 h-16 bg-gradient-to-r from-teal-400/30 to-indigo-400/30 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                rotate: [0, -2, 2, 0],
                scale: [1, 0.95, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute bottom-4 left-8 w-12 h-12 bg-gradient-to-r from-indigo-400/30 to-teal-400/30 rounded-full blur-2xl"
            />

            <div className="relative z-10 text-center p-6">
              {/* Close button - positioned absolutely with high z-index */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 z-20 backdrop-blur-sm"
              >
                <X size={18} />
              </button>

              {/* Icon with enhanced styling */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="relative w-12 h-12 mx-auto mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-xl blur-lg opacity-50" />
                <div className="relative w-full h-full bg-gradient-to-r from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl">
                  {leadMagnet.type === 'checklist' && <Download className="text-white" size={16} />}
                  {leadMagnet.type === 'newsletter' && <Mail className="text-white" size={16} />}
                </div>
              </motion.div>

              {/* Title with gradient text */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold mb-2"
              >
                <span className="bg-gradient-to-r from-white via-teal-100 to-indigo-200 bg-clip-text text-transparent">
                  {leadMagnet.title}
                </span>
              </motion.h3>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-teal-100 mb-4 leading-relaxed text-sm"
              >
                {leadMagnet.description}
              </motion.p>

              {/* Features list - horizontal layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mb-4"
              >
                {[
                  { icon: Sparkles, text: "No jargon" },
                  { icon: TrendingUp, text: "Under 5 minutes" },
                  { icon: Users, text: "Actionable next steps" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20"
                  >
                    <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center flex-shrink-0">
                      <feature.icon size={10} className="text-teal-300" />
                    </div>
                    <span className="text-white text-xs font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onSubmit={handleSubmit} 
                className="space-y-3"
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    required
                    className={`w-full px-4 py-2 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-teal-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-sm ${
                      emailError ? 'border-red-400/50' : 'border-white/30'
                    }`}
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500/20 to-indigo-500/20 opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none" />
                </div>
                
                {emailError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-300 text-xs bg-red-500/20 border border-red-500/30 rounded-lg p-2"
                  >
                    {emailError}
                  </motion.div>
                )}
                
                <Button 
                  type="submit" 
                  disabled={isLoading || !!emailError || !email}
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white shadow-2xl hover:shadow-teal-500/25 font-bold border-0 relative overflow-hidden group text-sm" 
                  size="sm"
                >
                  <span className="relative z-10">
                    {isLoading ? 'Sending...' : leadMagnet.cta}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-300 text-xs text-center bg-red-500/20 border border-red-500/30 rounded-lg p-2"
                  >
                    {error}
                  </motion.div>
                )}
              </motion.form>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-3 mt-3 text-teal-200 text-xs"
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Instant download</span>
                </div>
                <div className="w-1 h-1 bg-teal-300 rounded-full" />
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Unsubscribe anytime</span>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-transparent backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
          >
            {/* Success state background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.3)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 text-center py-6 px-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="relative w-12 h-12 mx-auto mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur-lg opacity-50" />
                <div className="relative w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-2xl">
                  <CheckCircle className="text-white" size={16} />
                </div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-white mb-2"
              >
               AI Readiness Checklist Delivered!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-green-100 text-sm"
              >
               Your <span className="font-semibold text-white">AI Readiness Checklist</span> is on its way to{' '}
               <span className="font-semibold text-white">{email}</span>
               <br /><br />
               <span className="text-xs text-green-200">
                 Check your inbox (and spam folder) for your personalized AI readiness assessment.
               </span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>
    </Modal>
  );
}