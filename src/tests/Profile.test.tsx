import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom';
import Profile from '../pages/Profile';
import { useUsers } from '../contexts/UserContext';

jest.mock('../contexts/UserContext', () => ({
  useUsers: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

describe('Profile Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    (useUsers as jest.Mock).mockReturnValue({
      selectedUser: null,
      isLoading: false,
      fetchUserById: jest.fn()
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
  });

  test('calls fetchUserById on mount with correct id', () => {
    const mockFetchUserById = jest.fn();
    (useUsers as jest.Mock).mockReturnValue({
      selectedUser: null,
      isLoading: false,
      fetchUserById: mockFetchUserById
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(mockFetchUserById).toHaveBeenCalledTimes(1);
    expect(mockFetchUserById).toHaveBeenCalledWith('1');
  });

  test('shows loading state when isLoading is true', () => {
    (useUsers as jest.Mock).mockReturnValue({
      selectedUser: null,
      isLoading: true,
      fetchUserById: jest.fn()
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays user details when user data is available', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      selectedUser: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        image: null,
        stats: {
          current_streak_in_days: 5,
          total_sessions_played: 20,
          skills: {
            math: { current: 10, max: 100 },
            reading: { current: 20, max: 100 }
          }
        }
      },
      isLoading: false,
      fetchUserById: jest.fn()
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('5-day Streak')).toBeInTheDocument();
    expect(screen.getByText('20 Sessions')).toBeInTheDocument();
    expect(screen.getByText('math')).toBeInTheDocument();
    expect(screen.getByText('reading')).toBeInTheDocument();
  });

  test('displays error message when user fetch fails', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      selectedUser: { error: 'User not found' },
      isLoading: false,
      fetchUserById: jest.fn()
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(await screen.findByText('User not found')).toBeInTheDocument();
  });
});
