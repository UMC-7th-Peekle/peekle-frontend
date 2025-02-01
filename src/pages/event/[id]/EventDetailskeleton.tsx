import Skeleton from 'react-loading-skeleton';
import * as S from './style';

const EventDetailskeleton = () => {
  return (
    <S.SkeletonContainer>
      <S.MainSection>
        <div style={{ width: '100%' }}>
          <Skeleton width="100%" height="270px" />
        </div>
        <S.InfoContainer>
          <Skeleton
            width="30px"
            height="23px"
            style={{ borderRadius: '4px' }}
          />
          <Skeleton
            width="267px"
            height="32px"
            style={{ borderRadius: '4px' }}
          />
          <S.Line />
          <S.Info>
            {Array.from({ length: 4 }).map((_, i) => (
              <div style={{ width: '100%' }} key={i}>
                <Skeleton width="100%" height="24px" />
              </div>
            ))}
          </S.Info>
        </S.InfoContainer>
      </S.MainSection>
      <S.Separator />
    </S.SkeletonContainer>
  );
};

export default EventDetailskeleton;
