import React from 'react';
import axios from 'axios';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      username: '',
      password: '',
      email: ''
    };
    this.startRegistration = this.startRegistration.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);

  }


  startRegistration() {

  }

  handleChange(event) {
    // event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    if(name === 'username') { this.setState({ 'username' : value }); }
    else if(name === 'password') { this.setState({ 'password' : value }); }
    else if(name === 'email') {
      // let emailFormat = /(\w+)@(\w+)/;
      // if (emailFormat.test(value)) {
      //   this.setState({ 'email' : value });
      // }
      this.setState({ 'email' : value });
    }
  }

  handleSubmit(event) {
    axios.post('/registrationFormSubmit', { newForm: this.state })
      .then( (res) => {
        console.log(res);
        // if(res === '')
        this.props.changeView();
      });

    event.preventDefault();
    this.props.changeView('RegisterComplete');
  }

  render() {
    return (
      <div>
      <h3>Registration</h3>
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
              <label> E-mail <span class="required">*</span></label>
              <input type="email"  name="email" class="field-long" value={this.state.email} onChange={this.handleChange} ></input>
            </li>
            <li>
              <button >Register</button>
            </li>
          </ul>
        </form>
        <p>
            If you have an account, <br/>
            please login <br/>
            <button onClick={()=>changeView()}>Go to Login</button>

          </p>
      </div>
    );
  }
};

export default RegisterForm;