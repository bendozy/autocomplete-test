# Deel Autocomplete Component

This serves as a simple autocomplete component facilitating the search for Github usernames.

### Side Note:

When searching for users on Github, the search function doesn't exclusively search by username. As a result, some entries in the dropdown may not correspond precisely to the entered key. In such cases, the matching phrase could be the email or other identifying details, and the search text may not be highlighted.

##Setup + Installation
Configure the environment variables and add a base URL

```
VITE_BASE_URL=https://api.github.com/search/users?q=
```

- Clone the repository
- Install Node modules
  ```
  npm install
  ```
- Start the deelopment server
  ```
  npm run dev
  ```
- Open `http//localhost:5173`

## Building for Production

- Build the application
  ```
  npm run build
  ```
- Run the Production build

  ```
  npm run preview
  ```

  Open the application: http://localhost:4173

## Testing

- Run the test suite

  ```
  npm test
  ```

## Author

- Chidozie Ijeomah
