import { useId } from '@/hooks';
import { useGetCommunityDetail } from '../hooks/query/useGetCommunityDetail';

export default function CommunityDetailPage() {
  const id = useId();
  const { data, error, isLoading } = useGetCommunityDetail({
    articleId: id,
  });

  console.log(data);
  console.log(data?.success.message);

  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <></>;
  }

  return <div></div>;
}
