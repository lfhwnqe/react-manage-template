import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import LoanList from './loan/index';
import NoMatch from './../noMatch/index';


class Admin extends Component {
  constructor() {
    super();
    this.state = {
      name: 'nuo'
    };
  }


  render() {
    if (this.props.loginStatus) {
      return (
        <div>
          主页
          <Router className="admin">
            <Switch>
              <Route exact path='/' component={ LoanList }></Route>
              <Route component={ NoMatch }/>
            </Switch>
          </Router>
        </div>
      );
    } else {
      return <Redirect to="/login"/>;
    }
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.authFilter.loginStatus
  };
};
export default connect(mapStateToProps)(Admin);
