import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'; // Импортируем react-hook-form

import { ROUTES } from '../../app/pages-url.config';
import { Button, IconsItem, PasswordInput } from '@db/ui';

import s from './register.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type ChangePasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordFormData>();

  useEffect(() => {
    setShowNewPasswordError(!!errors.newPassword);
    setShowConfirmPasswordError(!!errors.confirmPassword);
  }, [errors]);

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log(data);
    navigate(`${ROUTES.REGISTER}/${ROUTES.CHANGE_PASSWORD_SUCCESS}`);
  };

  return (
    <div className={s['container']}>
      <button
        className={s['back-button']}
        onClick={() => {
          navigate(-1);
        }}>
        <IconsItem className={s['icon']} icon='chevronLeft' width={15} height={15} />
        Назад
      </button>
      <h2 className={clsx(s['title'], 'H1')}>Создайте новый пароль</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(s['form-inputs'], 'BodyRegular')}>
          <div className={s['input-wrapper']}>
            <Controller
              name='newPassword'
              control={control}
              defaultValue=''
              rules={{
                required: 'Это поле обязательно',
                minLength: {
                  value: 12,
                  message: 'Пароль должен содержать не менее 12 символов',
                },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{12,}$/,
                  message:
                    'Пароль должен содержать не менее 12 символов, хотя бы одну цифру, одну заглавную и одну строчную букву',
                },
              }}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  className={s['form-input']}
                  label='Новый пароль'
                  placeholder='Введите пароль'
                  error={showNewPasswordError}
                />
              )}
            />
            {showNewPasswordError && (
              <div className={s['error-message']}>{errors.newPassword?.message}</div>
            )}
          </div>
          <div className={s['input-wrapper']}>
            <Controller
              name='confirmPassword'
              control={control}
              defaultValue=''
              rules={{
                required: 'Это поле обязательно',
                validate: (value) => value === watch('newPassword') || 'Пароли не совпадают',
              }}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  className={s['form-input']}
                  label='Повторите пароль'
                  placeholder='Введите пароль повторно'
                  error={showConfirmPasswordError}
                />
              )}
            />
            {showConfirmPasswordError && (
              <div className={s['error-message']}>{errors.confirmPassword?.message}</div>
            )}
          </div>
        </div>

        <Button className={clsx(s['register-button'], 'Button')}>Сохранить</Button>
      </form>
    </div>
  );
};

export default ChangePassword;
