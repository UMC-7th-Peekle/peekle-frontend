import styled from 'styled-components';
import CommentSvg from '@/assets/images/community/comment.svg?react';
import { theme } from '@/styles/theme';

const NoCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 88px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
`;

const CommentIcon = styled(CommentSvg)`
  height: 56px;
  width: 56px;
`;

const NoCommentText = styled.p`
  color: ${theme.color.gray[400]};
  ${theme.typeFace.body['16R']};
`;

export { NoCommentContainer, NoCommentText, CommentIcon };
