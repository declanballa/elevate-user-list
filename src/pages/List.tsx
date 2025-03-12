import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUserIds, getUserById } from '../services/api';
import { User } from '../models/user';
import '../styles/List.css';

function List() {
  const [isLoading, setIsLoading] = useState(true);
  const [userIds, setUserIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Users';

    const fetchUsers = async () => {
      const users = await fetchUserIds();
      setUserIds(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await Promise.all(
        userIds.map((id) => getUserById(id.toString()))
      );
      // eslint-disable-next-line no-prototype-builtins
      const validUsers = users.filter((user) => !user.hasOwnProperty('error'));
      setUsers(validUsers);
    };

    fetchUsers();
  }, [userIds]);

  useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
    }
  }, [users]);

  const handleUserClick = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <div>
      <h1>Users</h1>
      {isLoading && <div>Loading...</div>}
      <ul>
        {users
          .filter((user) => !!user)
          .map((user: User) => (
            <li
              className='user'
              key={user.id}
              onClick={() => handleUserClick(user.id)}
            >
              {!user.image ? (
                <img src='https://cdn.prod.website-files.com/641af6e69a21755fd696647c/641da8b0a1a638938db9eb49_logo.webp' />
              ) : (
                <img src={'data:image/jpeg;base64,' + user.image} />
              )}
              <span>
                {user.first_name} {user.last_name}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default List;
