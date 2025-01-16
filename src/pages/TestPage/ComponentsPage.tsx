import Calendar from '@/components/calendar';
import Radio from '@/components/input/Radio';
import { useState } from 'react';

export default function ComponentsPage() {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <section>
      <h3>Radio</h3>
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
      <h3>Calendar</h3>
      <Calendar />
    </section>
  );
}
