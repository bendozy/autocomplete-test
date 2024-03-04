import React from 'react';
import LoadingIcon from '../LoadingIcon';

import './index.css';

interface AutocompleteInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isLoading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputClear: () => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  searchTerm,
  onInputChange,
  onInputClear,
  isLoading,
}) => {
  return (
    <div className="autocompleteInput">
      <input
        type="text"
        className="inputText"
        value={searchTerm}
        onChange={onInputChange}
        placeholder="Type to Search..."
      />
      {isLoading && (
        <div className="loadingIconWrapper">
          <LoadingIcon />
        </div>
      )}
      {searchTerm && !isLoading && (
        <button
          className="clearInputButton"
          aria-label="Clear input"
          title="Clear input"
          onClick={onInputClear}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AutocompleteInput;
