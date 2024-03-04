import React, { useState } from 'react';
import AutocompleteInput from '../AutocompleteInput';
import AutocompleteSuggestions from '../AutocompleteSuggestions';
import useDebouncedState from '../../hooks/useDebouncedState';
import useFetch from '../../hooks/useFetch';

import { GitHubUser } from '../../types';

const Autocomplete: React.FC = () => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedsearchTerm = useDebouncedState(searchTerm, 500);
  const { data, error, isLoading } = useFetch(
    `${import.meta.env.VITE_BASE_URL}${debouncedsearchTerm}`,
    searchTerm
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputClear = () => {
    setSearchTerm('');
  };

  const handleSelectSuggestion = (selectedUser: GitHubUser) => {
    console.log(selectedUser);

    setSearchTerm(selectedUser.login);
    setIsInputFocused(false);
  };

  return (
    <div
      className="autocomplete"
      // onBlur={() => setIsInputFocused(false)}
      onFocus={() => setIsInputFocused(true)}
    >
      <AutocompleteInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onInputClear={handleInputClear}
      />
      {error && <div className="autocompleteError">{error.message}</div>}
      {searchTerm && isInputFocused && !isLoading && (
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
