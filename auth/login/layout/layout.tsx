import styles from './layout.module.scss';
import { Logo } from '@db/ui';
import svg from '../../../img/login/wing-icon 1.svg';

function Layout() {
  return (
    <div className={styles['layout']}>
      <div style={{ padding: '35px' }}>
        <Logo />
      </div>
      <div className={styles['bottomImageWrapper']}></div>
      <div className={styles['bottomTextBlock']}>
        <div className={styles['bottomText']}>
          Получите коммерческий опыт <span>бесплатно</span>
          <img src={svg} alt='text-logo-svg' />
        </div>
      </div>
    </div>
  );
}

export default Layout;
