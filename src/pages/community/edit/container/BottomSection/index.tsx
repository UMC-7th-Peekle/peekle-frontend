import * as S from './style';
import { AnonymousCheck } from '@/components';

interface BottomSectionProps {
  isAnonymous: boolean;
  onToggleAnonymous: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImageCount: number; // ✅ 현재 등록된 이미지 개수
}

export default function BottomSection({
  isAnonymous,
  onToggleAnonymous,
  onImageUpload,
  selectedImageCount, // ✅ 현재 이미지 개수 상태 추가
}: BottomSectionProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedImageCount >= 5) {
      alert('이미지는 최대 5개까지 등록할 수 있습니다.');
      return;
    }
    onImageUpload(event);
  };

  return (
    <S.BottomBar>
      <S.CameraButton
        onClick={() => document.getElementById('imageUpload')?.click()}
      />
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload} // ✅ 개수 체크 후 실행
        style={{ display: 'none' }}
      />
      <AnonymousCheck isChecked={isAnonymous} onToggle={onToggleAnonymous} />
    </S.BottomBar>
  );
}
