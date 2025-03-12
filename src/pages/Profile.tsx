import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../models/user';
import { getUserById } from '../services/api';
import '../styles/Profile.css';
import Skill from '../components/Skill';

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const user = await getUserById(id as string);
      setUser(user);
      setIsLoading(false);
      document.title = `${user.first_name} ${user.last_name}`;
    };

    fetchUser();
  }, [id]);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className='profile'>
      <a className='back' href='/' onClick={handleBackClick}>{`< Back`}</a>
      {user?.error ? (
        <h1>{user?.error}</h1>
      ) : (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className='profile-header'>
                <img
                  src={
                    user?.image
                      ? `data:image/jpeg;base64,${user.image}`
                      : 'https://cdn.prod.website-files.com/641af6e69a21755fd696647c/641da8b0a1a638938db9eb49_logo.webp'
                  }
                  alt={`${user?.first_name} ${user?.last_name}`}
                />
                <div className='profile-info'>
                  <h1>
                    {user?.first_name || ''}
                    {` ${user?.last_name || ''}`}
                  </h1>
                  <p>{`${user?.stats.current_streak_in_days}-day Streak`}</p>
                  <p>{`${user?.stats.total_sessions_played} Sessions`}</p>
                </div>
              </div>
              <div className='profile-stats'>
                <ul>
                  {Object.entries(user?.stats.skills || {}).map(
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
