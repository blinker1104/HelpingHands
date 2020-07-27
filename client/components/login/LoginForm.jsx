import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      warningMsg:''
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
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/loginProcess', { newForm: this.state })
      .then( (res) => {
        console.log('Login Completed', res);

        if (res.data === 'success') {
          this.state.warningMsg = '';
          window.location = '/';
        }
      })
      .catch( (res) => {
        this.setState({warningMsg : 'Login Attemp Failed' });
      });
    event.preventDefault();
  }


  render() {

    return (
      <div>
        <h3>Login Page</h3>
        <form  onSubmit={this.handleSubmit}>
          <ul className="form-style-1">
            <li>
              <label> Username <span className="required">*</span></label>
              <input  type="text" name="username" className="field-long" placeholder="Username" value={this.state.username} onChange={this.handleChange}></input>
            </li>
            <li>
              <label> Password <span className="required">*</span></label>
              <input type="text" name="password" className="field-long" placeholder="Password"  value={this.state.password} onChange={this.handleChange}></input>
            </li>
            <li>
              <p style={{color:"red"}}>
                {this.state.warningMsg}
              </p>
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