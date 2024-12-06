import React, { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import { Authorization } from "./Authorization/Authorization";
import { DATA } from "../../App";

export function AdminPanel() {
  const [auth, setAuth] = useState(false);
  // const [buttonState, setButtonState] = useState("mainpage");

  const [data, setData] = useState<DATA>();

  async function f() {
    const response = await fetch("./data/data.json");

    const data = await response.json();

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
                  <form onSubmit={(event) => deleteCertificates(index, event, data, setData)}>
                    <button type="submit"> Удалить</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function editCertificates(data: DATA, index: number) {
  return (data = {
    ...data,
    mainPage: {
      ...data.mainPage,
      certificates: data.mainPage.certificates.filter(
        (certificate, indexEl) => indexEl != index && data.mainPage.certificates[index] == certificate
      ),
    },
  });
}
async function deleteCertificates(
  index: number,
  event: React.FormEvent<HTMLFormElement>,
  data: DATA,
  setData: React.Dispatch<React.SetStateAction<DATA | undefined>>
) {
  event.preventDefault();

  const dataEl: DATA = editCertificates(data, index);

  setData({ ...dataEl });

  const response = await fetch("delete.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: dataEl }),
  });

  const dataRequest = await response.json();

  console.log(dataRequest);
}
