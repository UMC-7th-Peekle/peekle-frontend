// import * as S from './Select.styles';
// import { forwardRef, SelectHTMLAttributes } from 'react';
// import { SelectProps } from '@/types';
// import {
//   CATEGORY_OPTIONS,
//   SORT_COMMENT_OPTIONS,
//   SORT_ETC_OPTIONS,
// } from '@/constants';
// import { createOptions } from '@/utils';

// export const Select = forwardRef<HTMLSelectElement, SelectProps>(
//   (props, ref) => {
//     const { type, errorMessage, ...rest } = props;

//     const options = {
//       category: createOptions(CATEGORY_OPTIONS),
//       sortComment: createOptions(SORT_COMMENT_OPTIONS),
//       sortEtc: createOptions(SORT_ETC_OPTIONS),
//     }[type];
//     const labelText = {
//       category: '카테고리 선택',
//       sortComment: '댓글 정렬 방식 선택',
//       sortEtc: '정렬 방식 선택',
//     }[type];

//     const selectProps = {
//       role: 'combobox',
//       'aria-label': labelText,
//       'aria-expanded': 'true',
//       'aria-controls': `${type}-listbox`,
//       $errorMessage: !!errorMessage,
//       ...rest,
//     };

//     return (
//       <S.SelectWrapper>
//         <S.Select
//           ref={ref}
//           {...(selectProps as SelectHTMLAttributes<HTMLSelectElement>)}
//         >
//           {options.map(({ value, label }) => (
//             <option
//               key={value}
//               value={value}
//               id={`${type}-option-${value}`}
//               role="option"
//             >
//               {label}
//             </option>
//           ))}
//         </S.Select>
//         <S.ErrorMessage
//           id={`${type}-error`}
//           role="alert"
//           aria-live="polite"
//           $errorMessage={!!errorMessage}
//         >
//           {errorMessage}
//         </S.ErrorMessage>
//       </S.SelectWrapper>
//     );
//   },
// );

// export default Select;

// /**
//  * 사용 예시
//  // 1. 카테고리
//  * const [category, setCategory] = useState<CategoryType>('all');
//   <Select
//     type="category"
//     value={category}
//     onChange={(e) => setCategory(e.target.value as CategoryType)}
//   />

//   // ➕ 폼에서
//   // 스키마
//   import { CATEGORIES } from '@/constants';
//   export const playListAddSchema = z.object({
//     category: z
//       .enum([CATEGORIES[0], ...CATEGORIES])
//       .refine((val) => val !== 'all', {
//         message: '카테고리를 선택해주세요',
//       }),
//   });
//   export type PlayListAddFormValues = z.infer<typeof playListAddSchema>;

//   // 컴포넌트
//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting, errors, touchedFields },
//   } = useForm<PlayListAddFormValues>({
//     resolver: zodResolver(playListAddSchema),
//     mode: 'onChange',
//     defaultValues: { category: 'all', ...다른 값들 },
//   });

//   const onSubmit: SubmitHandler<PlayListAddFormValues> = async (formData) => {
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Select
//         type="category"
//         {...register('category')}
//         errorMessage={
//           (touchedFields.category && errors.category?.message) || ''
//         }
//       />
//       <Button
//         color="primary"
//         disabled={isSubmitting || Object.keys(errors).length > 0}
//       >
//         제출
//       </Button>
//     </form>
//   );

//   // 2. 댓글
//   const [sortComment, setSortComment] = useState<SortCommentType>('latest');
//   <Select
//     type="sortComment"
//     value={sortComment}
//     onChange={(e) => setSortComment(e.target.value as SortCommentType)}
//   />

//   // 3. 팔로잉, 구독, 좋아요
//   const [sortEtc, setSortEtc] = useState<SortEtcType>('latest');
//   <Select
//     type="sortEtc"
//     value={sortEtc}
//     onChange={(e) => setSortEtc(e.target.value as SortEtcType)}
//   />
//  */
