"use client";

import Image from "next/image";
import styles from "./signup.module.css"
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { newUser } from "@/store/features/authSlice";

const Signup = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { errorMessage } = useAppSelector(state => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.email && !formData.password) {
            setError("Введите адрес почты и пароль для регистрации");
            return;
        }
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
        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
        try {
            await dispatch(newUser({
                email: formData.email,
                password: formData.password,
            }))
                .unwrap();
            router.push("/login")
        } catch (error) {
            console.error(error)
            setError(`Ошибка при входе в систему: ${(error as Error).message}.Попробуйте снова.`);
        }
    };

    const handleMainPage = () => {
        router.push("/")
    }



    return (
        <div className={styles.wrapper}>
            <div className={styles.containerSignup}>
                <div className={styles.modalBlock}>
                    <form onSubmit={handleSignup} className={styles.modalFormLogin}>
                        <a href="../">
                            <div className={styles.modalLogo}>
                                <Image
                                    onClick={handleMainPage}
                                    src="/img/logo_modal.png"
                                    alt="logo"
                                    width={140}
                                    height={21} />
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
                            className={`${styles.modalInput} ${styles.passwordFirst}`}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <input
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            value={formData.confirmPassword}
                            className={`${styles.modalInput} ${styles.passwordDouble}`}
                            type="password"
                            name="password"
                            placeholder="Повторите пароль"
                        />
                        <button className={styles.modalBtnSignupEnt}>
                            <a>Зарегистрироваться</a>
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
export default Signup;