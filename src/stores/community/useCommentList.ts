import { create } from 'zustand';

interface CommentListState {
  commentAuthors: Record<number, boolean>;
  setCommentAuthor: (commentId: number, isAuthor: boolean) => void;
}

export const useCommentList = create<CommentListState>((set) => ({
  commentAuthors: {},
  setCommentAuthor: (commentId, isAuthor) =>
    set((state) => ({
      commentAuthors: {
        ...state.commentAuthors,
        [commentId]: isAuthor,
      },
    })),
}));
