import { FC } from "react";
import styles from "./loader.module.css";
import { ReactComponent as LoaderImage } from "../../images/icon--loader.svg";

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <LoaderImage />
      <LoaderImage />
      <LoaderImage />
    </div>
  );
};

export default Loader;
