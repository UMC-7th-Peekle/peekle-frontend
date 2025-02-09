import * as S from './style';
import { AnonymousCheck } from '@/components';

interface BottomSectionProps {
  isAnonymous: boolean;
  onToggleAnonymous: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BottomSection({
  isAnonymous,
  onToggleAnonymous,
  onImageUpload,
}: BottomSectionProps) {
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
        onChange={onImageUpload}
        style={{ display: 'none' }}
      />
      <AnonymousCheck isChecked={isAnonymous} onToggle={onToggleAnonymous} />
    </S.BottomBar>
  );
}
