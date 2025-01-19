import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import ShareSVG from '@/assets/images/icons/share.svg?react';
import DateSVG from '@/assets/images/icons/date.svg?react';
import TimeSVG from '@/assets/images/icons/time-filled.svg?react';
import LocationSVG from '@/assets/images/icons/location-filled.svg?react';
import CoinSVG from '@/assets/images/icons/coin.svg?react';
import KakaoSVG from '@/assets/images/icons/kakao.svg?react';
import LinkSVG from '@/assets/images/icons/link-rounded.svg?react';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0px 20px;
`;

export const ShareBtn = styled(ShareSVG)`
  width: 28px;
  height: 28px;
  color: ${theme.color.gray[600]};
`;

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InfoContainer = styled.article`
  display: flex;
  padding: 24px 20px 32px 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  color: ${theme.color.gray[900]};
`;

export const Category = styled.p`
  ${theme.typeFace.body['15M']}
  color: ${theme.color.gray[500]};
`;

export const Title = styled.h1`
  ${theme.typeFace.subTitle['20']}
`;

export const Line = styled.div`
  height: 0.5px;
  width: 100%;
  margin: 20px 0;
  background: ${theme.color.gray[100]};
`;

export const Info = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const InfoRowText = styled.span`
  color: ${theme.color.gray[600]};
  ${theme.typeFace.body['16R']}
`;

const InfoIconStyle = css`
  width: 20px;
  height: 20px;
  color: ${theme.color.gray[600]};
`;

export const DateIcon = styled(DateSVG)`
  ${InfoIconStyle}
`;

export const TimeIcon = styled(TimeSVG)`
  ${InfoIconStyle}
`;

export const LocationIcon = styled(LocationSVG)`
  ${InfoIconStyle}
`;

export const CoinIcon = styled(CoinSVG)`
  ${InfoIconStyle}
`;

export const Separator = styled.div`
  background: ${theme.color.gray[50]};
  margin: 0 -20px;
  height: 12px;
`;

export const DescriptionContainer = styled.article`
  display: flex;
  padding: 32px 20px 48px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  color: ${theme.color.gray[900]};
`;

export const DescriptionTitle = styled.h2`
  ${theme.typeFace.subTitle[20]}
`;

export const Description = styled.p`
  ${theme.typeFace.body['18R']}
`;

// 하단 버튼 컨테이너
export const BottomContainer = styled.div`
  display: flex;
  padding: 16px 16px 16px 24px;
  align-items: center;
  gap: 24px;
`;

export const ApplyBtn = styled.button`
  color: ${theme.color.gray[0]};
  background: ${theme.color.primary[500]};
  ${theme.typeFace.body['18SB']}
`;

// 공유 컨테이너
export const ShareContainer = styled.div`
  margin-bottom: 44px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  color: ${theme.color.gray[900]};
`;

export const ShareTitle = styled.h2`
  ${theme.typeFace.subTitle['20']}
`;

export const ShareOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ShareOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ShareOptionText = styled.span`
  ${theme.typeFace.body['18R']}
`;

const ShareIconStyle = css`
  width: 24px;
  height: 24px;
`;

export const KakaoIcon = styled(KakaoSVG)`
  ${ShareIconStyle}
`;

export const LinkIcon = styled(LinkSVG)`
  ${ShareIconStyle}
`;
