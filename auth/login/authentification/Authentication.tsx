import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/pages-url.config';
import { Button } from '@db/ui';
import { userId } from '../../../entities/roles/model/mockRole';
import { permissions } from '../../../entities/roles/model/roles.types';
import { userPermissions } from '../../../entities/roles/model/permissionsDashboard';
import s from './authentication.module.scss';
import clsx from 'clsx';

const Authentication = () => {
  const navigate = useNavigate();
  const path = useLocation();

  return (
    <div className={s['container']}>
      {path.pathname === `${ROUTES.LOGIN}/${ROUTES.AUTHENTICATION}` ? (
        <>
          <div className={s['form']}>
            <h2 className={clsx(s['title'], 'H1')}>Подключите двухфакторную аутентификацию</h2>
            <div className={clsx(s['info'], 'BodyRegular')}>
              Настройте дополнительный уровень защиты, чтобы хакеры не могли получить доступ к
              вашему аккаунту
            </div>

            <Button
              className={clsx(['auth-button'], 'Button')}
              onClick={() => {
                navigate(`${ROUTES.AUTHENTICATION}/${ROUTES.STEP_1}`);
              }}>
              Подключить
            </Button>

            <Button
              type='outline'
              className={clsx(['auth-button'], 'Button')}
              onClick={() => {
                navigate(
                  permissions !== userPermissions
                    ? `${ROUTES.DASHBOARD_CANDIDATES}/${userId}`
                    : `/${ROUTES.PROFILE}/${userId}`,
                );
              }}>
              Пропустить
            </Button>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Authentication;
