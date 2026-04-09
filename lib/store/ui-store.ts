import { useSyncExternalStore } from "react";

type UIState = {
  isMenuOpen: boolean;
};

const initialState: UIState = {
  isMenuOpen: false,
};

let state = { ...initialState };
const listeners = new Set<() => void>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const getSnapshot = () => state;
const getServerSnapshot = () => initialState;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const uiStore = {
  toggleMenu: () => {
    state = { ...state, isMenuOpen: !state.isMenuOpen };
    emitChange();
  },
  setMenuOpen: (isOpen: boolean) => {
    if (state.isMenuOpen !== isOpen) {
      state = { ...state, isMenuOpen: isOpen };
      emitChange();
    }
  },
};

export function useUIStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
