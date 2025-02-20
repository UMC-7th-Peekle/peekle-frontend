import { create } from 'zustand';

interface CommentModalState {
  activeCommentModal: {
    commentId?: number;
    type: 'bottomSheet' | 'deleteConfirm';
  } | null;
  setActiveCommentModal: (
    commentId: number,
    type: 'bottomSheet' | 'deleteConfirm',
  ) => void;
  closeCommentModal: () => void;
}

export const useCommentModalState = create<CommentModalState>((set) => ({
  activeCommentModal: null,

  setActiveCommentModal: (commentId, type) =>
    set(() => ({
      activeCommentModal: { commentId, type },
    })),

  closeCommentModal: () => set({ activeCommentModal: null }),
}));
