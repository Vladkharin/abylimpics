import React, { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import { Authorization } from "./Authorization/Authorization";
import { DATA, MAINPAGE } from "../../App";

export function AdminPanel() {
  const [auth, setAuth] = useState(false);
  // const [buttonState, setButtonState] = useState("mainpage");

  const [data, setData] = useState<DATA>();

  async function f() {
    const response = await fetch("./data/data.json");

    const data = response.json();

    return data;
  }

  async function changeState() {
    const data = await f();

    setData(data);
  }

  useEffect(() => {
    changeState();
  }, []);

  if (!data) {
    return;
  }

  return (
    <section className={styles.adminPanel}>
      <Authorization auth={auth} setAuth={setAuth} />

      <div style={{ display: auth ? "block" : "none" }}>
        <div className={styles.button_wrapper}>
          <button id={"mainpage"}> Главная страница</button>
          <button> Пункты</button>
          <button> Подпункты</button>
        </div>
        <div>
          <div>
            <div> Сертификаты </div>
            <div className={styles.cerificates_wrapper}>
              {data.mainPage.certificates.map((item, index) => (
                <div key={index}>
                  <img src={"./assets/img/" + item} alt="certificates" />
                  <button onClick={(event) => deleteCertificates(index, event, data, setData)}> Удалить</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function editCertificates(data: DATA, setData: React.Dispatch<React.SetStateAction<DATA | undefined>>, index: number) {
  setData({
    ...data,
    mainPage: { ...data.mainPage, certificates: data.mainPage.certificates.filter((certificate, indexEl) => indexEl != index) },
  });
}
async function deleteCertificates(
  index: number,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: DATA,
  setData: React.Dispatch<React.SetStateAction<DATA | undefined>>
) {
  event.preventDefault();

  return editCertificates(data, setData, index);

  // const object = {
  //   index: index,
  //   group: "mainPage",
  // };

  // const response = await fetch("./phpFiles/delete.php", {
  //   method: "POST",
  //   body: JSON.stringify(object),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}
