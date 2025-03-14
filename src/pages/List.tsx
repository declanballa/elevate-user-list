import { useNavigate } from 'react-router-dom';

import { User } from '../models/user';
import { useUsers } from '../contexts/UserContext';
import '../styles/List.css';

function List() {
  document.title = 'Users';
  const navigate = useNavigate();
  const { users, isLoading, error } = useUsers();

  const handleUserClick = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <div>
      <h1>Users</h1>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      <ul>
        {users &&
          users
            .filter((user: User) => !!user)
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
