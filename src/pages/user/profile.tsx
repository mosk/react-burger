import { useState, useRef, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshUserRequest } from "../../services/actions/auth";
import Loader from "../../components/loader/loader";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Nav } from "../../components/profile/nav/nav";
import styles from "./profile.module.css";
import { TStore, TFormEvent, TInputEvent } from "../../types/types";

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { authFailed, email, name, message, isAuthChecked } = useSelector((store: TStore) => store.auth);
  const [form, setForm] = useState({
    name: name,
    email: email,
    password: "",
  });
  const [show, setButtons] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onChange = (e: TInputEvent) => {
    type TTarget = {
      name?: any;
      value?: string;
    };

    setForm({ ...form, [(e.target as TTarget).name]: (e.target as TTarget).value });

    if (email !== form.email || name !== form.name) {
      setButtons(true);
    }
  };

  const onSubmitHandler = (e: TFormEvent) => {
    e.preventDefault();
    dispatch(refreshUserRequest(form) as any);
  };

  const onResetHandler = (e: TFormEvent) => {
    e.preventDefault();
    setForm({ ...form, name, email, password: "" });
  };

  if (!isAuthChecked) {
    return <Loader />;
  } else {
    return (
      <main className={styles.container}>
        <>
          <Nav />
          <section className={styles.content}>
            <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">Персональные данные</h2>
            <form className={styles.form} onSubmit={(e) => onSubmitHandler(e)} onReset={(e) => onResetHandler(e)}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => onChange(e)}
                icon={"EditIcon"}
                value={form.name}
                name={"name"}
                error={false}
                ref={nameRef}
                required={true}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="mb-6"
              />
              <Input
                type={"email"}
                placeholder={"Логин"}
                onChange={(e) => onChange(e)}
                icon={"EditIcon"}
                value={form.email}
                name={"email"}
                error={false}
                ref={emailRef}
                required={true}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="mb-6"
              />
              <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={(e) => onChange(e)}
                icon={"EditIcon"}
                value={form.password}
                name={"password"}
                error={false}
                ref={passwordRef}
                required={true}
                errorText={"Ошибка"}
                size={"default"}
                extraClass="mb-6"
              />
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                disabled={!show}
                extraClass={styles["button--submit"]}
              >
                Сохранить
              </Button>
              <Button
                htmlType="reset"
                type="primary"
                size="large"
                disabled={!show}
                extraClass={styles["button--reset"]}
              >
                Отмена
              </Button>
              {authFailed && <p className="text text_type_main-default text_color_inactive mt-4">{message}</p>}
            </form>
          </section>
        </>
      </main>
    );
  }
};
