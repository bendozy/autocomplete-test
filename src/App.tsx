import { ReactElement } from 'react';
import Autocomplete from './components/Autocomplete';

import './App.css';

const App = (): ReactElement => (
  <div className="app">
    <h1>Autocomplete Demo</h1>
    <p>Seach for Github Usernames</p>
    <Autocomplete />
  </div>
);

export default App;
