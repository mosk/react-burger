import { Nav } from "../../components/profile/nav/nav";

import styles from "./orders.module.css";

export const Orders = () => {
  return (
    <main className={styles.container}>
      <Nav />
      <section className={styles.content}>
        <h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">История заказов</h2>
      </section>
    </main>
  );
};
