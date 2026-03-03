import { render, screen } from '@testing-library/react';
import ProgressBar from '@/components/ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct progress value', () => {
    render(<ProgressBar progress={75} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps progress to 100', () => {
    render(<ProgressBar progress={150} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps progress to 0', () => {
    render(<ProgressBar progress={-10} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows label when showLabel is true', () => {
    render(<ProgressBar progress={50} showLabel />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
