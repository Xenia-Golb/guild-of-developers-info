import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { ROUTES } from '../../app/pages-url.config';
import { Button, Checkbox, Input, PasswordInput, Tooltip } from '@db/ui';

import s from './register.module.scss';
import clsx from 'clsx';
import LeftPanel from '../login/leftPanel/leftPanel';

type RegisterFormData = {
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const path = useLocation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  useEffect(() => {
    if (path.pathname === ROUTES.REGISTER) {
      setIsChangePassword(false);
    }
  }, [path]);

  useEffect(() => {
    setShowEmailError(!!errors.email);
    setShowPasswordError(!!errors.password);
  }, [errors]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    navigate(ROUTES.CHANGE_PASSWORD);
    setIsChangePassword(true);
  };

  return (
    <div className={s['wrapper']}>
      <LeftPanel />
      <div className={s['form-container']}>
        <div className={s['form']}>
          {!isChangePassword ? (
            <form className={s['form']} onSubmit={handleSubmit(onSubmit)}>
              <h2 className={clsx(s['title'], 'H1')}>Вход в личный кабинет</h2>
              <div className={clsx(s['form-inputs'], 'BodyRegular')}>
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
                        className={s['form-input']}
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
                <div className={s['input-wrapper']}>
                  <Controller
                    name='password'
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
                        label='Пароль'
                        placeholder='Введите одноразовый пароль'
                        error={showPasswordError}
                      />
                    )}
                  />
                  {showPasswordError && (
                    <div className={s['error-message']}>
                      <Tooltip
                        isPassword={false}
                        side='left'
                        isVisible={true}
                        charCount={0}
                        error={true}
                        errorText={errors.password?.message}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={s['inputs-bottom']}>
                <label>
                  <Checkbox
                    className={clsx(s['checkbox'], 'Label')}
                    label='Согласен с условиями использования и обработки данных'
                    onChange={handleCheckboxChange}
                    isChecked={isChecked}
                  />
                </label>
              </div>
              <Button disabled={!isChecked} className={clsx(s['register-button'], 'Button')}>
                Зарегистрироваться
              </Button>
            </form>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
