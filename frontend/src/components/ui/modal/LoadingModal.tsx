import styles from "./LoadingModal.module.css";
import spinner from "../../../assets/Spinner@1x-1.0s-200px-200px.svg";

const LoadingModal = () => {
  return (
    <div className={styles["modalOverlay"]}>
      <div className={styles["modalContent"]}>
        <h3>Loading...</h3>
        <img src={spinner} alt="Loading..." className={styles["spinner"]} />
      </div>
    </div>
  );
};

export default LoadingModal;
