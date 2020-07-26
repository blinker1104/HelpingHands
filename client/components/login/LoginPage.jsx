import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import RegisterComplete from './RegisterComplete.jsx';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view:'LoginForm', info : {} };
    // this.changeView = //
  }

  componentDidMount() {

  }

  changeView(redirect) {
    console.log(redirect);
    if (redirect) {
      if(redirect === 'RegisterComplete') {
        this.setState({view:'RegisterComplete'})
      }
    } else {
      this.setState({
        view: this.state.view !== 'LoginForm' ? 'LoginForm' : 'RegisterForm'
      });
    }
  }


  render() {
    const view = this.state.view;
    return (
      <div>
        {(view === 'LoginForm') ?
          <LoginForm changeView={this.changeView.bind(this)} /> : ''}
        {(view === 'RegisterForm') ?
          <RegisterForm changeView={this.changeView.bind(this)}/> : ''}
        {(view === 'RegisterComplete') ?
          <RegisterComplete changeView={this.changeView.bind(this)}/> : ''}

      </div>
    );
  }
}

export default LoginPage;
