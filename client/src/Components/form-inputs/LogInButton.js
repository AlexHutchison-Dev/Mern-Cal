import React from 'react'
import styled from 'styled-components';

const SubmitBtn = styled.button`
    display: flex;
    align-self: center;
    margin: 20px;
  `;

function LogInButton(props) {
  
  return (
    
      <SubmitBtn type="submit" onClick={props.handleSubmit} className="SubmitBtn btn btn-primary">Log In</SubmitBtn>
    
  )
}


export default LogInButton;
