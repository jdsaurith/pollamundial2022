import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './page/Login';
import Home from './page/Home';
import TicketsUsuarios from './page/TicketsUsuarios';
// <>

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/ticketusuario" component={TicketsUsuarios}/>
      </Switch>
    </Router>
  )
}



export default App;
