import {
  DateListCard,
  DateListText,
  DateListTextPlus,
  PlusIcon,
} from './style';

interface Props {
  date?: string | null;
  isFocus?: boolean;
  onClick?: () => void;
}

const DateList = ({ date, isFocus = false }: Props) => {
  return (
    <DateListCard isFocus={isFocus}>
      <DateListText>{date}</DateListText>
    </DateListCard>
  );
};

DateList.Plus = ({ isFocus = false, onClick }: Props) => {
  return (
    <DateListCard isFocus={isFocus} onClick={onClick}>
      <DateListTextPlus>{'기간 추가'}</DateListTextPlus>
      <PlusIcon />
    </DateListCard>
  );
};

export default DateList;
