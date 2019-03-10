import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import routers from './router/index';
import * as api from './api/home';
import NoMatch from './views/noMatch/index';


class App extends Component {

  constructor(props) {
    super(props);
  }

  setCurrentRoute(routers) {
    const items = routers.map(k => <Route exact={ k.exact } path={ k.path } key={ k.name } component={ k.component }/>);
    return items;
  }

  render() {
    let CurrentRoute = this.setCurrentRoute(routers);
    return (
      <Router className="App">
        <Switch>
          { CurrentRoute }
          <Route component={ NoMatch }/>
        </Switch>
      </Router>
    );

  }
}

export default App;
