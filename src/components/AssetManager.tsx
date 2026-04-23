import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Unlock, Database, RefreshCcw, TrendingUp } from 'lucide-react';
import { AssetNode } from '../lib/types';
import { cn } from '../lib/utils';

interface AssetManagerProps {
  assets: AssetNode[];
  isScanning: boolean;
}

export default function AssetManager({ assets, isScanning }: AssetManagerProps) {
  return (
    <div className="bg-[#16161A] rounded-xl border border-white/5 p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">Asset Logic Ledger</h2>
        <div className="h-1.5 w-10 bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             animate={{ x: [-40, 40] }}
             transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
             className="h-full w-4 bg-emerald-500/40" 
           />
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
        {assets.map((asset) => (
          <motion.div 
            key={asset.id}
            className="group relative bg-[#0F0F12] border border-white/5 rounded-lg p-3 hover:border-cyan-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-[10px] font-mono font-bold text-white/90 uppercase tracking-tight">{asset.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-tighter">
                      PR:{asset.phase}
                    </span>
                    <span className="text-[8px] font-mono text-white/10 uppercase tracking-tighter font-bold">
                      {asset.id.slice(0, 8)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-emerald-400">
                  +${asset.value.toLocaleString()}
                </div>
              </div>
            </div>
            
            {/* 3-Phase Logic Progress */}
            <div className="mt-2 flex gap-1 h-0.5">
              <div className={cn("flex-1 rounded-full", asset.phase !== 'GRANT' ? "bg-emerald-500" : "bg-white/5")} />
              <div className={cn("flex-1 rounded-full", asset.phase === 'AUDIT' ? "bg-cyan-500" : asset.phase === 'WORK' ? "bg-orange-500" : "bg-white/5")} />
              <div className={cn("flex-1 rounded-full", asset.phase === 'AUDIT' ? "bg-cyan-500" : "bg-white/5")} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <button className="w-full h-8 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400/80 border border-cyan-500/20 transition-all rounded text-[9px] font-bold font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          {isScanning ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <TrendingUp className="w-3 h-3" />}
          AUDIT_SYNC
        </button>
      </div>
    </div>
  );
}
