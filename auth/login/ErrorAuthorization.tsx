import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/pages-url.config';
import s from './login.module.scss';
import clsx from 'clsx';
import { Button, Checkbox, Input, PasswordInput, Tooltip } from '@db/ui';

const ErrorAuthorization = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const path = useLocation();

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <div className={s['form-container']}>
      {path.pathname === `${ROUTES.LOGIN}/${ROUTES.ERROR_AUTHORIZATION}` && (
        <div className={s['form']}>
          <form className={s['form']}>
            <h2 className={clsx(s['title'], 'H1')}>Вход в личный кабинет</h2>
            <div className={clsx(s['form-inputs'], 'BodyRegular')}>
              <div className={s['input-wrapper']}>
                <Input
                  className={s['form-input']}
                  label='Адрес электронной почты'
                  placeholder='Введите адрес электронной почты'
                  error={true}
                />
                <Tooltip
                  isPassword={false}
                  side='left'
                  isVisible={true}
                  charCount={0}
                  error={true}
                  errorText={'Неправильный логин или пароль'}
                />
              </div>
              <div className={s['input-wrapper']}>
                <PasswordInput
                  className={s['form-input']}
                  label='Пароль'
                  placeholder='Введите пароль'
                  error={true}
                />
              </div>
            </div>
            <div className={s['inputs-bottom']}>
              <label>
                <Checkbox
                  className={clsx(s['checkbox'], 'Label')}
                  label='Запомнить меня'
                  onChange={handleCheckboxChange}
                  isChecked={isChecked}
                />
              </label>
              <button
                className={clsx(s['forget-button'], 'BodyTable')}
                onClick={() => {
                  navigate(ROUTES.RESET_PASSWORD);
                }}>
                Забыли пароль?
              </button>
            </div>

            <Button
              disabled
              className={clsx(s['auth-button'], 'Button')}
              onClick={() => {
                navigate(ROUTES.LOGIN);
              }}>
              Войти
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ErrorAuthorization;
