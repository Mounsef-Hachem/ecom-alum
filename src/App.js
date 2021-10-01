import './default.scss';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { checkUserSession } from './redux/User/user.actions';

import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

import HomePage from './pages/HomePage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Account from './pages/Account';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminProducts from './pages/AdminProducts';
import Payment from './pages/Payment';

import MainLayout from './layouts/MainLayout';
import AccountLayout from './layouts/AccountLayout';
import AdminLayout from './layouts/AdminLayout';
import Order from './pages/Order';
import Orders from './pages/Orders';
import AdminCategories from './pages/AdminCategories';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import ContactUs from './pages/ContactUs';



const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <MainLayout >
            <HomePage />
          </MainLayout>
        )} />
        <Route exact path="/contact" render={() => (
          <MainLayout >
            <ContactUs />
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
        <Route exact path="/search" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path="/search/:filterType" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path="/product/:productID" render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )} />
        <Route path="/cart" render={() => (
          <MainLayout>
            <Cart />
          </MainLayout>
        )} />
        <Route path="/payment" render={() => (
          <WithAuth>
            <MainLayout>
              <Payment />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route exact path="/account" render={() => (
          <WithAuth>
            <AccountLayout>
              <Account />
            </AccountLayout>
          </WithAuth>
        )} />
        <Route path="/account/orders" render={() => (
          <WithAuth>
            <AccountLayout>
              <Orders />
            </AccountLayout>
          </WithAuth>
        )} />
        <Route path="/account/order/:orderID" render={() => (
          <WithAuth>
            <AccountLayout>
              <Order />
            </AccountLayout>
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
        <Route path="/admin/users" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path="/admin/categories" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <AdminCategories />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path="/admin/orders" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );


}

export default App;
