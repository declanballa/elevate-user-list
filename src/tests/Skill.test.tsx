import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skill from '../components/Skill';
import { SkillInfo } from '../models/user';

describe('Skill Component', () => {
  const mockSkill: SkillInfo = {
    current: 50,
    max: 100,
    level: 'intermediate'
  };

  test('renders skill component with correct name', () => {
    render(<Skill name='writing' info={mockSkill} />);
    expect(screen.getByText(/writing/i)).toBeInTheDocument();
  });

  test('renders correct skill progress width', () => {
    render(<Skill name='math' info={mockSkill} />);
    const progressBar = screen.getByText(/50/i);
    expect(progressBar).toHaveStyle('width: 50%');
  });

  test('applies correct skill color based on skill name', () => {
    render(<Skill name='reading' info={mockSkill} />);
    const progressBar = screen.getByText(/50/i);
    expect(progressBar).toHaveStyle('background-color: #ff87a0');
  });

  test('hides labels when hideLabels is true', () => {
    render(<Skill name='speaking' info={mockSkill} hideLabels={true} />);
    expect(screen.queryByText(/50/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/100/i)).not.toBeInTheDocument();
    expect(screen.getByText('_')).toBeInTheDocument();
  });

  test('renders max value when hideLabels is false', () => {
    render(<Skill name='math' info={mockSkill} hideLabels={false} />);
    expect(screen.getByText(/100/i)).toBeInTheDocument();
  });
});
