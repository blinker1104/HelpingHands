import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view:'LoginForm', info : {} };
    // this.changeView = //
  }

  componentDidMount() {

  }

  changeView() {
    this.setState({
      view: this.state.view !== 'LoginForm' ? 'LoginForm' : 'RegisterForm'
    });
  }


  render() {
    const view = this.state.view;
    return (
      <div>
        {(view === 'LoginForm') ?
          <LoginForm changeView={this.changeView.bind(this)} /> : ''}
        {(view === 'RegisterForm') ?
          <RegisterForm changeView={this.changeView.bind(this)}/> : ''}

      </div>
    );
  }
}

export default LoginPage;
