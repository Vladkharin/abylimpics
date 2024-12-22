import { voiceHelper } from "../../../App";
import styles from "./Footer.module.css";

export function Footer({ voiceHelperState }: { voiceHelperState: boolean }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h3 onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.h3}>
          Контактная информация
        </h3>
        <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}>
          Наш адрес: <br />
          460009, г. Оренбург, ул. Кичигина, 4
        </p>
        <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}>
          Приемная директора <br />
          <span>8 (3532) 57-24-89</span>
        </p>
        <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}>
          Приемная комиссия <br />
          <span>8 (3532) 57-24-71</span>
        </p>
        <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}>
          Бухгалтерия <br />
          <span>8 (3532) 57-26-69</span>
        </p>
        <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}>
          Адрес электронной почты: <br />
          <span>
            {" "}
            <a href="mailto:oatkbvn@esoo.ru">oatkbvn@esoo.ru</a>
          </span>
        </p>
      </div>
      <div onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.downText}>
        © 2019-2024 gapou-oatk.ru
      </div>
    </footer>
  );
}
