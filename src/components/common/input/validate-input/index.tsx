import * as S from './style';
import { forwardRef, Ref, InputHTMLAttributes } from 'react';
import { ValidateInputProps } from '@/types/common';

export const Input = forwardRef<HTMLInputElement, ValidateInputProps>(
  (props, ref) => {
    const { id, placeholder, errorMessage, validatedMessage, ...rest } = props;
    const textInputProps = {
      id,
      $errorMessage: !!errorMessage,
      $validatedMessage: !!validatedMessage,
      placeholder,
      autoComplete: 'off',
      'aria-invalid': !!errorMessage,
      'aria-describedby': errorMessage ? `${id}-error` : undefined,
      ...rest,
    };

    return (
      <S.InputWrapper>
        <S.StyledTextInput
          ref={ref as Ref<HTMLInputElement>}
          {...(textInputProps as InputHTMLAttributes<HTMLInputElement>)}
        />
        {errorMessage && errorMessage !== '.' ? (
          <S.Message
            id={`${id}-error`}
            role="alert"
            aria-live="polite"
            $errorMessage={!!errorMessage}
          >
            {errorMessage}
          </S.Message>
        ) : null}
        {validatedMessage ? (
          <S.Message
            id={`${id}-varified`}
            role="alert"
            aria-live="polite"
            $validatedMessage={!!validatedMessage}
          >
            {validatedMessage}
          </S.Message>
        ) : null}
      </S.InputWrapper>
    );
  },
);

export default Input;

/**
 * 사용 예시
 *  <Input
 *    id={'title'}
      type={'text'}
      {...register('title')}
      placeholder={'제목'}
      errorMessage={'에러 발생'}
    />
 */
