import './App.css';
import {Header} from './Components/Header'
import {Home} from './Components/Home'
import { Detail } from "./Components/Detail";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <section className="main-container">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:name" exact component={Detail} />
          {/* <Route path="/:name" exact render={() => <Detail key={Date.now()}/>} /> */}
        </Switch>
        {/* <Home />
        <Detail /> */}
    </section>
    </Router>
  );
}

export default App;
