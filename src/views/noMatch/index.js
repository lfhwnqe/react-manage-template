import React, { Component } from 'react';

class NoMatch extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('in NoMatch', this.props.location);
  }

  backIndex() {
    this.props.history.push('/');
  }

  render() {
    return (<div>404 not found
      <button onClick={ this.backIndex.bind(this) }>回到主页</button>
    </div>);
  }
}

export default NoMatch;
