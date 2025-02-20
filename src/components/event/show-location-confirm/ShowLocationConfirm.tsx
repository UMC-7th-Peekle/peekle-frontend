import { confirm } from '@/utils';
import LocationConfirm from './LocationConfirm';

// 위치 동의 확인
const ShowLocationConfirm = (
  onLocationAllow: () => void,
  onLocationDeny: () => void,
) => {
  confirm(
    <LocationConfirm
      onLocationAllow={onLocationAllow}
      onLocationDeny={onLocationDeny}
    />,
  );
};
export default ShowLocationConfirm;
