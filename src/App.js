import './default.scss';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { checkUserSession } from './redux/User/user.actions';

import AdminToolbar from './components/AdminToolBar';

import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

import HomePage from './pages/HomePage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

import AdminProducts from './pages/AdminProducts';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';



const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [])

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path="/" render={() => (
          <MainLayout >
            <HomePage />
          </MainLayout>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout >
            <Registration />
          </MainLayout>
        )} />
        <Route path="/login" render={() => (
          <MainLayout >
            <Login />
          </MainLayout>
        )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path="/dashboard" render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />
        <Route exact path="/admin" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path="/admin/products" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );


}

export default App;
