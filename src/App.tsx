import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marketplace from "./components/Marketplace";
import AgentStatus from "./components/AgentStatus";
import SellFlow from "./components/SellFlow";
import { Shield, Globe, Lock, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [isSellFlowOpen, setIsSellFlowOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      <main>
        <Hero onSellClick={() => setIsSellFlowOpen(true)} />
        
        {/* Trust Section */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-white/40" />
                <span className="text-sm font-medium text-white/60">Secure Escrow</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-white/40" />
                <span className="text-sm font-medium text-white/60">Global Transfers</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-white/40" />
                <span className="text-sm font-medium text-white/60">Verified Providers</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-white/40" />
                <span className="text-sm font-medium text-white/60">Instant AI Parsing</span>
              </div>
            </div>
          </div>
        </section>

        <Marketplace />
        
        <AgentStatus />

        {/* Defensibility Section */}
        <section className="py-24 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-8">What makes ReClaim defensible</h2>
                <div className="space-y-8">
                  {[
                    { title: "Transfer Policy Database", desc: "Every transaction teaches us which providers allow transfers and what the success rate looks like." },
                    { title: "Provider Relationships", desc: "As hotels and venues see smooth transfers, they'll cooperate more. First-mover advantage." },
                    { title: "AI That Gets Smarter", desc: "Every provider interaction trains the communication agent. Margins improve automatically." },
                    { title: "Network Effects", desc: "More sellers → more inventory → more buyers → faster sales. Classic marketplace flywheel." }
                  ].map((item) => (
                    <div key={item.title}>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/tech/1000/1000" 
                    alt="Technology" 
                    className="w-full h-full object-cover opacity-50 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold">Network Activity</div>
                          <div className="text-white/40 text-xs">Real-time marketplace data</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "70%" }}
                            className="h-full bg-white"
                          />
                        </div>
                        <div className="h-2 w-[80%] bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "90%" }}
                            className="h-full bg-white/40"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-white" />
                <span className="text-xl font-bold tracking-tight text-white">ReClaim</span>
              </div>
              <div className="text-white/40 text-sm">
                © 2026 ReClaim — Venture Concept. All rights reserved.
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-white/40 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <SellFlow isOpen={isSellFlowOpen} onClose={() => setIsSellFlowOpen(false)} />
    </div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
