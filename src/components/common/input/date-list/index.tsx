import {
  DateListCard,
  DateListText,
  DateListTextPlus,
  PlusIcon,
} from './style';
import { formatDate } from '@/utils/date/formatDate';

interface Props {
  date?: Date | null;
  isFocus?: boolean;
}

const DateList = ({ date, isFocus = false }: Props) => {
  return (
    <DateListCard isFocus={isFocus}>
      <DateListText>{formatDate(date)}</DateListText>
    </DateListCard>
  );
};

DateList.Plus = ({ isFocus = false }: Props) => {
  return (
    <DateListCard isFocus={isFocus}>
      <DateListTextPlus>{'기간 추가'}</DateListTextPlus>
      <PlusIcon />
    </DateListCard>
  );
};

export default DateList;
