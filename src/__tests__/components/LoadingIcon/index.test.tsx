import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import LoadingIcon from '../../../components/LoadingIcon';

describe('LoadingIcon', () => {
  it('renders the loading icon correctly', () => {
    render(<LoadingIcon />);

    const loadingIcon = screen.getByTestId('loadingIcon');
    expect(loadingIcon).toBeInTheDocument();
    expect(loadingIcon).toHaveClass('loader');
  });
});
