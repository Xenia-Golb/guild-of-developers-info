import { Button } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/pages-url.config';
import s from './register.module.scss';
import newPassword from '../../img/login/newPassword.svg';

const ChangePasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className={s['form-register-final']}>
      <img src={newPassword} alt='new-password' />
      <p className={s['title']}>Пароль успешно сохранен!</p>
      <Button className={s['register-button']} onClick={() => navigate(ROUTES.LOGIN)}>
        Войти в базу данных
      </Button>
    </div>
  );
};

export default ChangePasswordSuccess;
