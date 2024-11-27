import React, { useState } from "react";
import styles from "./News.module.css";

export function News({
  news,
  secondMenu,
}: {
  news: {
    img: string;
    date: string;
    descr: string;
  }[];
  secondMenu: {
    title: string;
    menu: {
      highlighted: string;
      sentence: string;
    }[];
  };
}) {
  function NewsTiles() {
    return (
      <div className={styles.wrapper}>
        {news.map((item, index) => {
          if (index >= 5) {
            return;
          }
          return (
            <React.Fragment key={index}>
              <a className={styles.tile} href="">
                <div>
                  <img src={"./assets/img/" + item.img} alt="news" />
                </div>
                <div className={styles.texts}>
                  <div className={styles.date}>{item.date}</div>
                  <p className={styles.descr}>{item.descr}</p>
                </div>
              </a>
              <div className={styles.line} style={{ display: index == 4 ? "none" : "block" }} />
            </React.Fragment>
          );
        })}
        <button className={styles.button}>Все Новости</button>
      </div>
    );
  }

  const [firstStateMenu, setFirstStateMenu] = useState(false);
  const [secondStateMenu, setSecondStateMenu] = useState(false);
  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <h3 className={styles.h3}>Новости</h3>
        <NewsTiles />
        <SecondMenu firstStateMenu={firstStateMenu} setFirstStateMenu={setFirstStateMenu} secondMenu={secondMenu} />
        <div className={styles.wrapper}>
          <div className={secondStateMenu ? styles.main_information_open : styles.main_information_close}>
            <p style={{ color: secondStateMenu ? "#0540f2" : "#000000" }}>
              Из числа прошедших аккредитацию национальных экспертов, отобранных Национальным центром «Абилимпикс» для проведения оценки в
              соревновательных мероприятиях в г. Москва будут направлены 7 экспертов от образовательных организаций области, в составе
              которых:
            </p>
            <button onClick={() => (secondStateMenu ? setSecondStateMenu(false) : setSecondStateMenu(true))}>
              <img src="./assets/icons/arrow.svg" alt="" />
            </button>
          </div>
          <div className={secondStateMenu ? styles.main_information_show : styles.main_information_hide}>
            <div className={secondStateMenu ? styles.descr_wrapper_show : styles.descr_wrapper_hide}>
              <p className={styles.descr}>
                <span>- Курзина Ирина Николаевна</span>, главный эксперт компетенции «Бисероплетение» ГБОУ «Специальная (коррекционная)
                общеобразовательная школа-интернат» г. Новотроицка Оренбургской области;
              </p>
              <p className={styles.descr}>
                <span>- Коптелова Екатерина Юрьевна</span>, главный эксперт компетенции «Информационная безопасность» Университетский
                колледж ФГБОУ ВО «Оренбургский государственный университет»;
              </p>
              <p className={styles.descr}>
                <span>- Зарипова Роза Гафурзяновна</span>, эксперт компетенции «Малярное дело» ГАПОУ «Гуманитарно-технический техникум» г.
                Оренбурга;
              </p>
              <p className={styles.descr}>
                <span>- Исаева Татьяна Александровна</span>, эксперт компетенции «Инженерный дизайн (CAD) САПР» ГАПОУ «Орский нефтяной
                техникум им. Героя Советского Союза В.А. Сорокина»;
              </p>
              <p className={styles.descr}>
                <span>- Савинкова Ольга Валентиновна</span>, эксперт компетенции «Портной» ГБОУ «Специальная (коррекционная)
                общеобразовательная школа-интернат» г. Новотроицка Оренбургской области;
              </p>
              <p className={styles.descr}>
                <span>- Москалева Оксана Геннадьевна</span>, эксперт компетенции «Электромонтаж» ГАПОУ «Гуманитарно-технический техникум» г.
                Оренбурга;
              </p>
              <p className={styles.descr}>
                <span>- Гапоненко Андрей Викторович</span>, эксперт компетенции «Электропривод и автоматика» Университетский колледж ФГБОУ
                ВО «Оренбургский государственный университет».
              </p>
            </div>
          </div>
        </div>

        <div className={styles.links}>
          <a href="">
            <img src="./assets/icons/pdd.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/spoo.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/ko.png" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/mnvorf.svg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/ro.png" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/edir.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/cor.png" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/fcior.png" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/mo.png" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/img.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/td.png" alt="" />
          </a>
          <a href="" className={styles.text}>
            COVID-19
          </a>
          <a href="">
            <img src="./assets/icons/ceil.jpg" alt="" />
          </a>
          <a href="">
            <img src="./assets/icons/oatk.png" alt="" />
          </a>
          <div className={styles.social_links}>
            <img src="./assets/icons/o.jpg" alt="" />
            <img src="./assets/icons/vk.jpg" alt="" />
            <img src="./assets/icons/rutube.jpg" alt="" />
            <img src="./assets/icons/yt.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SecondMenu({
  firstStateMenu,
  setFirstStateMenu,
  secondMenu,
}: {
  firstStateMenu: boolean;
  setFirstStateMenu: React.Dispatch<React.SetStateAction<boolean>>;
  secondMenu: {
    title: string;
    menu: {
      highlighted: string;
      sentence: string;
    }[];
  };
}) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.main_information}
        style={{
          background: firstStateMenu ? "#e4ebf9" : "#ffffff",
          borderRadius: firstStateMenu ? "20px 20px 0 0" : "20px",
          transition: "all 1s ease-in-out",
        }}
      >
        <p style={{ color: firstStateMenu ? "#0540f2" : "#000000" }}>{secondMenu.title}</p>

        <button
          onClick={() => (firstStateMenu ? setFirstStateMenu(false) : setFirstStateMenu(true))}
          style={{ rotate: firstStateMenu ? "180deg" : "0deg" }}
        >
          <img src="./assets/icons/arrow.svg" alt="" />
        </button>
      </div>
      <div
        className={firstStateMenu ? styles.main_information_show : styles.main_information_hide}
        style={{ transition: "all 1s ease-in-out" }}
      >
        <div className={firstStateMenu ? styles.descr_wrapper_show : styles.descr_wrapper_hide}>
          {secondMenu.menu.map((item, index) => {
            return (
              <p key={index} className={styles.descr}>
                <span>{item.highlighted}</span> {item.sentence}
              </p>
            );
          })}
          {/* <p className={styles.descr}>
            <span>- Радаева Светлана Васильевна</span>, участник по компетенции «Банковское дело» в категории «Специалисты» от ГАПОУ
            «Орский нефтяной техникум им. Героя Советского Союза В.А. Сорокина»;
          </p>
          <p className={styles.descr}>
            <span>- Беседина Полина Александровна</span>, участник по компетенции «Бисероплетение» в категории «Студенты» от ГБОУ
            «Специальная (коррекционная) общеобразовательная школа-интернат» г. Новотроицка Оренбургской области, наставник Курзина Ирина
            Николаевна;
          </p>
          <p className={styles.descr}>
            <span>- Жаргасов Тамерлан Сагидуллович</span>, участник по компетенции «Веб-разработка (Программирование)» в категории
            «Студенты» от ГАПОУ «Орский нефтяной техникум им. Героя Советского Союза В.А. Сорокина», наставник Финк Игорь Валерьевич;
          </p>
          <p className={styles.descr}>
            <span>- Коваленко Данил Николаевич</span>, участник по компетенции «Гончарное дело» в категории «Студенты» от ГАПОУ
            «Гуманитарно-технический техникум» г. Оренбурга, наставник Грекова Яна Сергеевна;
          </p>
          <p className={styles.descr}>
            <span>- Балашов Степан Геннадьевич</span>, участник по компетенции «Информационная безопасность» в категории «Школьники» от
            МОАУ «Средняя общеобразовательная школа № 18» г. Оренбурга, наставник Коптелова Екатерина Юрьевна;
          </p>
          <p className={styles.descr}>
            <span>- Радченко Егор Алексеевич</span>, участник по компетенции «Ландшафтный дизайн» в категории «Школьники» от МОАУ «Средняя
            общеобразовательная школа № 35» г. Оренбурга, наставник Нетёса Татьяна Евгеньевна;
          </p>
          <p className={styles.descr}>
            <span>- Понамарев Сергей Вячеславович</span>, участник по компетенции «Малярное дело» в категории «Студенты» от ГАПОУ
            «Гуманитарно-технический техникум» г. Оренбурга, наставник Зарипова Роза Гафурзяновна;
          </p>
          <p className={styles.descr}>
            <span>- Кудинов Михаил Алексеевич</span>, участник по компетенции «Малярное дело» в категории «Школьники» от ГБОУ «Специальная
            (коррекционная) общеобразовательная школа-интернат» г. Новотроицка Оренбургской области, наставник Косенок Татьяна Петровна;
          </p>
          <p className={styles.descr}>
            <span>- Головач Иван Олегович</span>, участник по компетенции «Ремонт и обслуживание автомобиля» в категории «Школьники» от
            МОАУ «Основная общеобразовательная школа № 3» г. Оренбурга, наставник Поветьев Павел Юрьевич;
          </p>
          <p className={styles.descr}>
            <span>- Швардыгула Илья Сергеевич</span>, участник по компетенции «Ремонт и обслуживание автомобиля» в категории «Специалисты»
            от Оренбургского регионального отделения Общероссийской общественной организации инвалидов «Всероссийское общество глухих»;
          </p>
          <p className={styles.descr}>
            <span>- Невзоров Михаил Сергеевич</span>, участник по компетенции «Ремонт и обслуживание автомобиля» в категории «Студенты» от
            ГАПОУ «Новотроицкий строительный техникум», наставник Горшенина Наталья Александровна;
          </p>
          <p className={styles.descr}>
            <span>- Безмельницын Дмитрий Викторович</span>, участник по компетенции «Сухое строительство и штукатурные работы» в категории
            «Специалисты» от Оренбургского регионального отделения Общероссийской общественной организации инвалидов «Всероссийское
            общество глухих»;
          </p>
          <p className={styles.descr}>
            <span>- Чередниченко Владислав Викторович</span>, участник по компетенции «Сухое строительство и штукатурные работы» в
            категории «Студенты» от ГАПОУ «Оренбургский автотранспортный колледж им. Заслуженного учителя Российской Федерации В.Н.
            Бевзюка», наставник Григорьева Оксана Владимировна;
          </p>
          <p className={styles.descr}>
            <span>- Кузьмищев Артем Александрович</span>, участник по компетенции «Токарные работы на станках с ЧПУ» в категории
            «Школьники» от ГБОУ «Специальная (коррекционная) школа-интернат № 3» г. Оренбурга, наставник Явгастин Артур Масхутович;
          </p>
          <p className={styles.descr}>
            <span>- Христофорова Валерия Константиновна</span>, участник по компетенции «Швея» в категории «Студенты» от ГАПОУ «Колледж
            сервиса г. Оренбурга», наставник Тесман Надежда Викторовна;
          </p>
          <p className={styles.descr}>
            <span>- Пачин Алексей Александрович</span>, участник по компетенции «Электромонтаж» в категории «Студенты» от ГАПОУ
            «Гуманитарно-технический техникум» г. Оренбурга, наставник Москалева Оксана Геннадьевна;
          </p>
          <p className={styles.descr}>
            <span>- Тазеев Никита Владимирович</span>, участник по компетенции «Электропривод и автоматика» в категории «Студенты» от
            Университетского колледжа ФГБОУ ВО «Оренбургский государственный университет», наставник Гапоненко Андрей Викторович.
          </p> */}
        </div>
      </div>
    </div>
  );
}
