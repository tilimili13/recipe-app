import { useState } from "react";
import LoadingModal from "../components/ui/modal/LoadingModal";
import UserItem from "../components/user/UserItem";
import SubmitForm from "../components/ui/form/SubmitForm";

const HomePage = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addUser = (name: string) => {
    if (!name) return;
    setUsers((prev) => [...prev, name]);
  };

  const deleteUser = (nameToRemove: string) => {
    setUsers((prev) => prev.filter((name) => name !== nameToRemove));
  };

  return (
    <div>
      <h1>Recipe Generator</h1>
      {loading && <LoadingModal />}
      <SubmitForm users={users} onAddUser={addUser} />
      {users.map((name) => (
        <UserItem
          key={name}
          name={name}
          onDelete={deleteUser}
          setLoading={setLoading}
        />
      ))}
    </div>
  );
};

export default HomePage;
