import { Button, IconsItem, Input } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/pages-url.config';
import s from './authentication.module.scss';

const AuthenticationStep3 = () => {
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
        <p className={s['info-step']}>Шаг 3 из 3</p>
        <p className={s['title']}>Введите 6-ти значный код из Google-authenticator</p>
        <Input className={s['input-container']} type='text' label='Код' placeholder='Введите код' />
        <Button
          className={s['auth-button']}
          onClick={() => navigate(`${ROUTES.LOGIN}/${ROUTES.AUTHENTICATION}/${ROUTES.SUCCESS}`)}>
          Подключить
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationStep3;
