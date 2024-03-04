import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import Autocomplete from '../../../components/Autocomplete';

describe('Autocomplete', () => {
  it('renders the AutocompleteInput component correctly', () => {
    render(<Autocomplete />);

    const autocompleteInput = screen.getByRole('textbox');
    expect(autocompleteInput).toBeInTheDocument();
    expect(autocompleteInput).toHaveValue('');

    fireEvent.change(autocompleteInput, { target: { value: 'test' } });

    expect(autocompleteInput).toHaveValue('test');
  });

  it('renders the AutocompleteSuggestions component when searchTerm is not empty and input is focused', () => {
    render(<Autocomplete />);

    const autocompleteInput = screen.getByRole('textbox');
    fireEvent.focus(autocompleteInput);

    expect(screen.queryByTestId('autocompleteSuggestions')).toBeNull();

    fireEvent.change(autocompleteInput, { target: { value: 'test' } });

    expect(screen.getByTestId('autocompleteSuggestions')).toBeInTheDocument();
  });

  it('clears the searchTerm when input is cleared', () => {
    render(<Autocomplete />);

    const autocompleteInput = screen.getByRole('textbox');
    fireEvent.change(autocompleteInput, { target: { value: 'test' } });

    expect(autocompleteInput).toHaveValue('test');

    fireEvent.click(screen.getByRole('button'));

    expect(autocompleteInput).toHaveValue('');
  });
});
