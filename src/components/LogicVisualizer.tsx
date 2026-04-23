import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'motion/react';
import { Activity, Triangle, Circle, Square } from 'lucide-react';
import { LogicState } from '../lib/types';
import { cn } from '../lib/utils';

interface LogicVisualizerProps {
  data: number[];
  currentState: LogicState;
  entropy: number;
}

export default function LogicVisualizer({ data, currentState, entropy }: LogicVisualizerProps) {
  const chartData = data.map((val, i) => ({ step: i, value: val }));

  return (
    <div className="bg-[#16161A] rounded-xl border border-white/5 p-4 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">Ampathical Cycle</h2>
        <div className="flex gap-2">
           <div className={cn("px-2 py-0.5 rounded text-[9px] font-mono", currentState === LogicState.RESONANCE ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20")}>
             ST: {currentState}
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
        <svg className="w-full h-full max-h-48 opacity-60 pointer-events-none absolute inset-0" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#00F2FF" strokeWidth="0.5" strokeDasharray="10 5" />
          <polygon points="100,20 180,140 20,140" fill="none" stroke="#A5F3FC" strokeWidth="0.2" />
          <polygon points="100,180 20,60 180,60" fill="none" stroke="#A5F3FC" strokeWidth="0.2" />
          <motion.circle 
            animate={{ r: [28, 32, 28] }}
            transition={{ duration: 4, repeat: Infinity }}
            cx="100" cy="100" r="30" fill="rgba(0,242,255,0.05)" stroke="#00F2FF" strokeWidth="1" 
          />
        </svg>
        
        <div className="relative z-10 text-center">
          <p className="text-3xl font-mono text-[#E2E2E7] tracking-tighter">{(entropy * 100).toFixed(1)}%</p>
          <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">Symmetry Deviation</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-mono">
          <span className="text-white/40 uppercase">Logic Trajectory</span>
          <span className="text-cyan-400">SMOOTHING TO ZERO</span>
        </div>
        <div className="h-12 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData.slice(-20)}>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#00F2FF" 
                strokeWidth={1}
                fill="#00F2FF" 
                fillOpacity={0.1}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
