import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import PostProvider from './Context/PostContext';
import Details from './Components/Details';

function App() {

  return (
    <>
      <PostProvider>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/details'>
            <Details />
          </Route>
          <Route path="*">
            <p>page Not Found</p>
          </Route>
        </Switch>
      </PostProvider>
    </>
  );
}

export default App;
