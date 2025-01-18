import styled from 'styled-components';
import Calendar from '@/components/calendar';
import CheckboxCard from '@/components/input/CheckboxCard';
import { DateList } from '@/components/input/DateList';
import Radio from '@/components/input/Radio';
import { useState } from 'react';

export default function ComponentsPage() {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <StyledSection>
        <h3>Radio</h3>
        <div>
          <Radio
            name="example"
            value="option1"
            checked={selectedValue === 'option1'}
            onChange={handleChange}
          >
            가까운 날짜 순
          </Radio>
          <Radio
            name="example"
            value="option2"
            checked={selectedValue === 'option2'}
            onChange={handleChange}
          >
            낮은 금액 순
          </Radio>
        </div>
        <h3>CheckboxCard</h3>
        <CheckboxCard text={'전체 조회'}></CheckboxCard>
        <h3>CheckboxCard - 입력 값 없을 때</h3>
        <DateList></DateList>
        <h3>CheckboxCard.None</h3>
        <DateList.None></DateList.None>
      </StyledSection>
      <CalendarStyle>
        <h3>Calendar</h3>
        <Calendar />
      </CalendarStyle>
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const CalendarStyle = styled.div`
  padding: 2rem;
`;
