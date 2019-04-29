/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
        <Route exact path="/signin" component={SigiInPage} />
        <Route exact path="/update" component={UpdatePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/" render={() => <Default><HomePage /></Default>} />
        <Route path="/signup" render={() => <Default><SignUpPage /></Default>} />
        <Route exact path="/faq" component={FaqPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <App />, document.getElementById('app'),
);

export default App;
