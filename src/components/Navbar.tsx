import { Button } from "./ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ReClaim</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#marketplace" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Marketplace</a>
            <a href="#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">How it works</a>
            <a href="#agents" className="text-sm font-medium text-white/70 hover:text-white transition-colors">AI Agents</a>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <a href="#marketplace" className="block text-lg font-medium text-white" onClick={() => setIsOpen(false)}>Marketplace</a>
              <a href="#how-it-works" className="block text-lg font-medium text-white" onClick={() => setIsOpen(false)}>How it works</a>
              <a href="#agents" className="block text-lg font-medium text-white" onClick={() => setIsOpen(false)}>AI Agents</a>
              <Button className="w-full bg-white text-black hover:bg-white/90">Sign In</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
