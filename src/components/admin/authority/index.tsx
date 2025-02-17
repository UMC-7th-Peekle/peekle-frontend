import { useGetPermissions } from '@/hooks';

const Authority = () => {
  const { data } = useGetPermissions();
  console.log(data);
  return (
    <div>
      <div>role 추가</div>
      <div>사용자에게 role 부여</div>
      <div>사용자에게 role 삭제</div>
    </div>
  );
};

export default Authority;
