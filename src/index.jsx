/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

// Import CSS
import './assets/css/main.css';

// Import Reducers
import reducers from './redux/reducers';


// import views
import Default from './components/DefaultLayout';
import HomePage from './components/Home';
import AdminPage from './components/Admin';
import CreatePage from './components/Create';
import DetailsPage from './components/Details';
import SigiInPage from './components/Signin';
import SignUpPage from './components/Signup';
import UpdatePage from './components/Update';
import ProfilePage from './components/Profile';
import FaqPage from './components/Faq';
import history from './components/history';
import RecordsPage from './components/Records';

// Create Store
const store = createStore(reducers, applyMiddleware(ReduxPromise));

// App
/**
 * @function App
 * @returns {HTMLElement} app
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/create" component={CreatePage} />
        <Route exact path="/details" component={DetailsPage} />
        <Route exact path="/update" component={UpdatePage} />
        <Route path="/signup" render={() => <Default><SignUpPage /></Default>} />
        <Route path="/signin" render={() => <Default><SigiInPage history={history} /></Default>} />
        <Route path="/profile" render={() => <Default><ProfilePage /></Default>} />
        <Route path="/faq" render={() => <Default><FaqPage /></Default>} />
        <Route path="/records" render={() => <Default><RecordsPage history={history} /></Default>} />
        <Route exact path="/" render={() => <Default><HomePage history={history} /></Default>} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <App />, document.getElementById('app'),
);

export default App;
