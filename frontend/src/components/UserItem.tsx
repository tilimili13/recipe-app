import styles from './UserItem.module.css';
import LoadingModal from './LoadingModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface UserItemProps {
  name: string;
  onDelete: (name: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ name, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUserClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/user/${name}`);
    }, 5000);
  };

  return (
    <>
      {loading && <LoadingModal />}
    <div className={styles['user-wrapper']}>
      <div className={styles['user-button']}
      onClick={handleUserClick}
        style={{ cursor: 'pointer' }}>
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
