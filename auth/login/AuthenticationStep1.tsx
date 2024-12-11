import { Button, IconsItem } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/pages-url.config';
import s from './authentication.module.scss';
import imgAuth from '../../img/login/auth.svg';

const AuthenticationStep1 = () => {
  const navigate = useNavigate();

  return (
    <div className={s['container']}>
      <button
        className={s['back-button']}
        onClick={() => {
          navigate(-1);
        }}>
        <IconsItem className={s['icon']} icon='chevronLeft' width={15} height={15} />
        Назад
      </button>
      <div className={s['form']}>
        <p className={s['info-step']}>Шаг 1 из 3</p>
        <div className={s['title']}>
          Скачайте приложение Google-authenticator
          <img src={imgAuth} alt='auth' />
        </div>
        <div className={s['info']}>
          Скачайте на телефон Google Authenticator из Google Pay или App Store.
        </div>
        <Button
          className={s['auth-button']}
          onClick={() => navigate(`${ROUTES.LOGIN}/${ROUTES.AUTHENTICATION}/${ROUTES.STEP_2}`)}>
          Далее
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationStep1;
