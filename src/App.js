import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Ending from './pages/ending';
import Game from './pages/game';

function App() {
  return (
    <Router>
      <Switch>
						<Route path={'/game/:id'} component={Game} />
						<Route path={'/end'} component={Ending} />
						<Route path={'/'} component={Home} />
						{/* <Route component={NotFound} /> */}
					</Switch>
    </Router>
  );
}

export default App;
