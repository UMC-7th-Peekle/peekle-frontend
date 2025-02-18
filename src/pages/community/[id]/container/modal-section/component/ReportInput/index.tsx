import { useState } from 'react';
import * as S from './style';
import { usePostArticleReport } from '@/pages/community/hooks/report/usePostArticleReport';

interface ReportInputProps {
  onClose: () => void;
  communityId: string;
  articleId: string;
}

export function ReportInput({
  onClose,
  articleId,
  communityId,
}: ReportInputProps) {
  const [reason, setReason] = useState('');
  const maxLength = 100;

  const ArticleReportMutation = usePostArticleReport();

  const onSubmit = () => {
    ArticleReportMutation.mutate({
      communityId: Number(communityId),
      articleId: Number(articleId),
      reason,
    });
  };

  return (
    <S.ReportModal onClick={(e) => e.stopPropagation()}>
      <S.CloseBar />
      <S.ReportInputWrapper>
        <S.ReportInput
          placeholder="신고의 이유를 간단하게 적어주세요"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={maxLength}
          onMouseDown={(e) => e.stopPropagation()}
        />
        <S.CharCount>
          {reason.length}/{maxLength}
        </S.CharCount>
      </S.ReportInputWrapper>
      <S.ButtonWrapper>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
        <S.ReportButton
          onClick={() => {
            onSubmit();
            onClose();
          }}
        >
          신고하기
        </S.ReportButton>
      </S.ButtonWrapper>
    </S.ReportModal>
  );
}
