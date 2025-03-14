import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carousel from '../pages/Carousel';
import { useUsers } from '../contexts/UserContext';

jest.mock('../contexts/UserContext', () => ({
  useUsers: jest.fn()
}));

describe('Carousel Component', () => {
  const mockFetchUsers = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state when users are not available', () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: null,
      error: null,
      fetchUsers: mockFetchUsers
    });

    render(
      <MemoryRouter>
        <Carousel />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  test('renders error message when fetching users fails', () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: null,
      error: 'Failed to load users',
      fetchUsers: mockFetchUsers
    });

    render(
      <MemoryRouter>
        <Carousel />
      </MemoryRouter>
    );

    expect(screen.getByText('Failed to load users')).toBeInTheDocument();
  });

  test('calls fetchUsers when users are not loaded', () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: null,
      error: null,
      fetchUsers: mockFetchUsers
    });

    render(
      <MemoryRouter>
        <Carousel />
      </MemoryRouter>
    );

    expect(mockFetchUsers).toHaveBeenCalledTimes(1);
  });

  test('renders a list of users', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [
        {
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
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          image: 'base64image',
          stats: {
            current_streak_in_days: 3,
            total_sessions_played: 15,
            skills: {}
          }
        }
      ],
      error: null,
      fetchUsers: mockFetchUsers
    });

    render(
      <MemoryRouter>
        <Carousel />
      </MemoryRouter>
    );

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('scrolling updates the activeIndex', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          image: null,
          stats: {
            current_streak_in_days: 5,
            total_sessions_played: 20,
            skills: {}
          }
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          image: 'base64image',
          stats: {
            current_streak_in_days: 3,
            total_sessions_played: 15,
            skills: {}
          }
        }
      ],
      error: null,
      fetchUsers: mockFetchUsers
    });

    const { container } = render(
      <MemoryRouter>
        <Carousel />
      </MemoryRouter>
    );

    const carousel = container.querySelector('.carousel') as HTMLDivElement;

    // Simulate horizontal scrolling
    fireEvent.scroll(carousel, { target: { scrollLeft: 500 } });

    await waitFor(() => {
      // Expect the second user to be in focus (assuming each user card is 500px wide)
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
