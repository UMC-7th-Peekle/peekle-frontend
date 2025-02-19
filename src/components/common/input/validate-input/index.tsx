import * as S from './style';
import {
  forwardRef,
  Ref,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { ValidateInputProps } from '@/types/common';

const ValidateInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ValidateInputProps
>((props, ref) => {
  const { type } = props;

  // textarea
  if (type === 'textarea') {
    const { id, errorMessage, placeholder, ...rest } = props;
    const textareaProps = {
      id,
      $errorMessage: !!errorMessage,
      placeholder,
      autoComplete: 'off',
      spellCheck: 'false',
      'aria-invalid': !!errorMessage,
      'aria-describedby': errorMessage ? `${id}-error` : undefined,
      ...rest,
    };

    return (
      <S.InputWrapper>
        <S.StyledTextArea
          ref={ref as Ref<HTMLTextAreaElement>}
          {...(textareaProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        <S.TextAreaErrorMessage
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          $errorMessage={!!errorMessage}
        >
          {errorMessage}
        </S.TextAreaErrorMessage>
      </S.InputWrapper>
    );
  }

  // TextInput
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
});

export default ValidateInput;

/**
 * 사용 예시
 *  <ValidateInput
 *    id={'title'}
      type={'text'}
      {...register('title')}
      placeholder={'제목'}
      errorMessage={'에러 발생'}
    />
 */
