import { Button } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/pages-url.config';
import s from './register.module.scss';
import newPassword from '../../img/login/newPassword.svg';
import clsx from 'clsx';

const ChangePasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className={s['form-register-final']}>
      <img src={newPassword} alt='new-password' />
      <p className={clsx(s['title'], 'H1')}>Пароль успешно сохранен!</p>
      <Button
        className={clsx(s['register-button'], 'Button')}
        onClick={() => navigate(ROUTES.LOGIN)}>
        Войти в базу данных
      </Button>
    </div>
  );
};

export default ChangePasswordSuccess;
