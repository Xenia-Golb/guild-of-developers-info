import { Button } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/pages-url.config';
import { userId } from '../../../entities/roles/model/mockRole';
import { permissions } from '../../../entities/roles/model/roles.types';
import { userPermissions } from '../../../entities/roles/model/permissionsDashboard';
import s from './authentication.module.scss';
import authFinal from '../../../img/login/authFinal.svg';
import clsx from 'clsx';

const AuthenticationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className={s['form-auth-final']}>
      <img src={authFinal} alt='auth-final' />
      <p className={clsx(s['title'], 'H1')}>Двухфактроная аутентификация успешно подключена!</p>
      <Button
        className={clsx(s['auth-button'], 'Button')}
        onClick={() => {
          navigate(
            permissions !== userPermissions
              ? `${ROUTES.DASHBOARD_CANDIDATES}/${userId}`
              : `/${ROUTES.PROFILE}/${userId}`,
          );
        }}>
        Перейти в личный кабинет
      </Button>
    </div>
  );
};

export default AuthenticationSuccess;
