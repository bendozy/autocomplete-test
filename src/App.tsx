import { ReactElement } from 'react';
import Autocomplete from './components/Autocomplete';

import './App.css';

const App = (): ReactElement => (
  <div className="app">
    <h1 data-testid="pageTitle">Autocomplete Demo</h1>
    <p data-testid="pageDescription">Search for Github Usernames</p>
    <Autocomplete />
  </div>
);

export default App;
