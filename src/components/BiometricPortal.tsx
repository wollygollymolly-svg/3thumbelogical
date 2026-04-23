import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, Scan, ShieldCheck, AlertTriangle, FingerprintIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface BiometricPortalProps {
  onAuthorized: () => void;
  isAuthorized: boolean;
}

export default function BiometricPortal({ onAuthorized, isAuthorized }: BiometricPortalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  useEffect(() => {
    if (isScanning && scanProgress < 100) {
      const timer = setInterval(() => {
        setScanProgress(v => {
          if (v >= 100) {
            clearInterval(timer);
            setIsScanning(false);
            onAuthorized();
            return 100;
          }
          return v + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isScanning, scanProgress, onAuthorized]);

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-[#0F0F12] rounded-2xl border border-white/5 shadow-2xl max-w-sm w-full">
      <div className="mb-10 text-center">
        <h1 className="text-xl font-bold font-mono text-[#E2E2E7] mb-2 uppercase tracking-tighter">Resonance Auth</h1>
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] leading-relaxed">
          Verify biometric alignment <br/> for system ignition
        </p>
      </div>

      <div className="relative mb-8 group cursor-pointer" onClick={!isAuthorized && !isScanning ? startScan : undefined}>
        <div className={cn(
          "relative w-32 h-32 rounded-full border flex items-center justify-center transition-all duration-700",
          isAuthorized ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : isScanning ? "border-[#00F2FF] bg-[#00F2FF]/5 shadow-[0_0_30px_rgba(0,242,255,0.1)]" : "border-white/10 bg-white/[0.02] hover:border-[#00F2FF]/40"
        )}>
          {isAuthorized ? (
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
          ) : (
            <Fingerprint className={cn("w-10 h-10 transition-colors", isScanning ? "text-[#00F2FF] animate-pulse" : "text-white/20")} />
          )}

          {isScanning && (
            <motion.div 
              className="absolute inset-x-0 h-0.5 bg-[#00F2FF] shadow-[0_0_10px_#00F2FF]"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          )}
        </div>

        <AnimatePresence>
          {isScanning && (
            <motion.div 
              className="absolute -bottom-10 w-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden w-20 mx-auto">
                <div 
                  className="h-full bg-[#00F2FF] transition-all duration-300 shadow-[0_0_5px_#00F2FF]" 
                  style={{ width: `${scanProgress}%` }} 
                />
              </div>
              <span className="text-[8px] font-mono text-white/30 mt-2 block uppercase tracking-[0.4em]">
                Syncing: {scanProgress}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full space-y-4">
        <button 
          disabled={isScanning || isAuthorized}
          onClick={startScan}
          className={cn(
            "w-full py-3.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-[0.4em] transition-all border",
            isAuthorized 
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 cursor-default" 
              : "bg-[#00F2FF]/10 hover:bg-[#00F2FF]/20 text-[#00F2FF] border-[#00F2FF]/20 active:scale-[0.98]"
          )}
        >
          {isAuthorized ? 'Alignment Confirmed' : 'Initiate Scan'}
        </button>
        
        <div className="flex items-center justify-center gap-2 pt-2">
           <div className="h-px bg-white/5 flex-1" />
           <span className="text-[7px] font-mono text-white/10 uppercase tracking-widest leading-none">Security Level Alpha</span>
           <div className="h-px bg-white/5 flex-1" />
        </div>
      </div>
    </div>
  );
}
