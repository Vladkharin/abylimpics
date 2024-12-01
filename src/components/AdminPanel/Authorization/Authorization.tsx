import { useEffect, useState } from "react";
import styles from "./Authorization.module.css";

type PROPS = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Authorization({ auth, setAuth }: PROPS) {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.login == "admin" && formData.password == "12345") {
      setAuth(true);
    } else {
      alert("Вы ввели не правильный логин или пароль");
    }
  }

  async function f() {
    const response = await fetch("./data/data.json");

    const data = response.json();

    return data;
  }

  useEffect(() => {
    f();
  });

  return (
    <form className={styles.form} style={{ display: auth ? "none" : "flex" }} onSubmit={(event) => handleSubmit(event)}>
      <label>
        <p>Введите логин</p>
        <input type="text" name={"login"} onChange={(event) => handleChange(event)} />
      </label>
      <label>
        <p>Введите пароль</p>
        <input type="password" name={"password"} onChange={(event) => handleChange(event)} />
      </label>
      <button type="submit">Войти</button>
    </form>
  );
}
