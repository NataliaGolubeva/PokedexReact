import AllPokemons from "./components/AllPokemons";
import Pokemon from "./components/Pokemon";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AllPokemons />
        </Route>

        <Route exact path="/pokemon/:id/:name">
          <Pokemon />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
