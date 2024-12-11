import s from './authentication.module.scss';
import post from '../../img/login/post.svg';
const ResetPasswordSuccess = () => {
  return (
    <div className={s['form-auth-final']}>
      <img src={post} alt='post-photo' />
      <p className={s['title']}>Проверьте почту</p>
      <div className={s['info']}>
        На почту ivan@mail.ru отправлено письмо с инструкцией по сбросу пароля
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
