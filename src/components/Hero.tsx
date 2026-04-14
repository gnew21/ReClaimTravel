import { Button } from "./ui/button";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ onSellClick }: { onSellClick: () => void }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-white/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium mb-8">
            <Sparkles className="w-3 h-3" />
            <span>AI-Powered Marketplace for Non-Refundable Bookings</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Recover what you've <br />
            <span className="text-white/40 italic font-serif">already paid for.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-white/60 mb-10">
            An AI-powered marketplace that helps people resell non-refundable bookings they can't use — and helps buyers score deals. Fully automated. Minimal human overhead.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 px-8 h-12 text-base font-semibold"
              onClick={onSellClick}
            >
              Sell my booking
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/10 text-white hover:bg-white/5 px-8 h-12 text-base font-semibold"
            >
              Browse deals
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12"
        >
          <div>
            <div className="text-3xl font-bold text-white mb-1">$2.4M+</div>
            <div className="text-sm text-white/40 uppercase tracking-widest">Recovered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">12k+</div>
            <div className="text-sm text-white/40 uppercase tracking-widest">Bookings Sold</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">94%</div>
            <div className="text-sm text-white/40 uppercase tracking-widest">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">3.2s</div>
            <div className="text-sm text-white/40 uppercase tracking-widest">Avg. AI Parsing</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
