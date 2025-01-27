import { useParams } from 'react-router-dom';

// /test/:id 같은 상세페이지 진입 시 id를 path에서 빼오는 훅입니다.
export default function useId() {
  const { id } = useParams<{ id: string }>();

  return id ?? '';
}
