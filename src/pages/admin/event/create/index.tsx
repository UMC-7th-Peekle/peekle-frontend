import * as S from './style';
import { useEffect, useState, useRef } from 'react';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormStyle, Portal } from '@/components';
import { EventCreateFormSchema, EventCreateFormValues } from '@/types/event';
import { useCreateEvent } from '@/hooks';
import {
  CATEGORY_OPIONS_LABEL_VALUE,
  IS_ALL_DAY_OPTIONS_LABEL_VALUE,
  PRICE_OPTIONS_LABEL_VALUE,
  REPEAT_TYPE_OPTIONS_LABEL_VALUE,
} from '@/constants/event';
import { transformFormData } from '@/utils';

const EventCreatePage = () => {
  // 이미지 파일
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files); // FileList → File[]
    // 기존에 선택된 파일과 비교하여 중복된 파일을 제거
    const uniqueFiles = newFiles.filter(
      (file) =>
        !files.some(
          (existingFile) =>
            existingFile.name === file.name &&
            existingFile.lastModified === file.lastModified,
        ),
    );

    if (uniqueFiles.length === 0) return; // 중복된 파일이 없으면 리턴

    // 새로운 파일들을 기존 files에 추가
    setFiles([...files, ...uniqueFiles]);

    // 미리보기 URL 생성
    const newPreviewUrls = uniqueFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  // 모달 열기
  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
  };

  // 모달 닫기
  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  // 모달에서 이전 이미지 보기
  const prevImage = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((prev) =>
        prev! > 0 ? prev! - 1 : previewUrls.length - 1,
      );
    }
  };

  // 모달에서 다음 이미지 보기
  const nextImage = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((prev) =>
        prev! < previewUrls.length - 1 ? prev! + 1 : 0,
      );
    }
  };

  // 폼
  const {
    Form,
    FormTitle,
    FormField,
    FormInput,
    FormInputWrapper,
    FormInputTitle,
    FormSelect,
  } = FormStyle;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    trigger,
    setValue,
    clearErrors,
    control,
    watch, // 디버깅용
  } = useForm<EventCreateFormValues>({
    resolver: zodResolver(EventCreateFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      priceType: '무료',
      price: '1000',
      categoryId: undefined,
      eventUrl: null,
      schedules: [
        {
          repeatType: 'none',
          isAllDay: false,
          customText: null,
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
        },
      ],
      location: {
        address: '',
        buildingName: '',
      },
      applicationStartDate: '',
      applicationEndDate: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  // 초기 유효성 검사
  useEffect(() => {
    trigger();
  }, [trigger]);

  // 입력 값 확인
  const priceType = watch('priceType');
  const address = watch('location.address');
  let hasBuildingName = false;
  const applicationStartDate = watch('applicationStartDate');
  const applicationEndDate = watch('applicationEndDate');

  // 주소 검색
  const open = useDaumPostcodePopup(
    import.meta.env.VITE_DAUM_POSTCODE_SCRIPT_URL,
  );

  const handleComplete = (address: Address) => {
    const addressField = address.address ?? address.roadAddress;
    const buildingNameField = address.buildingName;
    hasBuildingName = buildingNameField.trim().length > 0;
    setValue('location.address', addressField);
    setValue('location.buildingName', buildingNameField);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  // 조건부 유효성 검사
  useEffect(() => {
    if (address) {
      trigger(['location.address', 'location.buildingName']);
    }
  }, [address, trigger]);

  // `repeatType`과 `isAllDay` 값이 바뀔 때마다 상태 업데이트
  // 스케줄 값 채워두기 - error 발생 방지

  // schedules 배열의 모든 항목 감시
  const schedules = useWatch({ control, name: 'schedules' });
  useEffect(() => {
    fields.forEach((_, index) => {
      const repeatType = watch(`schedules.${index}.repeatType`);
      const isAllDay = watch(`schedules.${index}.isAllDay`);
      console.log(`repeatType in useEffect`, repeatType);
      console.log(`isAllDay in useEffect`, isAllDay);

      // repeatType이 'none'일 때 startDate, endDate 설정
      if (repeatType === 'none') {
        if (schedules[index].startDate !== applicationStartDate) {
          setValue(`schedules.${index}.startDate`, applicationStartDate);
        }
        if (schedules[index].endDate !== applicationEndDate) {
          setValue(`schedules.${index}.endDate`, applicationEndDate);
        }

        // 에러 초기화
        clearErrors(`schedules.${index}.startDate`);
        clearErrors(`schedules.${index}.endDate`);
      }

      // isAllDay가 true일 때 startTime, endTime 설정
      if (isAllDay) {
        if (schedules[index].startTime !== '00:00:00Z') {
          setValue(`schedules.${index}.startTime`, '00:00:00Z');
        }
        if (schedules[index].endTime !== '23:59:59Z') {
          setValue(`schedules.${index}.endTime`, '23:59:59Z');
        }

        // 에러 초기화
        clearErrors(`schedules.${index}.startTime`);
        clearErrors(`schedules.${index}.endTime`);
      }
    });
  }, [
    fields,
    schedules,
    watch,
    applicationStartDate,
    applicationEndDate,
    setValue,
    clearErrors,
  ]);

  // Repeat 관리
  const handlePlusRepeatClick = () => {
    append({
      repeatType: 'none',
      isAllDay: false,
      customText: null,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    });
  };

  const { createEvent, isPending } = useCreateEvent();

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<EventCreateFormValues> = async (formData) => {
    console.log('formData', formData);
    const transformedData = transformFormData(formData);
    console.log('transformedData', transformedData);
    await createEvent({ eventData: transformedData, files });
  };

  // 디버깅용
  console.log('current event create form', {
    errors: errors.schedules,
    data: watch('schedules'),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>이벤트 생성</FormTitle>
      <FormField>
        <FormInput
          type="text"
          id="title"
          placeholder="이벤트 제목 입력"
          {...register('title')}
          errorMessage={(touchedFields.title && errors.title?.message) || ''}
        />
      </FormField>
      <FormField>
        <FormInput
          type="textarea"
          id="content"
          placeholder="이벤트 내용 입력"
          {...register('content')}
          errorMessage={
            (touchedFields.content && errors.content?.message) || ''
          }
        />
      </FormField>
      <FormField>
        <FormInputWrapper>
          <FormInputTitle>카테고리</FormInputTitle>
          <FormSelect
            id="categoryId"
            {...register('categoryId', {
              setValueAs: (value) => Number(value), // string → number 변환
            })}
            options={CATEGORY_OPIONS_LABEL_VALUE}
            errorMessage={
              (touchedFields.categoryId && errors.categoryId?.message) || ''
            }
          />
        </FormInputWrapper>
      </FormField>
      <FormField>
        <FormInputWrapper>
          <FormInputTitle>가격 유형</FormInputTitle>
          <FormSelect
            id="priceType"
            {...register('priceType')}
            options={PRICE_OPTIONS_LABEL_VALUE}
            errorMessage={
              (touchedFields.priceType && errors.priceType?.message) || ''
            }
          />
        </FormInputWrapper>
      </FormField>
      {priceType === '유료' && (
        <FormField>
          <FormInputWrapper>
            <FormInputTitle>이벤트 가격</FormInputTitle>
            <FormInput
              type="number"
              id="price"
              placeholder="이벤트 가격 입력"
              {...register('price')}
              errorMessage={
                (touchedFields.price && errors.price?.message) || ''
              }
            />
          </FormInputWrapper>
        </FormField>
      )}
      <FormField>
        <FormInputWrapper>
          <FormInput
            type="text"
            id="address"
            placeholder="주소"
            {...register('location.address')}
            errorMessage={
              (touchedFields.location?.address &&
                errors.location?.address?.message) ||
              ''
            }
            readOnly
          />
          <Button color="primary400Line" size="xxsmall" onClick={handleClick}>
            주소 검색
          </Button>
        </FormInputWrapper>
      </FormField>
      <FormField>
        <FormInput
          type="text"
          id="buildingName"
          placeholder="건물 이름"
          {...register('location.buildingName')}
          errorMessage={
            (touchedFields.location?.buildingName &&
              errors.location?.buildingName?.message) ||
            ''
          }
          readOnly={hasBuildingName} // 장소명이 있을때만 읽기 전용
        />
      </FormField>
      <FormField>
        <FormInputWrapper>
          <FormInputTitle>이벤트 시작 일자</FormInputTitle>
          <FormInput
            type="date"
            id="applicationStartDate"
            {...register('applicationStartDate')}
            errorMessage={
              (touchedFields.applicationStartDate &&
                errors.applicationStartDate?.message) ||
              ''
            }
          />
        </FormInputWrapper>
      </FormField>
      <FormField>
        <FormInputWrapper>
          <FormInputTitle>이벤트 종료 일자</FormInputTitle>
          <FormInput
            type="date"
            id="applicationEndDate"
            {...register('applicationEndDate')}
            errorMessage={
              (touchedFields.applicationEndDate &&
                errors.applicationEndDate?.message) ||
              ''
            }
          />
        </FormInputWrapper>
      </FormField>
      {/* 파일 입력 */}
      <Button
        type="button"
        color="primary400Line"
        size="xxsmall"
        width="100%"
        onClick={() => fileInputRef.current?.click()}
      >
        이미지 첨부하기
      </Button>
      <S.FileInput
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {previewUrls.length > 0 && (
        <S.ImagePriviewSection>
          {previewUrls.map((url, index) => (
            <S.ImageWrapper $imageSize="100px" key={index}>
              <S.RemoveImageBtnWrapper>
                <S.XIcon
                  $size="15px"
                  onClick={() => handleRemoveImage(index)}
                />
              </S.RemoveImageBtnWrapper>
              <S.StyledImage
                src={url}
                alt={`Preview ${index}`}
                onClick={() => openFullscreen(index)}
              />
            </S.ImageWrapper>
          ))}
        </S.ImagePriviewSection>
      )}
      {fullscreenIndex !== null && (
        <Portal type="modal">
          <>
            <S.CloseFullScreenWrapper>
              <S.XIcon onClick={closeFullscreen} />
            </S.CloseFullScreenWrapper>
            <S.FullScreenContainer>
              <S.ArrowLeft onClick={prevImage} />
              <S.ImageWrapper $imageSize="200px">
                <S.StyledImage
                  src={previewUrls[fullscreenIndex]}
                  alt="Fullscreen"
                />
              </S.ImageWrapper>
              <S.ArrowRight onClick={nextImage} />
            </S.FullScreenContainer>
          </>
        </Portal>
      )}
      {/* 스케줄 */}
      <S.SectionTitleWrapper>
        <S.SectionTitle>이벤트 스케줄</S.SectionTitle>
        <S.PlusIcon onClick={handlePlusRepeatClick} />
      </S.SectionTitleWrapper>
      {fields.map((field, index) => {
        // 입력된 값 확인
        const repeatType = watch(`schedules.${index}.repeatType`);
        const isAllday = watch(`schedules.${index}.isAllDay`);
        return (
          <S.ScheduleItem key={field.id}>
            <S.ScheduleTitleWrapper>
              {index !== 0 ? `스케줄 - ${index}` : `스케줄`}
              {index !== 0 && (
                <S.XIcon $size="20px" onClick={() => remove(index)} />
              )}
            </S.ScheduleTitleWrapper>
            <FormField>
              <FormInputWrapper>
                <FormInputTitle>이벤트 반복 유형</FormInputTitle>
                <FormSelect
                  id="repeatType"
                  {...register(`schedules.${index}.repeatType`)}
                  options={REPEAT_TYPE_OPTIONS_LABEL_VALUE}
                  errorMessage={
                    (touchedFields.schedules?.[index]?.repeatType &&
                      errors.schedules?.[index]?.repeatType?.message) ||
                    ''
                  }
                />
              </FormInputWrapper>
            </FormField>
            {repeatType === 'custom' && (
              <FormField>
                <FormInputWrapper>
                  <FormInput
                    type="text"
                    id={`schedules.${index}.customText`}
                    {...register(`schedules.${index}.customText`)}
                    placeholder="커스텀 반복 메시지를 설정해주세요"
                    errorMessage={
                      (touchedFields.schedules?.[index]?.customText &&
                        errors.schedules?.[index]?.customText?.message) ||
                      ''
                    }
                  />
                </FormInputWrapper>
              </FormField>
            )}
            <FormField>
              <FormInputWrapper>
                <FormInputTitle>
                  이벤트가 하루 종일 진행되는지 여부
                </FormInputTitle>
                <FormSelect
                  id="isAllDay"
                  {...register(`schedules.${index}.isAllDay`, {
                    setValueAs: (value) => value === 'true', // string → boolean 변환
                  })}
                  options={IS_ALL_DAY_OPTIONS_LABEL_VALUE}
                  errorMessage={
                    (touchedFields.schedules?.[index]?.isAllDay &&
                      errors.schedules?.[index]?.isAllDay?.message) ||
                    ''
                  }
                />
              </FormInputWrapper>
            </FormField>

            {repeatType !== 'none' && (
              <FormField>
                <FormInputWrapper>
                  <FormInputTitle>반복 시작 날짜</FormInputTitle>
                  <FormInput
                    type="date"
                    id={`schedules.${index}.startDate`}
                    {...register(`schedules.${index}.startDate`)}
                    errorMessage={
                      (touchedFields.schedules?.[index]?.startDate &&
                        errors.schedules?.[index]?.startDate?.message) ||
                      ''
                    }
                  />
                </FormInputWrapper>
              </FormField>
            )}
            {!isAllday && (
              <FormField>
                <FormInputWrapper>
                  <FormInputTitle>시작 시간</FormInputTitle>
                  <FormInput
                    type="time"
                    id={`schedules.${index}.startTime`}
                    {...register(`schedules.${index}.startTime`)}
                    errorMessage={
                      (touchedFields.schedules?.[index]?.startTime &&
                        errors.schedules?.[index]?.startTime?.message) ||
                      ''
                    }
                  />
                </FormInputWrapper>
              </FormField>
            )}
            {repeatType !== 'none' && (
              <FormField>
                <FormInputWrapper>
                  <FormInputTitle>반복 종료 일자</FormInputTitle>
                  <FormInput
                    type="date"
                    id={`schedules.${index}.endDate`}
                    {...register(`schedules.${index}.endDate`)}
                    errorMessage={
                      (touchedFields.schedules?.[index]?.endDate &&
                        errors.schedules?.[index]?.endDate?.message) ||
                      ''
                    }
                  />
                </FormInputWrapper>
              </FormField>
            )}
            {!isAllday && (
              <FormField>
                <FormInputWrapper>
                  <FormInputTitle>종료 시간</FormInputTitle>
                  <FormInput
                    type="time"
                    id={`schedules.${index}.endTime`}
                    {...register(`schedules.${index}.endTime`)}
                    errorMessage={
                      (touchedFields.schedules?.[index]?.endTime &&
                        errors.schedules?.[index]?.endTime?.message) ||
                      ''
                    }
                  />
                </FormInputWrapper>
              </FormField>
            )}
          </S.ScheduleItem>
        );
      })}
      <Button
        color="primary500"
        size="small"
        width="100%"
        disabled={isSubmitting || Object.keys(errors).length > 0 || isPending}
      >
        {isPending ? '이벤트 생성 중...' : '이벤트 생성하기'}
      </Button>
    </Form>
  );
};

export default EventCreatePage;
