/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reducers from '../redux/reducers';

// Components
import Default from '../components/DefaultLayout';
import SignUpPage from '../components/Signup';
import HomePage from '../components/Home';
import AdminPage from '../components/Admin';
import CreatePage from '../components/Create';
import DetailsPage from '../components/Details';
import SignInPage from '../components/Signin';
import ProfilePage from '../components/Profile';
import FaqPage from '../components/Faq';
import RecordsPage from '../components/Records';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const mockFunction = jest.fn();
const history = {
  action: 'PUSH',
  block: mockFunction,
  createHref: mockFunction,
  go: mockFunction,
  goBack: mockFunction,
  goForward: mockFunction,
  length: 1,
  listen: mockFunction,
  location: {},
  push: mockFunction,
  replace: mockFunction
};

const match = {
  isExact: true,
  params: {},
  path: '/explore',
  url: '/explore'
};

describe('Profile page', () => {
  it('Should mount without failing', () => {
    const FaqView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <FaqPage />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(FaqView.find('.faq').exists()).toEqual(true);
  });
});


describe('Signup page', () => {
  it('Should mount without failing', () => {
    const SignUpView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <SignUpPage
              signUpUser={mockFunction}
              handleSubmit={mockFunction}
              history={history}
              signedUp={false}
              error={{}}
              clearError={mockFunction}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(SignUpView.find('.form-container').exists()).toEqual(true);
  });
});

describe('Signin page', () => {
  it('Should mount without failing', () => {
    const SignInView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <SignInPage
              signInUser={mockFunction}
              handleSubmit={mockFunction}
              history={history}
              loggedIn={false}
              error={{}}
              clearError={mockFunction}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(SignInView.find('.form-container').exists()).toEqual(true);
  });
});

describe('Home page', () => {
  it('Should mount without failing', () => {
    const HomeView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <HomePage
              history={history}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(HomeView.find('.container').exists()).toEqual(true);
  });
});

describe('Create Record page', () => {
  it('Should mount without failing', () => {
    const CreateView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <CreatePage
              createNewRecord={mockFunction}
              handleSubmit={mockFunction}
              created={false}
              error={{}}
              clearError={mockFunction}
              formHeader="Create Record"
              history={history}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(CreateView.find('.form-container').exists()).toEqual(true);
  });
});

describe('Details page', () => {
  it('Should mount without failing', () => {
    const DetailsView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <DetailsPage
              getSpecificRecord={mockFunction}
              record={{}}
              match={match}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(DetailsView.find('.norecord').exists()).toEqual(true);
  });
});

describe('Profile page', () => {
  it('Should mount without failing', () => {
    const ProfileView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <ProfilePage
              updateOne={mockFunction}
              deleteOne={mockFunction}
              getRecords={mockFunction}
              records={[]}
              updated={false}
              deleted={false}
              error={{}}
              clearErrors={mockFunction}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(ProfileView.find('DashboardStatus').exists()).toEqual(true);
  });
});

describe('Records page', () => {
  it('Should mount without failing', () => {
    const RecordsView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <RecordsPage
              records={[]}
              getAllRecords={mockFunction}
              history={{}}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(RecordsView.find('.records').exists()).toEqual(true);
  });
});
