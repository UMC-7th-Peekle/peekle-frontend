import * as S from './style';
import { forwardRef, Ref, SelectHTMLAttributes } from 'react';
import { ValidateSelectProps } from '@/types/common';

const ValidateSelect = forwardRef<HTMLSelectElement, ValidateSelectProps>(
  (props, ref) => {
    const { id, options, errorMessage, validatedMessage, ...rest } = props;
    const selectProps = {
      id,
      $errorMessage: !!errorMessage,
      $validatedMessage: !!validatedMessage,
      autoComplete: 'off',
      'aria-invalid': !!errorMessage,
      'aria-describedby': errorMessage ? `${id}-error` : undefined,
      ...rest,
    };

    return (
      <S.SelectWrapper>
        <S.StyledSelect
          ref={ref as Ref<HTMLSelectElement>}
          {...(selectProps as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.StyledSelect>
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
      </S.SelectWrapper>
    );
  },
);

export default ValidateSelect;

/**
 * 사용 예시
 *  <ValudateSelect
      id="category"
      options={options}
      errorMessage={errors.category?.message as string}
      {...register('category')}
    />
 */
