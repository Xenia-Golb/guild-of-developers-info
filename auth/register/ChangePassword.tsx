import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../app/pages-url.config';
import { Button, IconsItem, PasswordInput } from '@db/ui';

import s from './register.module.scss';

const ChangePassword = () => {
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
      <h2 className={s['title']}>Создайте новый пароль</h2>
      <div className={s['form-inputs']}>
        <PasswordInput
          className={s['form-input']}
          label='Новый пароль'
          placeholder='Введите пароль'
        />
        <PasswordInput
          className={s['form-input']}
          label='Повторите пароль'
          placeholder='Введите пароль повторно'
        />
      </div>

      <Button
        // disabled
        className={s['register-button']}
        onClick={() => {
          navigate(`${ROUTES.REGISTER}/${ROUTES.CHANGE_PASSWORD_SUCCESS}`);
        }}>
        Сохранить
      </Button>
    </div>
  );
};

export default ChangePassword;
