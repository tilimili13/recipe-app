import styles from './UserItem.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserItemProps } from '../../types/User';


const UserItem: React.FC<UserItemProps> = ({ name, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUserClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/user/${name}`);
    }, 2000);
  };

  return (
    <>
    <div className={styles['user-wrapper']}>
      <div className={styles['user-button']}
      onClick={handleUserClick}>
        <span className={styles['user-name']}>{name}</span>
      </div>
      <button className={styles['delete-btn']} onClick={() => onDelete(name)}>
        ✖
      </button>
    </div>
    </>
  );
};

export default UserItem;
