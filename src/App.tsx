/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Activity, 
  Database, 
  Brain, 
  Cpu, 
  Network, 
  Waves, 
  Box, 
  Compass,
  ArrowRight,
  Maximize2,
  Settings2
} from 'lucide-react';
import { LogicState, AssetNode } from './lib/types';
import { generateSpiralPath, determineLogicState } from './lib/engine';
import LogicVisualizer from './components/LogicVisualizer';
import ResonanceAI from './components/ResonanceAI';
import AssetManager from './components/AssetManager';
import BiometricPortal from './components/BiometricPortal';
import MasterProgressTracker from './components/MasterProgressTracker';
import { cn } from './lib/utils';

// Mock Assets with 3-phase logic
const INITIAL_ASSETS: AssetNode[] = [
  { id: 'GR-8892-X', name: 'Ampathical Research Grant', value: 1250000, phase: 'GRANT', status: 'STABLE' },
  { id: 'WK-1102-H', name: 'Zerost Engine Fabrication', value: 450000, phase: 'WORK', status: 'PEAK' },
  { id: 'AU-0596-Q', name: 'Quantum Integrity Audit', value: 89000, phase: 'AUDIT', status: 'STABLE' },
  { id: 'GR-7731-P', name: 'Planetary Infrastructure Grant', value: 5000000, phase: 'GRANT', status: 'STABLE' },
  { id: 'WK-9920-L', name: 'Logistics Deployment V2', value: 920000, phase: 'WORK', status: 'DECAY' },
];

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [entropy, setEntropy] = useState(0.39); // Starting with the 39th Invariant vibe
  const [stressLevel, setStressLevel] = useState(0.2);
  const [spiralData, setSpiralData] = useState<number[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // Logic calculation
  const logicState = useMemo(() => determineLogicState(entropy), [entropy]);
  
  useEffect(() => {
    // Generate initial spiral
    setSpiralData(generateSpiralPath(39, 40));

    // Simulate system pulse
    const interval = setInterval(() => {
      setEntropy(prev => {
        const delta = (Math.random() - 0.5) * 0.05;
        const newVal = Math.min(Math.max(prev + delta, 0), 1);
        return newVal;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleImpairmentToggle = () => {
    // Simulate high stress / decision impairment
    setStressLevel(prev => prev > 0.5 ? 0.2 : 0.85);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617] flex items-center justify-center p-4">
        <BiometricPortal isAuthorized={isAuthorized} onAuthorized={() => setIsAuthorized(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E2E2E7] font-sans selection:bg-[#00F2FF]/30 overflow-hidden flex flex-col p-6 gap-6 select-none">
      
      {/* Top Navigation / Core Status */}
      <header className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#00F2FF] flex items-center justify-center">
            <div className="w-4 h-4 bg-[#00F2FF] rounded-sm rotate-45 animate-pulse-cyan"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Resonance Core <span className="text-[#00F2FF]/70">v2.1.0</span></h1>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              Biometric Sync Status: {isAuthorized ? 'Optimized' : 'Standby'}
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase">Quantum Shield</p>
            <p className="text-sm font-mono text-emerald-400">ACTIVE [LATTICE-7]</p>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">System Mood</p>
            <button 
              onClick={handleImpairmentToggle}
              className={cn(
                "text-xs font-mono font-bold uppercase tracking-wider transition-colors",
                stressLevel > 0.5 ? "text-orange-400" : "text-emerald-400"
              )}
            >
              {stressLevel > 0.5 ? '[IMPAIRED]' : '[OPTIMAL]'}
            </button>
          </div>
        </div>
      </header>

      <MasterProgressTracker 
        progress={entropy > 0.8 ? 0.98 : entropy > 0.4 ? 0.65 : 0.32} 
        phase={entropy > 0.8 ? 'GAMMA' : entropy > 0.4 ? 'BETA' : 'ALPHA'} 
      />

      <main className="flex-1 grid grid-cols-12 gap-6 h-full min-h-0">
        
        {/* Left Column: Biometric Resonance */}
        <section className="col-span-3 h-full min-h-0 flex flex-col gap-6">
          <div className="flex-1 min-h-0">
            <LogicVisualizer 
              data={spiralData} 
              currentState={logicState} 
              entropy={entropy} 
            />
          </div>
          
          <div className="bg-[#16161A] rounded-xl border border-white/5 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">Resonance Vitality</h2>
              <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-white/40 uppercase tracking-tighter">Stress Delta</span>
                <span className={cn(stressLevel > 0.5 ? "text-orange-400" : "text-emerald-400")}>
                  {stressLevel > 0.5 ? 'CRITICAL' : 'STABLE'}
                </span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stressLevel * 100}%` }}
                  className={cn("h-full transition-colors", stressLevel > 0.5 ? "bg-orange-400" : "bg-emerald-400")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Center Column: Logic & AI */}
        <section className="col-span-6 flex flex-col gap-6 h-full min-h-0">
          <div className="flex-[3] min-h-0">
            <ResonanceAI 
              stressLevel={stressLevel} 
              isHighPerformance={stressLevel < 0.3} 
            />
          </div>

          <div className="bg-[#0F0F12] rounded-xl border border-white/5 p-4 flex-1 min-h-0 font-mono text-[10px] overflow-hidden">
            <div className="flex justify-between mb-2">
              <span className="text-white/20 uppercase tracking-widest">TRANSACTION_AUDIT_LOG_STREAM</span>
              <span className="text-emerald-500">ENCRYPTED</span>
            </div>
            <div className="space-y-1 text-white/40 overflow-y-auto h-full custom-scrollbar pb-6">
              <p className="flex gap-2"><span>&gt;</span> <span>[BLOCKCHAIN_SIG] Validating block #8812... SUCCESS</span></p>
              <p className="flex gap-2"><span>&gt;</span> <span>[GRANT_INGEST] Auto-processed $12,400 from Heritage pool</span></p>
              <p className="flex gap-2"><span>&gt;</span> <span className={cn(stressLevel > 0.5 && "text-orange-400/80")}>[RESONANCE_ACTION] {stressLevel > 0.5 ? 'Stress impairment detected. Piloting logic.' : 'Nominal state maintained.'}</span></p>
              <p className="flex gap-2"><span>&gt;</span> <span>[SECURITY] Quantum handshake established with Node 7</span></p>
              <p className="flex gap-2"><span>&gt;</span> <span>[ASSET_LOG] Distributed $2,100 to Life-Logistics portal</span></p>
              <p className="flex gap-2"><span>&gt;</span> <span>[SYSTEM] Integrity check: Geometric lattice stable</span></p>
              <p className="flex gap-2"><span>&gt;</span> <span>[AUDIT] Symmetric parity check complete: 100% match</span></p>
            </div>
          </div>
        </section>

        {/* Right Column: Assets & Logistics */}
        <section className="col-span-3 flex flex-col gap-6 h-full min-h-0">
          <div className="flex-[2] min-h-0">
            <AssetManager assets={INITIAL_ASSETS} isScanning={isScanning} />
          </div>

          <div className="flex-1 min-h-0 bg-[#16161A] rounded-xl border border-white/5 p-5 relative overflow-hidden">
             <h2 className="text-[10px] font-semibold tracking-widest text-white/60 uppercase mb-4">Life Logic Scheduler</h2>
             <div className="space-y-4">
                <div className="relative pl-6 border-l border-white/10">
                  <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-[#00F2FF]"></div>
                  <p className="text-[9px] font-mono text-[#00F2FF] tracking-wider">DELIVERY SCHEDULED</p>
                  <p className="text-xs font-medium text-white/90">Organic Nutrient Pack</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-tighter">Auto-pay from assets</p>
                </div>
                <div className="relative pl-6 border-l border-white/10 opacity-60">
                  <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-white/20"></div>
                  <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">REST OPTIMIZATION</p>
                  <p className="text-xs font-medium text-white/70">Causal Sleep Protocol</p>
                </div>
             </div>
             
             <div className="absolute bottom-4 left-4 right-4 h-12 flex items-end gap-1">
                <div className="flex-1 bg-cyan-500/10 h-[20%]"></div>
                <div className="flex-1 bg-cyan-500/20 h-[40%]"></div>
                <div className="flex-1 bg-cyan-500/30 h-[70%]"></div>
                <div className="flex-1 bg-[#00F2FF]/40 h-[50%]"></div>
                <div className="flex-1 bg-[#00F2FF] h-[100%] shadow-[0_0_10px_#00F2FF44]"></div>
             </div>
          </div>
        </section>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-6 flex items-center justify-between text-[9px] font-mono tracking-widest text-white/30 uppercase border-t border-white/5 pt-4">
        <div>GEO-SHIELD-V7 // END-TO-END QUANTUM KEY: D4F3-8821-K91A</div>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SYSTEM NOMINAL
          </span>
          <span>THREAT_DETECT: 0</span>
          <span>{new Date().toLocaleTimeString('en-US', { hour12: false })} UTC</span>
        </div>
      </footer>
    </div>
  );
}
