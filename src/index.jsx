import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import views
import HomePage from './components/Home';
import AdminPage from './components/Admin';
import CreatePage from './components/Create';
import DetailsPage from './components/Details';
import SigiInPage from './components/Signin';
import SignUpPage from './components/Signup';
import UpdatePage from './components/Update';
import ProfilePage from './components/Profile';
import FaqPage from './components/Faq';

// App
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/create" component={CreatePage} />
      <Route exact path="/details" component={DetailsPage} />
      <Route exact path="/signin" component={SigiInPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/update" component={UpdatePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/faq" component={FaqPage} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <App />, document.getElementById('app'),
);

export default App;
