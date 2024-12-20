import { useState } from "react";
import styles from "./Information.module.css";

export function Information({ certificates }: { certificates: string[] }) {
  const [stateMenu, setStateMenu] = useState(false);

  function Certificates() {
    return (
      <div className={styles.certificates_wrapper}>
        {certificates.map((certificate: string, index: number) => {
          return (
            <div key={index}>
              <img src={"./assets/docs/" + certificate} alt="" />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <section>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          Мечтай! Действуй! Побеждай! <br /> Прими участие в чемпионате «Абилимпикс»
        </h1>
        <h2 className={styles.h2}>
          Приветствуем вас на сайте регионального центра развития <br /> движения «Абилимпикс» в Оренбургской области.
        </h2>
        <div className={styles.wrapper}>
          <div className={stateMenu ? styles.main_information_open : styles.main_information_close}>
            <p style={{ color: stateMenu ? "#0540f2" : "#000000" }}>Что такое Абилимпикс?</p>
            <button onClick={() => (stateMenu ? setStateMenu(false) : setStateMenu(true))}>
              <img src="./assets/icons/arrow.svg" alt="" />
            </button>
          </div>
          <div className={stateMenu ? styles.main_information_show : styles.main_information_hide}>
            <div className={stateMenu ? styles.descr_wrapper_show : styles.descr_wrapper_hide}>
              <p className={styles.descr}>
                <span>Абилимпикс</span> - международное движение, основной деятельностью которого является проведение конкурсов
                профессионального мастерства для людей с инвалидностью, с целью их профессиональной ориентации и содействия в
                трудоустройстве.
              </p>
              <p className={styles.descr}>
                <span>Национальный чемпионат «Абилимпикс»</span> - конкурс профессионального мастерства для людей с инвалидностью,
                проводимый на федеральном уровне.
              </p>
              <p className={styles.descr}>
                <span>Региональный чемпионат «Абилимпикс»</span> - конкурс профессионального мастерства для людей с инвалидностью,
                проводимый в субъекте Российской Федерации, является отборочным этапом к Национальному чемпионату.
              </p>
              <p className={styles.descr}>
                Официальный сайт Национальный центр <a href="">https://abilympics-russia.ru/</a>
              </p>
              <p className={styles.descr_imgs}>
                <a href="">
                  <img src="./assets/icons/vk_blue.svg" alt="" />
                </a>
                <a href="">
                  <img src="./assets/icons/tg_blue.svg" alt="" />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.achievements}>
          <p>У нашей области есть множество достижений в Абилимпикс.</p>
          <button>
            <a href="">Наши достижения</a>
          </button>
        </div>

        <div className={styles.certificates}>
          <h3 className={styles.h3}>Наши сертификаты о работе</h3>
          <Certificates />
        </div>
      </div>
    </section>
  );
}
