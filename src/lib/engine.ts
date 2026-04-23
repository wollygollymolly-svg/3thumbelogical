/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogicState, BinovalState } from './types';

/**
 * The Zerost Spiral (Smoothing to Zero)
 * Reflective (Odd): n / 2
 * Disruptive (Even): 3n + 1
 * Re-aligned for Ampathical Logic: Reflective acts as legacy compression.
 */
export function calculateZerostStep(n: number): number {
  if (n <= 0) return 0;
  // Terminal digit logic
  const lastDigit = n % 10;
  const isReflective = [1, 3, 5, 7, 9].includes(lastDigit);
  
  if (isReflective) {
    return Math.floor(n / 2); // Legacy compression
  } else {
    return (3 * n + 1); // Structural drive / Expansion
  }
}

export function generateSpiralPath(start: number, steps: number = 20): number[] {
  let current = start;
  const path = [current];
  for (let i = 0; i < steps; i++) {
    current = calculateZerostStep(current);
    path.push(current);
    if (current === 0) break;
  }
  return path;
}

/**
 * Determine the 3-state logic based on current system entropy
 */
export function determineLogicState(entropy: number): LogicState {
  if (entropy < 0.1) return LogicState.ZERO;
  if (entropy > 0.9) return LogicState.ONE;
  return LogicState.RESONANCE; // The 39th Input maintains stability in the "X" state
}

/**
 * Smoothing function for decision making when stressed
 */
export function smoothDecisionInput(input: number, stress: number): number {
  // Kinetic correction logic
  const smoothingFactor = 1 - stress;
  return input * smoothingFactor + (0.5 * stress); // Pulls toward nominal center when stressed
}
