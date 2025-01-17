// import styled from 'styled-components';
// import { StyledSelectProps } from '@/types';

// export const SelectWrapper = styled.div`
//   position: relative;
//   width: 100%;
// `;

// export const Select = styled.select<StyledSelectProps>`
//   width: 100%;
//   -moz-appearance: none;
//   -webkit-appearance: none;
//   appearance: none;
//   background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 512 512'%3E%3Cpath fill='%23666' d='M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z'/%3E%3C/svg%3E")
//     no-repeat right ${({ theme }) => theme.space.sm} center;
//   background-size: 16px;
//   padding: ${({ theme }) => theme.space.sm};
//   padding-right: ${({ theme }) => theme.space.lg};
//   color: ${({ theme }) => theme.colors.gray.dark};
//   border: 1px solid
//     ${({ $errorMessage, theme }) =>
//       $errorMessage ? theme.colors.error : theme.colors.gray.dark};
//   border-radius: ${({ theme }) => theme.borderRadius.md};
//   &:focus {
//     outline: 1px solid
//       ${({ $errorMessage, theme }) =>
//         $errorMessage ? theme.colors.error : theme.colors.gray.dark};
//     border-color: ${({ $errorMessage, theme }) =>
//       $errorMessage ? theme.colors.error : theme.colors.gray.dark};
//   }
// `;

// export const ErrorMessage = styled.p<StyledSelectProps>`
//   position: absolute;
//   bottom: -19px;
//   left: ${({ theme }) => theme.space.xxsm};
//   font-size: ${({ theme }) => theme.fontSize.xsm};
//   color: ${({ $errorMessage, theme }) => $errorMessage && theme.colors.error};
// `;
