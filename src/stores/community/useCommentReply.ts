import { create } from 'zustand';

interface ReplyState {
  replyingTo: { authorName: string; commentId: number } | null;
  reReplyingTo: {
    authorName: string;
    commentId: number;
    parentCommentId: number;
  } | null;
  setReplyingTo: (authorName: string, commentId: number) => void;
  setReReplyingTo: (
    authorName: string,
    commentId: number,
    parentCommentId: number,
  ) => void;
  clearReply: () => void;
}

export const useCommentReply = create<ReplyState>((set) => ({
  replyingTo: null,
  reReplyingTo: null,
  setReplyingTo: (authorName, commentId) =>
    set({ replyingTo: { authorName, commentId } }),
  setReReplyingTo: (authorName, commentId, parentCommentId) =>
    set({ reReplyingTo: { authorName, commentId, parentCommentId } }),
  clearReply: () => set({ replyingTo: null, reReplyingTo: null }),
}));
