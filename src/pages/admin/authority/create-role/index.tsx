// import { useEffect } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { FormStyle } from '@/components';
// import { CreateRoleFormValues, CreateRoleSchema } from '@/types/admin';

const CreateRolePage = () => {
  // const { Form, FormField, FormInput, SubmitButton } = FormStyle;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { isSubmitting, errors, touchedFields },
  //   setError,
  //   trigger,
  //   watch, // 디버깅용
  // } = useForm<CreateRoleFormValues>({
  //   resolver: zodResolver(CreateRoleSchema),
  //   mode: 'onChange',
  //   defaultValues: {
  //     name: '',
  //     description: '',
  //     permissions: [],
  //     permissionIds: [],
  //   },
  // });

  // // 초기 유효성 검사
  // useEffect(() => {
  //   trigger();
  // }, [trigger]);

  // const { googleSignIn, isPending: isGoogleSignInPending } = useGoogleSignIn();

  // // 폼 제출 핸들러
  // const onSubmit: SubmitHandler<CreateRoleFormValues> = async (formData) => {
  //   await signIn(formData);
  // };

  return (
    // <Form onSubmit={handleSubmit(onSubmit)}>
    // <FormField></FormField>
    // </Form>
    <div>롤 생성</div>
  );
};

export default CreateRolePage;
