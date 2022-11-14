import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './page/Login';
import Home from './page/Home';
import TicketsUsuarios from './page/TicketsUsuarios';



//Redux
import { Provider } from 'react-redux';
import store from './store';
import Rutaprivada from "./rutaprivada/RutaPrivada";
import tokenAuth from './config/tokenAuth';

function App() {

  // //revisar si tenemos un token
  const token =  localStorage.getItem('token');
  
  if(token){
    tokenAuth(token);
  }

  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Rutaprivada exact path="/home" component={Home}/>
          {/* <Route exact path="/ticketusuario" component={TicketsUsuarios}/> */}
        </Switch>
      </Provider>
    </Router>
  )
}



export default App;
