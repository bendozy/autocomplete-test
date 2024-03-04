import React, { useEffect, useRef, useState } from 'react';
import AutocompleteInput from '../AutocompleteInput';
import AutocompleteSuggestions from '../AutocompleteSuggestions';
import useDebouncedState from '../../hooks/useDebouncedState';
import useFetch from '../../hooks/useFetch';

import { GitHubUser } from '../../types';

import './index.css';

const Autocomplete: React.FC = () => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const autoCompleteRef = useRef<HTMLDivElement>(null);

  const debouncedsearchTerm = useDebouncedState(searchTerm, 500);
  const { data, error, isLoading } = useFetch(
    `${import.meta.env.VITE_BASE_URL}${debouncedsearchTerm}`,
    searchTerm
  );

  useEffect(() => {
    // Detect Click Outside Autocomplete div and close the suggestions
    const handleOutsideClick = (event: Event) => {
      if (
        event.target &&
        !autoCompleteRef.current?.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputClear = () => {
    setSearchTerm('');
  };

  const handleSelectSuggestion = (selectedUser: GitHubUser) => {
    setSearchTerm(selectedUser.login);
    setIsInputFocused(false);
  };

  return (
    <div className="autocomplete" onFocus={() => setIsInputFocused(true)}>
      <AutocompleteInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onInputClear={handleInputClear}
      />
      {error && <div className="autocompleteError">{error.message}</div>}
      {searchTerm && isInputFocused && !isLoading && !error && (
        <AutocompleteSuggestions
          searchTerm={searchTerm}
          suggestions={data}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </div>
  );
};

export default Autocomplete;
