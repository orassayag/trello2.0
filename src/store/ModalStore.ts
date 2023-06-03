import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  toggleModal: () => set({ isOpen: !get().isOpen }),
}));
