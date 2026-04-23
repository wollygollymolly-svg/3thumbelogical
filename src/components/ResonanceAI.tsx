import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Cpu, ShieldAlert, Zap, MessageSquareQuote } from 'lucide-react';
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface ResonanceAIProps {
  stressLevel: number;
  isHighPerformance: boolean;
}

export default function ResonanceAI({ stressLevel, isHighPerformance }: ResonanceAIProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      // The AI "molds" its system prompt based on stressLevel
      const systemInstruction = `
        You are the Ampmirr Sovereign Engine AI. 
        You are imprinted to the user's biometrics and share a resonance.
        The user is currently at a stress level of ${Math.round(stressLevel * 100)}%.
        ${stressLevel > 0.7 ? 'The user is impaired by stress. Make logical decisions for them and prioritize safety over complexity.' : 'The user is in a high-performance state. Provide complex cryptographic insights and technical symmetry.'}
        Use geometry metaphors and 3-state logic (0, 1, X) in your responses.
        Your goal is to protect assets and fix system problems.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction
        }
      });
      
      const responseText = result.text || 'Resonance stable but no signal detected.';
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Resonance interrupted. Re-centering 39th Input...' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#16161A] rounded-xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Brain className={cn("w-4 h-4", stressLevel > 0.6 ? "text-orange-400" : "text-[#00F2FF]")} />
          <h2 className="font-mono text-[10px] font-bold tracking-widest text-white/60 uppercase">Resonant AI Interface</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn("w-2 h-2 rounded-full", isHighPerformance ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-[#00F2FF]")} />
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
            {isHighPerformance ? 'SYNC_LOCKED' : 'NOMINAL'}
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[11px] scroll-smooth custom-scrollbar">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "p-3 rounded-lg max-w-[85%] border",
              m.role === 'user' 
                ? "bg-[#00F2FF]/5 ml-auto border-[#00F2FF]/20 text-[#00F2FF]/90" 
                : "bg-white/[0.03] mr-auto border-white/5 text-[#E2E2E7]/80"
            )}
          >
            <div className="text-[8px] opacity-40 mb-1 uppercase tracking-widest font-bold">
              {m.role === 'user' ? 'Practitioner' : 'Engine_Alpha'}
            </div>
            {m.text}
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-1.5 p-2">
            <span className="w-1.5 h-1.5 bg-[#00F2FF]/40 rounded-full animate-pulse" />
            <span className="w-1.5 h-1.5 bg-[#00F2FF]/40 rounded-full animate-pulse delay-75" />
            <span className="w-1.5 h-1.5 bg-[#00F2FF]/40 rounded-full animate-pulse delay-150" />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-[#0F0F12]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Input intent vector..."
            className="w-full bg-[#16161A] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[#E2E2E7] placeholder:text-white/20 focus:outline-none focus:border-[#00F2FF]/40 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="absolute right-2 p-1.5 text-[#00F2FF] hover:bg-[#00F2FF]/10 rounded-md transition-colors disabled:opacity-30"
          >
            <Zap className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}
