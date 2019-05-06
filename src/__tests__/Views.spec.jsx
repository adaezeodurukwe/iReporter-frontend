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
import AdminPage, { Admin } from '../components/Admin';
import CreatePage from '../components/Create';
import DetailsPage from '../components/Details';
import SignInPage from '../components/Signin';
import ProfilePage, { Profile } from '../components/Profile';
import FaqPage from '../components/Faq';
import RecordsPage, { Records } from '../components/Records';

// Mock data
import {
  responsedata, history, match, user
} from '../__mocks__/response';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const mockFunction = jest.fn();


describe('Faq page', () => {
  it('Should mount faq page without failing', () => {
    const FaqView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <FaqPage />
          </Default>
        </Provider>
      </BrowserRouter>
    );

    const mobileButton = FaqView.find('.mobileNavButton');
    mobileButton.simulate('click');
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
  it('Should mount create without failing', () => {
    const CreateView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <CreatePage
              createNewRecord={mockFunction}
              handleSubmit={mockFunction}
              user={user}
              created={false}
              error={{}}
              clearError={mockFunction}
              formHeader="Create Record"
              history={history}
              loggedIn
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(CreateView.find('ReduxForm').exists()).toEqual(true);
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

describe('Profile class', () => {
  it('Profile page should mount admin with articles', () => {
    const ProfileClass = mount(
      <BrowserRouter>
        <Profile
          deleteOne={mockFunction}
          updateOne={mockFunction}
          getRecords={mockFunction}
          records={responsedata}
          updated={false}
          deleted={false}
          history={history}
          error={{}}
          clearErrors={mockFunction}
          autherror={{}}
          user={user}
          getOneUser={mockFunction}
        />
      </BrowserRouter>
    );
    expect(ProfileClass.find('DashboardStatus').exists()).toEqual(true);
  });
  it('Profile Page should reload page on update', () => {
    const ProfileClass = mount(
      <BrowserRouter>
        <Profile
          deleteOne={mockFunction}
          updateOne={mockFunction}
          getRecords={mockFunction}
          records={responsedata}
          updated
          deleted={false}
          history={history}
          error={{}}
          clearErrors={mockFunction}
          autherror={{}}
          user={user}
          getOneUser={mockFunction}
        />
      </BrowserRouter>
    );
    expect(ProfileClass.find('DashboardStatus').exists()).toEqual(true);
  });
});


describe('Admin class', () => {
  it('Admin should mount admin with articles', () => {
    const AdminClass = mount(
      <BrowserRouter>
        <Admin
          updateOne={mockFunction}
          getRecords={mockFunction}
          records={responsedata}
          updated={false}
          history={history}
          error={{}}
          clearErrors={mockFunction}
          autherror={{}}
          user={user}
          getOneUser={mockFunction}
          getAllRecords={mockFunction}
        />
      </BrowserRouter>
    );
    expect(AdminClass.find('DashboardStatus').exists()).toEqual(true);
  });
  it('Admin should reload page on update', () => {
    const AdminClass = mount(
      <BrowserRouter>
        <Admin
          updateOne={mockFunction}
          getRecords={mockFunction}
          records={responsedata}
          updated
          history={history}
          error={{}}
          clearErrors={mockFunction}
          autherror={{}}
          user={user}
          getOneUser={mockFunction}
          getAllRecords={mockFunction}
        />
      </BrowserRouter>
    );
    expect(AdminClass.find('DashboardStatus').exists()).toEqual(true);
  });
});

describe('Admin page', () => {
  it('Admin should mount without failing', () => {
    const AdminView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Default>
            <AdminPage
              updateOne={mockFunction}
              getRecords={mockFunction}
              records={[]}
              updated={false}
              error={{}}
              clearErrors={mockFunction}
              autherror={{}}
              user={user}
              getOneUser={mockFunction}
              getAllRecords={mockFunction}
            />
          </Default>
        </Provider>
      </BrowserRouter>
    );
    expect(AdminView.find('DashboardStatus').exists()).toEqual(true);
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

describe('Records class', () => {
  it('Records page should mount admin with articles', () => {
    const RecordsClass = mount(
      <BrowserRouter>
        <Records
          records={responsedata}
          getAllRecords={mockFunction}
          history={{}}
        />
      </BrowserRouter>
    );
    expect(RecordsClass.find('.records').exists()).toEqual(true);
  });
});
