import { useState } from 'react';
import styles from './SubmitForm.module.css';

interface SubmitFormProps {
  users: string[];
  onAddUser: (name: string) => void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({ users, onAddUser}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = inputValue.trim();
    const normalized = name.toLowerCase();

    if (!name) {
      alert('Please enter a name!');
      return;
    }

    if (users.map(u => u.toLowerCase()).includes(normalized)) {
      alert('User already exists');
      return;
    }

    if (users.length >= 3) {
      alert('Maximum of 3 users allowed');
      return;
    }

    onAddUser(name);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['input-box']}>
        <input
          type="text"
          placeholder="New User"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
};

export default SubmitForm;
