import { useState } from "react";
import styles from "./AdminPanel.module.css";
import { Authorization } from "./Authorization/Authorization";

export function AdminPanel() {
  const [auth, setAuth] = useState(false);

  return (
    <section className={styles.adminPanel}>
      <Authorization auth={auth} setAuth={setAuth} />
    </section>
  );
}
