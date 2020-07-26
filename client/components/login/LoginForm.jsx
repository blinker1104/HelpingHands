import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
     };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }
  handleChange(event) {
    // event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    if(name === 'username') { this.setState({ 'username' : value }); }
    else if(name === 'password') { this.setState({ 'password' : value }); }
  }

  handleSubmit(event) {
    axios.post('/loginProcess', { newForm: this.state })
      .then( (res) => {
        console.log('Login Completed', res);
        // this.props.changeView();
      });
  }


  render() {

    return (
      <div>
        <h3>Login Page</h3>
        <form  onSubmit={this.handleSubmit}>
          <ul class="form-style-1">
            <li>
              <label> Username <span class="required">*</span></label>
              <input  type="text" name="username" class="field-long" placeholder="Username" value={this.state.username} onChange={this.handleChange}></input>
            </li>
            <li>
              <label> Password <span class="required">*</span></label>
              <input type="text" name="password" class="field-long" placeholder="Password"  value={this.state.password} onChange={this.handleChange}></input>
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