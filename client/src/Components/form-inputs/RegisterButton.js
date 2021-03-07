import React from 'react'
import styled from 'styled-components';

const SubmitBtn = styled.button`
display: flex;
align-self: center;
margin: 20px;
`;

function RegisterButton(props) { 
  return (
    
      <SubmitBtn type="submit" className="SubmitBtn btn btn-primary" onClick={props.handleSubmit} >Register</SubmitBtn>
    
  )
}


export default RegisterButton;
