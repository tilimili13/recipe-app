import { useState } from 'react';
import styles from './SubmitForm.module.css';
import UserItem from './UserItem';

const SubmitForm: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
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

    setUsers([...users, name]);
    setInputValue('');
  };

  const handleDelete = (nameToDelete: string) => {
    setUsers(users.filter(name => name !== nameToDelete));
  };

  return (
    <div>
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
<h2>Users</h2>
<div id="userList"></div>
      <div>
        {users.map((user) => (
          <UserItem key={user} name={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default SubmitForm;
