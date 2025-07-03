import { useState } from "react";
import styles from "./SubmitForm.module.css";
import { InputAlert } from "../../constants/alerts/InputAlert";

interface SubmitFormProps {
  users: string[];
  onAddUser: (name: string) => void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({ users, onAddUser }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = inputValue.trim();
    const normalized = name.toLowerCase();

    if (!name) {
      alert(InputAlert.EMPTY_NAME);
      return;
    }

    if (users.map((u) => u.toLowerCase()).includes(normalized)) {
      alert(InputAlert.USER_EXISTS);
      return;
    }

    if (users.length >= 3) {
      alert(InputAlert.MAX_USERS);
      return;
    }

    onAddUser(name);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["input-box"]}>
        <input
          type="text"
          placeholder="New User"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default SubmitForm;
