import React from 'react';
import { GitHubUser } from '../../types';

import './index.css';

interface AutocompleteSuggestionsProps {
  searchTerm: string;
  suggestions?: GitHubUser[];
  onSelectSuggestion: (selectedSuggestion: GitHubUser) => void;
}

const AutocompleteSuggestions: React.FC<AutocompleteSuggestionsProps> = ({
  searchTerm,
  suggestions,
  onSelectSuggestion,
}) => {
  const highlightMatchingText = (name: string, searchTerm: string) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    return name
      .split(regex)
      .map((segment, index: number) =>
        index % 2 === 0 ? (
          segment
        ) : (
          <mark key={`match-${index}`}>{segment}</mark>
        )
      );
  };

  return (
    <ul
      className="autocompleteSuggestions"
      data-testid="autocompleteSuggestions"
    >
      {suggestions?.length === 0 && (
        <li className="noResult">No results found</li>
      )}
      {suggestions?.map((user) => (
        <li key={user.id} onClick={() => onSelectSuggestion(user)}>
          {highlightMatchingText(user.login, searchTerm)}
        </li>
      ))}
    </ul>
  );
};

export default AutocompleteSuggestions;
