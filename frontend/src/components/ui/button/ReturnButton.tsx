import { useNavigate } from "react-router-dom";
import styles from "./ReturnButton.module.css";

const ReturnButton: React.FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <button className={styles["returnBtn"]} onClick={handleReturn}>
      Go back
    </button>
  );
};

export default ReturnButton;
