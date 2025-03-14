import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RedirectToUsers from '../components/RedirectToUsers';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('RedirectToUsers Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    render(
      <MemoryRouter>
        <RedirectToUsers />
      </MemoryRouter>
    );
  });

  test("calls navigate('/users') on mount", () => {
    render(
      <MemoryRouter>
        <RedirectToUsers />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/users');
  });
});
