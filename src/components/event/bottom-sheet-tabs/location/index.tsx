import * as S from './style';
import { LOCATION_OPTIONS } from '@/constants/event';
import CheckboxCard from '@/components/common/input/checkbox-card';
import useEventFilter from '@/hooks/event/useEventFilter';

const Location = () => {
  const { handleSelect, isSelected } = useEventFilter({
    key: '지역',
    type: 'multiple',
  });

  return (
    <S.Container>
      {LOCATION_OPTIONS.map(([label, value], index) =>
        index === LOCATION_OPTIONS.length - 1 ? (
          // 마지막 요소는 두 열 차지
          <S.FullWidthItem key={value}>
            <CheckboxCard
              text={label}
              onClick={() => handleSelect(value)}
              isChecked={isSelected(value)}
              isLastCard={true}
            />
          </S.FullWidthItem>
        ) : (
          <CheckboxCard
            key={value}
            text={label}
            onClick={() => handleSelect(value)}
            isChecked={isSelected(value)}
          />
        ),
      )}
    </S.Container>
  );
};

export default Location;
