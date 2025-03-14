import { createContext, useContext, useEffect, useState } from 'react';

import { fetchUserIds, getUserById } from '../services/api';
import { User } from '../models/user';

interface UserContextType {
  users: User[] | null;
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => void;
  fetchUserById: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, [users]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userIds = await fetchUserIds();
      const userPromises = userIds.map((id) => getUserById(id.toString()));
      const userDetails = await Promise.all(userPromises);
      const validUsers = userDetails.filter(
        (user) => !Object.prototype.hasOwnProperty.call(user, 'error')
      );

      setUsers(validUsers);
    } catch (error: unknown) {
      setError((error as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    const user = users?.find((u) => u.id === parseInt(id, 10));

    if (user) {
      setSelectedUser(user);
      return;
    }

    try {
      setIsLoading(true);
      const user = await getUserById(id);
      setSelectedUser(user);
    } catch (error: unknown) {
      setError((error as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        isLoading,
        error,
        fetchUsers,
        fetchUserById
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUsers };
