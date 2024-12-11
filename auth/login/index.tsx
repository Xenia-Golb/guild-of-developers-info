import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../app/pages-url.config';
import { Button, Checkbox, Input, PasswordInput } from '@db/ui';
import Authentication from './Authentication';
import ResetPassword from './ResetPassword';
import Layout from './layout/layout';

import s from './login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticationPage, setIsAuthenticationPage] = useState(false);
  const [isResetPasswordPage, setIsResetPasswordPage] = useState(false);
  const path = useLocation();

  useEffect(() => {
    if (path.pathname === ROUTES.LOGIN) {
      setIsAuthenticationPage(false);
      setIsResetPasswordPage(false);
    }
  }, [path]);

  return (
    <div className={s['wrapper']}>
      <Layout />
      <div className={s['form-container']}>
        <div className={s['form']}>
          {!isAuthenticationPage ? (
            !isResetPasswordPage ? (
              <>
                <h2 className={s['title']}>Вход в личный кабинет</h2>
                <div className={s['form-inputs']}>
                  <Input
                    className={s['form-input']}
                    label='Адрес электронной почты'
                    placeholder='Введите адрес электронной почты'
                  />
                  <PasswordInput
                    className={s['form-input']}
                    label='Пароль'
                    placeholder='Введите пароль'
                  />
                </div>

                <div className={s['inputs-bottom']}>
                  <Checkbox
                    label='Запомнить меня'
                    onChange={() => console.log()}
                    isChecked={false}
                  />
                  <button
                    onClick={() => {
                      setIsResetPasswordPage(true);
                      navigate(ROUTES.RESET_PASSWORD);
                    }}>
                    Забыли пароль?
                  </button>
                </div>

                <Button
                  className={s['auth-button']}
                  onClick={() => {
                    navigate(ROUTES.AUTHENTICATION);
                    setIsAuthenticationPage(true);
                  }}>
                  Войти
                </Button>
              </>
            ) : (
              <ResetPassword />
            )
          ) : (
            <>
              <Authentication />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
