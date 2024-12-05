import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h3 className={styles.h3}>Контактная информация</h3>
        <p>
          Наш адрес: <br />
          460009, г. Оренбург, ул. Кичигина, 4
        </p>
        <p>
          Приемная директора <br />
          <span>8 (3532) 57-24-89</span>
        </p>
        <p>
          Приемная комиссия <br />
          <span>8 (3532) 57-24-71</span>
        </p>
        <p>
          Бухгалтерия <br />
          <span>8 (3532) 57-26-69</span>
        </p>
        <p>
          Адрес электронной почты: <br />
          <span>
            {" "}
            <a href="mailto:oatkbvn@esoo.ru">oatkbvn@esoo.ru</a>
          </span>
        </p>
      </div>
      <div className={styles.downText}>© 2019-2023 gapou-oatk.ru</div>
    </footer>
  );
}
