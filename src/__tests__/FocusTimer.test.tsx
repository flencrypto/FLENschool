import { render, screen, fireEvent } from '@testing-library/react';
import FocusTimer from '@/components/FocusTimer';

describe('FocusTimer', () => {
  it('renders with default time', () => {
    render(<FocusTimer />);
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('renders start button', () => {
    render(<FocusTimer />);
    expect(screen.getByText(/Start/)).toBeInTheDocument();
  });

  it('renders reset button', () => {
    render(<FocusTimer />);
    expect(screen.getByText(/Reset/)).toBeInTheDocument();
  });

  it('toggles to pause when started', () => {
    render(<FocusTimer />);
    const startButton = screen.getByText(/Start/);
    fireEvent.click(startButton);
    expect(screen.getByText(/Pause/)).toBeInTheDocument();
  });

  it('shows sessions completed', () => {
    render(<FocusTimer />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
