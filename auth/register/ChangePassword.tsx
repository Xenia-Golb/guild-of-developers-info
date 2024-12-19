import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../app/pages-url.config';
import { Button, IconsItem, PasswordInput, Tooltip } from '@db/ui';
import s from './register.module.scss';
import clsx from 'clsx';

type ChangePasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    numbers: false,
    capital: false,
    lower: false,
  });
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordFormData>();

  const newPassword = watch('newPassword', '');
  const confirmPassword = watch('confirmPassword', '');

  useEffect(() => {
    setShowNewPasswordError(!!errors.newPassword);
    setShowConfirmPasswordError(!!errors.confirmPassword);
  }, [errors]);

  useEffect(() => {
    const hasLength = newPassword.length >= 12;
    const hasNumbers = /[0-9]/.test(newPassword);
    const hasCapital = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);

    setPasswordRequirements({
      length: hasLength,
      numbers: hasNumbers,
      capital: hasCapital,
      lower: hasLower,
    });
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword && confirmPassword !== newPassword) {
      setShowConfirmPasswordError(true);
    } else {
      setShowConfirmPasswordError(false);
    }
  }, [confirmPassword, newPassword]);

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log(data);
    navigate(`${ROUTES.REGISTER}/${ROUTES.CHANGE_PASSWORD_SUCCESS}`);
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
              {newPassword && !isConfirmPasswordFocused && (
                <div className={s['error-message']}>
                  <Tooltip
                    isPassword={true}
                    side='left'
                    isVisible={true}
                    charCount={newPassword.length}
                    error={!!errors.newPassword}
                    requirements={passwordRequirements}
                    errorText={errors.newPassword?.message}
                  />
                </div>
              )}
            </div>
            <div className={s['input-wrapper']}>
              <Controller
                name='confirmPassword'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Это поле обязательно',
                  validate: (value) => value === newPassword || 'Пароли не совпадают',
                }}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    className={s['form-input']}
                    label='Повторите пароль'
                    placeholder='Введите пароль повторно'
                    error={showConfirmPasswordError}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                  />
                )}
              />
              {showConfirmPasswordError && (
                <div className={s['error-message']}>
                  <Tooltip
                    isPassword={false}
                    side='left'
                    isVisible={true}
                    charCount={0}
                    error={true}
                    errorText={'Пароли не совпадают'}
                  />
                </div>
              )}
            </div>
          </div>

          <Button className={clsx(s['register-button'], 'Button')}>Сохранить</Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
