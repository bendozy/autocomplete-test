import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

// To Test
import App from '../App';

// Tests
describe('Renders  <App /> correctly', async () => {
  it('Should render <App /> correctly', async () => {
    // Setup
    const { getByTestId } = render(<App />);

    const h1Element = getByTestId('pageTitle');
    const pElement = getByTestId('pageDescription');
    // Assert the text content
    expect(h1Element.textContent).toBe('Autocomplete Demo');
    expect(pElement.textContent).toBe('Search for Github Usernames');
  });
});
