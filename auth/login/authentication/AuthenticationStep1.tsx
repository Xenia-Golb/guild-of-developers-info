import { Button, IconsItem } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/pages-url.config';
import s from './authentication.module.scss';
import imgAuth from '../../../img/login/auth.svg';
import clsx from 'clsx';

const AuthenticationStep1 = () => {
  const navigate = useNavigate();

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
        <p className={clsx(s['info-step'], 'BodyRegular')}>Шаг 1 из 3</p>
        <div className={clsx(s['title'], 'H1')}>
          Скачайте приложение Google-authenticator
          <img src={imgAuth} alt='auth' />
        </div>
        <div className={clsx(s['info'], 'BodyRegular')}>
          Скачайте на телефон Google Authenticator из Google Pay или App Store.
        </div>
        <Button
          className={clsx(['auth-button'], 'Button')}
          onClick={() => navigate(`${ROUTES.LOGIN}/${ROUTES.AUTHENTICATION}/${ROUTES.STEP_2}`)}>
          Далее
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationStep1;
