
import type{ Equatable } from "./equatable";

export function createEmitter<State extends Equatable>(
  set: (state: State) => void,
  get: () => State
) {
  return (next: State) => {
    const current = get();
    if (current.equals?.(next)) return; 
    set(next);
  };
}
