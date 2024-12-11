import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ROUTES } from '../../app/pages-url.config';
import { Button, Checkbox, Input, PasswordInput } from '@db/ui';

import s from './register.module.scss';
import Layout from '../login/layout/layout';

const Register = () => {
  const navigate = useNavigate();
  const [isChangePassword, setIsChangePassword] = useState(false);

  const path = useLocation();

  useEffect(() => {
    if (path.pathname === ROUTES.REGISTER) {
      setIsChangePassword(false);
    }
  }, [path]);

  return (
    <div className={s['wrapper']}>
      <Layout />
      <div className={s['form-container']}>
        <div className={s['form']}>
          {!isChangePassword ? (
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
              <Checkbox
                label='Согласен с условиями использования и обработки данных'
                onChange={() => console.log()}
                isChecked={false}
              />

              <Button
                // disabled
                className={s['register-button']}
                onClick={() => {
                  navigate(ROUTES.CHANGE_PASSWORD);
                  setIsChangePassword(true);
                }}>
                Зарегистрироваться
              </Button>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
