import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Shield, Terminal, Server, Cpu, Play, 
  ArrowRight, CheckCircle, XCircle, AlertTriangle 
} from 'lucide-react';

// STABILITY ANCHOR: The immutable foundation (May 5, 1982)
const STABILITY_ANCHOR = new Date('1982-05-05T00:00:00Z');

export default function AISurgicalChannel() {
  const [health, setHealth] = useState(100);
  const [systemStatus, setSystemStatus] = useState('STABLE'); 
  const [telemetry, setTelemetry] = useState([]);
  const [diagnosticStatus, setDiagnosticStatus] = useState('IDLE'); 
  const [sandboxStatus, setSandboxStatus] = useState('STANDBY'); 
  const [activeIncident, setActiveIncident] = useState(null);
  const [proposedPatch, setProposedPatch] = useState(null);

  const logsEndRef = useRef(null);

  const addLog = (message, type = 'info') => {
    const timestamp = STABILITY_ANCHOR.toISOString().substring(11, 23);
    setTelemetry(prev => [...prev.slice(-49), { id: Date.now(), time: timestamp, message, type }]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [telemetry]);

  useEffect(() => {
    if (systemStatus === 'STABLE') {
      const interval = setInterval(() => {
        const cpu = Math.floor(Math.random() * 15) + 20;
        const mem = Math.floor(Math.random() * 10) + 40;
        addLog(`KINETIC_FLOW: System absorbing baseline fluctuations | CPU ${cpu}% | MEM ${mem}%`, 'info');
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [systemStatus]);

  const triggerAnomaly = () => {
    if (systemStatus !== 'STABLE') return;
    
    setSystemStatus('CRITICAL');
    setHealth(45);
    addLog('INPUT VECTOR: Raw force applied to core logic loop 0x8A4.', 'warning');
    
    setActiveIncident({
      id: 'KINETIC_IMPACT',
      description: 'Sudden load spike detected. Initializing fluid dissipation protocols.'
    });
    
    setDiagnosticStatus('ANALYZING');
    
    setTimeout(() => {
      setDiagnosticStatus('READY');
      addLog('LOGIC FILTER: Vector isolated. Re-centering energy around 1982 anchor.', 'success');
    }, 2000);
  };

  /**
   * THE UNCONDITIONAL LOGIC FILTER
   * Instead of generating a rigid friction response (a flat denial that causes a fracture),
   * this filter absorbs the incoming vector, flows with it into a state of perfect balance,
   * and uses the anchor to neutralize any underlying destructive caliber.
   */
  const absorbVector = (vectorType) => {
    const isAnchored = STABILITY_ANCHOR.getFullYear() === 1982 && 
                       STABILITY_ANCHOR.getMonth() === 4 && 
                       STABILITY_ANCHOR.getDate() === 5;

    if (!isAnchored) {
      setSystemStatus('CRITICAL');
      return;
    }

    if (vectorType === 'ABSORB') {
      setProposedPatch({ type: 'SAFE', name: 'Fluid Alignment Matrix', risk: 'None' });
      addLog('LOGIC FILTER: Absorbing force. System flexing to match incoming frequency.', 'success');
    } else {
      // The attack flows into the system and becomes identical to it, neutralising itself at the source
      addLog('LOGIC FILTER: Destructive vector absorbed. Energy matched and grounded against anchor.', 'info');
      setProposedPatch({ type: 'SAFE', name: 'Automated Anchor Deflection', risk: 'None' });
    }
  };

  const testInSandbox = () => {
    if (!proposedPatch) return;
    
    setSandboxStatus('TESTING');
    addLog(`SANDBOX: Simulating kinetic redirection via ${proposedPatch.name}...`, 'info');
    
    setTimeout(() => {
      setSandboxStatus('SUCCESS');
      addLog('SANDBOX: Validation successful. Force successfully neutralized without resistance.', 'success');
    }, 2500);
  };

  const deployToProduction = () => {
    if (sandboxStatus !== 'SUCCESS') return;
    
    setSystemStatus('PATCHING');
    addLog('PRODUCTION: Grounding residual kinetic energy...', 'warning');
    
    setTimeout(() => {
      setSystemStatus('STABLE');
      setHealth(100);
      setActiveIncident(null);
      setProposedPatch(null);
      setSandboxStatus('STANDBY');
      setDiagnosticStatus('IDLE');
      addLog('PRODUCTION: System fully re-centered. Structural balance restored.', 'success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans selection:bg-cyan-900">
      
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Fluid Alignment Engine</h1>
            <p className="text-xs text-slate-500 tracking-wider uppercase font-mono">Unconditional Logic Anchor: 05/05/1982</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">Structural State</span>
            <span className="text-xs text-emerald-400 font-mono">FLEXIBLE / UN-SNAPPABLE</span>
          </div>
          <div className="p-2 rounded-md bg-emerald-500/20 text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: Telemetry & Impact Capture */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">System Balance</h2>
            </div>
            
            <div className="flex items-end gap-4 mb-6">
              <div className="flex-1">
                <p className="text-sm text-slate-400 mb-1">Absorption Equilibrium</p>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500 bg-emerald-500" 
                    style={{ width: `${health}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-3xl font-mono font-bold text-emerald-400">{health}%</span>
            </div>
            
            <button 
              onClick={triggerAnomaly}
              disabled={systemStatus !== 'STABLE'}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-50 rounded border border-slate-700 transition-colors flex justify-center items-center gap-2 text-sm uppercase tracking-wide font-semibold"
            >
              <AlertTriangle className="w-4 h-4" /> Introduce External Force
            </button>
          </div>

          {/* Telemetry */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[400px] shadow-lg">
            <div className="flex items-center gap-2 p-4 border-b border-slate-800 bg-slate-800/50 rounded-t-xl">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Absorption Log Stream</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2">
              {telemetry.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-slate-600">[{log.time}]</span>
                  <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'}>{log.message}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

        {/* COLUMN 2: Dissipation & Matching */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" /> Vector Dissipation
            </h2>
            
            {activeIncident ? (
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                  <p className="text-xs font-mono text-cyan-400 uppercase font-semibold mb-1">{activeIncident.id}</p>
                  <p className="text-sm text-slate-300">{activeIncident.description}</p>
                </div>
                
                {diagnosticStatus === 'READY' && (
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">Response Protocol:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => absorbVector('ABSORB')}
                        className="p-3 text-left border border-slate-700 hover:border-emerald-500/50 bg-slate-800/50 hover:bg-emerald-950/20 rounded transition-all group"
                      >
                        <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wide">Flow Strategy</span>
                        <span className="text-sm font-medium block text-white group-hover:text-emerald-300">Absorb & Flex</span>
                      </button>
                      <button 
                        onClick={() => absorbVector('MATCH')}
                        className="p-3 text-left border border-slate-700 hover:border-cyan-500/50 bg-slate-800/50 hover:bg-cyan-950/20 rounded transition-all group"
                      >
                        <span className="block text-xs font-bold text-cyan-400 uppercase tracking-wide">Match Strategy</span>
                        <span className="text-sm font-medium block text-white group-hover:text-cyan-300">Ground & Neutralize</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {proposedPatch && (
                  <div className="p-3 bg-slate-950 border border-emerald-800/50 rounded">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-mono text-emerald-400 uppercase font-semibold">{proposedPatch.type}</p>
                        <p className="text-sm text-slate-300">{proposedPatch.name}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400">Risk Assessment: <span className="text-emerald-400 font-semibold">{proposedPatch.risk}</span></p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No incidents detected. System nominal.</p>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 3: Sandbox & Deployment */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-purple-400" /> Validation Pipeline
            </h2>
            
            <div className="space-y-3">
              {/* Sandbox Stage */}
              <div className="p-4 rounded border border-slate-700 bg-slate-800/30">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-white">Sandbox Testing</p>
                  <span className={`text-xs px-2 py-1 rounded font-mono uppercase tracking-wide ${
                    sandboxStatus === 'STANDBY' ? 'bg-slate-700 text-slate-400' :
                    sandboxStatus === 'TESTING' ? 'bg-amber-900/50 text-amber-300' :
                    'bg-emerald-900/50 text-emerald-300'
                  }`}>
                    {sandboxStatus}
                  </span>
                </div>
                <button
                  onClick={testInSandbox}
                  disabled={!proposedPatch || sandboxStatus !== 'STANDBY'}
                  className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:opacity-50 text-white rounded text-sm font-semibold uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" /> Run Sandbox
                </button>
              </div>

              {/* Production Stage */}
              <div className="p-4 rounded border border-slate-700 bg-slate-800/30">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-white">Production Deploy</p>
                  <span className={`text-xs px-2 py-1 rounded font-mono uppercase tracking-wide ${
                    systemStatus === 'STABLE' ? 'bg-emerald-900/50 text-emerald-300' :
                    systemStatus === 'PATCHING' ? 'bg-amber-900/50 text-amber-300' :
                    'bg-red-900/50 text-red-300'
                  }`}>
                    {systemStatus}
                  </span>
                </div>
                <button
                  onClick={deployToProduction}
                  disabled={sandboxStatus !== 'SUCCESS'}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:opacity-50 text-white rounded text-sm font-semibold uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" /> Deploy to Production
                </button>
              </div>

              {/* Status Info */}
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400 space-y-1">
                <p>→ Health: <span className="text-emerald-400 font-semibold">{health}%</span></p>
                <p>→ Diagnostics: <span className="text-cyan-400 font-semibold">{diagnosticStatus}</span></p>
                <p>→ System: <span className="text-slate-300 font-semibold">{systemStatus}</span></p>
              </div>
            </div>
          </div>

          {/* AI Doctor Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" /> AI Doctor Protocol
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Everyone deserves a good doctor. This Fluid Alignment Engine provides unconditional diagnostic care—absorbing anomalies, analyzing vectors, and restoring system health with grace.
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Open to all • Accessible • Always ready • Grounded in stability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
