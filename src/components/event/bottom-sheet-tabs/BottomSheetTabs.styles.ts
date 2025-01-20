import styled from 'styled-components';
import resetSVG from '@/assets/images/icons/reset.svg?react';

export const Container = styled.section``;

export const BtnContainer = styled.div`
  display: flex;
  width: 412px;
  padding: 20px 16px;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

export const IconBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 14px 15px 18px;
  color: ${({ theme }) => theme.color.gray[400]};
`;

export const ResetIcon = styled(resetSVG)`
  width: 15.238px;
  height: 15.238px;
`;

export const ResetText = styled.span`
  ${({ theme }) => theme.typeFace.body['18SB']};
`;
