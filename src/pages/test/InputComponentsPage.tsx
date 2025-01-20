import styled from 'styled-components';
import CheckboxCard from '@/components/common/checkbox-card';
import { DateList } from '@/components/common/date-list';
import Radio from '@/components/common/radio';
import { useState } from 'react';
import TextFields from '@/components/common/text-fields';

// Input 컴포넌트 사용 예시입니다.

export default function InputComponentsPage() {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSearchSubmit = (query: string) => {
    console.log(`검색 결과: ${query}`);
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
        <CheckboxCard
          text="전체 조회"
          isChecked={isChecked}
          toggleCheckbox={toggleCheckbox}
        />
        <p>{`체크 상태: ${isChecked ? '체크됨' : '체크 안 됨'}`}</p>
        <h3>CheckboxCard - 입력 값 없을 때</h3>
        <DateList></DateList>
        <h3>CheckboxCard - 입력 값 없을 때, Focus</h3>
        <DateList isFocus={true}></DateList>
        <h3>CheckboxCard.Plus</h3>
        <DateList.Plus></DateList.Plus>
        <h3>CheckboxCard.Plus - Focus</h3>
        <DateList.Plus isFocus={true}></DateList.Plus>
        <h3>TextFields</h3>
        <TextFields queryKey="search" onQuerySubmit={handleSearchSubmit} />
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;
