import TodaySection from '@/pages/admin/home/container/notice-section';
import * as S from './style';
import ReportSection from '@/pages/admin/home/container/report-section';
import NoticeSection from '@/pages/admin/home/container/today-section';

// 관리자 홈 페이지입니다.

export default function AdminHomePage() {
  return (
    <S.Container>
      <TodaySection />
      <ReportSection />
      <NoticeSection />
    </S.Container>
  );
}
