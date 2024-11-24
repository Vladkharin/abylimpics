import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <a className={styles.link_for_disabled_person} href="">
            <img src="./assets/icons/eye icon.svg" alt="" />
            <p className={styles.text_for_disabled_person}>Версия для слабовидящих</p>
          </a>
        </div>
        <div className={styles.main_information}>
          <div className={styles.container}>
            <div className={styles.main_information_wrapper}>
              <div className={styles.logo}>
                <a href="">
                  <img src="./assets/icons/logo.svg" alt="" />
                </a>
              </div>
              <nav className={styles.nav}>
                <a href="">Основные сведения</a>
                <a href="">Региональный чемпионат «Абилимпикс»</a>
                <a href="">Национальный чемпионат «Абилимпикс»</a>
                <a href="">Межчемпионатные мероприятия</a>
                <a href="">Трудоустройство</a>
                <a href="">Добровольчество «Абилимпикс»</a>
                <a href="">Региональный центр обучения экспертов «Абилимпикс»</a>
                <a href="">Партнеры</a>
                <a href="">Горячая линия</a>
                <a href="">Молодежное содружество «Абилимпикс»</a>
                <a href="">Новости</a>
                <a href="">Галерея</a>
                <a href="">Истории успеха участников «Абилимпикс» Оренбургской области</a>
              </nav>
              <div className={styles.main_information_inner}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
