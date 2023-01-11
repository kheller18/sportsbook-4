import React from 'react';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Main from './components/Main';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='app-header'>
          <Header />
        </div>
        <div className='app-body'>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
            <PrivateRoute path='/members' exact component={Main} />
          </Switch>
        </div>
        <div className='app-footer'>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
