import {
  DateListCard,
  DateListText,
  DateListTextNone,
  PlusIcon,
} from '@/components/input/DateList/style';
import { formatDate } from '@/utils/formatDate';

export function DateList({ date }: Props) {
  return (
    <DateListCard>
      <DateListText>{formatDate(date)}</DateListText>
    </DateListCard>
  );
}

interface Props {
  date?: Date;
}

DateList.None = () => {
  return (
    <DateListCard>
      <DateListTextNone>{'기간 추가'}</DateListTextNone>
      <PlusIcon />
    </DateListCard>
  );
};
