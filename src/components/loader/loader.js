import styles from "./loader.module.css";
import { ReactComponent as LoaderImage } from "../../images/icon--loader.svg";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderImage />
      <LoaderImage />
      <LoaderImage />
    </div>
  );
};

export default Loader;
