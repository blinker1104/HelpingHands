import React from 'react';

const RegisterComplete = ({ }) => {
  return (
    <div>
      <h3>Registration Completed</h3>
      <button onClick={() => {window.location = '/';}} id="myButton" class="float-left submit-button" >Go back to Home</button>
    </div>
  );
};

export default RegisterComplete;