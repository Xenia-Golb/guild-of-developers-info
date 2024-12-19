import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { ROUTES } from '../../app/pages-url.config';
import { Button, IconsItem, Input, Tooltip } from '@db/ui';
import s from './authentication/authentication.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type ResetPasswordFormData = {
  email: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const [showEmailError, setShowEmailError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  useEffect(() => {
    setShowEmailError(!!errors.email);
  }, [errors]);

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
    navigate(`${ROUTES.LOGIN}/${ROUTES.RESET_PASSWORD_SUCCESS}`, {
      state: { email: data.email },
    });
  };

  return (
    <div className={s['container']}>
      {path.pathname === `${ROUTES.LOGIN}/${ROUTES.RESET_PASSWORD}` ? (
        <>
          <button
            className={s['back-button']}
            onClick={() => {
              navigate(-1);
            }}>
            <IconsItem className={s['icon']} icon='chevronLeft' width={15} height={15} />
            Назад
          </button>
          <div className={s['form']}>
            <h2 className={clsx(s['title'], 'H1')}>Восстановление пароля</h2>
            <div className={clsx(s['info'], 'BodyRegular')}>
              Укажите адрес электронной почты, на который нужно отправить ссылку для сброса пароля
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s['input-wrapper']}>
                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Это поле обязательно',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Некорректный формат email',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className={clsx(s['input-container'], 'BodyRegular')}
                      label='Адрес электронной почты'
                      placeholder='Введите адрес электронной почты'
                      error={showEmailError}
                    />
                  )}
                />
                {showEmailError && (
                  <div className={s['error-message']}>
                    <Tooltip
                      isPassword={false}
                      side='left'
                      isVisible={true}
                      charCount={0}
                      error={true}
                      errorText={errors.email?.message}
                    />
                  </div>
                )}
              </div>

              <Button className={clsx(s['auth-button'], 'Button')}>Восстановить</Button>
            </form>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ResetPassword;
