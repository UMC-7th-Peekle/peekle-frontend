import { create } from 'zustand';

interface ReplyState {
  replyingTo: { authorName: string; commentId: number } | null;
  setReplyingTo: (authorName: string, commentId: number) => void;
  clearReply: () => void;
}

export const useCommentReply = create<ReplyState>((set) => ({
  replyingTo: null,
  setReplyingTo: (authorName, commentId) =>
    set({ replyingTo: { authorName, commentId } }),
  clearReply: () => set({ replyingTo: null }),
}));
