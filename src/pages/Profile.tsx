import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import Skill from '../components/Skill';
import { useUsers } from '../contexts/UserContext';
import '../styles/Profile.css';

function Profile() {
  const { id } = useParams();
  const { selectedUser, isLoading, fetchUserById } = useUsers();
  const navigate = useNavigate();
  document.title = selectedUser
    ? `${selectedUser.first_name} ${selectedUser.last_name}`
    : 'Profile';

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id, fetchUserById]);

  const handleBackClick = () => {
    navigate(`/users`);
  };

  return (
    <div className='profile'>
      <a className='back' href='/' onClick={handleBackClick}>{`< Back`}</a>
      {selectedUser?.error ? (
        <h1>{selectedUser?.error}</h1>
      ) : (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className='profile-header'>
                <img
                  src={
                    selectedUser?.image
                      ? `data:image/jpeg;base64,${selectedUser.image}`
                      : 'https://cdn.prod.website-files.com/641af6e69a21755fd696647c/641da8b0a1a638938db9eb49_logo.webp'
                  }
                  alt={`${selectedUser?.first_name} ${selectedUser?.last_name}`}
                />
                <div className='profile-info'>
                  <h1>
                    {selectedUser?.first_name || ''}
                    {` ${selectedUser?.last_name || ''}`}
                  </h1>
                  <p>{`${selectedUser?.stats.current_streak_in_days}-day Streak`}</p>
                  <p>{`${selectedUser?.stats.total_sessions_played} Sessions`}</p>
                </div>
              </div>
              <div className='profile-stats'>
                <ul>
                  {Object.entries(selectedUser?.stats.skills || {}).map(
                    ([name, info]) => (
                      <Skill key={name} name={name} info={info} />
                    )
                  )}
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
