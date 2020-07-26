import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view:'LoginForm', info : {} };
  }

  componentDidMount() {

  }


  render() {

    return (
      <div>
        <h3>Login Page</h3>
        <form>
          <ul class="form-style-1">
            <li>
              <label> Username <span class="required">*</span></label>
              <input  type="text" name="username" class="field-long" placeholder="Username"></input>
            </li>
            <li>
              <label> Password <span class="required">*</span></label>
              <input type="text" name="password" class="field-long" placeholder="Password"></input>
            </li>
            <li>
              <button>Login</button>
            </li>
          </ul>
        </form>
        <p>
          If you do not have an account, <br/>
          please register a new account <br/>
          <button onClick={()=>this.props.changeView()}>Registration</button>

        </p>
      </div>
    );
  }
}

export default LoginForm;



/*
<a href='/registration' >
  <button>Registration</button>
</a>
*/