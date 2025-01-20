import * as S from './style';

const BodySection = () => {
  return <div>Default BodySection</div>;
};

BodySection.None = () => {
  return (
    <S.NoneContainer>
      <S.SubTitle>첫 번째 게시글을{'\n'}작성해보세요!</S.SubTitle>
    </S.NoneContainer>
  );
};

export default BodySection;
