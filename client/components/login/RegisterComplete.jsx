import React from 'react';

const RegisterComplete = ({ changeView}) => {
  console.log(changeView);
  return (
    <div>
      <h3>Registration Completed</h3>
      <button onClick={()=>changeView()} id="myButton" className="float-left submit-button" >Go back to Home</button>
    </div>
  );
};

export default RegisterComplete;