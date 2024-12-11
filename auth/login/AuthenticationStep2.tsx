import { Button, IconsItem, Input } from '@db/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/pages-url.config';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Импортируем QRCode как default
import s from './authentication.module.scss';

const AuthenticationStep2 = () => {
  const navigate = useNavigate();

  // Состояние для сгенерированного кода
  const [code, setCode] = useState('');
  const [qrValue, setQrValue] = useState('');

  // Функция для генерации случайного 6-значного кода
  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); // Генерация 6-значного числа
    setCode(randomCode.toString());
    setQrValue(`otpauth://totp/YourAppName?secret=${randomCode}&issuer=YourAppName`); // Формирование строки для QR-кода
  };

  // Генерация нового кода при монтировании компонента
  useEffect(() => {
    generateCode();
  }, []);

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
        <p className={s['info-step']}>Шаг 2 из 3</p>
        <p className={s['title']}>Отсканируйте этот QR-код в приложении Google-authenticator</p>

        {/* Генерация QR-кода */}
        <div className={s['qr-code-wrapper']}>
          <QRCodeSVG value={qrValue} size={108} fgColor='#1c1f21' />
        </div>

        <div className={s['info']}>
          Если вы не можете отсканировать QR-код, введите этот код вручную в приложении
          Google-authenticator
        </div>

        {/* Отображение сгенерированного кода */}
        <Input
          className={s['input-container']}
          type='text'
          label='Код'
          value={code} // Используем сгенерированный код
          readOnly // Делаем поле только для чтения
        />

        <Button
          className={s['auth-button']}
          onClick={() => navigate(`${ROUTES.LOGIN}/${ROUTES.AUTHENTICATION}/${ROUTES.STEP_3}`)}>
          Далее
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationStep2;
