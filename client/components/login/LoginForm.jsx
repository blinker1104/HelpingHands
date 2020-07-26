import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view:'LoginForm', info : {} };
  }

  componentDidMount() {
    console.log('All Ready');

  }


  render() {

    return (
      <div>
        {this.state.view}
      </div>
    );
  }
}

export default LoginForm;
