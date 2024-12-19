import s from './authentication/authentication.module.scss';
import post from '../../img/login/post.svg';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

const ResetPasswordSuccess = () => {
  const location = useLocation();
  const email = location.state?.email || 'ivan@mail.ru';

  return (
    <div className={s['form-auth-final']}>
      <img src={post} alt='post-photo' />
      <p className={clsx(s['title'], 'H1')}>Проверьте почту</p>
      <div className={clsx(s['info'], 'BodyRegular')}>
        На почту {email} отправлено письмо с инструкцией по сбросу пароля
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
