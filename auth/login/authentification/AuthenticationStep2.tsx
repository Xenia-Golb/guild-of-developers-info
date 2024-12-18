import { Button, IconsItem, Input } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/pages-url.config';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import s from './authentication.module.scss';
import clsx from 'clsx';

const AuthenticationStep2 = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [qrValue, setQrValue] = useState('');

  // Функция для генерации случайного 6-значного кода
  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); // Генерация 6-значного числа
    setCode(randomCode.toString());
    setQrValue(`otpauth://totp/YourAppName?secret=${randomCode}&issuer=YourAppName`); // Формирование строки для QR-кода
  };

  useEffect(() => {
    generateCode();
  }, []);

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
        <p className={clsx(s['info-step'], 'BodyRegular')}>Шаг 2 из 3</p>
        <p className={clsx(s['title'], 'H1')}>
          Отсканируйте этот QR-код в приложении Google-authenticator
        </p>

        <div className={s['qr-code-wrapper']}>
          <QRCodeSVG value={qrValue} size={108} fgColor='#1c1f21' />
        </div>

        <div className={clsx(s['info'], 'BodyRegular')}>
          Если вы не можете отсканировать QR-код, введите этот код вручную в приложении
          Google-authenticator
        </div>
        <Input
          className={clsx(s['input-container'], 'BodyRegular')}
          type='text'
          label='Код'
          value={code}
          readOnly
        />

        <Button
          className={clsx(['auth-button'], 'Button')}
          onClick={() => navigate(`${ROUTES.LOGIN}/${ROUTES.AUTHENTICATION}/${ROUTES.STEP_3}`)}>
          Далее
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationStep2;
