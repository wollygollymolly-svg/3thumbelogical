import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Crosshair, Zap, Radio } from 'lucide-react';

interface MasterProgressTrackerProps {
  progress: number; // 0 to 1
  phase: 'ALPHA' | 'BETA' | 'GAMMA';
}

export default function MasterProgressTracker({ progress, phase }: MasterProgressTrackerProps) {
  const phases = [
    { name: 'ALPHA', desc: 'Initialization' },
    { name: 'BETA', desc: 'Ignition' },
    { name: 'GAMMA', desc: 'Equilibrium' }
  ];

  const currentPhaseIndex = phases.findIndex(p => p.name === phase);

  return (
    <div className="bg-[#16161A] border border-white/5 rounded-xl p-4 mb-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#00F2FF]/10 p-2 rounded-lg border border-[#00F2FF]/20">
            <Radio className="w-4 h-4 text-[#00F2FF] animate-pulse" />
          </div>
          <div>
            <h2 className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em] leading-none mb-1">
              Global Ignition Calibration
            </h2>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-mono text-[#00F2FF] uppercase font-bold tracking-widest leading-none">
                 Phase {phase} ACTIVE
               </span>
               <div className="h-2 w-px bg-white/10 mx-1" />
               <span className="text-[9px] font-mono text-white/30 uppercase tracking-tighter">
                 Path: Smoothing to Zero
               </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[14px] font-mono font-bold text-[#E2E2E7] tracking-tighter">
            {(progress * 100).toFixed(1)}%
          </span>
          <span className="text-[8px] font-mono text-[#00F2FF]/60 uppercase tracking-widest">
            Resonance Locked
          </span>
        </div>
      </div>

      <div className="relative h-2 bg-white/[0.02] border border-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-[#00F2FF] shadow-[0_0_15px_rgba(0,242,255,0.4)]"
        />
        
        {/* Phase Markers */}
        <div className="absolute inset-0 flex justify-between px-2">
           {phases.map((p, i) => (
             <div key={p.name} className="relative h-full flex items-center">
                <div className={cn(
                  "w-1 h-3 rounded-full transition-colors",
                  i <= currentPhaseIndex ? "bg-white/40" : "bg-white/10"
                )} />
             </div>
           ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-3">
        {phases.map((p, i) => (
          <div key={p.name} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "w-1 h-1 rounded-full",
                i === currentPhaseIndex ? "bg-[#00F2FF] animate-ping" : i < currentPhaseIndex ? "bg-emerald-500" : "bg-white/10"
              )} />
              <span className={cn(
                "text-[8px] font-mono font-bold uppercase tracking-widest",
                i === currentPhaseIndex ? "text-[#00F2FF]" : i < currentPhaseIndex ? "text-emerald-500/80" : "text-white/20"
              )}>
                {p.name}
              </span>
            </div>
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-tighter ml-2.5">
              {p.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
