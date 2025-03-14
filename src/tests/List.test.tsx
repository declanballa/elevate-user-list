import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';
import List from '../pages/List';

jest.mock('../contexts/UserContext', () => ({
  useUsers: jest.fn()
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('List Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state when fetching users', () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: null,
      isLoading: true,
      error: null,
      fetchUsers: jest.fn()
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when fetching users fails', () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: null,
      isLoading: false,
      error: 'Failed to fetch users',
      fetchUsers: jest.fn()
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
  });

  test('renders a list of users', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [
        { id: 1, first_name: 'John', last_name: 'Doe', image: null },
        { id: 2, first_name: 'Jane', last_name: 'Smith', image: 'base64image' }
      ],
      isLoading: false,
      error: null,
      fetchUsers: jest.fn()
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('renders correct user images', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [
        { id: 1, first_name: 'John', last_name: 'Doe', image: null },
        { id: 2, first_name: 'Jane', last_name: 'Smith', image: 'base64image' }
      ],
      isLoading: false,
      error: null,
      fetchUsers: jest.fn()
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const images = await screen.findAllByRole('img');
    expect(images[0]).toHaveAttribute(
      'src',
      'https://cdn.prod.website-files.com/641af6e69a21755fd696647c/641da8b0a1a638938db9eb49_logo.webp'
    );
    expect(images[1]).toHaveAttribute(
      'src',
      'data:image/jpeg;base64,base64image'
    );
  });

  test('navigates to user profile on click', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [{ id: 1, first_name: 'John', last_name: 'Doe', image: null }],
      isLoading: false,
      error: null,
      fetchUsers: jest.fn()
    });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const userItem = await screen.findByText('John Doe');
    userEvent.click(userItem);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/users/1');
    });
  });
});
