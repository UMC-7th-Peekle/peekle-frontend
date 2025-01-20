import * as S from './style';
import { FilePaginationProps } from '@/types/event';

const FilePagination = ({
  fileLength,
  currentPage,
  onPrevPage,
  onNextPage,
}: FilePaginationProps) => {
  return (
    <S.Container>
      {currentPage > 1 && <S.PrevBtn onClick={onPrevPage} />}
      <S.PageText>{currentPage}</S.PageText>
      <S.Separator>|</S.Separator>
      <S.TotalPageText>{fileLength}</S.TotalPageText>
      {currentPage < fileLength && <S.NextBtn onClick={onNextPage} />}
    </S.Container>
  );
};

export default FilePagination;
