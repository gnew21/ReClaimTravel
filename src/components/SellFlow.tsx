import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseBookingConfirmation, BookingDetails } from "@/services/geminiService";
import { Loader2, Upload, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SellFlow({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'input' | 'parsing' | 'review' | 'success'>('input');
  const [inputText, setInputText] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    if (!inputText.trim()) return;
    
    setStep('parsing');
    setError(null);
    
    try {
      const details = await parseBookingConfirmation(inputText);
      setBookingDetails(details);
      setStep('review');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep('input');
    }
  };

  const handleConfirm = () => {
    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Intake Agent</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            Close
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Paste your booking confirmation</h3>
                  <p className="text-white/60">Our AI will parse the details and check transfer policies automatically.</p>
                </div>
                
                <textarea
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all resize-none"
                  placeholder="Paste email content, confirmation text, or booking details here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <Button 
                  className="w-full bg-white text-black hover:bg-white/90 h-12 text-lg font-bold"
                  onClick={handleParse}
                  disabled={!inputText.trim()}
                >
                  Analyze Booking
                </Button>
              </motion.div>
            )}

            {step === 'parsing' && (
              <motion.div
                key="parsing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="w-12 h-12 text-white animate-spin mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">AI is analyzing...</h3>
                <p className="text-white/60">Extracting provider, dates, and transfer policies.</p>
              </motion.div>
            )}

            {step === 'review' && bookingDetails && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">
                      {bookingDetails.confidence}% Confidence
                    </Badge>
                    <h3 className="text-3xl font-bold text-white">{bookingDetails.provider}</h3>
                    <p className="text-white/60">{bookingDetails.location} • {bookingDetails.dates}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40 uppercase tracking-widest">Suggested Price</div>
                    <div className="text-3xl font-bold text-white">${bookingDetails.suggestedPrice}</div>
                    <div className="text-sm text-white/40 line-through">Original: ${bookingDetails.originalPrice}</div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-white font-bold mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    Transfer Policy Analysis
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {bookingDetails.transferPolicy}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-white/10 text-white hover:bg-white/5"
                    onClick={() => setStep('input')}
                  >
                    Edit Details
                  </Button>
                  <Button 
                    className="flex-[2] bg-white text-black hover:bg-white/90"
                    onClick={handleConfirm}
                  >
                    List Booking
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Listing Live!</h3>
                <p className="text-white/60 mb-8 max-w-sm mx-auto">
                  Your booking has been listed. Our Matching Agent is now connecting with potential buyers.
                </p>
                <Button 
                  className="bg-white text-black hover:bg-white/90 px-8"
                  onClick={onClose}
                >
                  Go to Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
