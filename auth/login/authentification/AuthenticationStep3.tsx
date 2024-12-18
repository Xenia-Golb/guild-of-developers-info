import { Button, IconsItem, Input } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/pages-url.config';
import s from './authentication.module.scss';
import clsx from 'clsx';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';

type AuthenticationStep3FormData = {
  code: string;
};

const AuthenticationStep3 = () => {
  const navigate = useNavigate();
  const [showCodeError, setShowCodeError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationStep3FormData>();

  useEffect(() => {
    setShowCodeError(!!errors.code);
  }, [errors]);

  const onSubmit = (data: AuthenticationStep3FormData) => {
    console.log(data);
    navigate(`${ROUTES.LOGIN}/${ROUTES.AUTHENTICATION}/${ROUTES.SUCCESS}`);
  };

  return (
    <div className={s['container']}>
      <div className={s['back-button-block']}>
        <button
          className={clsx(s['back-button'], 'Button')}
          onClick={() => {
            navigate(-1);
          }}>
          <IconsItem className={s['icon']} icon='chevronLeft' width={15} height={15} />
          Назад
        </button>
      </div>
      <div className={s['form']}>
        <p className={clsx(s['info-step'], 'BodyRegular')}>Шаг 3 из 3</p>
        <p className={clsx(s['title'], 'H1')}>Введите 6-ти значный код из Google-authenticator</p>
        <form className={s['form']} onSubmit={handleSubmit(onSubmit)}>
          <div className={s['input-wrapper']}>
            <Controller
              name='code'
              control={control}
              defaultValue=''
              rules={{
                required: 'Это поле обязательно',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Код должен состоять из 6 цифр',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  className={clsx(s['input-container'], 'BodyRegular')}
                  type='text'
                  label='Код'
                  placeholder='Введите код'
                  error={showCodeError}
                />
              )}
            />
            {showCodeError && <div className={s['error-message']}>{errors.code?.message}</div>}
          </div>

          <Button className={clsx(['auth-button'], 'Button')}>Подключить</Button>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationStep3;
