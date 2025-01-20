import {
  DateListCard,
  DateListText,
  DateListTextPlus,
  PlusIcon,
} from '@/components/common/date-list/style';

interface Props {
  content: string;
  isFocus?: boolean;
}

export function DateList({ content, isFocus = false }: Props) {
  return (
    <DateListCard isFocus={isFocus}>
      <DateListText>{content}</DateListText>
    </DateListCard>
  );
}

DateList.Plus = ({ isFocus = false }: Props) => {
  return (
    <DateListCard isFocus={isFocus}>
      <DateListTextPlus>{'기간 추가'}</DateListTextPlus>
      <PlusIcon />
    </DateListCard>
  );
};

export default DateList;
