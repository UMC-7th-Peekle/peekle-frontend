import { create } from 'zustand';

interface CommunityModalState {
  activeModal: {
    articleId?: number;
    type: 'bottomSheet' | 'deleteConfirm';
  } | null;
  setActiveModal: (id: number, type: 'bottomSheet' | 'deleteConfirm') => void;
  closeModal: () => void;
}

export const useCommunityModal = create<CommunityModalState>((set) => ({
  activeModal: null,

  setActiveModal: (id, type) =>
    set(() => ({
      activeModal: { articleId: id, type },
    })),

  closeModal: () => set({ activeModal: null }),
}));
