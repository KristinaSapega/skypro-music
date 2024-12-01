"use client";

import Image from "next/image"
import styles from "./signin.module.css"
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser, tokenUser } from "@/store/features/authSlice";

 const Signin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { errorMessage } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState<string | null>(null);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Введите логин");
      return;
    }
    if (!formData.password) {
      setError("Введите пароль");
      return;
    }
    if (formData.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }
    try {
      await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap();
       await dispatch(tokenUser({
        email: formData.email,
        password: formData.password
      })).unwrap();

      router.push("/");
    }catch (error) {
      console.error(error)
      setError(`Ошибка при входе в систему: ${(error as Error).message}. Попробуйте снова.`);
    }
  };



  const handleMainPage = () => {
    router.push("/")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form
            onSubmit={handleSignin}
            className={styles.modalFormLogin}
            action="#">
            <a>
              <div className={styles.modalLogo}>
                <Image
                  onClick={handleMainPage}
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </a>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              className={`${styles.modalInput} ${styles.login}`}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              className={`${styles.modalInput} ${styles.password}`}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button type="submit" className={styles.modalBtnEnter}>
              <a>Войти</a>
            </button>
            <button className={styles.modalBtnSignup}>
              <a href="/signup">Зарегистрироваться</a>
            </button>
          </form>
          {(error || errorMessage) && (
            <div className={styles.error}>
              {error || errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>

  )
}
export default Signin;
