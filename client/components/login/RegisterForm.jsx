import React from 'react';

const RegisterForm = ({ changeView }) => {



  return (
    <div>
     <h3>Registration</h3>
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
            <label> E-mail <span class="required">*</span></label>
            <input type="email"  name="field3" class="field-long" ></input>
          </li>
          <li>
            <button>Register</button>
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
};

export default RegisterForm;