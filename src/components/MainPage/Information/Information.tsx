import { useState } from "react";
import styles from "./Information.module.css";
import { voiceHelper } from "../../../App";

export function Information({ certificates, voiceHelperState }: { certificates: string[]; voiceHelperState: boolean }) {
  const [stateMenu, setStateMenu] = useState(false);

  function Certificates() {
    return (
      <div className={styles.certificates_wrapper}>
        {certificates.map((certificate: string, index: number) => {
          return (
            <div key={index}>
              <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src={"./docs/" + certificate} alt="Сертификат" />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <section>
      <div className={styles.container}>
        <h1 className={styles.h1} onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}>
          Нет предела - действуй смело!
        </h1>
        <h2 onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.h2}>
          Приветствуем вас на сайте регионального центра развития <br /> движения «Абилимпикс» в Оренбургской области.
        </h2>
        <div className={styles.wrapper}>
          <div className={stateMenu ? styles.main_information_open : styles.main_information_close}>
            <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} style={{ color: stateMenu ? "#0540f2" : "#000000" }}>
              Что такое Абилимпикс?
            </p>
            <button onClick={() => (stateMenu ? setStateMenu(false) : setStateMenu(true))}>
              <img
                onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                src="./icons/arrow.svg"
                alt={stateMenu ? "Закрыть" : "Открыть"}
              />
            </button>
          </div>
          <div className={stateMenu ? styles.main_information_show : styles.main_information_hide}>
            <div className={stateMenu ? styles.descr_wrapper_show : styles.descr_wrapper_hide}>
              <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.descr}>
                <span>Абилимпикс</span> - международное движение, основной деятельностью которого является проведение конкурсов
                профессионального мастерства для людей с инвалидностью, с целью их профессиональной ориентации и содействия в
                трудоустройстве.
              </p>
              <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.descr}>
                <span>Национальный чемпионат «Абилимпикс»</span> - конкурс профессионального мастерства для людей с инвалидностью,
                проводимый на федеральном уровне.
              </p>
              <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.descr}>
                <span>Региональный чемпионат «Абилимпикс»</span> - конкурс профессионального мастерства для людей с инвалидностью,
                проводимый в субъекте Российской Федерации, является отборочным этапом к Национальному чемпионату.
              </p>
              <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.descr}>
                Официальный сайт Национальный центр <a href="">https://abilympics-russia.ru/</a>
              </p>
              <p className={styles.descr_imgs}>
                <a href="https://vk.com/abilympics">
                  <img
                    onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
                    src="./icons/vk_blue.svg"
                    alt="вконтакте абилимпикс"
                  />
                </a>
                <a href="https://t.me/abilympics_russia">
                  <img onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} src="./icons/tg_blue.svg" alt="телеграм абилимпикс" />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.achievements}>
          <p onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}>У нашей области есть множество достижений в Абилимпикс.</p>
          <button>
            <a
              onMouseEnter={(event) => voiceHelper(event, voiceHelperState)}
              href="https://gapou-oatk.ru/%D0%9E%D1%80%D0%B5%D0%BD%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%B8%D0%B9-%D1%87%D0%B5%D0%BC%D0%BF%D0%B8%D0%BE%D0%BD%D0%B0%D1%82-%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%81%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BC%D0%B0%D1%81%D1%82%D0%B5%D1%80%D1%81%D1%82%D0%B2%D0%B0-%D0%90%D0%B1%D0%B8%D0%BB%D0%B8%D0%BC%D0%BF%D0%B8%D0%BA%D1%81"
            >
              Наши достижения
            </a>
          </button>
        </div>

        <div className={styles.certificates}>
          <h3 onMouseEnter={(event) => voiceHelper(event, voiceHelperState)} className={styles.h3}>
            Наши сертификаты о работе
          </h3>
          <Certificates />
        </div>
      </div>
    </section>
  );
}
