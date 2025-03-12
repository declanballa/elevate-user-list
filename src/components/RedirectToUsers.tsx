import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToUsers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/users');
  }, [navigate]);

  return null;
};

export default RedirectToUsers;
