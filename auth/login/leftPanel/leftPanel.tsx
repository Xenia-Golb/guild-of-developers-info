import styles from './leftPanel.module.scss';
import { Logo } from '@db/ui';
import svg from '../../../img/login/wing-icon 1.svg';
import clsx from 'clsx';

function LeftPanel() {
  return (
    <div className={styles['layout']}>
      <div className={styles['logo']}>
        <Logo />
      </div>
      <div className={styles['bottomImageWrapper']}></div>
      <div className={styles['bottomTextBlock']}>
        <div className={clsx(styles['BottomText'], 'Mega')}>
          <div>Получите коммерческий </div>
          <div className={styles['bottomTextBlock__flex']}>
            опыт <span>бесплатно</span>
            <img src={svg} alt='text-logo-svg' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
