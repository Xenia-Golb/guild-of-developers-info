import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { ROUTES } from '../../app/pages-url.config';
import { Button, IconsItem, Input } from '@db/ui';

import s from './authentication.module.scss';

const ResetPassword = () => {
  const navigate = useNavigate();
  const path = useLocation();

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
            <h2 className={s['title']}>Восстановление пароля</h2>
            <div className={s['info']}>
              Укажите адрес электронной почты, на который нужно отправить ссылку для сброса пароля
            </div>
            <Input
              className={s['input-container']}
              label='Адрес электронной почты'
              placeholder='Введите адрес электронной почты'
            />

            <Button
              disabled
              onClick={() => {
                navigate(`${ROUTES.LOGIN}/${ROUTES.RESET_PASSWORD_SUCCESS}`);
              }}>
              Восстановить
            </Button>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ResetPassword;
