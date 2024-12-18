import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTES } from "../../app/pages-url.config";
import { Button, Checkbox, Input, PasswordInput } from "@db/ui";
import Authentication from "./authentification/Authentication";
import ResetPassword from "./ResetPassword";
import s from "./login.module.scss";
import LeftPanel from "./leftPanel/leftPanel";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticationPage, setIsAuthenticationPage] = useState(false);
  const [isResetPasswordPage, setIsResetPasswordPage] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const path = useLocation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    navigate(ROUTES.AUTHENTICATION);
    setIsAuthenticationPage(true);
  };

  useEffect(() => {
    if (path.pathname === ROUTES.LOGIN) {
      setIsAuthenticationPage(false);
      setIsResetPasswordPage(false);
    }
  }, [path]);

  useEffect(() => {
    setShowEmailError(!!errors.email);
    setShowPasswordError(!!errors.password);
  }, [errors]);

  return (
    <div className={s["wrapper"]}>
      <LeftPanel />
      <div className={s["form-container"]}>
        <div className={s["form"]}>
          {!isAuthenticationPage ? (
            !isResetPasswordPage ? (
              <form className={s["form"]} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={clsx(s["title"], "H1")}>
                  Вход в личный кабинет
                </h2>
                <div className={clsx(s["form-inputs"], "BodyRegular")}>
                  <div className={s["input-wrapper"]}>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Это поле обязательно",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Некорректный формат email",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className={s["form-input"]}
                          label="Адрес электронной почты"
                          placeholder="Введите адрес электронной почты"
                          error={showEmailError}
                        />
                      )}
                    />
                    {showEmailError && (
                      <div className={s["error-message"]}>
                        {errors.email?.message}
                      </div>
                    )}
                  </div>
                  <div className={s["input-wrapper"]}>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Это поле обязательно",
                        minLength: {
                          value: 12,
                          message:
                            "Пароль должен содержать не менее 12 символов",
                        },
                        pattern: {
                          value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{12,}$/,
                          message:
                            "Пароль должен содержать не менее 12 символов, хотя бы одну цифру, одну заглавную и одну строчную букву",
                        },
                      }}
                      render={({ field }) => (
                        <PasswordInput
                          {...field}
                          className={s["form-input"]}
                          label="Пароль"
                          placeholder="Введите пароль"
                          error={showPasswordError}
                        />
                      )}
                    />
                    {showPasswordError && (
                      <div className={s["error-message"]}>
                        {errors.password?.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className={s["inputs-bottom"]}>
                  <label>
                    <Checkbox
                      className={clsx(s["checkbox"], "Label")}
                      label="Запомнить меня"
                      onChange={handleCheckboxChange}
                      isChecked={isChecked}
                    />
                  </label>
                  <button
                    className={clsx(s["forget-button"], "BodyTable")}
                    onClick={() => {
                      setIsResetPasswordPage(true);
                      navigate(ROUTES.RESET_PASSWORD);
                    }}
                  >
                    Забыли пароль?
                  </button>
                </div>

                <Button className={clsx(s["auth-button"], "Button")}>
                  Войти
                </Button>
              </form>
            ) : (
              <ResetPassword />
            )
          ) : (
            <>
              <Authentication />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
