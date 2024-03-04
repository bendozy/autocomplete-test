import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import AutocompleteInput from '../../../components/AutocompleteInput';

describe('AutocompleteInput', () => {
  it('renders the input field correctly', () => {
    const handleInputChange = vi.fn();
    const handleInputClear = vi.fn();
    const setSearchTerm = vi.fn();

    render(
      <AutocompleteInput
        searchTerm=""
        onInputChange={handleInputChange}
        onInputClear={handleInputClear}
        isLoading={false}
        setSearchTerm={setSearchTerm}
      />
    );

    const inputField = screen.getByPlaceholderText('Type to Search...');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');

    fireEvent.change(inputField, { target: { value: 'test' } });
    expect(handleInputChange).toHaveBeenCalled();
  });

  it('renders the loading icon when isLoading is true', () => {
    const handleInputChange = vi.fn();
    const handleInputClear = vi.fn();
    const setSearchTerm = vi.fn();

    render(
      <AutocompleteInput
        searchTerm=""
        onInputChange={handleInputChange}
        onInputClear={handleInputClear}
        isLoading={true}
        setSearchTerm={setSearchTerm}
      />
    );

    const loadingIcon = screen.getByTestId('loadingIcon');
    expect(loadingIcon).toBeInTheDocument();
    expect(loadingIcon).toHaveClass('loader');
  });
});
