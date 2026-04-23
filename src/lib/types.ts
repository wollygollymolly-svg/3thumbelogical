/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LogicState {
  ZERO = '0',
  ONE = '1',
  RESONANCE = 'X' // The 39th Input / Harmonic Invariant
}

export interface BinovalState {
  logic: LogicState;
  potential: number;
  resonance: number;
  timestamp: string;
}

export interface AssetNode {
  id: string;
  name: string;
  value: number;
  phase: 'GRANT' | 'WORK' | 'AUDIT';
  status: 'STABLE' | 'DECAY' | 'PEAK';
}

export interface BiometricLog {
  imprintId: string;
  resonanceLevel: number;
  decisionImpairment: number; // 0-1
  isLocked: boolean;
}
