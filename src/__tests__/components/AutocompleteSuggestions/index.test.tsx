import { render, screen } from '@testing-library/react';
import AutocompleteSuggestions from '../../../components/AutocompleteSuggestions';
import { expect, describe, it } from 'vitest';

describe('AutocompleteSuggestions', () => {
  const suggestions = [
    { id: 1, login: 'user1', url: '/user1' },
    { id: 2, login: 'user2', url: '/user2' },
    { id: 3, login: 'user3', url: '/user3' },
  ];

  it('renders suggestions correctly', () => {
    render(
      <AutocompleteSuggestions
        searchTerm="user"
        suggestions={suggestions}
        onSelectSuggestion={() => {}}
      />
    );

    const suggestionItems = screen.getAllByRole('listitem');
    expect(suggestionItems).toHaveLength(suggestions.length);

    suggestionItems.forEach((item, index) => {
      expect(item).toHaveTextContent(suggestions[index].login);
      expect(item).toContainHTML('<mark>user</mark>');
    });
  });

  it('renders "No results found" when suggestions are empty', () => {
    render(
      <AutocompleteSuggestions
        searchTerm="user"
        suggestions={[]}
        onSelectSuggestion={() => {}}
      />
    );

    const noResultElement = screen.getByText('No results found');
    expect(noResultElement).toBeInTheDocument();
  });
});
